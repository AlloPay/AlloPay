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
  /** Ethereum address */
  Address: any;
  /** integer */
  BigNumber: any;
  /** bytes hex string */
  Bytes: any;
  /** 8-byte hex string */
  Bytes8: any;
  /** 32-byte hex string */
  Bytes32: any;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
  /** An arbitrary-precision Decimal type */
  Decimal: any;
  /** Identifier */
  Id: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** Quorum key: a 32-bit unsigned integer */
  QuorumKey: any;
  /** 256-bit unsigned integer */
  Uint256: any;
};

export type Account = {
  __typename?: 'Account';
  _count: AccountCount;
  comments?: Maybe<Array<Comment>>;
  deploySalt: Scalars['String'];
  id: Scalars['ID'];
  impl: Scalars['String'];
  isActive: Scalars['Boolean'];
  name: Scalars['String'];
  proposals?: Maybe<Array<Proposal>>;
  quorumStates?: Maybe<Array<QuorumState>>;
  quorums?: Maybe<Array<Quorum>>;
  reactions?: Maybe<Array<Reaction>>;
};

export type AccountCount = {
  __typename?: 'AccountCount';
  comments: Scalars['Int'];
  proposals: Scalars['Int'];
  quorumStates: Scalars['Int'];
  quorums: Scalars['Int'];
  reactions: Scalars['Int'];
};

export type AccountOrderByWithRelationInput = {
  comments?: InputMaybe<CommentOrderByRelationAggregateInput>;
  deploySalt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  impl?: InputMaybe<SortOrder>;
  isActive?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  proposals?: InputMaybe<ProposalOrderByRelationAggregateInput>;
  quorumStates?: InputMaybe<QuorumStateOrderByRelationAggregateInput>;
  quorums?: InputMaybe<QuorumOrderByRelationAggregateInput>;
  reactions?: InputMaybe<ReactionOrderByRelationAggregateInput>;
};

export type AccountRelationFilter = {
  is?: InputMaybe<AccountWhereInput>;
  isNot?: InputMaybe<AccountWhereInput>;
};

export type AccountScalarFieldEnum =
  | 'deploySalt'
  | 'id'
  | 'impl'
  | 'isActive'
  | 'name';

export type AccountWhereInput = {
  AND?: InputMaybe<Array<AccountWhereInput>>;
  NOT?: InputMaybe<Array<AccountWhereInput>>;
  OR?: InputMaybe<Array<AccountWhereInput>>;
  comments?: InputMaybe<CommentListRelationFilter>;
  deploySalt?: InputMaybe<StringFilter>;
  id?: InputMaybe<StringFilter>;
  impl?: InputMaybe<StringFilter>;
  isActive?: InputMaybe<BoolFilter>;
  name?: InputMaybe<StringFilter>;
  proposals?: InputMaybe<ProposalListRelationFilter>;
  quorumStates?: InputMaybe<QuorumStateListRelationFilter>;
  quorums?: InputMaybe<QuorumListRelationFilter>;
  reactions?: InputMaybe<ReactionListRelationFilter>;
};

export type AccountWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type Approval = {
  __typename?: 'Approval';
  createdAt: Scalars['DateTime'];
  proposal: Proposal;
  proposalId: Scalars['String'];
  signature?: Maybe<Scalars['String']>;
  user: User;
  userId: Scalars['String'];
};

export type ApprovalListRelationFilter = {
  every?: InputMaybe<ApprovalWhereInput>;
  none?: InputMaybe<ApprovalWhereInput>;
  some?: InputMaybe<ApprovalWhereInput>;
};

