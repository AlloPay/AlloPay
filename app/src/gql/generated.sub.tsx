import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  BigDecimal: any;
  BigInt: any;
  Bytes: any;
};

export type Account = {
  __typename?: 'Account';
  /** {address} */
  id: Scalars['Bytes'];
  impl: AccountImpl;
  transfers: Array<Transfer>;
  txs: Array<Tx>;
};


export type AccountTransfersArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Transfer_Filter>;
};


export type AccountTxsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Tx_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Tx_Filter>;
};

export type AccountImpl = {
  __typename?: 'AccountImpl';
  blockHash: Scalars['Bytes'];
  /** {address} */
  id: Scalars['Bytes'];
  proxies: Array<Account>;
  timestamp: Scalars['BigInt'];
};


export type AccountImplProxiesArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Account_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Account_Filter>;
};

export type AccountImpl_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  blockHash?: InputMaybe<Scalars['Bytes']>;
  blockHash_contains?: InputMaybe<Scalars['Bytes']>;
  blockHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  blockHash_not?: InputMaybe<Scalars['Bytes']>;
  blockHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  blockHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['Bytes']>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  proxies_?: InputMaybe<Account_Filter>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum AccountImpl_OrderBy {
  BlockHash = 'blockHash',
  Id = 'id',
  Proxies = 'proxies',
  Timestamp = 'timestamp'
}

export type Account_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  id?: InputMaybe<Scalars['Bytes']>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  impl?: InputMaybe<Scalars['String']>;
  impl_?: InputMaybe<AccountImpl_Filter>;
  impl_contains?: InputMaybe<Scalars['String']>;
  impl_contains_nocase?: InputMaybe<Scalars['String']>;
  impl_ends_with?: InputMaybe<Scalars['String']>;
  impl_ends_with_nocase?: InputMaybe<Scalars['String']>;
  impl_gt?: InputMaybe<Scalars['String']>;
  impl_gte?: InputMaybe<Scalars['String']>;
  impl_in?: InputMaybe<Array<Scalars['String']>>;
  impl_lt?: InputMaybe<Scalars['String']>;
  impl_lte?: InputMaybe<Scalars['String']>;
  impl_not?: InputMaybe<Scalars['String']>;
  impl_not_contains?: InputMaybe<Scalars['String']>;
  impl_not_contains_nocase?: InputMaybe<Scalars['String']>;
  impl_not_ends_with?: InputMaybe<Scalars['String']>;
  impl_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  impl_not_in?: InputMaybe<Array<Scalars['String']>>;
  impl_not_starts_with?: InputMaybe<Scalars['String']>;
  impl_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  impl_starts_with?: InputMaybe<Scalars['String']>;
  impl_starts_with_nocase?: InputMaybe<Scalars['String']>;
  transfers_?: InputMaybe<Transfer_Filter>;
  txs_?: InputMaybe<Tx_Filter>;
};

export enum Account_OrderBy {
  Id = 'id',
  Impl = 'impl',
  Transfers = 'transfers',
  Txs = 'txs'
}

export type BlockChangedFilter = {
  number_gte: Scalars['Int'];
};

export type Block_Height = {
  hash?: InputMaybe<Scalars['Bytes']>;
  number?: InputMaybe<Scalars['Int']>;
  number_gte?: InputMaybe<Scalars['Int']>;
};

/** Defines the order direction, either ascending or descending */
export enum OrderDirection {
  Asc = 'asc',
  Desc = 'desc'
}

export type Query = {
  __typename?: 'Query';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  account?: Maybe<Account>;
  accountImpl?: Maybe<AccountImpl>;
  accountImpls: Array<AccountImpl>;
  accounts: Array<Account>;
  transfer?: Maybe<Transfer>;
  transfers: Array<Transfer>;
  tx?: Maybe<Tx>;
  txes: Array<Tx>;
  user?: Maybe<User>;
  userConfig?: Maybe<UserConfig>;
  userConfigs: Array<UserConfig>;
  users: Array<User>;
};


export type Query_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type QueryAccountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAccountImplArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryAccountImplsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AccountImpl_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AccountImpl_Filter>;
};


export type QueryAccountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Account_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Account_Filter>;
};


export type QueryTransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Transfer_Filter>;
};


export type QueryTxArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryTxesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Tx_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Tx_Filter>;
};


export type QueryUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryUserConfigArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type QueryUserConfigsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserConfig_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<UserConfig_Filter>;
};


