import { Address, store } from '@graphprotocol/graph-ts';
import { UserRemoved, UserUpserted } from '../generated/Account/Account';
import { Account, User, UserConfig } from '../generated/schema';
import { getOrCreateAccountWithoutImpl } from './account';

export function handleUserUpserted(e: UserUpserted): void {
  const account = getOrCreateAccountWithoutImpl(e.address, e.block);

  const id = getUserId(account, e.params.user.addr);
  let user = User.load(id);
  if (!user) {
    user = new User(id);
    user.account = account.id;
    user.addr = e.params.user.addr;
    user.configs = [];
    user.save();
  }

  const configIds: string[] = [];
  const configs = e.params.user.configs;
  for (let i = 0; i < configs.length; ++i) {
    const ce = configs[i];

    const configId = `${e.block.hash.toHex()}-${e.logIndex}`;
    configIds.push(configId);

    const config = new UserConfig(configId);
    config.user = user.id;
    config.approvers = [];

    for (let ai = 0; ai < ce.approvers.length; ++ai) {
      config.approvers.push(ce.approvers[ai]);
    }
  }

  user.configs = configIds;
  user.save();
}

export function handleUserRemoved(e: UserRemoved): void {
  const account = getOrCreateAccountWithoutImpl(e.address, e.block);

  const id = getUserId(account, e.params.user);
  if (User.load(id)) store.remove('User', id);
}

function getUserId(account: Account, addr: Address): string {
  // {account.id}-{addr}
  return `${account.id.toHex()}-${addr.toHex()}`;
}
