import { gql } from '@apollo/client';
import { Transfer } from './types';
import { useSuspenseQuery } from '~/gql/util';
import {
  TransferDirection,
  TransfersDocument,
  TransfersQuery,
  TransfersQueryVariables,
} from '@api/generated';
import { Address, asBigInt } from 'lib';
import { useMemo } from 'react';
import { DateTime } from 'luxon';

export const TRANSFER_FRAGMENT = gql`
  fragment TransferFragment on Transfer {
    id
    direction
    from
    to
    token
    amount
    timestamp
  }
`;

gql`
  ${TRANSFER_FRAGMENT}

  query Transfers($input: TransfersInput!) {
    transfers(input: $input) {
      ...TransferFragment
    }
  }
`;

export const useTransfers = (account: Address, direction?: TransferDirection) => {
  const { data, ...rest } = useSuspenseQuery<TransfersQuery, TransfersQueryVariables>(
    TransfersDocument,
    {
      variables: {
        input: {
          accounts: [account],
          direction,
        },
      },
    },
  );

  return useMemo(
    (): Transfer[] =>
      data.transfers.map((t) => ({
        id: t.id,
        direction: t.direction,
        token: t.token,
        from: t.from,
        to: t.to,
        amount: asBigInt(t.amount),
        timestamp: DateTime.fromISO(t.timestamp),
      })),
    [data],
  );
};
