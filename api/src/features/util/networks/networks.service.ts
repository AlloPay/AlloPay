import { Injectable } from '@nestjs/common';
import { CONFIG } from '~/config';
import { asChain, asDecimal, asUAddress, UAddress } from 'lib';
import { ChainConfig, Chain, CHAINS, NetworkWallet, isChain } from 'chains';
import {
  EstimateFeesPerGasReturnType,
  PublicClient,
  Transport,
  WatchBlockNumberErrorType,
  createPublicClient,
  createWalletClient,
  fallback,
  http,
  webSocket,
} from 'viem';
import { eip712WalletActions } from 'viem/zksync';
import { privateKeyToAccount } from 'viem/accounts';
import Redis from 'ioredis';
import { InjectRedis } from '@songkeys/nestjs-redis';
import { firstValueFrom, ReplaySubject } from 'rxjs';
import { runExclusively } from '~/util/mutex';
import { ETH } from 'lib/dapps';

export type Network = ReturnType<typeof create>;

@Injectable()
export class NetworksService implements AsyncIterable<Network> {
  private clients: Partial<Record<Chain, Network>> = {};

  constructor(@InjectRedis() private redis: Redis) {}

  get(p: Chain | ChainConfig | UAddress): Network {
    const chain = typeof p === 'string' ? (isChain(p) ? p : asChain(p)) : p.key;

    return (this.clients[chain] ??= create({ chainKey: chain, redis: this.redis }));
  }

  *all() {
    for (const chain of Object.values(CHAINS)) {
      yield this.get(chain);
    }
  }

  async *[Symbol.asyncIterator]() {
    for (const network of this.all()) {
      if ((await network.status()) === 'healthy') yield network;
    }
  }
}

interface CreateParams {
  chainKey: Chain;
  redis: Redis;
}

function create({ chainKey, redis }: CreateParams) {
  const chain = CHAINS[chainKey];

  const rpcUrls = CONFIG.rpcUrls[chainKey] ?? [];
  const transport = fallback(
    [
      ...[...chain.rpcUrls.default.http, ...rpcUrls.filter((url) => url.startsWith('http'))].map(
        (url) => http(url),
      ),
      ...[...chain.rpcUrls.default.http, ...rpcUrls.filter((url) => url.startsWith('ws'))].map(
        (url) => webSocket(url),
      ),
    ],
    { retryCount: 3, rank: true },
  );

  return createPublicClient<Transport, ChainConfig>({
    chain,
    transport,
    key: chain.key,
    name: chain.name,
    batch: { multicall: true },
    pollingInterval: 500 /* ms */, // Used when websocket is unavailable
  }).extend((client) => ({
    ...eip712WalletActions()(client),
    ...walletActions(client, transport, redis),
    ...blockNumberAndStatusActions(client),
    ...estimatedFeesPerGas(client, redis),
  }));
}

type Client = PublicClient<Transport, ChainConfig>;

function walletActions(client: Client, transport: Transport, redis: Redis) {
  const chain = client.chain;
  const wallet = createWalletClient({
    account: privateKeyToAccount(CONFIG.walletPrivateKeys[chain.key]),
    chain,
    transport,
  });
  const walletAddress = asUAddress(wallet.account.address, chain.key);

  return {
    walletAddress,
    async useWallet<R>(f: (wallet: NetworkWallet) => R): Promise<R> {
      return runExclusively(() => f(wallet), {
        redis,
        key: `network-wallet:${walletAddress}`,
      });
    },
  };
}

const BLOCK_TIME_ALPHA = 0.2;
const DEFAULT_BLOCK_TIME = 1000; /* ms */

function blockNumberAndStatusActions(client: Client) {
  const status = new ReplaySubject<'healthy' | WatchBlockNumberErrorType>(1);
  let blockNumber = 0n;
  let blockTime = DEFAULT_BLOCK_TIME;
  let updated = Date.now();

  const sinceLastBlock = () => Date.now() - updated;
  const getBlockTime = () =>
    Math.ceil((1 - BLOCK_TIME_ALPHA) * blockTime + BLOCK_TIME_ALPHA * sinceLastBlock());

  client.watchBlockNumber({
    onBlockNumber: (newBlockNumber) => {
      if (newBlockNumber < blockNumber) return;

      status.next('healthy');
      blockNumber = newBlockNumber;
      blockTime = getBlockTime();
      updated = Date.now();
    },
    onError: (error) => {
      status.next(error as WatchBlockNumberErrorType);
    },
    emitOnBegin: true,
    poll: true, // TODO: remove when fixed websocket watchX auto reconnect is supported - https://github.com/wevm/viem/issues/877
  });

  return {
    status() {
      return firstValueFrom(status);
    },
    blockNumber() {
      return blockNumber;
    },
    blockTime() {
      return getBlockTime();
    },
    sinceLastBlock() {
      return sinceLastBlock();
    },
  };
}

export function estimatedFeesPerGasKey(chain: Chain) {
  return `estimatedFeesPerGasKey:${chain}`;
}

function estimatedFeesPerGas(client: Client, redis: Redis) {
  const estimatedFeesPerGas = async () => {
    const key = estimatedFeesPerGasKey(client.chain.key);
    const cached = await redis.get(key);
    const parsedCached = cached && (JSON.parse(cached) as EstimateFeesPerGasReturnType);

    const v = parsedCached || (await client.estimateFeesPerGas());

    return {
      maxFeePerGas: asDecimal(v.maxFeePerGas!, ETH),
      maxPriorityFeePerGas: asDecimal(v.maxPriorityFeePerGas!, ETH),
    };
  };

  return {
    estimatedFeesPerGas,
    estimatedMaxFeePerGas: async () => (await estimatedFeesPerGas()).maxFeePerGas,
  };
}
