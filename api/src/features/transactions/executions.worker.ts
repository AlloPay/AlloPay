import { Processor } from '@nestjs/bullmq';
import { Injectable } from '@nestjs/common';
import {
  UAddress,
  UUID,
  asAddress,
  asApproval,
  asHex,
  asScheduledSystemTransaction,
  asSystemTransaction,
  asUAddress,
  asUUID,
  encodePaymasterInput,
  encodeTransactionSignature,
  isPresent,
  mapAsync,
} from 'lib';
import { DatabaseService } from '~/features/database/database.service';
import { ProposalsService } from '~/features/proposals/proposals.service';
import {
  NetworksService,
  SendAccountTransactionParams,
} from '~/features/util/networks/networks.service';
import e, { $infer } from '~/edgeql-js';
import { policyStateAsPolicy, PolicyShape } from '~/features/policies/policies.util';
import { TX_SHAPE, transactionAsTx } from './transactions.util';
import { ProposalEvent } from '~/features/proposals/proposals.input';
import { selectTransaction } from '~/features/transactions/transactions.service';
import { QueueReturnType, TypedJob, createQueue } from '~/features/util/bull/bull.util';
import { Worker } from '#/util/bull/Worker';
import { UnrecoverableError } from 'bullmq';
import { utils as zkUtils } from 'zksync-ethers';
import { TokensService } from '#/tokens/tokens.service';
import { PricesService } from '#/prices/prices.service';
import Decimal from 'decimal.js';
import { ETH } from 'lib/dapps';
import { Shape } from '#/database/database.select';
import { match } from 'ts-pattern';
import { PaymasterFeeParts } from '#/paymasters/paymasters.model';
import { PaymastersService } from '#/paymasters/paymasters.service';
import {
  lowerOfPaymasterFees,
  paymasterFeesEq,
  totalPaymasterEthFees,
} from '#/paymasters/paymasters.util';

export const ExecutionsQueue = createQueue<ExecutionJob>('Executions');
export type ExecutionsQueue = typeof ExecutionsQueue;
interface ExecutionJob {
  type: 'standard' | 'scheduled';
  transaction: UUID;
  ignoreSimulation?: boolean;
}

const PRICE_DRIFT_MULTIPLIER = new Decimal('1.001'); // 0.1%

@Injectable()
@Processor(ExecutionsQueue.name, { autorun: false })
export class ExecutionsWorker extends Worker<ExecutionsQueue> {
  constructor(
    private networks: NetworksService,
    private db: DatabaseService,
    private proposals: ProposalsService,
    private tokens: TokensService,
    private prices: PricesService,
    private paymasters: PaymastersService,
  ) {
    super();
  }

  async process(job: TypedJob<ExecutionsQueue>): Promise<QueueReturnType<ExecutionsQueue>> {
    return await match(job.data)
      .with({ type: 'standard' }, (data) => this.processStandard(data))
      .with({ type: 'scheduled' }, (data) => this.processScheduled(data))
      .exhaustive();
  }

  private async processStandard({ transaction: id, ignoreSimulation }: ExecutionJob) {
    const proposal = await this.db.query(
      e.select(e.Transaction, () => ({
        filter_single: { id },
        hash: true,
        status: true,
        approvals: (a) => ({
          filter: e.op('not', a.invalid),
          approver: { address: true },
          signature: true,
        }),
        policy: PolicyShape,
        paymasterEthFees: { activation: true },
        ...TX_SHAPE,
        ...EXECUTE_TX_SHAPE,
      })),
    );
    if (!proposal) return 'Not found';
    if (proposal.status !== 'Pending' && proposal.status !== 'Executing')
      return `Can't execute transaction with status ${proposal.status}`;

    const account = asUAddress(proposal.account.address);
    const network = this.networks.get(account);

    const approvals = (
      await mapAsync(proposal.approvals, (a) =>
        asApproval({
          network,
          hash: asHex(proposal.hash),
          approver: asAddress(a.approver.address),
          signature: asHex(a.signature),
        }),
      )
    ).filter(isPresent);
    if (approvals.length !== proposal.approvals.length)
      throw new UnrecoverableError('Approval expired'); // TODO: handle expiring approvals

    const newPaymasterFees = await this.getAndUpdateNewPaymasterFees(id, account, {
      activation: new Decimal(proposal.paymasterEthFees.activation),
    });

    const tx = transactionAsTx(proposal);
    return await this.execute({
      proposal,
      paymasterEthFees: totalPaymasterEthFees(newPaymasterFees),
      ignoreSimulation,
      executeParams: {
        ...asSystemTransaction({ tx }),
        customSignature: encodeTransactionSignature({
          tx,
          policy: policyStateAsPolicy(proposal.policy),
          approvals,
        }),
      },
    });
  }

