import { BigNumber } from 'ethers';
import { Token } from './token';
import { PROVIDER } from '~/provider';
import { atomFamily, selectorFamily, useRecoilValue } from 'recoil';
import { Address, isPresent, ZERO } from 'lib';
import { captureException } from '@util/sentry/sentry';
import { allTokensSelector } from './useToken';
import { refreshAtom } from '@util/effect/refreshAtom';
import { useSelectedWallet } from '~/components2/wallet/useSelectedWallet';
import { persistAtom } from '@util/effect/persistAtom';

// [addr, token]
type BalanceKey = [Address | null, Address];

const fetch = async ([addr, token]: BalanceKey) => {
  try {
    if (!addr) return ZERO;

    return PROVIDER.getBalance(addr, undefined, token);
  } catch (e) {
    captureException(e, {
      level: 'error',
      extra: { token, addr },
    });
    return BigNumber.from(0);
  }
};

export const tokenBalanceState = atomFamily<BigNumber, BalanceKey>({
  key: 'tokenBalance',
  default: (key) => fetch(key),
  effects: (key) => [
    persistAtom(),
    refreshAtom({
      fetch: () => fetch(key),
      interval: 10 * 1000,
    }),
  ],
});

export const useTokenBalance = (token: Token, account: Address) => {
  const { accountAddr: selectedAccount } = useSelectedWallet();

  return useRecoilValue(
    tokenBalanceState([account ?? selectedAccount, token.addr]),
  );
};

export interface TokenWithBalance {
  token: Token;
  balance: BigNumber;
}

const tokenBalancesSelector = selectorFamily<
  TokenWithBalance[],
  Address | null
>({
  key: 'tokenBalances',
  get:
    (addr) =>
    ({ get }) => {
      if (!addr) return [];

      return get(allTokensSelector)
        .filter(isPresent)
        .map((token) => ({
          token,
          balance: get(tokenBalanceState([addr, token.addr])),
        }));
    },
});

export const useTokenBalances = (addr?: Address) =>
  useRecoilValue(tokenBalancesSelector(addr ?? null));
