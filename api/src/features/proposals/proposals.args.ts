import { FindManyProposalArgs } from '@gen/proposal/find-many-proposal.args';
import { ArgsType, Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BigNumber, BytesLike } from 'ethers';
import { Address, TxSalt, ZERO } from 'lib';
import {
  AddressField,
  AddressSetField,
  NonEmptyAddressSetField,
} from '~/apollo/scalars/Address.scalar';
import { BytesField } from '~/apollo/scalars/Bytes.scalar';
import { Bytes32Field, Bytes32SetField } from '~/apollo/scalars/Bytes32.scalar';
import { Bytes8Field } from '~/apollo/scalars/Bytes8.scalar';
import { Uint256BnField } from '~/apollo/scalars/Uint256Bn.scalar';

@ArgsType()
export class UniqueProposalArgs {
  @Bytes32Field()
  id: string;
}

export enum ProposalStatus {
  AwaitingUser = 'awaiting-user',
  AwaitingOther = 'awaiting-other',
  Executed = 'executed',
}
registerEnumType(ProposalStatus, { name: 'ProposalStatus' });

export enum ProposalState {
  Pending = 'pending',
  Executing = 'executing',
  Executed = 'executed',
}
registerEnumType(ProposalState, { name: 'ProposalState' });

@ArgsType()
export class ProposalsArgs extends FindManyProposalArgs {
  @AddressSetField({ nullable: true })
  accounts?: Set<Address>;

  @Field(() => ProposalStatus, { nullable: true, deprecationReason: 'Superseded by state' })
  status?: ProposalStatus;

  state?: ProposalState;
}

@ArgsType()
export class ProposalModifiedArgs {
  @AddressSetField({ nullable: true })
  accounts?: Set<Address>;

  @Bytes32SetField({ nullable: true })
  ids?: Set<string>;

  @Field(() => Boolean, { nullable: true, defaultValue: true })
  created: boolean;
}

@ArgsType()
export class ProposeArgs {
  @AddressField()
  account: Address;

  // Defaults to the config with the least amount of approvers, followed by the lowest id (by lexical comparison)
  config?: number;

  @AddressField()
  to: Address;

  // Wei
  @Uint256BnField({ nullable: true, defaultValue: ZERO })
  value: BigNumber;

  @BytesField({ nullable: true, defaultValue: '0x' })
  data: string;

  @Bytes8Field({ nullable: true })
  salt?: TxSalt;

  @Uint256BnField({ nullable: true })
  gasLimit?: BigNumber;
}

@ArgsType()
export class ApproveArgs extends UniqueProposalArgs {
  @BytesField()
  signature: string;
}

@ObjectType()
export class ApprovalResponse {
  @BytesField({ nullable: true })
  transactionHash?: BytesLike;
}

@ArgsType()
export class ApprovalRequest extends UniqueProposalArgs {
  @NonEmptyAddressSetField()
  approvers: Set<Address>;
}
