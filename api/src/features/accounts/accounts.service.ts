import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  address,
  Address,
  deployAccountProxy,
  TokenLimit,
  TokenLimitPeriod,
  toDeploySalt,
  toQuorumKey,
} from 'lib';
import { PrismaService } from '../util/prisma/prisma.service';
import { ProviderService } from '~/features/util/provider/provider.service';
import { BigNumber } from 'ethers';
import { PubsubService } from '../util/pubsub/pubsub.service';
import assert from 'assert';
import {
  AccountSubscriptionPayload,
  ACCOUNT_SUBSCRIPTION,
  USER_ACCOUNT_SUBSCRIPTION,
} from './accounts.args';

@Injectable()
export class AccountsService {
  constructor(
    private prisma: PrismaService,
    private provider: ProviderService,
    private pubsub: PubsubService,
  ) {}

  findMany = this.prisma.asUser.account.findMany;

  async activateAccount<T extends Pick<Prisma.AccountUpdateArgs, 'select'>>(
    accountAddr: Address,
    updateArgs?: T,
  ) {
    const { impl, deploySalt, isActive, quorumStates } =
      await this.prisma.asUser.account.findUniqueOrThrow({
        where: { id: accountAddr },
        select: {
          impl: true,
          deploySalt: true,
          isActive: true,
          // Initialization quorums
          quorumStates: {
            where: { proposal: null },
            include: {
              approvers: true,
              limits: true,
            },
          },
        },
      });
    assert(!isActive);

    // Activate
    const r = await this.provider.useProxyFactory((factory) =>
      deployAccountProxy(
        {
          impl: address(impl),
          quorums: quorumStates.map((q) => ({
            key: toQuorumKey(q.quorumKey),
            // @ts-expect-error https://github.com/prisma/prisma/issues/17349
            approvers: new Set(q.approvers.map((a) => address(a.userId))),
            spending: {
              fallback: q.spendingFallback,
              limits: Object.fromEntries(
                // @ts-expect-error https://github.com/prisma/prisma/issues/17349
                q.limits.map((l): [Address, TokenLimit] => [
                  address(l.token),
                  {
                    token: address(l.token),
                    amount: BigNumber.from(l.amount),
                    period: l.period as TokenLimitPeriod,
                  },
                ]),
              ),
            },
          })),
        },
        factory,
        toDeploySalt(deploySalt),
      ),
    );
    await r.account.deployed();

    return this.prisma.asUser.account.update({
      where: { id: accountAddr },
      data: {
        isActive: true,
        quorums: {
          update: quorumStates.map((state) => ({
            where: {
              accountId_key: {
                accountId: state.accountId,
                key: state.quorumKey,
              },
            },
            data: {
              activeStateId: state.id,
            },
          })),
        },
      },
      ...updateArgs,
    }) as Prisma.Prisma__AccountClient<Prisma.AccountGetPayload<T>>;
  }

  async publishAccount(payload: AccountSubscriptionPayload) {
    const id = payload[ACCOUNT_SUBSCRIPTION].id;
    await this.pubsub.publish<AccountSubscriptionPayload>(`${ACCOUNT_SUBSCRIPTION}.${id}`, payload);

    // Publish account for each approver
    const { quorumStates } = await this.prisma.asUser.account.findUniqueOrThrow({
      where: { id },
      select: {
        quorumStates: {
          select: {
            approvers: { select: { userId: true } },
          },
        },
      },
    });
    const approvers = quorumStates.flatMap((state) => state.approvers.map((a) => a.userId));

    await Promise.all(
      approvers.map((user) =>
        this.pubsub.publish<AccountSubscriptionPayload>(
          `${USER_ACCOUNT_SUBSCRIPTION}.${user}`,
          payload,
        ),
      ),
    );
  }
}
