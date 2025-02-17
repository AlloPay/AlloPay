import { Context, Info, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { LinkInput, UpdateUserInput } from './users.input';
import { User, UserLinked } from './users.model';
import { UsersService, UserLinkedPayload } from './users.service';
import { getShape } from '~/core/database';
import { Input } from '~/common/decorators/input.decorator';
import { ComputedField } from '~/common/decorators/computed.decorator';
import e from '~/edgeql-js';
import { GqlContext } from '~/core/apollo/ctx';
import { asUser } from '~/core/context';

@Resolver(() => User)
export class UsersResolver {
  constructor(private service: UsersService) {}

  @Query(() => User)
  async user(@Info() info: GraphQLResolveInfo) {
    return this.service.selectUnique(getShape(info));
  }

  @ComputedField<typeof e.User>(() => String, {})
  async linkingToken(): Promise<string> {
    return this.service.generateLinkingToken();
  }

  @Subscription(() => UserLinked, {
    name: 'userLinked',
    resolve(
      this: UsersResolver,
      { issuer, linker }: UserLinkedPayload,
      _input,
      ctx: GqlContext,
      info: GraphQLResolveInfo,
    ) {
      return {
        id: `${issuer}:${linker}`,
        user: asUser(ctx, () => this.service.selectUnique((u) => getShape(info)(u, 'user'))),
        issuer,
        linker,
      };
    },
  })
  async subscribeToUser(@Context() ctx: GqlContext) {
    return asUser(ctx, () => this.service.subscribeToUser());
  }

  @Mutation(() => User)
  async updateUser(@Input() input: UpdateUserInput, @Info() info: GraphQLResolveInfo) {
    await this.service.update(input);
    return this.service.selectUnique(getShape(info));
  }

  @Mutation(() => User)
  async link(@Input() { token }: LinkInput, @Info() info: GraphQLResolveInfo) {
    await this.service.link(token);
    return this.service.selectUnique(getShape(info));
  }
}
