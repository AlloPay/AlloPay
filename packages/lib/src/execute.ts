import { encodeTransactionSignature } from './signature';
import { Tx } from './tx';
import {
  FALLBACK_OPERATIONS_GAS,
  estimateTransactionOperationsGas,
  estimateTransactionTotalGas,
} from './gas';
import { Policy } from './policy';
import { Approval } from './approvals';
import { Address } from './address';
import { ChainConfig, Network } from 'chains';
import { ResultAsync } from 'neverthrow';
import { Hex, SendTransactionErrorType } from 'viem';
import { AllOrNone } from './util';
import { utils as zkUtils } from 'zksync2-js';
import { encodeOperations } from './operation';

type SerializeTransactionParam = Parameters<
  NonNullable<NonNullable<ChainConfig['serializers']>['transaction']>
>[0];

export type SerializeTransactionParams = Partial<
  Pick<
    SerializeTransactionParam,
    'maxFeePerGas' | 'maxPriorityFeePerGas' | 'gasPerPubdata' | 'accessList' | 'factoryDeps'
  >
> &
  AllOrNone<{ paymaster: Address; paymasterInput: Hex }> & {
    network: Network;
    account: Address;
    tx: Tx;
    policy: Policy;
    approvals: Approval[];
  };

export async function serializeTransaction({
  network,
  account,
  tx,
  policy,
  approvals,
  ...params
}: SerializeTransactionParams) {
  return network.chain.serializers!.transaction!({
    type: 'eip712',
    from: account,
    ...encodeOperations(account, tx.operations),
    nonce: await network.getTransactionCount({ address: account }),
    maxFeePerGas: (await network.estimateFeesPerGas()).maxFeePerGas,
    maxPriorityFeePerGas: (await network.estimateFeesPerGas()).maxPriorityFeePerGas,
    gasPerPubdata: BigInt(zkUtils.DEFAULT_GAS_PER_PUBDATA_LIMIT),
    gas:
      tx.gas ??
      estimateTransactionTotalGas(
        await estimateTransactionOperationsGas({ network, account, tx }).unwrapOr(
          FALLBACK_OPERATIONS_GAS,
        ),
        approvals.length,
      ),
    chainId: network.chain.id,
    customSignature: encodeTransactionSignature(tx.nonce, policy, approvals),
    ...params,
  });
}

export type ExecuteTransactionParams = SerializeTransactionParams;

export async function executeTransaction(params: ExecuteTransactionParams) {
  return ResultAsync.fromPromise(
    (async () =>
      params.network.sendRawTransaction({
        serializedTransaction: await serializeTransaction(params),
      }))(),
    (e) => e as SendTransactionErrorType,
  );
}
