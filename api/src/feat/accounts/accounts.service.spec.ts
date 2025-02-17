import { createMock, DeepMocked } from '@golevelup/ts-jest';
import { Test } from '@nestjs/testing';
import { UserContext, asUser, getUserCtx } from '~/core/context';
import { randomAddress, randomLabel, randomUAddress, randomUser } from '~/util/test';
import { UAddress } from 'lib';
import { PoliciesService } from '../policies/policies.service';
import { BullModule, getQueueToken } from '@nestjs/bullmq';
import { ActivationsQueue } from '../activations/activations.queue';
import { DatabaseService } from '~/core/database';
import { AccountsService } from './accounts.service';
import e from '~/edgeql-js';
import { uuid } from 'edgedb/dist/codecs/ifaces';
import { AccountsCacheService } from '../auth/accounts.cache.service';
import { TypedQueue } from '~/core/bull/bull.util';
import { create2Address } from 'zksync-ethers/build/utils';

jest.mock('zksync-ethers/build/utils', () => ({
  ...jest.requireActual('zksync-ethers/build/utils'),
  create2Address: jest.fn(),
}));

const create2AddressMock = jest.mocked(create2Address);

describe(AccountsService.name, () => {
  let service: AccountsService;
  let db: DatabaseService;
  let policies: DeepMocked<PoliciesService>;
  let activationsQueue: DeepMocked<TypedQueue<typeof ActivationsQueue>>;
  let accountsCache: DeepMocked<AccountsCacheService>;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [BullModule.registerQueue(ActivationsQueue)],
      providers: [AccountsService, DatabaseService],
    })
      .overrideProvider(getQueueToken(ActivationsQueue.name))
      .useValue(createMock())
      .useMocker(createMock)
      .compile();
    service = module.get(AccountsService);
    db = module.get(DatabaseService);
    policies = module.get(PoliciesService);
    activationsQueue = module.get(getQueueToken(ActivationsQueue.name));
    accountsCache = module.get(AccountsCacheService);

    accountsCache.addCachedAccount.mockImplementation(async ({ approver, account }) => {
      const userCtx = getUserCtx();
      if (approver === userCtx.approver) userCtx.accounts.push(account);
    });
  });

  const createAccount = async () => {
    const userCtx = getUserCtx();

    create2AddressMock.mockReturnValue(randomAddress());

    return service.createAccount({
      chain: 'zksync-local',
      name: randomLabel(),
      policies: [{ approvers: [userCtx.approver] }],
    });
  };

  let user1: UserContext;
  let user1Account: UAddress;
  let user1AccountId: uuid;

  beforeEach(async () => {
    user1 = randomUser();

    await asUser(user1, async () => {
      const { id, address } = await createAccount();
      user1Account = address;
      user1AccountId = id;
    });
  });

  describe('createAccount', () => {
    it('creates an account', () =>
      asUser(user1, async () => {
        const query = e.select(e.Account, () => ({
          filter_single: { address: user1Account },
        }));
        expect(await query.run(db.client)).toBeTruthy();
      }));

    it('activates the account', () =>
      asUser(user1, async () => {
        // TODO: re-enable
        // expect(networks.deployProxy).toHaveBeenCalledTimes(1);
      }));
  });

  describe('account', () => {
    it('returns correct account', () =>
      asUser(user1, async () => {
        expect((await service.selectUnique(user1Account))?.id).toEqual(user1AccountId);
      }));

    it("returns null if the account doesn't exist", () =>
      asUser(user1, async () => {
        expect(await service.selectUnique(randomUAddress())).toBeNull();
      }));

    it("returns null if the user isn't a member of the account specified", () =>
      asUser(randomUser(), async () => {
        expect(await service.selectUnique(user1Account)).toBeNull();
      }));
  });

  describe('accounts', () => {
    it('returns user accounts', () =>
      asUser(user1, async () => {
        const accounts = (await service.select({})).map((acc) => acc.id);

        expect(accounts).toEqual(user1.accounts.map((a) => a.id));
      }));

    it("doesn't return accounts the user isn't a member of", async () => {
      const user2 = randomUser();
      await asUser(user2, async () => {
        await createAccount();
        const accounts = (await service.select({})).map((acc) => acc.id);

        expect(accounts).toEqual(user2.accounts.map((a) => a.id));
      });
    });
  });

  describe('updateAccountMetadata', () => {
    it('updates metadata', () =>
      asUser(user1, async () => {
        const newName = randomLabel();
        await service.updateAccount({ account: user1Account, name: newName });
        expect((await service.selectUnique(user1Account, () => ({ name: true })))?.name).toEqual(
          newName,
        );
      }));

    it('publishes account', () =>
      asUser(user1, async () => {
        const newLabel = randomLabel();
        service.event = jest.fn();
        await service.updateAccount({ account: user1Account, name: newLabel });
        expect(service.event).toBeCalledTimes(1);
      }));

    it('throws if user is not member of account being updated', () =>
      asUser(randomUser(), async () => {
        const newLabel = randomLabel();
        await expect(
          service.updateAccount({ account: user1Account, name: newLabel }),
        ).rejects.toThrow();
      }));
  });
});
