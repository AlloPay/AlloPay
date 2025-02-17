import { Args, Info, Query, Resolver } from '@nestjs/graphql';
import { Node } from '~/common/decorators/interface.decorator';
import { DatabaseService } from '~/core/database';
import { GraphQLResolveInfo } from 'graphql';
import e from '~/edgeql-js';
import { getShape } from '~/core/database';
import { NodeArgs } from './nodes.input';
import * as uuid from 'uuid';

@Resolver(() => Node)
export class NodesResolver {
  constructor(private db: DatabaseService) {}

  @Query(() => Node, { nullable: true })
  async node(@Args() { id }: NodeArgs, @Info() info: GraphQLResolveInfo) {
    if (!uuid.validate(id)) throw new Error('Invalid ID');

    return this.db.queryWith(
      { id: e.uuid },
      ({ id }) =>
        e.select(e.Object, (n) => ({
          filter_single: { id },
          ...getShape(info)(n),
        })),
      { id },
    );
  }
}
