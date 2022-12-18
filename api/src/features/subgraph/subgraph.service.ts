import { Injectable } from '@nestjs/common';
import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client';
import { RetryLink } from '@apollo/client/link/retry';
import fetch from 'cross-fetch';
import { CONFIG } from '~/config';
import {
  TransactionResponseQuery,
  TransactionResponseQueryVariables,
} from '@gen/generated.subgraph';
import { TRANSACTION_RESPONSES_QUERY } from './subgraph.gql';
import { Prisma } from '@prisma/client';

@Injectable()
export class SubgraphService {
  private client = new ApolloClient({
    link: ApolloLink.from([
      new RetryLink(),
      new HttpLink({
        uri: CONFIG.subgraphGqlUrl,
        fetch,
      }),
    ]),
    cache: new InMemoryCache(),
    defaultOptions: {
      query: { fetchPolicy: 'no-cache' },
      watchQuery: { fetchPolicy: 'no-cache' },
      mutate: { fetchPolicy: 'no-cache' },
    },
  });

  async transactionResponse(
    transactionHash: string,
  ): Promise<Prisma.TransactionResponseUncheckedCreateInput | undefined> {
    const { data } = await this.client.query<
      TransactionResponseQuery,
      TransactionResponseQueryVariables
    >({
      query: TRANSACTION_RESPONSES_QUERY,
      variables: { transactionHash },
    });

    const t = data.transaction;
    if (!t) return undefined;

    return {
      transactionHash,
      response: t.response,
      success: t.success,
      timestamp: new Date(parseFloat(t.timestamp) * 1000),
    };
  }
}