export type QueryUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<User_Filter>;
};

export type Subscription = {
  __typename?: 'Subscription';
  /** Access to subgraph metadata */
  _meta?: Maybe<_Meta_>;
  account?: Maybe<Account>;
  accountImpl?: Maybe<AccountImpl>;
  accountImpls: Array<AccountImpl>;
  accounts: Array<Account>;
  transfer?: Maybe<Transfer>;
  transfers: Array<Transfer>;
  tx?: Maybe<Tx>;
  txes: Array<Tx>;
  user?: Maybe<User>;
  userConfig?: Maybe<UserConfig>;
  userConfigs: Array<UserConfig>;
  users: Array<User>;
};


export type Subscription_MetaArgs = {
  block?: InputMaybe<Block_Height>;
};


export type SubscriptionAccountArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAccountImplArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionAccountImplsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<AccountImpl_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<AccountImpl_Filter>;
};


export type SubscriptionAccountsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Account_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Account_Filter>;
};


export type SubscriptionTransferArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTransfersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Transfer_Filter>;
};


export type SubscriptionTxArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionTxesArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Tx_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<Tx_Filter>;
};


export type SubscriptionUserArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionUserConfigArgs = {
  block?: InputMaybe<Block_Height>;
  id: Scalars['ID'];
  subgraphError?: _SubgraphErrorPolicy_;
};


export type SubscriptionUserConfigsArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserConfig_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<UserConfig_Filter>;
};


export type SubscriptionUsersArgs = {
  block?: InputMaybe<Block_Height>;
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<User_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  subgraphError?: _SubgraphErrorPolicy_;
  where?: InputMaybe<User_Filter>;
};

export type Transfer = {
  __typename?: 'Transfer';
  account: Account;
  blockHash: Scalars['Bytes'];
  from: Scalars['Bytes'];
  /** {tx.id}-{tx.log.index} */
  id: Scalars['String'];
  timestamp: Scalars['BigInt'];
  to: Scalars['Bytes'];
  token: Scalars['Bytes'];
  transactionHash: Scalars['Bytes'];
  tx?: Maybe<Tx>;
  type: TransferType;
  value: Scalars['BigInt'];
};

export enum TransferType {
  In = 'IN',
  Out = 'OUT'
}

