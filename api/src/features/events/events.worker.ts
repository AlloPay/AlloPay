import { Processor } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import { NetworksService } from '../util/networks/networks.service';
import { DatabaseService } from '../database/database.service';
import e from '~/edgeql-js';
import { Hex, asHex } from 'lib';
import { CHAINS, Chain } from 'chains';
import { RUNNING_JOB_STATUSES, TypedJob, createQueue } from '../util/bull/bull.util';
import { Worker } from '#/util/bull/Worker';
import { AbiEvent } from 'abitype';
import { Log as ViemLog, encodeEventTopics, hexToNumber } from 'viem';
import { JobsOptions, UnrecoverableError } from 'bullmq';

const TARGET_LOGS_PER_JOB = 9_000; // Max 10k
const DEFAULT_LOGS_PER_BLOCK = 200;
const LPB_ALPHA = 0.2;
const TOO_MANY_RESULTS_RE =
  /Query returned more than .+? results. Try with this block range \[(?:0x[0-9a-f]+), (0x[0-9a-f]+)\]/;

export const EventsQueue = createQueue<EventJobData>('Events');
export type EventsQueue = typeof EventsQueue;

interface EventJobData {
  chain: Chain;
  from: number;
  to: number;
  split?: boolean;
}

export type Log<TAbiEvent extends AbiEvent | undefined = undefined> = ViemLog<
  bigint,
  number,
  false,
  TAbiEvent,
  true
>;

export interface EventData<TAbiEvent extends AbiEvent> {
  chain: Chain;
  log: Log<TAbiEvent>;
}

export type EventListener<TAbiEvent extends AbiEvent> = (
  data: EventData<TAbiEvent>,
) => Promise<void>;

@Injectable()
@Processor(EventsQueue.name, { autorun: false })
export class EventsWorker extends Worker<EventsQueue> {
  private listeners = new Map<Hex, EventListener<AbiEvent>[]>();
  private events: AbiEvent[] = [];
  private logsPerBlock = Object.fromEntries(
    Object.keys(CHAINS).map((chain) => [chain as Chain, undefined]),
  ) as Record<Chain, number | undefined>;

  constructor(
    private db: DatabaseService,
    private networks: NetworksService,
  ) {
    super();
  }

  on<TAbiEvent extends AbiEvent>(event: TAbiEvent, listener: EventListener<TAbiEvent>) {
    const topic = encodeEventTopics({ abi: [event as AbiEvent] })[0];
    this.listeners.set(topic, [
      ...(this.listeners.get(topic) ?? []),
      listener as unknown as EventListener<AbiEvent>,
    ]);
    this.events.push(event);
  }

  async process(job: TypedJob<EventsQueue>) {
    const { chain, from } = job.data;
    const network = this.networks.get(chain);
    const latest = Number(network.blockNumber()); // Warning: bigint -> number
    const firstAttempt = job.attemptsMade === 0 && !job.data.split;
    const to = firstAttempt ? Math.min(job.data.to, latest) : job.data.to;
    if (to !== job.data.to) job.updateData({ ...job.data, to }); // Ensures deterministic retries

    // Queue next job on the first attempt
    if (firstAttempt) {
      if (latest < from) {
        this.add('Ahead', { chain, from, to }, { delay: delay(network.blockTime()) }, true);
      } else {
        this.add(
          latest === from ? 'Tracking' : 'Behind',
          { chain, from: to + 1, to: to + this.targetBlocks(chain) },
          { delay: latest === from ? delay(network.blockTime()) : undefined },
        );
      }
    }

    if (to < from) return;

    try {
      const logs = await network.getLogs({
        fromBlock: BigInt(from),
        toBlock: BigInt(to),
        events: this.events,
        strict: true,
      });

      const blocksProcessed = to - from + 1;
      this.updateLogsPerBlock(chain, logs.length, blocksProcessed);

      await Promise.all(
        logs
          .filter((log) => log.topics.length)
          .flatMap((log) =>
            this.listeners.get(log.topics[0]!)?.map((listener) => listener({ chain, log })),
          ),
      );
      this.log.verbose(
        `${chain}: ${logs.length} events from ${blocksProcessed} blocks [${from}, ${to}]`,
      );
    } catch (e) {
      const match = TOO_MANY_RESULTS_RE.exec((e as Error).message ?? '');
      if (!match) throw e;

      // Split the job into two smaller jobs
      const mid = Math.max(from, hexToNumber(asHex(match[1])));
      if (to <= mid)
        throw new UnrecoverableError(`Invalid split block range: [${from}, ${mid}] for split`);

      const lower: EventJobData = { chain, from, to: mid, split: true };
      const upper: EventJobData = { chain, from: mid + 1, to, split: true };
      this.queue.addBulk([
        { name: 'Split (lower)', data: lower, opts: { jobId: jobId(lower) } },
        { name: 'Split (upper)', data: upper, opts: { jobId: jobId(upper) } },
      ]);
    }
  }

  targetBlocks(chain: Chain) {
    const logsPerBlock = this.logsPerBlock[chain] ?? DEFAULT_LOGS_PER_BLOCK;
    return Math.max(1, Math.floor(TARGET_LOGS_PER_JOB / logsPerBlock));
  }

  updateLogsPerBlock(chain: Chain, logs: number, blocks: number) {
    const lpb = this.logsPerBlock[chain];
    this.logsPerBlock[chain] = lpb
      ? (1 - LPB_ALPHA) * lpb + LPB_ALPHA * (logs / blocks)
      : logs / blocks;
  }

  async bootstrap() {
    const runningJobs = await this.queue.getJobs(RUNNING_JOB_STATUSES);

    for await (const network of this.networks) {
      if (runningJobs.find((j) => j.data.chain === network.chain.key)) continue;

      const lastProcessedBlock = (await e
        .max(
          e.select(e.Transfer, (t) => ({
            filter: e.op(t.account.chain, '=', network.chain.key),
            block: true,
          })).block,
        )
        .run(this.db.client)) as bigint | null; // Return type is overly broad - https://github.com/edgedb/edgedb-js/issues/594

      const from = lastProcessedBlock
        ? Number(lastProcessedBlock) + 1 // Warning: bigint -> number
        : Number(network.blockNumber()); // Warning: bigint -> number

      const chain = network.chain.key;
      this.add(EventsQueue.name, { chain, from, to: from + this.targetBlocks(chain) });

      this.log.log(
        `${network.chain.key}: events starting from ${
          lastProcessedBlock ? `last processed (${from})` : `latest (${from})`
        }`,
      );
    }
  }

  add(name: string, data: EventJobData, opts?: JobsOptions, ahead?: boolean) {
    return this.queue.add(name, data, { jobId: jobId(data, ahead), ...opts });
  }
}

function jobId(data: EventJobData, ahead?: boolean) {
  return `${data.chain}:${data.from}-${data.to}` + (ahead ? `_${performance.now()}` : ''); 
}

function delay(blockTime: number) {
  return Math.max(50 /* min */, Math.min(blockTime - 100, 30_000 /* max */));
}
