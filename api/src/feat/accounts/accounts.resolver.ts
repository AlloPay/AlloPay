import {
  Args,
  Context,
  Info,
  Mutation,
  Parent,
  Query,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import {
  AccountArgs,
  UpdateAccountInput,
  CreateAccountInput,
  AccountUpdatedInput,
  NameAvailableArgs,
  AccountsInput,
} from './accounts.input';
import { GqlContext } from '~/core/apollo/ctx';
import { asUser, getApprover, getUserCtx } from '~/core/context';
import { Account, AccountUpdated } from './accounts.model';
import { AccountUpdatedPayload, AccountsService } from './accounts.service';
import { getShape } from '~/core/database';
import { Input, InputArgs } from '~/common/decorators/input.decorator';
import { AccountsCacheService } from '../auth/accounts.cache.service';
import { ComputedField } from '~/common/decorators/computed.decorator';
import e from '~/edgeql-js';
import { Transfer } from '../transfers/transfers.model';
import { TransfersInput } from '../transfers/transfers.input';
import { TransfersService } from '../transfers/transfers.service';
import { ProposalsInput } from '~/feat/proposals/proposals.input';
import { ProposalsService } from '~/feat/proposals/proposals.service';
import { Proposal } from '~/feat/proposals/proposals.model';

@Resolver(() => Account)
export class AccountsResolver {
  constructor(
    private service: AccountsService,
    private accountsCache: AccountsCacheService,
    private transfersService: TransfersService,
    private proposalsService: ProposalsService,
  ) {}

  @Query(() => Account, { nullable: true })
  async account(@Args() { address }: AccountArgs, @Info() info: GraphQLResolveInfo) {
    return this.service.selectUnique(address, getShape(info));
  }

  @Query(() => [Account])
  async accounts(
    @Input({ defaultValue: {} }) input: AccountsInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.service.select(input, getShape(info));
  }

  @Query(() => Boolean)
  async nameAvailable(@Args() { name }: NameAvailableArgs) {
    return this.service.nameAvailable(name);
  }

  @Mutation(() => Account)
  async createAccount(@Input() input: CreateAccountInput, @Info() info: GraphQLResolveInfo) {
    const { address } = await this.service.createAccount(input);
    return this.service.selectUnique(address, getShape(info));
  }

  @Mutation(() => Account)
  async updateAccount(@Input() input: UpdateAccountInput, @Info() info: GraphQLResolveInfo) {
    await this.service.updateAccount(input);
    return this.service.selectUnique(input.account, getShape(info));
  }

  @ComputedField<typeof e.Account>(() => [Transfer], { id: true })
  transfers(
    @Parent() { id }: Account,
    @Input({ defaultValue: {} }) input: TransfersInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.transfersService.select(id, input, getShape(info));
  }

  @ComputedField<typeof e.Account>(() => [Proposal], { id: true })
  proposals(
    @Parent() { id }: Account,
    @Input({ defaultValue: {} }) input: ProposalsInput,
    @Info() info: GraphQLResolveInfo,
  ) {
    return this.proposalsService.select(id, input, getShape(info));
  }

  @Subscription(() => AccountUpdated, {
    filter: (
      { event }: AccountUpdatedPayload,
      { input: { events } }: InputArgs<AccountUpdatedInput>,
    ) => !events || events.includes(event),
    resolve(
      this: AccountsResolver,
      { account, event }: AccountUpdatedPayload,
      _input,
      ctx: GqlContext,
      info: GraphQLResolveInfo,
    ) {
      return asUser(ctx, async () => {
        // Context will not include newly created account (yet), as it was created on subscription
        getUserCtx().accounts = await this.accountsCache.getApproverAccounts(getApprover());

        return {
          id: `${account}:${event}`,
          event,
          account: await this.service.selectUnique(account, (a) => getShape(info)(a, 'account')),
        };
      });
    },
  })
  async accountUpdated(
    @Input({ defaultValue: {} }) input: AccountUpdatedInput,
    @Context() ctx: GqlContext,
  ) {
    return asUser(ctx, () => this.service.subscribe(input));
  }
}
