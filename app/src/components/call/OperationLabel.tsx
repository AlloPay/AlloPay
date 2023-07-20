import { match, P } from 'ts-pattern';
import { useAddressLabel } from '../address/AddressLabel';
import { usePolicy } from '@api/policy';
import { useFormattedTokenAmount } from '../token/TokenAmount';
import { FragmentType, gql, useFragment } from '@api/gen';

const FragmentDoc = gql(/* GraphQL */ `
  fragment OperationLabel_OperationFragment on Operation {
    to
    function {
      __typename
      ... on GenericOp {
        _name
        _args
      }
      ... on AddPolicyOp {
        account
        key
      }
      ... on RemovePolicyOp {
        account
        key
      }
      ... on TransferOp {
        token
        to
        amount
      }
      ... on TransferFromOp {
        token
        from
        to
        amount
      }
      ... on TransferApprovalOp {
        token
        spender
        amount
      }
      ... on SwapOp {
        fromToken
        fromAmount
        toToken
        minimumToAmount
        deadline
      }
    }
  }
`);

export interface OperationLabelProps {
  operation: FragmentType<typeof FragmentDoc>;
}

export function OperationLabel(props: OperationLabelProps) {
  const op = useFragment(FragmentDoc, props.operation);

  return match(op.function)
    .with({ __typename: 'AddPolicyOp' }, (f) => `Add policy: ${usePolicy(f)?.name}`)
    .with({ __typename: 'RemovePolicyOp' }, (f) => `Remove policy: ${usePolicy(f)?.name}`)
    .with(
      { __typename: 'TransferOp' },
      (f) => `Transfer ${useFormattedTokenAmount(f)} to ${useAddressLabel(f.to)}`,
    )
    .with(
      { __typename: 'TransferFromOp' },
      (f) => `Transfer ${useAddressLabel(f.token)} from ${useAddressLabel(f.from)}`,
    )
    .with(
      { __typename: 'TransferApprovalOp' },
      (f) => `Allow ${useAddressLabel(f.spender)} to spend ${useAddressLabel(f.token)}`,
    )
    .with(
      { __typename: 'SwapOp' },
      (f) => `Swap ${useAddressLabel(f.fromToken)} for ${useAddressLabel(f.toToken)}`,
    )
    .with({ __typename: 'GenericOp' }, (f) => `Call ${f._name} on ${useAddressLabel(op.to)}`)
    .with(P.nullish, () => `Call ${useAddressLabel(op.to)}`)
    .exhaustive();
}