export type Transfer_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars['String']>;
  account_?: InputMaybe<Account_Filter>;
  account_contains?: InputMaybe<Scalars['String']>;
  account_contains_nocase?: InputMaybe<Scalars['String']>;
  account_ends_with?: InputMaybe<Scalars['String']>;
  account_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_gt?: InputMaybe<Scalars['String']>;
  account_gte?: InputMaybe<Scalars['String']>;
  account_in?: InputMaybe<Array<Scalars['String']>>;
  account_lt?: InputMaybe<Scalars['String']>;
  account_lte?: InputMaybe<Scalars['String']>;
  account_not?: InputMaybe<Scalars['String']>;
  account_not_contains?: InputMaybe<Scalars['String']>;
  account_not_contains_nocase?: InputMaybe<Scalars['String']>;
  account_not_ends_with?: InputMaybe<Scalars['String']>;
  account_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_not_in?: InputMaybe<Array<Scalars['String']>>;
  account_not_starts_with?: InputMaybe<Scalars['String']>;
  account_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  account_starts_with?: InputMaybe<Scalars['String']>;
  account_starts_with_nocase?: InputMaybe<Scalars['String']>;
  blockHash?: InputMaybe<Scalars['Bytes']>;
  blockHash_contains?: InputMaybe<Scalars['Bytes']>;
  blockHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  blockHash_not?: InputMaybe<Scalars['Bytes']>;
  blockHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  blockHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  from?: InputMaybe<Scalars['Bytes']>;
  from_contains?: InputMaybe<Scalars['Bytes']>;
  from_in?: InputMaybe<Array<Scalars['Bytes']>>;
  from_not?: InputMaybe<Scalars['Bytes']>;
  from_not_contains?: InputMaybe<Scalars['Bytes']>;
  from_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['String']>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_contains_nocase?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_not?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  to?: InputMaybe<Scalars['Bytes']>;
  to_contains?: InputMaybe<Scalars['Bytes']>;
  to_in?: InputMaybe<Array<Scalars['Bytes']>>;
  to_not?: InputMaybe<Scalars['Bytes']>;
  to_not_contains?: InputMaybe<Scalars['Bytes']>;
  to_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  token?: InputMaybe<Scalars['Bytes']>;
  token_contains?: InputMaybe<Scalars['Bytes']>;
  token_in?: InputMaybe<Array<Scalars['Bytes']>>;
  token_not?: InputMaybe<Scalars['Bytes']>;
  token_not_contains?: InputMaybe<Scalars['Bytes']>;
  token_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  tx?: InputMaybe<Scalars['String']>;
  tx_?: InputMaybe<Tx_Filter>;
  tx_contains?: InputMaybe<Scalars['String']>;
  tx_contains_nocase?: InputMaybe<Scalars['String']>;
  tx_ends_with?: InputMaybe<Scalars['String']>;
  tx_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tx_gt?: InputMaybe<Scalars['String']>;
  tx_gte?: InputMaybe<Scalars['String']>;
  tx_in?: InputMaybe<Array<Scalars['String']>>;
  tx_lt?: InputMaybe<Scalars['String']>;
  tx_lte?: InputMaybe<Scalars['String']>;
  tx_not?: InputMaybe<Scalars['String']>;
  tx_not_contains?: InputMaybe<Scalars['String']>;
  tx_not_contains_nocase?: InputMaybe<Scalars['String']>;
  tx_not_ends_with?: InputMaybe<Scalars['String']>;
  tx_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  tx_not_in?: InputMaybe<Array<Scalars['String']>>;
  tx_not_starts_with?: InputMaybe<Scalars['String']>;
  tx_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  tx_starts_with?: InputMaybe<Scalars['String']>;
  tx_starts_with_nocase?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<TransferType>;
  type_in?: InputMaybe<Array<TransferType>>;
  type_not?: InputMaybe<TransferType>;
  type_not_in?: InputMaybe<Array<TransferType>>;
  value?: InputMaybe<Scalars['BigInt']>;
  value_gt?: InputMaybe<Scalars['BigInt']>;
  value_gte?: InputMaybe<Scalars['BigInt']>;
  value_in?: InputMaybe<Array<Scalars['BigInt']>>;
  value_lt?: InputMaybe<Scalars['BigInt']>;
  value_lte?: InputMaybe<Scalars['BigInt']>;
  value_not?: InputMaybe<Scalars['BigInt']>;
  value_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
};

export enum Transfer_OrderBy {
  Account = 'account',
  BlockHash = 'blockHash',
  From = 'from',
  Id = 'id',
  Timestamp = 'timestamp',
  To = 'to',
  Token = 'token',
  TransactionHash = 'transactionHash',
  Tx = 'tx',
  Type = 'type',
  Value = 'value'
}

export type Tx = {
  __typename?: 'Tx';
  account: Account;
  blockHash: Scalars['Bytes'];
  executor: Scalars['Bytes'];
  hash: Scalars['Bytes'];
  /** {transaction.hash} */
  id: Scalars['Bytes'];
  response: Scalars['Bytes'];
  success: Scalars['Boolean'];
  timestamp: Scalars['BigInt'];
  transactionHash: Scalars['Bytes'];
  transfers: Array<Transfer>;
};


export type TxTransfersArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<Transfer_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<Transfer_Filter>;
};

