import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { GraphQLBigInt } from 'graphql-scalars';
import { Account } from '../accounts/accounts.model';
import { TransactionProposal } from '../transaction-proposals/transaction-proposals.model';
import { IdField } from '~/apollo/scalars/Id.scalar';
import * as eql from '~/edgeql-interfaces';
import { uuid } from 'edgedb/dist/codecs/ifaces';
import { PolicyKeyField } from '~/apollo/scalars/PolicyKey.scalar';
import { AddressField } from '~/apollo/scalars/Address.scalar';
import {
  Address,
  Satisfiability,
  Selector,
  SatisfiabilityResult as ISatisfiabilityResult,
  SatisfiabilityReason as ISatisfiabilityReason,
} from 'lib';
import { Approver } from '../approvers/approvers.model';
import { SelectorField } from '~/apollo/scalars/Bytes.scalar';

@ObjectType()
export class Policy {
  @IdField()
  id: uuid;

  @Field(() => Account)
  account: Account;

  @PolicyKeyField()
  key: number; // PolicyKey;

  @Field(() => String)
  name: string;

  @Field(() => PolicyState, { nullable: true })
  state?: PolicyState | null;

  @Field(() => PolicyState, { nullable: true })
  draft?: PolicyState | null;

  @Field(() => [PolicyState])
  stateHistory: PolicyState[];

  @Field(() => Boolean)
  isActive: boolean;
}

@ObjectType()
export class Target implements eql.Target {
  @IdField()
  id: uuid;

  @Field(() => [FunctionConfig])
  functions: FunctionConfig[];

  @Field(() => Boolean)
  defaultAllow: boolean;
}

@ObjectType()
export class ContractTarget extends Target implements eql.ContractTarget {
  @IdField()
  id: uuid;

  @AddressField()
  contract: Address;
}

@ObjectType()
export class FunctionConfig {
  @SelectorField()
  selector: Selector;

  @Field(() => Boolean)
  allow: boolean;
}

@ObjectType()
export class TargetsConfig implements eql.TargetsConfig {
  @IdField()
  id: uuid;

  @Field(() => [ContractTarget])
  contracts: ContractTarget[];

  @Field(() => Target)
  default: Target;
}

@ObjectType()
export class TransferLimit {
  @IdField()
  id: uuid;

  @AddressField()
  token: Address;

  @Field(() => GraphQLBigInt)
  amount: bigint;

  @Field(() => Number, { description: 'seconds' })
  duration: number;
}

@ObjectType()
export class TransfersConfig implements eql.TransfersConfig {
  @IdField()
  id: uuid;

  @Field(() => [TransferLimit])
  limits: TransferLimit[];

  @Field(() => Boolean)
  defaultAllow: boolean;

  @Field(() => Number)
  budget: number;
}

@ObjectType()
export class PolicyState {
  @IdField()
  id: uuid;

  @Field(() => TransactionProposal, { nullable: true })
  proposal?: TransactionProposal | null;

  @Field(() => Boolean)
  isAccountInitState: boolean;

  @Field(() => [Approver])
  approvers: Approver[];

  @Field(() => Number)
  threshold: number;

  @Field(() => TargetsConfig)
  targets: TargetsConfig;

  @Field(() => TransfersConfig)
  transfers: TransfersConfig;

  @Field(() => Boolean)
  isRemoved: boolean;

  @Field(() => GraphQLBigInt, { nullable: true })
  activationBlock?: bigint | null;

  @Field(() => Date)
  createdAt: Date;
}

registerEnumType(Satisfiability, { name: 'Satisfiability' });

@ObjectType()
export class SatisfiabilityResult implements ISatisfiabilityResult {
  @Field(() => Satisfiability)
  result: Satisfiability;

  @Field(() => [SatisfiabilityReason])
  reasons: SatisfiabilityReason[];
}

@ObjectType()
export class SatisfiabilityReason implements ISatisfiabilityReason {
  @Field(() => String)
  reason: string;

  @Field(() => Number, { nullable: true })
  operation?: number;
}