export type ApprovalOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ApprovalWhereInput = {
  AND?: InputMaybe<Array<ApprovalWhereInput>>;
  NOT?: InputMaybe<Array<ApprovalWhereInput>>;
  OR?: InputMaybe<Array<ApprovalWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  proposal?: InputMaybe<ProposalRelationFilter>;
  proposalId?: InputMaybe<StringFilter>;
  signature?: InputMaybe<StringNullableFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type Approver = {
  __typename?: 'Approver';
  id: Scalars['ID'];
  name: Scalars['String'];
  quorumState: QuorumState;
  quorumStateId: Scalars['Int'];
  user: User;
  userId: Scalars['String'];
};

export type ApproverListRelationFilter = {
  every?: InputMaybe<ApproverWhereInput>;
  none?: InputMaybe<ApproverWhereInput>;
  some?: InputMaybe<ApproverWhereInput>;
};

export type ApproverOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ApproverWhereInput = {
  AND?: InputMaybe<Array<ApproverWhereInput>>;
  NOT?: InputMaybe<Array<ApproverWhereInput>>;
  OR?: InputMaybe<Array<ApproverWhereInput>>;
  quorumState?: InputMaybe<QuorumStateRelationFilter>;
  quorumStateId?: InputMaybe<IntFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type BoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type Comment = {
  __typename?: 'Comment';
  _count: CommentCount;
  account: Account;
  accountId: Scalars['String'];
  author: User;
  authorId: Scalars['String'];
  content: Scalars['String'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  key: Scalars['String'];
  reactions?: Maybe<Array<Reaction>>;
  updatedAt: Scalars['DateTime'];
};

export type CommentCount = {
  __typename?: 'CommentCount';
  reactions: Scalars['Int'];
};

export type CommentListRelationFilter = {
  every?: InputMaybe<CommentWhereInput>;
  none?: InputMaybe<CommentWhereInput>;
  some?: InputMaybe<CommentWhereInput>;
};

export type CommentOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type CommentRelationFilter = {
  is?: InputMaybe<CommentWhereInput>;
  isNot?: InputMaybe<CommentWhereInput>;
};

export type CommentWhereInput = {
  AND?: InputMaybe<Array<CommentWhereInput>>;
  NOT?: InputMaybe<Array<CommentWhereInput>>;
  OR?: InputMaybe<Array<CommentWhereInput>>;
  account?: InputMaybe<AccountRelationFilter>;
  accountId?: InputMaybe<StringFilter>;
  author?: InputMaybe<UserRelationFilter>;
  authorId?: InputMaybe<StringFilter>;
  content?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IntFilter>;
  key?: InputMaybe<StringFilter>;
  reactions?: InputMaybe<ReactionListRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type Contact = {
  __typename?: 'Contact';
  addr: Scalars['String'];
  name: Scalars['String'];
  user: User;
  userId: Scalars['String'];
};

export type ContactListRelationFilter = {
  every?: InputMaybe<ContactWhereInput>;
  none?: InputMaybe<ContactWhereInput>;
  some?: InputMaybe<ContactWhereInput>;
};

export type ContactName_IdentifierCompoundUniqueInput = {
  name: Scalars['String'];
  userId: Scalars['String'];
};

export type ContactObject = {
  __typename?: 'ContactObject';
  addr: Scalars['Address'];
  id: Scalars['String'];
  name: Scalars['String'];
};

export type ContactOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ContactOrderByWithRelationInput = {
  addr?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  user?: InputMaybe<UserOrderByWithRelationInput>;
  userId?: InputMaybe<SortOrder>;
};

export type ContactScalarFieldEnum =
  | 'addr'
  | 'name'
  | 'userId';

export type ContactUserIdAddrCompoundUniqueInput = {
  addr: Scalars['String'];
  userId: Scalars['String'];
};

export type ContactWhereInput = {
  AND?: InputMaybe<Array<ContactWhereInput>>;
  NOT?: InputMaybe<Array<ContactWhereInput>>;
  OR?: InputMaybe<Array<ContactWhereInput>>;
  addr?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type ContactWhereUniqueInput = {
  name_identifier?: InputMaybe<ContactName_IdentifierCompoundUniqueInput>;
  userId_addr?: InputMaybe<ContactUserIdAddrCompoundUniqueInput>;
};

export type ContractMethod = {
  __typename?: 'ContractMethod';
  contract: Scalars['String'];
  fragment: Scalars['JSON'];
  id: Scalars['String'];
  sighash: Scalars['String'];
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type DecimalFilter = {
  equals?: InputMaybe<Scalars['Decimal']>;
  gt?: InputMaybe<Scalars['Decimal']>;
  gte?: InputMaybe<Scalars['Decimal']>;
  in?: InputMaybe<Array<Scalars['Decimal']>>;
  lt?: InputMaybe<Scalars['Decimal']>;
  lte?: InputMaybe<Scalars['Decimal']>;
  not?: InputMaybe<NestedDecimalFilter>;
  notIn?: InputMaybe<Array<Scalars['Decimal']>>;
};

export type DecimalNullableFilter = {
  equals?: InputMaybe<Scalars['Decimal']>;
  gt?: InputMaybe<Scalars['Decimal']>;
  gte?: InputMaybe<Scalars['Decimal']>;
  in?: InputMaybe<Array<Scalars['Decimal']>>;
  lt?: InputMaybe<Scalars['Decimal']>;
  lte?: InputMaybe<Scalars['Decimal']>;
  not?: InputMaybe<NestedDecimalNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Decimal']>>;
};

export type EnumLimitPeriodFilter = {
  equals?: InputMaybe<LimitPeriod>;
  in?: InputMaybe<Array<LimitPeriod>>;
  not?: InputMaybe<NestedEnumLimitPeriodFilter>;
  notIn?: InputMaybe<Array<LimitPeriod>>;
};

export type EnumSpendingFallbackFilter = {
  equals?: InputMaybe<SpendingFallback>;
  in?: InputMaybe<Array<SpendingFallback>>;
  not?: InputMaybe<NestedEnumSpendingFallbackFilter>;
  notIn?: InputMaybe<Array<SpendingFallback>>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type LimitPeriod =
  | 'Day'
  | 'Month'
  | 'Week';

export type Mutation = {
  __typename?: 'Mutation';
  activateAccount: Scalars['Boolean'];
  approve: Proposal;
  createAccount: Account;
  createComment: Comment;
  createQuorum: Quorum;
  deleteComment: Comment;
  deleteContact: Scalars['Boolean'];
  propose: Proposal;
  reactToComment?: Maybe<Reaction>;
  reject: Proposal;
  removeQuorum: Quorum;
  requestApproval: Scalars['Boolean'];
  requestTokens: Array<Scalars['Address']>;
  updateAccountMetadata: Account;
  updateQuorum: Quorum;
  updateQuorumMetadata: Quorum;
  updateUser: User;
  upsertContact: ContactObject;
};


export type MutationActivateAccountArgs = {
  id: Scalars['Address'];
};


export type MutationApproveArgs = {
  id: Scalars['Bytes32'];
  signature: Scalars['Bytes'];
};


export type MutationCreateAccountArgs = {
  name: Scalars['String'];
  quorums: Array<QuorumInput>;
};


export type MutationCreateCommentArgs = {
  account: Scalars['Address'];
  content: Scalars['String'];
  key: Scalars['Id'];
};


export type MutationCreateQuorumArgs = {
  account: Scalars['Address'];
  approvers: Array<Scalars['Address']>;
  name?: InputMaybe<Scalars['String']>;
  proposingQuorumKey: Scalars['QuorumKey'];
  spending?: InputMaybe<SpendingInput>;
};


export type MutationDeleteCommentArgs = {
  id: Scalars['Float'];
};


export type MutationDeleteContactArgs = {
  addr: Scalars['Address'];
};


export type MutationProposeArgs = {
  account: Scalars['Address'];
  data?: InputMaybe<Scalars['Bytes']>;
  gasLimit?: InputMaybe<Scalars['Uint256']>;
  quorumKey?: InputMaybe<Scalars['QuorumKey']>;
  salt?: InputMaybe<Scalars['Bytes8']>;
  to: Scalars['Address'];
  value?: InputMaybe<Scalars['Uint256']>;
};


export type MutationReactToCommentArgs = {
  emojis: Array<Scalars['String']>;
  id: Scalars['Float'];
};


export type MutationRejectArgs = {
  id: Scalars['Bytes32'];
};


export type MutationRemoveQuorumArgs = {
  account: Scalars['Address'];
  key: Scalars['QuorumKey'];
  proposingQuorumKey?: InputMaybe<Scalars['QuorumKey']>;
};


export type MutationRequestApprovalArgs = {
  approvers: Array<Scalars['Address']>;
  id: Scalars['Bytes32'];
};


export type MutationRequestTokensArgs = {
  recipient: Scalars['Address'];
};


export type MutationUpdateAccountMetadataArgs = {
  id: Scalars['Address'];
  name: Scalars['String'];
};


export type MutationUpdateQuorumArgs = {
  account: Scalars['Address'];
  approvers: Array<Scalars['Address']>;
  key: Scalars['QuorumKey'];
  proposingQuorumKey?: InputMaybe<Scalars['QuorumKey']>;
  spending?: InputMaybe<SpendingInput>;
};


export type MutationUpdateQuorumMetadataArgs = {
  account: Scalars['Address'];
  key: Scalars['QuorumKey'];
  name: Scalars['String'];
};


export type MutationUpdateUserArgs = {
  name?: InputMaybe<Scalars['String']>;
  pushToken?: InputMaybe<Scalars['String']>;
};


export type MutationUpsertContactArgs = {
  name: Scalars['String'];
  newAddr: Scalars['Address'];
  prevAddr?: InputMaybe<Scalars['Address']>;
};

export type NestedBoolFilter = {
  equals?: InputMaybe<Scalars['Boolean']>;
  not?: InputMaybe<NestedBoolFilter>;
};

export type NestedDateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type NestedDecimalFilter = {
  equals?: InputMaybe<Scalars['Decimal']>;
  gt?: InputMaybe<Scalars['Decimal']>;
  gte?: InputMaybe<Scalars['Decimal']>;
  in?: InputMaybe<Array<Scalars['Decimal']>>;
  lt?: InputMaybe<Scalars['Decimal']>;
  lte?: InputMaybe<Scalars['Decimal']>;
  not?: InputMaybe<NestedDecimalFilter>;
  notIn?: InputMaybe<Array<Scalars['Decimal']>>;
};

export type NestedDecimalNullableFilter = {
  equals?: InputMaybe<Scalars['Decimal']>;
  gt?: InputMaybe<Scalars['Decimal']>;
  gte?: InputMaybe<Scalars['Decimal']>;
  in?: InputMaybe<Array<Scalars['Decimal']>>;
  lt?: InputMaybe<Scalars['Decimal']>;
  lte?: InputMaybe<Scalars['Decimal']>;
  not?: InputMaybe<NestedDecimalNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['Decimal']>>;
};

export type NestedEnumLimitPeriodFilter = {
  equals?: InputMaybe<LimitPeriod>;
  in?: InputMaybe<Array<LimitPeriod>>;
  not?: InputMaybe<NestedEnumLimitPeriodFilter>;
  notIn?: InputMaybe<Array<LimitPeriod>>;
};

export type NestedEnumSpendingFallbackFilter = {
  equals?: InputMaybe<SpendingFallback>;
  in?: InputMaybe<Array<SpendingFallback>>;
  not?: InputMaybe<NestedEnumSpendingFallbackFilter>;
  notIn?: InputMaybe<Array<SpendingFallback>>;
};

export type NestedIntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type Proposal = {
  __typename?: 'Proposal';
  _count: ProposalCount;
  account: Account;
  accountId: Scalars['String'];
  approvals?: Maybe<Array<Approval>>;
  createdAt: Scalars['DateTime'];
  data?: Maybe<Scalars['String']>;
  gasLimit?: Maybe<Scalars['Decimal']>;
  id: Scalars['ID'];
  proposer: User;
  proposerId: Scalars['String'];
  quorum: Quorum;
  quorumKey: Scalars['Int'];
  quorumStates?: Maybe<Array<QuorumState>>;
  salt: Scalars['String'];
  to: Scalars['String'];
  transaction?: Maybe<Transaction>;
  transactions?: Maybe<Array<Transaction>>;
  value?: Maybe<Scalars['String']>;
};

export type ProposalCount = {
  __typename?: 'ProposalCount';
  approvals: Scalars['Int'];
  quorumStates: Scalars['Int'];
  transactions: Scalars['Int'];
};

export type ProposalListRelationFilter = {
  every?: InputMaybe<ProposalWhereInput>;
  none?: InputMaybe<ProposalWhereInput>;
  some?: InputMaybe<ProposalWhereInput>;
};

export type ProposalOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ProposalOrderByWithRelationInput = {
  account?: InputMaybe<AccountOrderByWithRelationInput>;
  accountId?: InputMaybe<SortOrder>;
  approvals?: InputMaybe<ApprovalOrderByRelationAggregateInput>;
  createdAt?: InputMaybe<SortOrder>;
  data?: InputMaybe<SortOrder>;
  gasLimit?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  proposer?: InputMaybe<UserOrderByWithRelationInput>;
  proposerId?: InputMaybe<SortOrder>;
  quorum?: InputMaybe<QuorumOrderByWithRelationInput>;
  quorumKey?: InputMaybe<SortOrder>;
  quorumStates?: InputMaybe<QuorumStateOrderByRelationAggregateInput>;
  salt?: InputMaybe<SortOrder>;
  to?: InputMaybe<SortOrder>;
  transactions?: InputMaybe<TransactionOrderByRelationAggregateInput>;
  value?: InputMaybe<SortOrder>;
};

export type ProposalRelationFilter = {
  is?: InputMaybe<ProposalWhereInput>;
  isNot?: InputMaybe<ProposalWhereInput>;
};

export type ProposalScalarFieldEnum =
  | 'accountId'
  | 'createdAt'
  | 'data'
  | 'gasLimit'
  | 'id'
  | 'proposerId'
  | 'quorumKey'
  | 'salt'
  | 'to'
  | 'value';

export type ProposalState =
  | 'Executed'
  | 'Executing'
  | 'Pending';

export type ProposalWhereInput = {
  AND?: InputMaybe<Array<ProposalWhereInput>>;
  NOT?: InputMaybe<Array<ProposalWhereInput>>;
  OR?: InputMaybe<Array<ProposalWhereInput>>;
  account?: InputMaybe<AccountRelationFilter>;
  accountId?: InputMaybe<StringFilter>;
  approvals?: InputMaybe<ApprovalListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  data?: InputMaybe<StringNullableFilter>;
  gasLimit?: InputMaybe<DecimalNullableFilter>;
  id?: InputMaybe<StringFilter>;
  proposer?: InputMaybe<UserRelationFilter>;
  proposerId?: InputMaybe<StringFilter>;
  quorum?: InputMaybe<QuorumRelationFilter>;
  quorumKey?: InputMaybe<IntFilter>;
  quorumStates?: InputMaybe<QuorumStateListRelationFilter>;
  salt?: InputMaybe<StringFilter>;
  to?: InputMaybe<StringFilter>;
  transactions?: InputMaybe<TransactionListRelationFilter>;
  value?: InputMaybe<StringNullableFilter>;
};

export type ProposalWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  account?: Maybe<Account>;
  accounts: Array<Account>;
  comments: Array<Comment>;
  contact?: Maybe<ContactObject>;
  contacts: Array<ContactObject>;
  contractMethod?: Maybe<ContractMethod>;
  proposal?: Maybe<Proposal>;
  proposals: Array<Proposal>;
  quorum?: Maybe<Quorum>;
  quorums: Array<Quorum>;
  requestableTokens: Array<Scalars['Address']>;
  user?: Maybe<User>;
};


export type QueryAccountArgs = {
  id: Scalars['Address'];
};


export type QueryAccountsArgs = {
  cursor?: InputMaybe<AccountWhereUniqueInput>;
  distinct?: InputMaybe<Array<AccountScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<AccountOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<AccountWhereInput>;
};


export type QueryCommentsArgs = {
  account: Scalars['Address'];
  key: Scalars['Id'];
};


export type QueryContactArgs = {
  addr: Scalars['Address'];
};


export type QueryContactsArgs = {
  cursor?: InputMaybe<ContactWhereUniqueInput>;
  distinct?: InputMaybe<Array<ContactScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ContactOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
};


export type QueryContractMethodArgs = {
  contract: Scalars['Address'];
  sighash: Scalars['Bytes'];
};


export type QueryProposalArgs = {
  id: Scalars['Bytes32'];
};


export type QueryProposalsArgs = {
  accounts?: InputMaybe<Array<Scalars['Address']>>;
  cursor?: InputMaybe<ProposalWhereUniqueInput>;
  distinct?: InputMaybe<Array<ProposalScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<ProposalOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  state?: InputMaybe<Array<ProposalState>>;
  take?: InputMaybe<Scalars['Int']>;
  userHasApproved?: InputMaybe<Scalars['Boolean']>;
  where?: InputMaybe<ProposalWhereInput>;
};


export type QueryQuorumArgs = {
  account: Scalars['Address'];
  key: Scalars['QuorumKey'];
};


export type QueryQuorumsArgs = {
  cursor?: InputMaybe<QuorumWhereUniqueInput>;
  distinct?: InputMaybe<Array<QuorumScalarFieldEnum>>;
  orderBy?: InputMaybe<Array<QuorumOrderByWithRelationInput>>;
  skip?: InputMaybe<Scalars['Int']>;
  take?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<QuorumWhereInput>;
};


export type QueryRequestableTokensArgs = {
  recipient: Scalars['Address'];
};


export type QueryUserArgs = {
  id?: InputMaybe<Scalars['Address']>;
};

export type QueryMode =
  | 'default'
  | 'insensitive';

export type Quorum = {
  __typename?: 'Quorum';
  _count: QuorumCount;
  account: Account;
  accountId: Scalars['String'];
  activeState?: Maybe<QuorumState>;
  id: Scalars['ID'];
  key: Scalars['Int'];
  name: Scalars['String'];
  proposals?: Maybe<Array<Proposal>>;
  proposedStates: Array<QuorumState>;
  states?: Maybe<Array<QuorumState>>;
};

export type QuorumAccountIdKeyCompoundUniqueInput = {
  accountId: Scalars['String'];
  key: Scalars['Int'];
};

export type QuorumCount = {
  __typename?: 'QuorumCount';
  proposals: Scalars['Int'];
  states: Scalars['Int'];
};

export type QuorumInput = {
  approvers: Array<Scalars['Address']>;
  name: Scalars['String'];
  spending?: InputMaybe<SpendingInput>;
};

export type QuorumListRelationFilter = {
  every?: InputMaybe<QuorumWhereInput>;
  none?: InputMaybe<QuorumWhereInput>;
  some?: InputMaybe<QuorumWhereInput>;
};

export type QuorumOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type QuorumOrderByWithRelationInput = {
  account?: InputMaybe<AccountOrderByWithRelationInput>;
  accountId?: InputMaybe<SortOrder>;
  key?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  proposals?: InputMaybe<ProposalOrderByRelationAggregateInput>;
  states?: InputMaybe<QuorumStateOrderByRelationAggregateInput>;
};

export type QuorumRelationFilter = {
  is?: InputMaybe<QuorumWhereInput>;
  isNot?: InputMaybe<QuorumWhereInput>;
};

export type QuorumScalarFieldEnum =
  | 'accountId'
  | 'key'
  | 'name';

export type QuorumState = {
  __typename?: 'QuorumState';
  _count: QuorumStateCount;
  account: Account;
  accountId: Scalars['String'];
  approvers?: Maybe<Array<Approver>>;
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  isActiveWithoutProposal: Scalars['Boolean'];
  isRemoved: Scalars['Boolean'];
  limits?: Maybe<Array<TokenLimit>>;
  proposal?: Maybe<Proposal>;
  proposalId?: Maybe<Scalars['String']>;
  quorum: Quorum;
  quorumKey: Scalars['Int'];
  spendingFallback: SpendingFallback;
};

export type QuorumStateCount = {
  __typename?: 'QuorumStateCount';
  approvers: Scalars['Int'];
  limits: Scalars['Int'];
};

export type QuorumStateListRelationFilter = {
  every?: InputMaybe<QuorumStateWhereInput>;
  none?: InputMaybe<QuorumStateWhereInput>;
  some?: InputMaybe<QuorumStateWhereInput>;
};

export type QuorumStateOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type QuorumStateRelationFilter = {
  is?: InputMaybe<QuorumStateWhereInput>;
  isNot?: InputMaybe<QuorumStateWhereInput>;
};

export type QuorumStateWhereInput = {
  AND?: InputMaybe<Array<QuorumStateWhereInput>>;
  NOT?: InputMaybe<Array<QuorumStateWhereInput>>;
  OR?: InputMaybe<Array<QuorumStateWhereInput>>;
  account?: InputMaybe<AccountRelationFilter>;
  accountId?: InputMaybe<StringFilter>;
  approvers?: InputMaybe<ApproverListRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IntFilter>;
  isActiveWithoutProposal?: InputMaybe<BoolFilter>;
  isRemoved?: InputMaybe<BoolFilter>;
  limits?: InputMaybe<TokenLimitListRelationFilter>;
  proposal?: InputMaybe<ProposalRelationFilter>;
  proposalId?: InputMaybe<StringNullableFilter>;
  quorum?: InputMaybe<QuorumRelationFilter>;
  quorumKey?: InputMaybe<IntFilter>;
  spendingFallback?: InputMaybe<EnumSpendingFallbackFilter>;
};

export type QuorumWhereInput = {
  AND?: InputMaybe<Array<QuorumWhereInput>>;
  NOT?: InputMaybe<Array<QuorumWhereInput>>;
  OR?: InputMaybe<Array<QuorumWhereInput>>;
  account?: InputMaybe<AccountRelationFilter>;
  accountId?: InputMaybe<StringFilter>;
  key?: InputMaybe<IntFilter>;
  name?: InputMaybe<StringFilter>;
  proposals?: InputMaybe<ProposalListRelationFilter>;
  states?: InputMaybe<QuorumStateListRelationFilter>;
};

export type QuorumWhereUniqueInput = {
  accountId_key?: InputMaybe<QuorumAccountIdKeyCompoundUniqueInput>;
};

export type Reaction = {
  __typename?: 'Reaction';
  account?: Maybe<Account>;
  accountId?: Maybe<Scalars['String']>;
  comment: Comment;
  commentId: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  emojis?: Maybe<Array<Scalars['String']>>;
  id: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  user: User;
  userId: Scalars['String'];
};

export type ReactionListRelationFilter = {
  every?: InputMaybe<ReactionWhereInput>;
  none?: InputMaybe<ReactionWhereInput>;
  some?: InputMaybe<ReactionWhereInput>;
};

export type ReactionOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type ReactionWhereInput = {
  AND?: InputMaybe<Array<ReactionWhereInput>>;
  NOT?: InputMaybe<Array<ReactionWhereInput>>;
  OR?: InputMaybe<Array<ReactionWhereInput>>;
  account?: InputMaybe<AccountRelationFilter>;
  accountId?: InputMaybe<StringNullableFilter>;
  comment?: InputMaybe<CommentRelationFilter>;
  commentId?: InputMaybe<IntFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  emojis?: InputMaybe<StringNullableListFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserRelationFilter>;
  userId?: InputMaybe<StringFilter>;
};

export type SortOrder =
  | 'asc'
  | 'desc';

export type SpendingFallback =
  | 'allow'
  | 'deny';

export type SpendingInput = {
  fallback?: InputMaybe<SpendingFallback>;
  limits?: InputMaybe<Array<TokenLimitInput>>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StringNullableListFilter = {
  equals?: InputMaybe<Array<Scalars['String']>>;
  has?: InputMaybe<Scalars['String']>;
  hasEvery?: InputMaybe<Array<Scalars['String']>>;
  hasSome?: InputMaybe<Array<Scalars['String']>>;
  isEmpty?: InputMaybe<Scalars['Boolean']>;
};

export type Subscription = {
  __typename?: 'Subscription';
  proposal: Proposal;
};


export type SubscriptionProposalArgs = {
  accounts?: InputMaybe<Array<Scalars['Address']>>;
  created?: InputMaybe<Scalars['Boolean']>;
  ids?: InputMaybe<Array<Scalars['Bytes32']>>;
};

export type TokenLimit = {
  __typename?: 'TokenLimit';
  amount: Scalars['String'];
  period: LimitPeriod;
  quorumState: QuorumState;
  quorumStateId: Scalars['Int'];
  token: Scalars['String'];
};

export type TokenLimitInput = {
  amount: Scalars['BigNumber'];
  period: TokenLimitPeriod;
  token: Scalars['Address'];
};

export type TokenLimitListRelationFilter = {
  every?: InputMaybe<TokenLimitWhereInput>;
  none?: InputMaybe<TokenLimitWhereInput>;
  some?: InputMaybe<TokenLimitWhereInput>;
};

export type TokenLimitPeriod =
  | 'Day'
  | 'Month'
  | 'Week';

export type TokenLimitWhereInput = {
  AND?: InputMaybe<Array<TokenLimitWhereInput>>;
  NOT?: InputMaybe<Array<TokenLimitWhereInput>>;
  OR?: InputMaybe<Array<TokenLimitWhereInput>>;
  amount?: InputMaybe<StringFilter>;
  period?: InputMaybe<EnumLimitPeriodFilter>;
  quorumState?: InputMaybe<QuorumStateRelationFilter>;
  quorumStateId?: InputMaybe<IntFilter>;
  token?: InputMaybe<StringFilter>;
};

export type Transaction = {
  __typename?: 'Transaction';
  createdAt: Scalars['DateTime'];
  gasLimit: Scalars['Decimal'];
  gasPrice?: Maybe<Scalars['Decimal']>;
  hash: Scalars['ID'];
  id: Scalars['ID'];
  nonce: Scalars['Int'];
  proposal: Proposal;
  proposalId: Scalars['String'];
  response?: Maybe<TransactionResponse>;
};

export type TransactionListRelationFilter = {
  every?: InputMaybe<TransactionWhereInput>;
  none?: InputMaybe<TransactionWhereInput>;
  some?: InputMaybe<TransactionWhereInput>;
};

export type TransactionOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type TransactionRelationFilter = {
  is?: InputMaybe<TransactionWhereInput>;
  isNot?: InputMaybe<TransactionWhereInput>;
};

export type TransactionResponse = {
  __typename?: 'TransactionResponse';
  response: Scalars['String'];
  success: Scalars['Boolean'];
  timestamp: Scalars['DateTime'];
  transaction: Transaction;
  transactionHash: Scalars['ID'];
};

export type TransactionResponseRelationFilter = {
  is?: InputMaybe<TransactionResponseWhereInput>;
  isNot?: InputMaybe<TransactionResponseWhereInput>;
};

export type TransactionResponseWhereInput = {
  AND?: InputMaybe<Array<TransactionResponseWhereInput>>;
  NOT?: InputMaybe<Array<TransactionResponseWhereInput>>;
  OR?: InputMaybe<Array<TransactionResponseWhereInput>>;
  response?: InputMaybe<StringFilter>;
  success?: InputMaybe<BoolFilter>;
  timestamp?: InputMaybe<DateTimeFilter>;
  transaction?: InputMaybe<TransactionRelationFilter>;
  transactionHash?: InputMaybe<StringFilter>;
};

export type TransactionWhereInput = {
  AND?: InputMaybe<Array<TransactionWhereInput>>;
  NOT?: InputMaybe<Array<TransactionWhereInput>>;
  OR?: InputMaybe<Array<TransactionWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  gasLimit?: InputMaybe<DecimalFilter>;
  gasPrice?: InputMaybe<DecimalNullableFilter>;
  hash?: InputMaybe<StringFilter>;
  nonce?: InputMaybe<IntFilter>;
  proposal?: InputMaybe<ProposalRelationFilter>;
  proposalId?: InputMaybe<StringFilter>;
  response?: InputMaybe<TransactionResponseRelationFilter>;
};

export type User = {
  __typename?: 'User';
  _count: UserCount;
  approvals?: Maybe<Array<Approval>>;
  approvers?: Maybe<Array<Approver>>;
  comments?: Maybe<Array<Comment>>;
  contacts?: Maybe<Array<Contact>>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  proposals?: Maybe<Array<Proposal>>;
  pushToken?: Maybe<Scalars['String']>;
  reactions?: Maybe<Array<Reaction>>;
};

export type UserCount = {
  __typename?: 'UserCount';
  approvals: Scalars['Int'];
  approvers: Scalars['Int'];
  comments: Scalars['Int'];
  contacts: Scalars['Int'];
  proposals: Scalars['Int'];
  reactions: Scalars['Int'];
};

export type UserOrderByWithRelationInput = {
  approvals?: InputMaybe<ApprovalOrderByRelationAggregateInput>;
  approvers?: InputMaybe<ApproverOrderByRelationAggregateInput>;
  comments?: InputMaybe<CommentOrderByRelationAggregateInput>;
  contacts?: InputMaybe<ContactOrderByRelationAggregateInput>;
  id?: InputMaybe<SortOrder>;
  name?: InputMaybe<SortOrder>;
  proposals?: InputMaybe<ProposalOrderByRelationAggregateInput>;
  pushToken?: InputMaybe<SortOrder>;
  reactions?: InputMaybe<ReactionOrderByRelationAggregateInput>;
};

export type UserRelationFilter = {
  is?: InputMaybe<UserWhereInput>;
  isNot?: InputMaybe<UserWhereInput>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  approvals?: InputMaybe<ApprovalListRelationFilter>;
  approvers?: InputMaybe<ApproverListRelationFilter>;
  comments?: InputMaybe<CommentListRelationFilter>;
  contacts?: InputMaybe<ContactListRelationFilter>;
  id?: InputMaybe<StringFilter>;
  name?: InputMaybe<StringNullableFilter>;
  proposals?: InputMaybe<ProposalListRelationFilter>;
  pushToken?: InputMaybe<StringNullableFilter>;
  reactions?: InputMaybe<ReactionListRelationFilter>;
};

export type ActivateAccountMutationVariables = Exact<{
  account: Scalars['Address'];
}>;


export type ActivateAccountMutation = { __typename?: 'Mutation', activateAccount: boolean };

export type CreateAccountMutationVariables = Exact<{
  name: Scalars['String'];
  quorums: Array<QuorumInput> | QuorumInput;
}>;


export type CreateAccountMutation = { __typename?: 'Mutation', createAccount: { __typename?: 'Account', id: string, isActive: boolean } };

export type UpdateAccountMetadataMutationVariables = Exact<{
  account: Scalars['Address'];
  name: Scalars['String'];
}>;


export type UpdateAccountMetadataMutation = { __typename?: 'Mutation', updateAccountMetadata: { __typename?: 'Account', id: string, name: string } };

export type CreateCommentMutationVariables = Exact<{
  account: Scalars['Address'];
  key: Scalars['Id'];
  content: Scalars['String'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', id: string } };

export type DeleteCommentMutationVariables = Exact<{
  id: Scalars['Float'];
}>;


export type DeleteCommentMutation = { __typename?: 'Mutation', deleteComment: { __typename?: 'Comment', id: string } };

export type ReactMutationVariables = Exact<{
  comment: Scalars['Float'];
  emojis: Array<Scalars['String']> | Scalars['String'];
}>;


export type ReactMutation = { __typename?: 'Mutation', reactToComment?: { __typename?: 'Reaction', id: string } | null };

export type DeleteContactMutationVariables = Exact<{
  addr: Scalars['Address'];
}>;


export type DeleteContactMutation = { __typename?: 'Mutation', deleteContact: boolean };

export type UpsertContactMutationVariables = Exact<{
  name: Scalars['String'];
  newAddr: Scalars['Address'];
  prevAddr?: InputMaybe<Scalars['Address']>;
}>;


export type UpsertContactMutation = { __typename?: 'Mutation', upsertContact: { __typename?: 'ContactObject', id: string } };

export type ApproveMutationVariables = Exact<{
  id: Scalars['Bytes32'];
  signature: Scalars['Bytes'];
}>;


export type ApproveMutation = { __typename?: 'Mutation', approve: { __typename?: 'Proposal', id: string, transactions?: Array<{ __typename?: 'Transaction', id: string, hash: string, nonce: number, gasLimit: any, gasPrice?: any | null, createdAt: any, response?: { __typename?: 'TransactionResponse', success: boolean, response: string, timestamp: any } | null }> | null } };

export type RejectMutationVariables = Exact<{
  id: Scalars['Bytes32'];
}>;


export type RejectMutation = { __typename?: 'Mutation', reject: { __typename?: 'Proposal', id: string } };

export type ProposeMutationVariables = Exact<{
  account: Scalars['Address'];
  quorumKey?: InputMaybe<Scalars['QuorumKey']>;
  to: Scalars['Address'];
  value?: InputMaybe<Scalars['Uint256']>;
  data?: InputMaybe<Scalars['Bytes']>;
  salt?: InputMaybe<Scalars['Bytes8']>;
  gasLimit?: InputMaybe<Scalars['Uint256']>;
}>;


export type ProposeMutation = { __typename?: 'Mutation', propose: { __typename?: 'Proposal', id: string, transactions?: Array<{ __typename?: 'Transaction', id: string, hash: string, nonce: number, gasLimit: any, gasPrice?: any | null, createdAt: any, response?: { __typename?: 'TransactionResponse', success: boolean, response: string, timestamp: any } | null }> | null } };

export type RequestApprovalMutationVariables = Exact<{
  id: Scalars['Bytes32'];
  approvers: Array<Scalars['Address']> | Scalars['Address'];
}>;


export type RequestApprovalMutation = { __typename?: 'Mutation', requestApproval: boolean };

export type CreateQuorumMutationVariables = Exact<{
  account: Scalars['Address'];
  approvers: Array<Scalars['Address']> | Scalars['Address'];
  name: Scalars['String'];
  proposingQuorumKey: Scalars['QuorumKey'];
}>;


export type CreateQuorumMutation = { __typename?: 'Mutation', createQuorum: { __typename?: 'Quorum', id: string, key: number } };

export type RemoveQuorumMutationVariables = Exact<{
  account: Scalars['Address'];
  key: Scalars['QuorumKey'];
}>;


export type RemoveQuorumMutation = { __typename?: 'Mutation', removeQuorum: { __typename?: 'Quorum', id: string, accountId: string, key: number, name: string, activeState?: { __typename?: 'QuorumState', proposalId?: string | null, isRemoved: boolean, createdAt: any, spendingFallback: SpendingFallback, approvers?: Array<{ __typename?: 'Approver', userId: string }> | null, limits?: Array<{ __typename?: 'TokenLimit', token: string, amount: string, period: LimitPeriod }> | null } | null, proposedStates: Array<{ __typename?: 'QuorumState', proposalId?: string | null, isRemoved: boolean, createdAt: any, spendingFallback: SpendingFallback, approvers?: Array<{ __typename?: 'Approver', userId: string }> | null, limits?: Array<{ __typename?: 'TokenLimit', token: string, amount: string, period: LimitPeriod }> | null }> } };

export type UpdateQuorumMutationVariables = Exact<{
  account: Scalars['Address'];
  key: Scalars['QuorumKey'];
  proposingQuorumKey?: InputMaybe<Scalars['QuorumKey']>;
  approvers: Array<Scalars['Address']> | Scalars['Address'];
  spending?: InputMaybe<SpendingInput>;
}>;


export type UpdateQuorumMutation = { __typename?: 'Mutation', updateQuorum: { __typename?: 'Quorum', id: string, accountId: string, key: number, name: string, activeState?: { __typename?: 'QuorumState', proposalId?: string | null, isRemoved: boolean, createdAt: any, spendingFallback: SpendingFallback, approvers?: Array<{ __typename?: 'Approver', userId: string }> | null, limits?: Array<{ __typename?: 'TokenLimit', token: string, amount: string, period: LimitPeriod }> | null } | null, proposedStates: Array<{ __typename?: 'QuorumState', proposalId?: string | null, isRemoved: boolean, createdAt: any, spendingFallback: SpendingFallback, approvers?: Array<{ __typename?: 'Approver', userId: string }> | null, limits?: Array<{ __typename?: 'TokenLimit', token: string, amount: string, period: LimitPeriod }> | null }> } };

export type UpdateQuorumMetadataMutationVariables = Exact<{
  account: Scalars['Address'];
  key: Scalars['QuorumKey'];
  name: Scalars['String'];
}>;


export type UpdateQuorumMetadataMutation = { __typename?: 'Mutation', updateQuorumMetadata: { __typename?: 'Quorum', id: string, name: string } };

export type RequestTokensMutationVariables = Exact<{
  recipient: Scalars['Address'];
}>;


export type RequestTokensMutation = { __typename?: 'Mutation', requestTokens: Array<any> };

export type UpdateUserMutationVariables = Exact<{
  name?: InputMaybe<Scalars['String']>;
  pushToken?: InputMaybe<Scalars['String']>;
}>;


export type UpdateUserMutation = { __typename?: 'Mutation', updateUser: { __typename?: 'User', id: string, name?: string | null, pushToken?: string | null } };

export type AccountQueryVariables = Exact<{
  account: Scalars['Address'];
}>;


export type AccountQuery = { __typename?: 'Query', account?: { __typename?: 'Account', id: string, isActive: boolean, name: string, quorums?: Array<{ __typename?: 'Quorum', id: string, accountId: string, key: number, name: string, activeState?: { __typename?: 'QuorumState', proposalId?: string | null, isRemoved: boolean, createdAt: any, spendingFallback: SpendingFallback, approvers?: Array<{ __typename?: 'Approver', userId: string }> | null, limits?: Array<{ __typename?: 'TokenLimit', token: string, amount: string, period: LimitPeriod }> | null } | null, proposedStates: Array<{ __typename?: 'QuorumState', proposalId?: string | null, isRemoved: boolean, createdAt: any, spendingFallback: SpendingFallback, approvers?: Array<{ __typename?: 'Approver', userId: string }> | null, limits?: Array<{ __typename?: 'TokenLimit', token: string, amount: string, period: LimitPeriod }> | null }> }> | null } | null };

export type AccountIdsQueryVariables = Exact<{ [key: string]: never; }>;


export type AccountIdsQuery = { __typename?: 'Query', accounts: Array<{ __typename?: 'Account', id: string }> };

export type ContactFieldsFragment = { __typename?: 'ContactObject', id: string, addr: any, name: string };

export type ContactsQueryVariables = Exact<{ [key: string]: never; }>;


export type ContactsQuery = { __typename?: 'Query', contacts: Array<{ __typename?: 'ContactObject', id: string, addr: any, name: string }> };

export type TransactionFieldsFragment = { __typename?: 'Transaction', id: string, hash: string, nonce: number, gasLimit: any, gasPrice?: any | null, createdAt: any, response?: { __typename?: 'TransactionResponse', success: boolean, response: string, timestamp: any } | null };

export type ProposalQueryVariables = Exact<{
  id: Scalars['Bytes32'];
}>;


export type ProposalQuery = { __typename?: 'Query', proposal?: { __typename?: 'Proposal', id: string, accountId: string, quorumKey: number, proposerId: string, to: string, value?: string | null, data?: string | null, salt: string, createdAt: any, approvals?: Array<{ __typename?: 'Approval', userId: string, signature?: string | null, createdAt: any }> | null, transactions?: Array<{ __typename?: 'Transaction', id: string, hash: string, nonce: number, gasLimit: any, gasPrice?: any | null, createdAt: any, response?: { __typename?: 'TransactionResponse', success: boolean, response: string, timestamp: any } | null }> | null } | null };

export type ProposalsMetadataQueryVariables = Exact<{
  accounts?: InputMaybe<Array<Scalars['Address']> | Scalars['Address']>;
  state?: InputMaybe<Array<ProposalState> | ProposalState>;
  userHasApproved?: InputMaybe<Scalars['Boolean']>;
}>;


export type ProposalsMetadataQuery = { __typename?: 'Query', proposals: Array<{ __typename?: 'Proposal', id: string, accountId: string, createdAt: any }> };

export type QuorumStateFieldsFragment = { __typename?: 'QuorumState', proposalId?: string | null, isRemoved: boolean, createdAt: any, spendingFallback: SpendingFallback, approvers?: Array<{ __typename?: 'Approver', userId: string }> | null, limits?: Array<{ __typename?: 'TokenLimit', token: string, amount: string, period: LimitPeriod }> | null };

export type QuorumFieldsFragment = { __typename?: 'Quorum', id: string, accountId: string, key: number, name: string, activeState?: { __typename?: 'QuorumState', proposalId?: string | null, isRemoved: boolean, createdAt: any, spendingFallback: SpendingFallback, approvers?: Array<{ __typename?: 'Approver', userId: string }> | null, limits?: Array<{ __typename?: 'TokenLimit', token: string, amount: string, period: LimitPeriod }> | null } | null, proposedStates: Array<{ __typename?: 'QuorumState', proposalId?: string | null, isRemoved: boolean, createdAt: any, spendingFallback: SpendingFallback, approvers?: Array<{ __typename?: 'Approver', userId: string }> | null, limits?: Array<{ __typename?: 'TokenLimit', token: string, amount: string, period: LimitPeriod }> | null }> };

export type QuorumQueryVariables = Exact<{
  account: Scalars['Address'];
  key: Scalars['QuorumKey'];
}>;


export type QuorumQuery = { __typename?: 'Query', quorum?: { __typename?: 'Quorum', id: string, accountId: string, key: number, name: string, activeState?: { __typename?: 'QuorumState', proposalId?: string | null, isRemoved: boolean, createdAt: any, spendingFallback: SpendingFallback, approvers?: Array<{ __typename?: 'Approver', userId: string }> | null, limits?: Array<{ __typename?: 'TokenLimit', token: string, amount: string, period: LimitPeriod }> | null } | null, proposedStates: Array<{ __typename?: 'QuorumState', proposalId?: string | null, isRemoved: boolean, createdAt: any, spendingFallback: SpendingFallback, approvers?: Array<{ __typename?: 'Approver', userId: string }> | null, limits?: Array<{ __typename?: 'TokenLimit', token: string, amount: string, period: LimitPeriod }> | null }> } | null };

export type RequestableTokensQueryVariables = Exact<{
  recipient: Scalars['Address'];
}>;


export type RequestableTokensQuery = { __typename?: 'Query', requestableTokens: Array<any> };

export type CommentsQueryVariables = Exact<{
  account: Scalars['Address'];
  key: Scalars['Id'];
}>;


export type CommentsQuery = { __typename?: 'Query', comments: Array<{ __typename?: 'Comment', id: string, authorId: string, content: string, updatedAt: any, reactions?: Array<{ __typename?: 'Reaction', userId: string, emojis?: Array<string> | null }> | null }> };

export type ContractMethodQueryVariables = Exact<{
  contract: Scalars['Address'];
  sighash: Scalars['Bytes'];
}>;


export type ContractMethodQuery = { __typename?: 'Query', contractMethod?: { __typename?: 'ContractMethod', id: string, fragment: any } | null };

export type UserQueryVariables = Exact<{
  id?: InputMaybe<Scalars['Address']>;
}>;


export type UserQuery = { __typename?: 'Query', user?: { __typename?: 'User', id: string, name?: string | null, pushToken?: string | null } | null };

export const ContactFieldsFragmentDoc = gql`
    fragment ContactFields on ContactObject {
  id
  addr
  name
}
    `;
export const TransactionFieldsFragmentDoc = gql`
    fragment TransactionFields on Transaction {
  id
  hash
  nonce
  gasLimit
  gasPrice
  createdAt
  response {
    success
    response
    timestamp
  }
}
    `;
export const QuorumStateFieldsFragmentDoc = gql`
    fragment QuorumStateFields on QuorumState {
  proposalId
  isRemoved
  createdAt
  approvers {
    userId
  }
  spendingFallback
  limits {
    token
    amount
    period
  }
}
    `;
export const QuorumFieldsFragmentDoc = gql`
    fragment QuorumFields on Quorum {
  id
  accountId
  key
  name
  activeState {
    ...QuorumStateFields
  }
  proposedStates {
    ...QuorumStateFields
  }
}
    ${QuorumStateFieldsFragmentDoc}`;
export const ActivateAccountDocument = gql`
    mutation ActivateAccount($account: Address!) {
  activateAccount(id: $account)
}
    `;
export type ActivateAccountMutationFn = Apollo.MutationFunction<ActivateAccountMutation, ActivateAccountMutationVariables>;

/**
 * __useActivateAccountMutation__
 *
 * To run a mutation, you first call `useActivateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activateAccountMutation, { data, loading, error }] = useActivateAccountMutation({
 *   variables: {
 *      account: // value for 'account'
 *   },
 * });
 */
export function useActivateAccountMutation(baseOptions?: Apollo.MutationHookOptions<ActivateAccountMutation, ActivateAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ActivateAccountMutation, ActivateAccountMutationVariables>(ActivateAccountDocument, options);
      }
export type ActivateAccountMutationHookResult = ReturnType<typeof useActivateAccountMutation>;
export type ActivateAccountMutationResult = Apollo.MutationResult<ActivateAccountMutation>;
export type ActivateAccountMutationOptions = Apollo.BaseMutationOptions<ActivateAccountMutation, ActivateAccountMutationVariables>;
export const CreateAccountDocument = gql`
    mutation CreateAccount($name: String!, $quorums: [QuorumInput!]!) {
  createAccount(name: $name, quorums: $quorums) {
    id
    isActive
  }
}
    `;
export type CreateAccountMutationFn = Apollo.MutationFunction<CreateAccountMutation, CreateAccountMutationVariables>;

/**
 * __useCreateAccountMutation__
 *
 * To run a mutation, you first call `useCreateAccountMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateAccountMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createAccountMutation, { data, loading, error }] = useCreateAccountMutation({
 *   variables: {
 *      name: // value for 'name'
 *      quorums: // value for 'quorums'
 *   },
 * });
 */
export function useCreateAccountMutation(baseOptions?: Apollo.MutationHookOptions<CreateAccountMutation, CreateAccountMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateAccountMutation, CreateAccountMutationVariables>(CreateAccountDocument, options);
      }
export type CreateAccountMutationHookResult = ReturnType<typeof useCreateAccountMutation>;
export type CreateAccountMutationResult = Apollo.MutationResult<CreateAccountMutation>;
export type CreateAccountMutationOptions = Apollo.BaseMutationOptions<CreateAccountMutation, CreateAccountMutationVariables>;
export const UpdateAccountMetadataDocument = gql`
    mutation UpdateAccountMetadata($account: Address!, $name: String!) {
  updateAccountMetadata(id: $account, name: $name) {
    id
    name
  }
}
    `;
export type UpdateAccountMetadataMutationFn = Apollo.MutationFunction<UpdateAccountMetadataMutation, UpdateAccountMetadataMutationVariables>;

/**
 * __useUpdateAccountMetadataMutation__
 *
 * To run a mutation, you first call `useUpdateAccountMetadataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateAccountMetadataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateAccountMetadataMutation, { data, loading, error }] = useUpdateAccountMetadataMutation({
 *   variables: {
 *      account: // value for 'account'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateAccountMetadataMutation(baseOptions?: Apollo.MutationHookOptions<UpdateAccountMetadataMutation, UpdateAccountMetadataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateAccountMetadataMutation, UpdateAccountMetadataMutationVariables>(UpdateAccountMetadataDocument, options);
      }
export type UpdateAccountMetadataMutationHookResult = ReturnType<typeof useUpdateAccountMetadataMutation>;
export type UpdateAccountMetadataMutationResult = Apollo.MutationResult<UpdateAccountMetadataMutation>;
export type UpdateAccountMetadataMutationOptions = Apollo.BaseMutationOptions<UpdateAccountMetadataMutation, UpdateAccountMetadataMutationVariables>;
export const CreateCommentDocument = gql`
    mutation CreateComment($account: Address!, $key: Id!, $content: String!) {
  createComment(account: $account, key: $key, content: $content) {
    id
  }
}
    `;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      account: // value for 'account'
 *      key: // value for 'key'
 *      content: // value for 'content'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const DeleteCommentDocument = gql`
    mutation DeleteComment($id: Float!) {
  deleteComment(id: $id) {
    id
  }
}
    `;
export type DeleteCommentMutationFn = Apollo.MutationFunction<DeleteCommentMutation, DeleteCommentMutationVariables>;

/**
 * __useDeleteCommentMutation__
 *
 * To run a mutation, you first call `useDeleteCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCommentMutation, { data, loading, error }] = useDeleteCommentMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCommentMutation, DeleteCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCommentMutation, DeleteCommentMutationVariables>(DeleteCommentDocument, options);
      }
export type DeleteCommentMutationHookResult = ReturnType<typeof useDeleteCommentMutation>;
export type DeleteCommentMutationResult = Apollo.MutationResult<DeleteCommentMutation>;
export type DeleteCommentMutationOptions = Apollo.BaseMutationOptions<DeleteCommentMutation, DeleteCommentMutationVariables>;
export const ReactDocument = gql`
    mutation React($comment: Float!, $emojis: [String!]!) {
  reactToComment(id: $comment, emojis: $emojis) {
    id
  }
}
    `;
export type ReactMutationFn = Apollo.MutationFunction<ReactMutation, ReactMutationVariables>;

/**
 * __useReactMutation__
 *
 * To run a mutation, you first call `useReactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useReactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [reactMutation, { data, loading, error }] = useReactMutation({
 *   variables: {
 *      comment: // value for 'comment'
 *      emojis: // value for 'emojis'
 *   },
 * });
 */
export function useReactMutation(baseOptions?: Apollo.MutationHookOptions<ReactMutation, ReactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ReactMutation, ReactMutationVariables>(ReactDocument, options);
      }
export type ReactMutationHookResult = ReturnType<typeof useReactMutation>;
export type ReactMutationResult = Apollo.MutationResult<ReactMutation>;
export type ReactMutationOptions = Apollo.BaseMutationOptions<ReactMutation, ReactMutationVariables>;
export const DeleteContactDocument = gql`
    mutation DeleteContact($addr: Address!) {
  deleteContact(addr: $addr)
}
    `;
export type DeleteContactMutationFn = Apollo.MutationFunction<DeleteContactMutation, DeleteContactMutationVariables>;

/**
 * __useDeleteContactMutation__
 *
 * To run a mutation, you first call `useDeleteContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteContactMutation, { data, loading, error }] = useDeleteContactMutation({
 *   variables: {
 *      addr: // value for 'addr'
 *   },
 * });
 */
export function useDeleteContactMutation(baseOptions?: Apollo.MutationHookOptions<DeleteContactMutation, DeleteContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteContactMutation, DeleteContactMutationVariables>(DeleteContactDocument, options);
      }
export type DeleteContactMutationHookResult = ReturnType<typeof useDeleteContactMutation>;
export type DeleteContactMutationResult = Apollo.MutationResult<DeleteContactMutation>;
export type DeleteContactMutationOptions = Apollo.BaseMutationOptions<DeleteContactMutation, DeleteContactMutationVariables>;
export const UpsertContactDocument = gql`
    mutation UpsertContact($name: String!, $newAddr: Address!, $prevAddr: Address) {
  upsertContact(name: $name, prevAddr: $prevAddr, newAddr: $newAddr) {
    id
  }
}
    `;
export type UpsertContactMutationFn = Apollo.MutationFunction<UpsertContactMutation, UpsertContactMutationVariables>;

/**
 * __useUpsertContactMutation__
 *
 * To run a mutation, you first call `useUpsertContactMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpsertContactMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [upsertContactMutation, { data, loading, error }] = useUpsertContactMutation({
 *   variables: {
 *      name: // value for 'name'
 *      newAddr: // value for 'newAddr'
 *      prevAddr: // value for 'prevAddr'
 *   },
 * });
 */
export function useUpsertContactMutation(baseOptions?: Apollo.MutationHookOptions<UpsertContactMutation, UpsertContactMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpsertContactMutation, UpsertContactMutationVariables>(UpsertContactDocument, options);
      }
export type UpsertContactMutationHookResult = ReturnType<typeof useUpsertContactMutation>;
export type UpsertContactMutationResult = Apollo.MutationResult<UpsertContactMutation>;
export type UpsertContactMutationOptions = Apollo.BaseMutationOptions<UpsertContactMutation, UpsertContactMutationVariables>;
export const ApproveDocument = gql`
    mutation Approve($id: Bytes32!, $signature: Bytes!) {
  approve(id: $id, signature: $signature) {
    id
    transactions {
      ...TransactionFields
    }
  }
}
    ${TransactionFieldsFragmentDoc}`;
export type ApproveMutationFn = Apollo.MutationFunction<ApproveMutation, ApproveMutationVariables>;

/**
 * __useApproveMutation__
 *
 * To run a mutation, you first call `useApproveMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useApproveMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [approveMutation, { data, loading, error }] = useApproveMutation({
 *   variables: {
 *      id: // value for 'id'
 *      signature: // value for 'signature'
 *   },
 * });
 */
export function useApproveMutation(baseOptions?: Apollo.MutationHookOptions<ApproveMutation, ApproveMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ApproveMutation, ApproveMutationVariables>(ApproveDocument, options);
      }
export type ApproveMutationHookResult = ReturnType<typeof useApproveMutation>;
export type ApproveMutationResult = Apollo.MutationResult<ApproveMutation>;
export type ApproveMutationOptions = Apollo.BaseMutationOptions<ApproveMutation, ApproveMutationVariables>;
export const RejectDocument = gql`
    mutation Reject($id: Bytes32!) {
  reject(id: $id) {
    id
  }
}
    `;
export type RejectMutationFn = Apollo.MutationFunction<RejectMutation, RejectMutationVariables>;

/**
 * __useRejectMutation__
 *
 * To run a mutation, you first call `useRejectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRejectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [rejectMutation, { data, loading, error }] = useRejectMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useRejectMutation(baseOptions?: Apollo.MutationHookOptions<RejectMutation, RejectMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RejectMutation, RejectMutationVariables>(RejectDocument, options);
      }
export type RejectMutationHookResult = ReturnType<typeof useRejectMutation>;
export type RejectMutationResult = Apollo.MutationResult<RejectMutation>;
export type RejectMutationOptions = Apollo.BaseMutationOptions<RejectMutation, RejectMutationVariables>;
export const ProposeDocument = gql`
    mutation Propose($account: Address!, $quorumKey: QuorumKey, $to: Address!, $value: Uint256, $data: Bytes, $salt: Bytes8, $gasLimit: Uint256) {
  propose(
    account: $account
    quorumKey: $quorumKey
    to: $to
    value: $value
    data: $data
    salt: $salt
    gasLimit: $gasLimit
  ) {
    id
    transactions {
      ...TransactionFields
    }
  }
}
    ${TransactionFieldsFragmentDoc}`;
export type ProposeMutationFn = Apollo.MutationFunction<ProposeMutation, ProposeMutationVariables>;

/**
 * __useProposeMutation__
 *
 * To run a mutation, you first call `useProposeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useProposeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [proposeMutation, { data, loading, error }] = useProposeMutation({
 *   variables: {
 *      account: // value for 'account'
 *      quorumKey: // value for 'quorumKey'
 *      to: // value for 'to'
 *      value: // value for 'value'
 *      data: // value for 'data'
 *      salt: // value for 'salt'
 *      gasLimit: // value for 'gasLimit'
 *   },
 * });
 */
export function useProposeMutation(baseOptions?: Apollo.MutationHookOptions<ProposeMutation, ProposeMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ProposeMutation, ProposeMutationVariables>(ProposeDocument, options);
      }
export type ProposeMutationHookResult = ReturnType<typeof useProposeMutation>;
export type ProposeMutationResult = Apollo.MutationResult<ProposeMutation>;
export type ProposeMutationOptions = Apollo.BaseMutationOptions<ProposeMutation, ProposeMutationVariables>;
export const RequestApprovalDocument = gql`
    mutation RequestApproval($id: Bytes32!, $approvers: [Address!]!) {
  requestApproval(id: $id, approvers: $approvers)
}
    `;
export type RequestApprovalMutationFn = Apollo.MutationFunction<RequestApprovalMutation, RequestApprovalMutationVariables>;

/**
 * __useRequestApprovalMutation__
 *
 * To run a mutation, you first call `useRequestApprovalMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestApprovalMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestApprovalMutation, { data, loading, error }] = useRequestApprovalMutation({
 *   variables: {
 *      id: // value for 'id'
 *      approvers: // value for 'approvers'
 *   },
 * });
 */
export function useRequestApprovalMutation(baseOptions?: Apollo.MutationHookOptions<RequestApprovalMutation, RequestApprovalMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestApprovalMutation, RequestApprovalMutationVariables>(RequestApprovalDocument, options);
      }
export type RequestApprovalMutationHookResult = ReturnType<typeof useRequestApprovalMutation>;
export type RequestApprovalMutationResult = Apollo.MutationResult<RequestApprovalMutation>;
export type RequestApprovalMutationOptions = Apollo.BaseMutationOptions<RequestApprovalMutation, RequestApprovalMutationVariables>;
export const CreateQuorumDocument = gql`
    mutation CreateQuorum($account: Address!, $approvers: [Address!]!, $name: String!, $proposingQuorumKey: QuorumKey!) {
  createQuorum(
    account: $account
    approvers: $approvers
    name: $name
    proposingQuorumKey: $proposingQuorumKey
  ) {
    id
    key
  }
}
    `;
export type CreateQuorumMutationFn = Apollo.MutationFunction<CreateQuorumMutation, CreateQuorumMutationVariables>;

/**
 * __useCreateQuorumMutation__
 *
 * To run a mutation, you first call `useCreateQuorumMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateQuorumMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createQuorumMutation, { data, loading, error }] = useCreateQuorumMutation({
 *   variables: {
 *      account: // value for 'account'
 *      approvers: // value for 'approvers'
 *      name: // value for 'name'
 *      proposingQuorumKey: // value for 'proposingQuorumKey'
 *   },
 * });
 */
export function useCreateQuorumMutation(baseOptions?: Apollo.MutationHookOptions<CreateQuorumMutation, CreateQuorumMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateQuorumMutation, CreateQuorumMutationVariables>(CreateQuorumDocument, options);
      }
export type CreateQuorumMutationHookResult = ReturnType<typeof useCreateQuorumMutation>;
export type CreateQuorumMutationResult = Apollo.MutationResult<CreateQuorumMutation>;
export type CreateQuorumMutationOptions = Apollo.BaseMutationOptions<CreateQuorumMutation, CreateQuorumMutationVariables>;
export const RemoveQuorumDocument = gql`
    mutation RemoveQuorum($account: Address!, $key: QuorumKey!) {
  removeQuorum(account: $account, key: $key) {
    ...QuorumFields
  }
}
    ${QuorumFieldsFragmentDoc}`;
export type RemoveQuorumMutationFn = Apollo.MutationFunction<RemoveQuorumMutation, RemoveQuorumMutationVariables>;

/**
 * __useRemoveQuorumMutation__
 *
 * To run a mutation, you first call `useRemoveQuorumMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRemoveQuorumMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [removeQuorumMutation, { data, loading, error }] = useRemoveQuorumMutation({
 *   variables: {
 *      account: // value for 'account'
 *      key: // value for 'key'
 *   },
 * });
 */
export function useRemoveQuorumMutation(baseOptions?: Apollo.MutationHookOptions<RemoveQuorumMutation, RemoveQuorumMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RemoveQuorumMutation, RemoveQuorumMutationVariables>(RemoveQuorumDocument, options);
      }
export type RemoveQuorumMutationHookResult = ReturnType<typeof useRemoveQuorumMutation>;
export type RemoveQuorumMutationResult = Apollo.MutationResult<RemoveQuorumMutation>;
export type RemoveQuorumMutationOptions = Apollo.BaseMutationOptions<RemoveQuorumMutation, RemoveQuorumMutationVariables>;
export const UpdateQuorumDocument = gql`
    mutation UpdateQuorum($account: Address!, $key: QuorumKey!, $proposingQuorumKey: QuorumKey, $approvers: [Address!]!, $spending: SpendingInput) {
  updateQuorum(
    account: $account
    key: $key
    proposingQuorumKey: $proposingQuorumKey
    approvers: $approvers
    spending: $spending
  ) {
    ...QuorumFields
  }
}
    ${QuorumFieldsFragmentDoc}`;
export type UpdateQuorumMutationFn = Apollo.MutationFunction<UpdateQuorumMutation, UpdateQuorumMutationVariables>;

/**
 * __useUpdateQuorumMutation__
 *
 * To run a mutation, you first call `useUpdateQuorumMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateQuorumMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateQuorumMutation, { data, loading, error }] = useUpdateQuorumMutation({
 *   variables: {
 *      account: // value for 'account'
 *      key: // value for 'key'
 *      proposingQuorumKey: // value for 'proposingQuorumKey'
 *      approvers: // value for 'approvers'
 *      spending: // value for 'spending'
 *   },
 * });
 */
export function useUpdateQuorumMutation(baseOptions?: Apollo.MutationHookOptions<UpdateQuorumMutation, UpdateQuorumMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateQuorumMutation, UpdateQuorumMutationVariables>(UpdateQuorumDocument, options);
      }
export type UpdateQuorumMutationHookResult = ReturnType<typeof useUpdateQuorumMutation>;
export type UpdateQuorumMutationResult = Apollo.MutationResult<UpdateQuorumMutation>;
export type UpdateQuorumMutationOptions = Apollo.BaseMutationOptions<UpdateQuorumMutation, UpdateQuorumMutationVariables>;
export const UpdateQuorumMetadataDocument = gql`
    mutation UpdateQuorumMetadata($account: Address!, $key: QuorumKey!, $name: String!) {
  updateQuorumMetadata(account: $account, key: $key, name: $name) {
    id
    name
  }
}
    `;
export type UpdateQuorumMetadataMutationFn = Apollo.MutationFunction<UpdateQuorumMetadataMutation, UpdateQuorumMetadataMutationVariables>;

/**
 * __useUpdateQuorumMetadataMutation__
 *
 * To run a mutation, you first call `useUpdateQuorumMetadataMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateQuorumMetadataMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateQuorumMetadataMutation, { data, loading, error }] = useUpdateQuorumMetadataMutation({
 *   variables: {
 *      account: // value for 'account'
 *      key: // value for 'key'
 *      name: // value for 'name'
 *   },
 * });
 */
export function useUpdateQuorumMetadataMutation(baseOptions?: Apollo.MutationHookOptions<UpdateQuorumMetadataMutation, UpdateQuorumMetadataMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateQuorumMetadataMutation, UpdateQuorumMetadataMutationVariables>(UpdateQuorumMetadataDocument, options);
      }
export type UpdateQuorumMetadataMutationHookResult = ReturnType<typeof useUpdateQuorumMetadataMutation>;
export type UpdateQuorumMetadataMutationResult = Apollo.MutationResult<UpdateQuorumMetadataMutation>;
export type UpdateQuorumMetadataMutationOptions = Apollo.BaseMutationOptions<UpdateQuorumMetadataMutation, UpdateQuorumMetadataMutationVariables>;
export const RequestTokensDocument = gql`
    mutation RequestTokens($recipient: Address!) {
  requestTokens(recipient: $recipient)
}
    `;
export type RequestTokensMutationFn = Apollo.MutationFunction<RequestTokensMutation, RequestTokensMutationVariables>;

/**
 * __useRequestTokensMutation__
 *
 * To run a mutation, you first call `useRequestTokensMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRequestTokensMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [requestTokensMutation, { data, loading, error }] = useRequestTokensMutation({
 *   variables: {
 *      recipient: // value for 'recipient'
 *   },
 * });
 */
export function useRequestTokensMutation(baseOptions?: Apollo.MutationHookOptions<RequestTokensMutation, RequestTokensMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<RequestTokensMutation, RequestTokensMutationVariables>(RequestTokensDocument, options);
      }
export type RequestTokensMutationHookResult = ReturnType<typeof useRequestTokensMutation>;
export type RequestTokensMutationResult = Apollo.MutationResult<RequestTokensMutation>;
export type RequestTokensMutationOptions = Apollo.BaseMutationOptions<RequestTokensMutation, RequestTokensMutationVariables>;
export const UpdateUserDocument = gql`
    mutation UpdateUser($name: String, $pushToken: String) {
  updateUser(name: $name, pushToken: $pushToken) {
    id
    name
    pushToken
  }
}
    `;
export type UpdateUserMutationFn = Apollo.MutationFunction<UpdateUserMutation, UpdateUserMutationVariables>;

/**
 * __useUpdateUserMutation__
 *
 * To run a mutation, you first call `useUpdateUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserMutation, { data, loading, error }] = useUpdateUserMutation({
 *   variables: {
 *      name: // value for 'name'
 *      pushToken: // value for 'pushToken'
 *   },
 * });
 */
export function useUpdateUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserMutation, UpdateUserMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserMutation, UpdateUserMutationVariables>(UpdateUserDocument, options);
      }
export type UpdateUserMutationHookResult = ReturnType<typeof useUpdateUserMutation>;
export type UpdateUserMutationResult = Apollo.MutationResult<UpdateUserMutation>;
export type UpdateUserMutationOptions = Apollo.BaseMutationOptions<UpdateUserMutation, UpdateUserMutationVariables>;
export const AccountDocument = gql`
    query Account($account: Address!) {
  account(id: $account) {
    id
    isActive
    name
    quorums {
      ...QuorumFields
    }
  }
}
    ${QuorumFieldsFragmentDoc}`;

/**
 * __useAccountQuery__
 *
 * To run a query within a React component, call `useAccountQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountQuery({
 *   variables: {
 *      account: // value for 'account'
 *   },
 * });
 */
export function useAccountQuery(baseOptions: Apollo.QueryHookOptions<AccountQuery, AccountQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccountQuery, AccountQueryVariables>(AccountDocument, options);
      }
export function useAccountLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccountQuery, AccountQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccountQuery, AccountQueryVariables>(AccountDocument, options);
        }
export type AccountQueryHookResult = ReturnType<typeof useAccountQuery>;
export type AccountLazyQueryHookResult = ReturnType<typeof useAccountLazyQuery>;
export type AccountQueryResult = Apollo.QueryResult<AccountQuery, AccountQueryVariables>;
export const AccountIdsDocument = gql`
    query AccountIds {
  accounts {
    id
  }
}
    `;

/**
 * __useAccountIdsQuery__
 *
 * To run a query within a React component, call `useAccountIdsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAccountIdsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAccountIdsQuery({
 *   variables: {
 *   },
 * });
 */
export function useAccountIdsQuery(baseOptions?: Apollo.QueryHookOptions<AccountIdsQuery, AccountIdsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AccountIdsQuery, AccountIdsQueryVariables>(AccountIdsDocument, options);
      }
export function useAccountIdsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AccountIdsQuery, AccountIdsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AccountIdsQuery, AccountIdsQueryVariables>(AccountIdsDocument, options);
        }
export type AccountIdsQueryHookResult = ReturnType<typeof useAccountIdsQuery>;
export type AccountIdsLazyQueryHookResult = ReturnType<typeof useAccountIdsLazyQuery>;
export type AccountIdsQueryResult = Apollo.QueryResult<AccountIdsQuery, AccountIdsQueryVariables>;
export const ContactsDocument = gql`
    query Contacts {
  contacts {
    ...ContactFields
  }
}
    ${ContactFieldsFragmentDoc}`;

/**
 * __useContactsQuery__
 *
 * To run a query within a React component, call `useContactsQuery` and pass it any options that fit your needs.
 * When your component renders, `useContactsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContactsQuery({
 *   variables: {
 *   },
 * });
 */
export function useContactsQuery(baseOptions?: Apollo.QueryHookOptions<ContactsQuery, ContactsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ContactsQuery, ContactsQueryVariables>(ContactsDocument, options);
      }
export function useContactsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ContactsQuery, ContactsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ContactsQuery, ContactsQueryVariables>(ContactsDocument, options);
        }
export type ContactsQueryHookResult = ReturnType<typeof useContactsQuery>;
export type ContactsLazyQueryHookResult = ReturnType<typeof useContactsLazyQuery>;
export type ContactsQueryResult = Apollo.QueryResult<ContactsQuery, ContactsQueryVariables>;
export const ProposalDocument = gql`
    query Proposal($id: Bytes32!) {
  proposal(id: $id) {
    id
    accountId
    quorumKey
    proposerId
    to
    value
    data
    salt
    createdAt
    approvals {
      userId
      signature
      createdAt
    }
    transactions {
      ...TransactionFields
    }
  }
}
    ${TransactionFieldsFragmentDoc}`;

/**
 * __useProposalQuery__
 *
 * To run a query within a React component, call `useProposalQuery` and pass it any options that fit your needs.
 * When your component renders, `useProposalQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProposalQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useProposalQuery(baseOptions: Apollo.QueryHookOptions<ProposalQuery, ProposalQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProposalQuery, ProposalQueryVariables>(ProposalDocument, options);
      }
export function useProposalLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProposalQuery, ProposalQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProposalQuery, ProposalQueryVariables>(ProposalDocument, options);
        }
export type ProposalQueryHookResult = ReturnType<typeof useProposalQuery>;
export type ProposalLazyQueryHookResult = ReturnType<typeof useProposalLazyQuery>;
export type ProposalQueryResult = Apollo.QueryResult<ProposalQuery, ProposalQueryVariables>;
export const ProposalsMetadataDocument = gql`
    query ProposalsMetadata($accounts: [Address!], $state: [ProposalState!], $userHasApproved: Boolean) {
  proposals(accounts: $accounts, state: $state, userHasApproved: $userHasApproved) {
    id
    accountId
    createdAt
  }
}
    `;

/**
 * __useProposalsMetadataQuery__
 *
 * To run a query within a React component, call `useProposalsMetadataQuery` and pass it any options that fit your needs.
 * When your component renders, `useProposalsMetadataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProposalsMetadataQuery({
 *   variables: {
 *      accounts: // value for 'accounts'
 *      state: // value for 'state'
 *      userHasApproved: // value for 'userHasApproved'
 *   },
 * });
 */
export function useProposalsMetadataQuery(baseOptions?: Apollo.QueryHookOptions<ProposalsMetadataQuery, ProposalsMetadataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProposalsMetadataQuery, ProposalsMetadataQueryVariables>(ProposalsMetadataDocument, options);
      }
export function useProposalsMetadataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProposalsMetadataQuery, ProposalsMetadataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProposalsMetadataQuery, ProposalsMetadataQueryVariables>(ProposalsMetadataDocument, options);
        }
export type ProposalsMetadataQueryHookResult = ReturnType<typeof useProposalsMetadataQuery>;
export type ProposalsMetadataLazyQueryHookResult = ReturnType<typeof useProposalsMetadataLazyQuery>;
export type ProposalsMetadataQueryResult = Apollo.QueryResult<ProposalsMetadataQuery, ProposalsMetadataQueryVariables>;
export const QuorumDocument = gql`
    query Quorum($account: Address!, $key: QuorumKey!) {
  quorum(account: $account, key: $key) {
    ...QuorumFields
  }
}
    ${QuorumFieldsFragmentDoc}`;

/**
 * __useQuorumQuery__
 *
 * To run a query within a React component, call `useQuorumQuery` and pass it any options that fit your needs.
 * When your component renders, `useQuorumQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useQuorumQuery({
 *   variables: {
 *      account: // value for 'account'
 *      key: // value for 'key'
 *   },
 * });
 */
export function useQuorumQuery(baseOptions: Apollo.QueryHookOptions<QuorumQuery, QuorumQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<QuorumQuery, QuorumQueryVariables>(QuorumDocument, options);
      }
export function useQuorumLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<QuorumQuery, QuorumQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<QuorumQuery, QuorumQueryVariables>(QuorumDocument, options);
        }
export type QuorumQueryHookResult = ReturnType<typeof useQuorumQuery>;
export type QuorumLazyQueryHookResult = ReturnType<typeof useQuorumLazyQuery>;
export type QuorumQueryResult = Apollo.QueryResult<QuorumQuery, QuorumQueryVariables>;
export const RequestableTokensDocument = gql`
    query RequestableTokens($recipient: Address!) {
  requestableTokens(recipient: $recipient)
}
    `;

/**
 * __useRequestableTokensQuery__
 *
 * To run a query within a React component, call `useRequestableTokensQuery` and pass it any options that fit your needs.
 * When your component renders, `useRequestableTokensQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useRequestableTokensQuery({
 *   variables: {
 *      recipient: // value for 'recipient'
 *   },
 * });
 */
export function useRequestableTokensQuery(baseOptions: Apollo.QueryHookOptions<RequestableTokensQuery, RequestableTokensQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<RequestableTokensQuery, RequestableTokensQueryVariables>(RequestableTokensDocument, options);
      }
export function useRequestableTokensLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<RequestableTokensQuery, RequestableTokensQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<RequestableTokensQuery, RequestableTokensQueryVariables>(RequestableTokensDocument, options);
        }
export type RequestableTokensQueryHookResult = ReturnType<typeof useRequestableTokensQuery>;
export type RequestableTokensLazyQueryHookResult = ReturnType<typeof useRequestableTokensLazyQuery>;
export type RequestableTokensQueryResult = Apollo.QueryResult<RequestableTokensQuery, RequestableTokensQueryVariables>;
export const CommentsDocument = gql`
    query Comments($account: Address!, $key: Id!) {
  comments(account: $account, key: $key) {
    id
    authorId
    content
    updatedAt
    reactions {
      userId
      emojis
    }
  }
}
    `;

/**
 * __useCommentsQuery__
 *
 * To run a query within a React component, call `useCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCommentsQuery({
 *   variables: {
 *      account: // value for 'account'
 *      key: // value for 'key'
 *   },
 * });
 */
export function useCommentsQuery(baseOptions: Apollo.QueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options);
      }
export function useCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CommentsQuery, CommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CommentsQuery, CommentsQueryVariables>(CommentsDocument, options);
        }