export type Tx_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars['String']>;
  account_?: InputMaybe<Account_Filter>;
  account_contains?: InputMaybe<Scalars['String']>;
  account_contains_nocase?: InputMaybe<Scalars['String']>;
  account_ends_with?: InputMaybe<Scalars['String']>;
  account_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_gt?: InputMaybe<Scalars['String']>;
  account_gte?: InputMaybe<Scalars['String']>;
  account_in?: InputMaybe<Array<Scalars['String']>>;
  account_lt?: InputMaybe<Scalars['String']>;
  account_lte?: InputMaybe<Scalars['String']>;
  account_not?: InputMaybe<Scalars['String']>;
  account_not_contains?: InputMaybe<Scalars['String']>;
  account_not_contains_nocase?: InputMaybe<Scalars['String']>;
  account_not_ends_with?: InputMaybe<Scalars['String']>;
  account_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_not_in?: InputMaybe<Array<Scalars['String']>>;
  account_not_starts_with?: InputMaybe<Scalars['String']>;
  account_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  account_starts_with?: InputMaybe<Scalars['String']>;
  account_starts_with_nocase?: InputMaybe<Scalars['String']>;
  blockHash?: InputMaybe<Scalars['Bytes']>;
  blockHash_contains?: InputMaybe<Scalars['Bytes']>;
  blockHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  blockHash_not?: InputMaybe<Scalars['Bytes']>;
  blockHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  blockHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  executor?: InputMaybe<Scalars['Bytes']>;
  executor_contains?: InputMaybe<Scalars['Bytes']>;
  executor_in?: InputMaybe<Array<Scalars['Bytes']>>;
  executor_not?: InputMaybe<Scalars['Bytes']>;
  executor_not_contains?: InputMaybe<Scalars['Bytes']>;
  executor_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  hash?: InputMaybe<Scalars['Bytes']>;
  hash_contains?: InputMaybe<Scalars['Bytes']>;
  hash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  hash_not?: InputMaybe<Scalars['Bytes']>;
  hash_not_contains?: InputMaybe<Scalars['Bytes']>;
  hash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['Bytes']>;
  id_contains?: InputMaybe<Scalars['Bytes']>;
  id_in?: InputMaybe<Array<Scalars['Bytes']>>;
  id_not?: InputMaybe<Scalars['Bytes']>;
  id_not_contains?: InputMaybe<Scalars['Bytes']>;
  id_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  response?: InputMaybe<Scalars['Bytes']>;
  response_contains?: InputMaybe<Scalars['Bytes']>;
  response_in?: InputMaybe<Array<Scalars['Bytes']>>;
  response_not?: InputMaybe<Scalars['Bytes']>;
  response_not_contains?: InputMaybe<Scalars['Bytes']>;
  response_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  success?: InputMaybe<Scalars['Boolean']>;
  success_in?: InputMaybe<Array<Scalars['Boolean']>>;
  success_not?: InputMaybe<Scalars['Boolean']>;
  success_not_in?: InputMaybe<Array<Scalars['Boolean']>>;
  timestamp?: InputMaybe<Scalars['BigInt']>;
  timestamp_gt?: InputMaybe<Scalars['BigInt']>;
  timestamp_gte?: InputMaybe<Scalars['BigInt']>;
  timestamp_in?: InputMaybe<Array<Scalars['BigInt']>>;
  timestamp_lt?: InputMaybe<Scalars['BigInt']>;
  timestamp_lte?: InputMaybe<Scalars['BigInt']>;
  timestamp_not?: InputMaybe<Scalars['BigInt']>;
  timestamp_not_in?: InputMaybe<Array<Scalars['BigInt']>>;
  transactionHash?: InputMaybe<Scalars['Bytes']>;
  transactionHash_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transactionHash_not?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_contains?: InputMaybe<Scalars['Bytes']>;
  transactionHash_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  transfers_?: InputMaybe<Transfer_Filter>;
};

export enum Tx_OrderBy {
  Account = 'account',
  BlockHash = 'blockHash',
  Executor = 'executor',
  Hash = 'hash',
  Id = 'id',
  Response = 'response',
  Success = 'success',
  Timestamp = 'timestamp',
  TransactionHash = 'transactionHash',
  Transfers = 'transfers'
}

export type User = {
  __typename?: 'User';
  account: Account;
  addr: Scalars['Bytes'];
  allConfigs: Array<UserConfig>;
  configs: Array<UserConfig>;
  /** {account.id}-{addr} */
  id: Scalars['String'];
};


export type UserAllConfigsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserConfig_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserConfig_Filter>;
};


export type UserConfigsArgs = {
  first?: InputMaybe<Scalars['Int']>;
  orderBy?: InputMaybe<UserConfig_OrderBy>;
  orderDirection?: InputMaybe<OrderDirection>;
  skip?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<UserConfig_Filter>;
};

export type UserConfig = {
  __typename?: 'UserConfig';
  approvers: Array<Scalars['Bytes']>;
  /** {blockHash}-{logIndex} */
  id: Scalars['String'];
  user: User;
};

