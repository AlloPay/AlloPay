// GENERATED by @edgedb/generate v0.5.3

import type {Executor} from "edgedb";

export type ActivatePolicyArgs = {
  readonly "account": string;
  readonly "key": number;
  readonly "hash"?: string | null;
  readonly "activationBlock": bigint;
};

export type ActivatePolicyReturns = {
  "old": string | null;
  "new": string | null;
  "pendingTransactions": Array<string>;
};

export function activatePolicy(client: Executor, args: ActivatePolicyArgs): Promise<ActivatePolicyReturns> {
  return client.queryRequiredSingle(`\
with account := (select Account filter .address = <UAddress>$account),
     key := <uint16>$key,
     new := assert_single((
       select PolicyState filter .account = account and .key = key and 
         ([is Policy].hash ?= <optional Bytes32>$hash or PolicyState is RemovedPolicy) and
         (not exists .activationBlock or .activationBlock ?= 0)
     )),
     old := assert_single((select PolicyState filter .account = account and key = .key and .isLatest and .id != new.id)),
     activationBlock := <bigint>$activationBlock,
     isLater := (activationBlock > (old.activationBlock ?? -1n)),
     updatedOldLatest := (update old filter isLater set { isLatest := false })
select {
  old := old.id,
  new := (
    update new set {
      activationBlock := activationBlock,
      isLatest := isLater
    }
  ).id,
  pendingTransactions := (
    (select Transaction filter (.policy ?= old or .policy ?= new) and .status = TransactionStatus.Pending).id
    if (new is Policy) else <uuid>{}
  )
};`, args);

}
