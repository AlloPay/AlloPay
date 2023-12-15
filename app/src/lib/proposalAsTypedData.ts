import { FragmentType, gql, useFragment as getFragment } from '@api/generated';
import Decimal from 'decimal.js';
import { Operation, asAddress, asTypedData } from 'lib';

const TransactionProposal = gql(/* GraphQL */ `
  fragment proposalAsTypedData_TransactionProposal on TransactionProposal {
    id
    account {
      id
      address
    }
    operations {
      to
      value
      data
    }
    nonce
    gasLimit
    feeToken {
      id
      address
    }
    paymaster
    paymasterEthFee
  }
`);

export function proposalAsTypedData(proposalFragment: FragmentType<typeof TransactionProposal>) {
  const p = getFragment(TransactionProposal, proposalFragment);

  return asTypedData(p.account.address, {
    operations: p.operations.map(
      (op): Operation => ({
        to: op.to,
        value: op.value ? BigInt(op.value) : undefined,
        data: op.data || undefined,
      }),
    ) as [Operation, ...Operation[]],
    nonce: BigInt(p.nonce),
    gas: BigInt(p.gasLimit),
    feeToken: asAddress(p.feeToken.address),
    paymaster: asAddress(p.paymaster),
    paymasterEthFee: new Decimal(p.paymasterEthFee),
  });
}