export type UserConfig_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  approvers?: InputMaybe<Array<Scalars['Bytes']>>;
  approvers_contains?: InputMaybe<Array<Scalars['Bytes']>>;
  approvers_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
  approvers_not?: InputMaybe<Array<Scalars['Bytes']>>;
  approvers_not_contains?: InputMaybe<Array<Scalars['Bytes']>>;
  approvers_not_contains_nocase?: InputMaybe<Array<Scalars['Bytes']>>;
  id?: InputMaybe<Scalars['String']>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_contains_nocase?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_not?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']>;
  user?: InputMaybe<Scalars['String']>;
  user_?: InputMaybe<User_Filter>;
  user_contains?: InputMaybe<Scalars['String']>;
  user_contains_nocase?: InputMaybe<Scalars['String']>;
  user_ends_with?: InputMaybe<Scalars['String']>;
  user_ends_with_nocase?: InputMaybe<Scalars['String']>;
  user_gt?: InputMaybe<Scalars['String']>;
  user_gte?: InputMaybe<Scalars['String']>;
  user_in?: InputMaybe<Array<Scalars['String']>>;
  user_lt?: InputMaybe<Scalars['String']>;
  user_lte?: InputMaybe<Scalars['String']>;
  user_not?: InputMaybe<Scalars['String']>;
  user_not_contains?: InputMaybe<Scalars['String']>;
  user_not_contains_nocase?: InputMaybe<Scalars['String']>;
  user_not_ends_with?: InputMaybe<Scalars['String']>;
  user_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  user_not_in?: InputMaybe<Array<Scalars['String']>>;
  user_not_starts_with?: InputMaybe<Scalars['String']>;
  user_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  user_starts_with?: InputMaybe<Scalars['String']>;
  user_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum UserConfig_OrderBy {
  Approvers = 'approvers',
  Id = 'id',
  User = 'user'
}

export type User_Filter = {
  /** Filter for the block changed event. */
  _change_block?: InputMaybe<BlockChangedFilter>;
  account?: InputMaybe<Scalars['String']>;
  account_?: InputMaybe<Account_Filter>;
  account_contains?: InputMaybe<Scalars['String']>;
  account_contains_nocase?: InputMaybe<Scalars['String']>;
  account_ends_with?: InputMaybe<Scalars['String']>;
  account_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_gt?: InputMaybe<Scalars['String']>;
  account_gte?: InputMaybe<Scalars['String']>;
  account_in?: InputMaybe<Array<Scalars['String']>>;
  account_lt?: InputMaybe<Scalars['String']>;
  account_lte?: InputMaybe<Scalars['String']>;
  account_not?: InputMaybe<Scalars['String']>;
  account_not_contains?: InputMaybe<Scalars['String']>;
  account_not_contains_nocase?: InputMaybe<Scalars['String']>;
  account_not_ends_with?: InputMaybe<Scalars['String']>;
  account_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  account_not_in?: InputMaybe<Array<Scalars['String']>>;
  account_not_starts_with?: InputMaybe<Scalars['String']>;
  account_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  account_starts_with?: InputMaybe<Scalars['String']>;
  account_starts_with_nocase?: InputMaybe<Scalars['String']>;
  addr?: InputMaybe<Scalars['Bytes']>;
  addr_contains?: InputMaybe<Scalars['Bytes']>;
  addr_in?: InputMaybe<Array<Scalars['Bytes']>>;
  addr_not?: InputMaybe<Scalars['Bytes']>;
  addr_not_contains?: InputMaybe<Scalars['Bytes']>;
  addr_not_in?: InputMaybe<Array<Scalars['Bytes']>>;
  allConfigs_?: InputMaybe<UserConfig_Filter>;
  configs?: InputMaybe<Array<Scalars['String']>>;
  configs_?: InputMaybe<UserConfig_Filter>;
  configs_contains?: InputMaybe<Array<Scalars['String']>>;
  configs_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  configs_not?: InputMaybe<Array<Scalars['String']>>;
  configs_not_contains?: InputMaybe<Array<Scalars['String']>>;
  configs_not_contains_nocase?: InputMaybe<Array<Scalars['String']>>;
  id?: InputMaybe<Scalars['String']>;
  id_contains?: InputMaybe<Scalars['String']>;
  id_contains_nocase?: InputMaybe<Scalars['String']>;
  id_ends_with?: InputMaybe<Scalars['String']>;
  id_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_gt?: InputMaybe<Scalars['String']>;
  id_gte?: InputMaybe<Scalars['String']>;
  id_in?: InputMaybe<Array<Scalars['String']>>;
  id_lt?: InputMaybe<Scalars['String']>;
  id_lte?: InputMaybe<Scalars['String']>;
  id_not?: InputMaybe<Scalars['String']>;
  id_not_contains?: InputMaybe<Scalars['String']>;
  id_not_contains_nocase?: InputMaybe<Scalars['String']>;
  id_not_ends_with?: InputMaybe<Scalars['String']>;
  id_not_ends_with_nocase?: InputMaybe<Scalars['String']>;
  id_not_in?: InputMaybe<Array<Scalars['String']>>;
  id_not_starts_with?: InputMaybe<Scalars['String']>;
  id_not_starts_with_nocase?: InputMaybe<Scalars['String']>;
  id_starts_with?: InputMaybe<Scalars['String']>;
  id_starts_with_nocase?: InputMaybe<Scalars['String']>;
};