export type CommentsQueryHookResult = ReturnType<typeof useCommentsQuery>;
export type CommentsLazyQueryHookResult = ReturnType<typeof useCommentsLazyQuery>;
export type CommentsQueryResult = Apollo.QueryResult<CommentsQuery, CommentsQueryVariables>;
export const ContractMethodDocument = gql`
    query ContractMethod($contract: Address!, $sighash: Bytes!) {
  contractMethod(contract: $contract, sighash: $sighash) {
    id
    fragment
  }
}
    `;

/**
 * __useContractMethodQuery__
 *
 * To run a query within a React component, call `useContractMethodQuery` and pass it any options that fit your needs.
 * When your component renders, `useContractMethodQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useContractMethodQuery({
 *   variables: {
 *      contract: // value for 'contract'
 *      sighash: // value for 'sighash'
 *   },
 * });
 */
export function useContractMethodQuery(baseOptions: Apollo.QueryHookOptions<ContractMethodQuery, ContractMethodQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ContractMethodQuery, ContractMethodQueryVariables>(ContractMethodDocument, options);
      }
export function useContractMethodLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ContractMethodQuery, ContractMethodQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ContractMethodQuery, ContractMethodQueryVariables>(ContractMethodDocument, options);
        }
export type ContractMethodQueryHookResult = ReturnType<typeof useContractMethodQuery>;
export type ContractMethodLazyQueryHookResult = ReturnType<typeof useContractMethodLazyQuery>;
export type ContractMethodQueryResult = Apollo.QueryResult<ContractMethodQuery, ContractMethodQueryVariables>;
export const UserDocument = gql`
    query User($id: Address) {
  user(id: $id) {
    id
    name
    pushToken
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions?: Apollo.QueryHookOptions<UserQuery, UserQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<UserQuery, UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserQuery, UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<UserQuery, UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserQueryResult = Apollo.QueryResult<UserQuery, UserQueryVariables>;