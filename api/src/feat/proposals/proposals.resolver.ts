import { Args, Context, Info, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { GraphQLResolveInfo } from 'graphql';
import { InputArgs, Input } from '~/common/decorators/input.decorator';
import { GqlContext } from '~/core/apollo/ctx';
import { asUser, getUserCtx } from '~/core/context';
import { getShape } from '~/core/database';
import { UniqueProposalInput, ProposalUpdatedInput, UpdateProposalInput } from './proposals.input';
import { Proposal, ProposalUpdated } from './proposals.model';
import { ProposalsService, ProposalUpdatedPayload, proposalTrigger } from './proposals.service';
import { PubsubService } from '~/core/pubsub/pubsub.service';
import { NodeArgs } from '../nodes/nodes.input';

@Resolver(() => Proposal)
export class ProposalsResolver {
  constructor(
    private service: ProposalsService,
    private pubsub: PubsubService,
  ) {}

  @Query(() => Proposal, { nullable: true })
  async proposal(@Args() { id }: NodeArgs, @Info() info: GraphQLResolveInfo) {
    return this.service.selectUnique(id, getShape(info));
  }

  @Mutation(() => Proposal)
  async rejectProposal(@Input() { id }: UniqueProposalInput, @Info() info: GraphQLResolveInfo) {
    await this.service.reject(id);
    return this.service.selectUnique(id, getShape(info));
  }

  @Mutation(() => Proposal)
  async updateProposal(@Input() input: UpdateProposalInput, @Info() info: GraphQLResolveInfo) {
    await this.service.update(input);
    return this.service.selectUnique(input.id, getShape(info));
  }

  @Subscription(() => ProposalUpdated, {
    filter: (
      { id, event }: ProposalUpdatedPayload,
      { input: { proposals, events } }: InputArgs<ProposalUpdatedInput>,
    ) => (!proposals || proposals?.includes(id)) && (!events || events.includes(event)),
    async resolve(
      this: ProposalsResolver,
      { id, account, event }: ProposalUpdatedPayload,
      _input,
      ctx: GqlContext,
      info: GraphQLResolveInfo,
    ) {
      return asUser(ctx, async () => ({
        id: `${id}:${event}`,
        account,
        event,
        proposal: await this.service.selectUnique(id, (p) => getShape(info)(p, 'proposal')),
      }));
    },
  })
  async proposalUpdated(
    @Input({ defaultValue: {} }) { accounts }: ProposalUpdatedInput,
    @Context() ctx: GqlContext,
  ) {
    return asUser(ctx, async () => {
      if (!accounts?.length) accounts = getUserCtx().accounts.map((a) => a.address);

      return this.pubsub.asyncIterator(accounts.map(proposalTrigger));
    });
  }
}