  private async processScheduled({ transaction: id, ignoreSimulation }: ExecutionJob) {
    const proposal = await this.db.query(
      e.select(e.Transaction, () => ({
        filter_single: { id },
        hash: true,
        status: true,
        ...TX_SHAPE,
        ...EXECUTE_TX_SHAPE,
      })),
    );
    if (!proposal) return 'Not found';
    if (proposal.status !== 'Scheduled') return 'Not scheduled';

    return await this.execute({
      proposal,
      paymasterEthFees: undefined,
      ignoreSimulation,
      executeParams: {
        ...asScheduledSystemTransaction({ tx: transactionAsTx(proposal) }),
      },
    });
  }

  private async execute({
    proposal,
    executeParams,
    paymasterEthFees,
    ignoreSimulation,
  }: ExecuteParams) {
    if (!proposal.simulation?.success && !ignoreSimulation) return 'Simulation failed';
    if (!proposal.executable) return 'Not executable';

    const account = asUAddress(proposal.account.address);
    const network = this.networks.get(account);

    const feeToken = asUAddress(proposal.feeToken.address);
    const [maxFeePerGas, feeTokenPrice] = await Promise.all([
      network.estimatedMaxFeePerGas(),
      this.prices.price(asUAddress(feeToken, network.chain.key)),
    ]);
    const feeTokenPerGas = maxFeePerGas.div(feeTokenPrice.eth).mul(PRICE_DRIFT_MULTIPLIER);
    const totalFeeTokenFees = feeTokenPerGas
      .mul(proposal.gasLimit.toString())
      .plus(paymasterEthFees ?? '0');
    const amount = await this.tokens.asFp(feeToken, totalFeeTokenFees);
    const maxAmount = await this.tokens.asFp(feeToken, new Decimal(proposal.maxAmount));
    if (amount > maxAmount) throw new Error('Amount > maxAmount'); // TODO: handle

    await this.prices.updatePriceFeedsIfNecessary(network.chain.key, [
      ETH.pythUsdPriceId,
      asHex(proposal.feeToken.pythUsdPriceId!),
    ]);

    const execution = await network.sendAccountTransaction({
      from: asAddress(account),
      paymaster: asAddress(proposal.paymaster),
      paymasterInput: encodePaymasterInput({
        token: asAddress(feeToken),
        amount,
        maxAmount,
      }),
      gasPerPubdata: BigInt(zkUtils.DEFAULT_GAS_PER_PUBDATA_LIMIT),
      ...executeParams,
    });

    if (execution.isErr()) throw execution.error; // Transactions with validation errors should not be marked as executable

    const id = asUUID(proposal.id);
    const r = await (async () => {
      if (execution.isOk()) {
        const hash = execution.value;
        await this.db.query(
          e.insert(e.SystemTx, {
            hash,
            proposal: selectTransaction(id),
            maxEthFeePerGas: maxFeePerGas.toString(),
            ethPerFeeToken: feeTokenPrice.eth.toString(),
            usdPerFeeToken: feeTokenPrice.usd.toString(),
          }),
        );

        return hash;
      } /* execution isErr */ else {
        // Validation failed
        // const err = execution.error;
        // await this.db.query(
        //   e.insert(e.Failed, {
        //     transaction: selectTransaction(id),
        //     block: network.blockNumber(),
        //     gasUsed: 0n,
        //     ethFeePerGas: maxFeePerGas.toString(),
        //     reason: err.message,
        //   }),
        // );
        // return err;
      }
    })();

    this.proposals.publish({ id, account }, ProposalEvent.submitted);

    return r;
  }

  private async getAndUpdateNewPaymasterFees(
    transaction: UUID,
    account: UAddress,
    existing: PaymasterFeeParts,
  ) {
    const current = await this.paymasters.paymasterFees({ account });
    const lowest = lowerOfPaymasterFees(existing, current);
    if (!paymasterFeesEq(existing, lowest)) {
      this.db.query(
        e.update(e.Transaction, () => ({
          filter_single: { id: transaction },
          set: {
            paymasterEthFees: e.insert(e.PaymasterFees, {
              activation: lowest.activation.toString(),
            }),
          },
        })),
      );
    }

    return lowest;
  }
}

const EXECUTE_TX_SHAPE = {
  id: true,
  account: { address: true },
  executable: true,
  simulation: { success: true },
  gasLimit: true,
  feeToken: { address: true, pythUsdPriceId: true },
  paymaster: true,
  maxAmount: true,
} satisfies Shape<typeof e.Transaction>;
const s = e.select(e.Transaction, () => EXECUTE_TX_SHAPE);

interface ExecuteParams {
  proposal: NonNullable<$infer<typeof s>>[0];
  executeParams: Partial<SendAccountTransactionParams>;
  paymasterEthFees: Decimal | undefined;
  ignoreSimulation?: boolean;
}
