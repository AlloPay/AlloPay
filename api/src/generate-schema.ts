import { NestFactory } from '@nestjs/core';
import { GraphQLSchemaBuilderModule, GraphQLSchemaFactory } from '@nestjs/graphql';
import { writeFileSync } from 'fs';
import { printSchema } from 'graphql';
import { join } from 'path';
import type {} from './request/request';
import { AccountsResolver } from './features/accounts/accounts.resolver';
import { ApproversResolver } from './features/approvers/approvers.resolver';
import { CommentsResolver } from './features/comments/comments.resolver';
import { ContactsResolver } from './features/contacts/contacts.resolver';
import { ContractsResolver } from './features/contracts/contracts.resolver';
import { ContractFunctionsResolver } from './features/contract-methods/contract-functions.resolver';
import { UsersResolver } from './features/users/users.resolver';
import { FaucetResolver } from './features/faucet/faucet.resolver';
import { ProposalsResolver } from './features/proposals/proposals.resolver';
import { ReactionsResolver } from './features/reactions/reactions.resolver';
import { TransactionsResolver } from './features/transactions/transactions.resolver';
import { PoliciesResolver } from './features/policies/policies.resolver';

const resolvers = [
  AccountsResolver,
  ApproversResolver,
  CommentsResolver,
  ContactsResolver,
  ContractsResolver,
  ContractFunctionsResolver,
  FaucetResolver,
  PoliciesResolver,
  ProposalsResolver,
  ReactionsResolver,
  TransactionsResolver,
  UsersResolver,
];

const main = async () => {
  const app = await NestFactory.create(GraphQLSchemaBuilderModule);
  await app.init();

  const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
  const schema = await gqlSchemaFactory.create(resolvers);

  writeFileSync(join(process.cwd(), '/schema.graphql'), printSchema(schema));
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
