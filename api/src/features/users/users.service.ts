import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { ShapeFunc } from '../database/database.select';
import e from '~/edgeql-js';
import { UpdateUserInput } from './users.input';
import { InjectRedis } from '@songkeys/nestjs-redis';
import Redis from 'ioredis';
import { randomBytes } from 'crypto';
import { uuid } from 'edgedb/dist/codecs/ifaces';
import { UserInputError } from '@nestjs/apollo';
import { AccountsCacheService } from '../auth/accounts.cache.service';
import { Address } from 'lib';
import { PubsubService } from '../util/pubsub/pubsub.service';
import { getUserCtx } from '~/request/ctx';
import { Mutex } from 'redis-semaphore';

export interface UserSubscriptionPayload {}
const getUserTrigger = (user: uuid) => `user.${user}`;
const getUserApproverTrigger = (approver: Address) => `user.approver.${approver}`;

@Injectable()
export class UsersService {
  constructor(
    private db: DatabaseService,
    @InjectRedis()
    private redis: Redis,
    private pubsub: PubsubService,
    private accountsCache: AccountsCacheService,
  ) {}

  async selectUnique(shape?: ShapeFunc<typeof e.global.current_user>) {
    return this.db.query(
      e.select(e.global.current_user, (u) => ({
        ...shape?.(u),
      })),
    );
  }

  async update({ name, photoUri }: UpdateUserInput) {
    return this.db.query(
      e.update(e.global.current_user, () => ({
        set: { name, photoUri: photoUri?.href },
      })),
    );
  }

  async subscribeToUser() {
    const user = await this.db.query(
      e.assert_exists(e.select(e.global.current_user, () => ({ id: true }))).id,
    );

    return this.pubsub.asyncIterator([
      getUserTrigger(user),
      getUserApproverTrigger(getUserCtx().approver),
    ]);
  }

  async getLinkingToken(user: uuid) {
    const mutex = new Mutex(this.redis, `getLinkingToken:${user}`, {
      lockTimeout: 5_000,
      acquireTimeout: 60_000,
    });

    try {
      await mutex.acquire();
      const key = this.getLinkingTokenKey(user);

      let secret = await this.redis.get(key);
      if (!secret) {
        secret = randomBytes(32).toString('hex');
        await this.redis.set(key, secret, 'EX', 60 * 60 /* 1 hour */);
      }

      return `${user}:${secret}`;
    } finally {
      await mutex.release();
    }
  }

  async link(token: string) {
    const [oldUser, secret] = token.split(':');

    const expectedSecret = await this.redis.get(this.getLinkingTokenKey(oldUser));
    if (secret !== expectedSecret)
      throw new UserInputError(`Invalid linking token; token may have expired (1h)`);

    const newUser = await this.db.query(
      e.assert_exists(e.select(e.global.current_user, () => ({ id: true }))).id,
    );
    if (oldUser === newUser) return;

    const approvers = await this.db.DANGEROUS_superuserClient.transaction(async (db) => {
      const selectNewUser = e.select(e.User, () => ({ filter_single: { id: newUser } }));

      // Pair with the user - merging their approvers into the current user
      const approvers = await e
        .select({
          approvers: e.select(
            e.update(e.Approver, (a) => ({
              filter: e.op(a.user.id, '=', e.cast(e.uuid, oldUser)),
              set: { user: selectNewUser },
            })),
            () => ({ address: true }),
          ).address,
          newUserUpdate: e.update(e.User, (u) => ({
            filter_single: { id: newUser },
            set: {
              name: e.op(
                u.name,
                'if',
                e.op('exists', u.name),
                'else',
                e.select(e.User, () => ({ filter_single: { id: oldUser }, name: true })).name,
              ),
              photoUri: e.op(
                u.photoUri,
                'if',
                e.op('exists', u.photoUri),
                'else',
                e.select(e.User, () => ({ filter_single: { id: oldUser }, photoUri: true }))
                  .photoUri,
              ),
            },
          })),
          oldUserRiskLabels: e.update(e.ProposalRiskLabel, (l) => ({
            filter: e.op(
              l.user,
              '=',
              e.select(e.User, () => ({ filter_single: { id: oldUser } })),
            ),
            set: {
              user: selectNewUser,
            },
          })),
        })
        .approvers.run(db);

      // Delete old user
      await e.delete(e.User, () => ({ filter_single: { id: oldUser } })).run(db);

      return approvers;
    });

    // Remove approver -> user cache
    await this.accountsCache.removeApproverUserCache(...(approvers as Address[]));
    await Promise.all([
      this.pubsub.publish<UserSubscriptionPayload>(getUserTrigger(newUser), {}),
      ...approvers.map((approver) =>
        this.pubsub.publish<UserSubscriptionPayload>(
          getUserApproverTrigger(approver as Address),
          {},
        ),
      ),
    ]);

    // Remove user -> accounts cache for both old & new user
    await this.accountsCache.removeUserAccountsCache(oldUser, newUser);

    // Remove token
    await this.redis.del(this.getLinkingTokenKey(oldUser));
  }

  private getLinkingTokenKey(user: uuid) {
    return `linking-token:${user}`;
  }
}
