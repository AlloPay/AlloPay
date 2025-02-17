import { Field, InputType, OmitType } from '@nestjs/graphql';
import { Address, Hex, PolicyKey, UAddress, UUID } from 'lib';
import { AddressField } from '~/common/scalars/Address.scalar';
import { Uint256Field } from '~/common/scalars/BigInt.scalar';
import { BytesField, BytesScalar } from '~/common/scalars/Bytes.scalar';
import { PolicyKeyField } from '~/common/scalars/PolicyKey.scalar';
import { DappMetadataInput, UniqueProposalInput } from '../proposals/proposals.input';
import { UAddressField } from '~/common/scalars/UAddress.scalar';
import { IdField } from '~/common/scalars/Id.scalar';
import { UrlField } from '~/common/scalars/Url.scalar';

@InputType()
export class OperationInput {
  @AddressField()
  to: Address;

  @Uint256Field({ nullable: true })
  value?: bigint;

  @BytesField({ nullable: true })
  data?: Hex;
}

@InputType()
export class PrepareTransactionInput {
  @UAddressField()
  account: UAddress;

  @Field(() => [OperationInput])
  operations: OperationInput[];

  @Field(() => Date, { nullable: true })
  timestamp?: Date;

  @Uint256Field({ nullable: true })
  gas?: bigint;

  @AddressField({ nullable: true })
  feeToken?: Address;

  @PolicyKeyField({ nullable: true })
  policy?: PolicyKey;
}

@InputType()
export class ProposeTransactionInput {
  @UAddressField()
  account: UAddress;

  @Field(() => [OperationInput])
  operations: OperationInput[];

  @Field(() => String, { nullable: true })
  label?: string;

  @UrlField({ nullable: true })
  icon?: string;

  @Field(() => DappMetadataInput, { nullable: true })
  dapp?: DappMetadataInput;

  @Field(() => Date, { nullable: true })
  timestamp?: Date;

  @Uint256Field({ nullable: true })
  gas?: bigint;

  @AddressField({ nullable: true })
  feeToken?: Address;

  @Field(() => BytesScalar, { nullable: true, description: 'Approve the proposal' })
  signature?: Hex;

  @PolicyKeyField({ nullable: true })
  policy?: PolicyKey;
}

@InputType()
export class ProposeCancelScheduledTransactionInput extends OmitType(ProposeTransactionInput, [
  'operations',
]) {
  @IdField()
  proposal: UUID;
}

@InputType()
export class UpdateTransactionInput extends UniqueProposalInput {
  @PolicyKeyField({ nullable: true })
  policy?: PolicyKey;

  @AddressField({ nullable: true })
  feeToken?: Address;
}

@InputType()
export class ExecuteTransactionInput extends UniqueProposalInput {
  @Field(() => Boolean, { nullable: true })
  ignoreSimulation?: boolean;
}