export enum User_OrderBy {
  Account = 'account',
  Addr = 'addr',
  AllConfigs = 'allConfigs',
  Configs = 'configs',
  Id = 'id'
}

export type _Block_ = {
  __typename?: '_Block_';
  /** The hash of the block */
  hash?: Maybe<Scalars['Bytes']>;
  /** The block number */
  number: Scalars['Int'];
};

/** The type for the top-level _meta field */
export type _Meta_ = {
  __typename?: '_Meta_';
  /**
   * Information about a specific subgraph block. The hash of the block
   * will be null if the _meta field has a block constraint that asks for
   * a block number. It will be filled if the _meta field has no block constraint
   * and therefore asks for the latest  block
   *
   */
  block: _Block_;
  /** The deployment ID */
  deployment: Scalars['String'];
  /** If `true`, the subgraph encountered indexing errors at some past block */
  hasIndexingErrors: Scalars['Boolean'];
};

export enum _SubgraphErrorPolicy_ {
  /** Data will be returned even if the subgraph has indexing errors */
  Allow = 'allow',
  /** If the subgraph has indexing errors, data will be omitted. The default. */
  Deny = 'deny'
}

export type TransferQueryVariables = Exact<{
  id: Scalars['ID'];
}>;


export type TransferQuery = { __typename?: 'Query', transfer?: { __typename?: 'Transfer', id: string, type: TransferType, token: any, from: any, to: any, value: any } | null };

export type TransfersMetadataQueryVariables = Exact<{
  accounts: Array<Scalars['String']> | Scalars['String'];
  types: Array<TransferType> | TransferType;
}>;


export type TransfersMetadataQuery = { __typename?: 'Query', transfers: Array<{ __typename?: 'Transfer', id: string, timestamp: any }> };


export const TransferDocument = gql`
    query Transfer($id: ID!) {
  transfer(id: $id) {
    id
    type
    token
    from
    to
    value
  }
}
    `;

/**
 * __useTransferQuery__
 *
 * To run a query within a React component, call `useTransferQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransferQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransferQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useTransferQuery(baseOptions: Apollo.QueryHookOptions<TransferQuery, TransferQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TransferQuery, TransferQueryVariables>(TransferDocument, options);
      }
export function useTransferLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TransferQuery, TransferQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TransferQuery, TransferQueryVariables>(TransferDocument, options);
        }
export type TransferQueryHookResult = ReturnType<typeof useTransferQuery>;
export type TransferLazyQueryHookResult = ReturnType<typeof useTransferLazyQuery>;
export type TransferQueryResult = Apollo.QueryResult<TransferQuery, TransferQueryVariables>;
export const TransfersMetadataDocument = gql`
    query TransfersMetadata($accounts: [String!]!, $types: [TransferType!]!) {
  transfers(where: {account_in: $accounts, type_in: $types}) {
    id
    timestamp
  }
}
    `;

/**
 * __useTransfersMetadataQuery__
 *
 * To run a query within a React component, call `useTransfersMetadataQuery` and pass it any options that fit your needs.
 * When your component renders, `useTransfersMetadataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTransfersMetadataQuery({
 *   variables: {
 *      accounts: // value for 'accounts'
 *      types: // value for 'types'
 *   },
 * });
 */
export function useTransfersMetadataQuery(baseOptions: Apollo.QueryHookOptions<TransfersMetadataQuery, TransfersMetadataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<TransfersMetadataQuery, TransfersMetadataQueryVariables>(TransfersMetadataDocument, options);
      }
export function useTransfersMetadataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TransfersMetadataQuery, TransfersMetadataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<TransfersMetadataQuery, TransfersMetadataQueryVariables>(TransfersMetadataDocument, options);
        }
export type TransfersMetadataQueryHookResult = ReturnType<typeof useTransfersMetadataQuery>;
export type TransfersMetadataLazyQueryHookResult = ReturnType<typeof useTransfersMetadataLazyQuery>;
export type TransfersMetadataQueryResult = Apollo.QueryResult<TransfersMetadataQuery, TransfersMetadataQueryVariables>;