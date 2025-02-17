import { Parent, Resolver } from '@nestjs/graphql';
import { ComputedField } from '~/common/decorators/computed.decorator';
import e, { $infer } from '~/edgeql-js';
import { Operation, OperationFunction } from './operations.model';
import { OperationsService } from './operations.service';
import { Shape } from '~/core/database';
import { asAddress, asHex } from 'lib';
import { getChainConfig } from 'chains';

const functionDeps = {
  to: true,
  value: true,
  data: true,
  '<unorderedOperations[is Transaction]': { account: { chain: true } },
} satisfies Shape<typeof e.Operation>;

const s = e.select(e.Operation, () => functionDeps);
export type FunctionDeps = $infer<typeof s>[0];

@Resolver(() => Operation)
export class OperationsResolver {
  constructor(private service: OperationsService) {}

  @ComputedField<typeof e.Operation>(() => OperationFunction, functionDeps, { nullable: true })
  async function(@Parent() deps: FunctionDeps) {
    return this.service.decode(
      {
        to: asAddress(deps.to),
        value: deps.value ?? undefined,
        data: asHex(deps.data),
      },
      getChainConfig(deps['<unorderedOperations[is Transaction]']!.account.chain).key,
    );
  }
}
