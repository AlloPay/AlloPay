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
import { Address, asAddress } from 'lib';
import { PubsubService } from '../util/pubsub/pubsub.service';
import { getUserCtx } from '#/util/context';
import { selectAccount } from '~/features/accounts/accounts.util';

const TOKEN_EXPIRY_S = 60 * 60; // 1 hour

export interface UserLinkedPayload {
  issuer: Address;
  linker: Address;
}
const getUserLinkedTrigger = (user: uuid) => `user-linked:${user}`;

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

  async update({ primaryAccount }: UpdateUserInput) {
    return this.db.query(
      e.update(e.global.current_user, () => ({
        set: { primaryAccount: primaryAccount && selectAccount(primaryAccount) },
      })),
    );
  }

  async subscribeToUser() {
    const user = await this.db.query(e.assert_exists(e.select(e.global.current_user.id)));

    return this.pubsub.asyncIterator([getUserLinkedTrigger(user)]);
  }

  async generateLinkingToken() {
    const issuer = getUserCtx().approver;
    const key = this.getLinkingTokenKey(issuer);
    const newSecret = randomBytes(16).toString('base64');

    const z = await this.redis
      .multi()
      .set(key, newSecret, 'NX', 'GET') // get if exists or set if not
      .expire(key, TOKEN_EXPIRY_S)
      .exec();
    if (!z) throw new Error('Failed to generate linking token');
    const secret = z[0][1] ?? newSecret;

    return `${issuer}:${secret}`;
  }

  async link(token: string) {
    const [issuerStr, secret] = token.split(':');
    const issuer = asAddress(issuerStr);

    if (secret !== (await this.redis.get(this.getLinkingTokenKey(issuer))))
      throw new UserInputError(`Invalid linking token; token may have expired (1h)`);

    const linkerUserId = getUserCtx().id;
    const { issuerUser, issuerApprovers } = await this.db.DANGEROUS_superuserClient.transaction(
      async (db) => {
        const selectSrcApprover = e.select(e.Approver, () => ({
          filter_single: { address: issuer },
        }));
        const issuerUser = e.assert_single(
          e.select(selectSrcApprover.user, (u) => ({
            filter: e.op(u.id, '!=', e.uuid(linkerUserId)),
          })),
        );
        const linkerUser = e.select(e.User, () => ({ filter_single: { id: linkerUserId } }));

        // Merge issuer into linker (avoiding exclusivity constraint violations)
        const r = await e
          .select({
            issuerUser: issuerUser.id,
            issuerApprovers: e.update(issuerUser.approvers, () => ({ set: { user: linkerUser } }))
              .address,
            contacts: e.update(issuerUser.contacts, (c) => ({
              filter: e.op(c.label, 'not in', linkerUser.contacts.label),
              set: { user: linkerUser },
            })),
          })
          .run(db);

        // Delete old issuer user
        if (r.issuerUser) await e.delete(issuerUser).run(db);

        return r;
      },
    );

    if (issuerUser) {
      this.accountsCache.invalidateApproversCache(...(issuerApprovers as Address[]));
      this.accountsCache.invalidateUsersCache(issuerUser, linkerUserId);

      const payload: UserLinkedPayload = { issuer, linker: getUserCtx().approver };
      this.pubsub.publish<UserLinkedPayload>(getUserLinkedTrigger(issuerUser), payload);
      this.pubsub.publish<UserLinkedPayload>(getUserLinkedTrigger(linkerUserId), payload);
    }

    await this.redis.del(this.getLinkingTokenKey(issuer));
  }

  private getLinkingTokenKey(issuer: Address) {
    return `link:${issuer}`;
  }
}
