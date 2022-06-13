import { ApolloLink, fromPromise, ServerError } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { NetworkError } from '@apollo/client/errors';
import { SiweMessage } from 'siwe';
import { tryAcquire, E_ALREADY_LOCKED, Mutex } from 'async-mutex';
import * as zk from 'zksync-web3';
import { CONFIG } from '~/config';
import { PROVIDER } from '~/provider';
import { useWallet } from '@features/wallet/useWallet';
import { atom, useRecoilState } from 'recoil';
import { getSecureStore, persistAtom } from '@util/persistAtom';
import { useCallback, useMemo } from 'react';

interface Token {
  message: SiweMessage;
  signature: string;
}

const fetchMutex = new Mutex();

const isServerError = (e?: NetworkError): e is ServerError =>
  e?.name === 'ServerError';

// https://test.com/abc/123 -> test.com; RN lacks URL support )':
const getHost = (url: string) => {
  const start = url.indexOf('//') + 2;
  const end = url.indexOf('/', start);
  return url.slice(start, end);
};

const fetchToken = async (wallet: zk.Wallet): Promise<Token> => {
  const nonceRes = await fetch(`${CONFIG.api.url}/auth/nonce`, {
    credentials: 'include',
  });
  const nonce = await nonceRes.text();

  const message = new SiweMessage({
    address: wallet.address,
    nonce,
    statement: 'Sign into MetaSafe',
    chainId: PROVIDER.network.chainId,
    version: '1',
    uri: CONFIG.api.url,
    domain: getHost(CONFIG.api.url),
  });

  return {
    message,
    signature: await wallet.signMessage(message.prepareMessage()),
  };
};

const apiTokenState = atom<Token | null>({
  key: 'apiToken',
  default: null,
  effects: [
    persistAtom({
      storage: getSecureStore(),
      ignoreDefault: true,
    }),
  ],
});

export const useAuthFlowLink = () => {
  const wallet = useWallet();
  const [token, setToken] = useRecoilState(apiTokenState);

  const reset = useCallback(async () => {
    // Ensure token is reset exactly once at any given time
    try {
      await tryAcquire(fetchMutex).runExclusive(async () => {
        setToken(await fetchToken(wallet));
      });
    } catch (e) {
      if (e === E_ALREADY_LOCKED) {
        await fetchMutex.waitForUnlock();
      } else {
        throw e;
      }
    }
  }, [wallet, setToken]);

  const authLink: ApolloLink = useMemo(
    () =>
      setContext(async (_request, prevContext) => {
        if (!token) await reset();

        return {
          ...prevContext,
          headers: {
            ...prevContext.headers,
            authorization: JSON.stringify(token),
          },
        };
      }),
    [reset, token],
  );

  const onUnauthorizedLink: ApolloLink = useMemo(
    () =>
      onError(({ networkError, forward, operation }) => {
        if (isServerError(networkError) && networkError.statusCode === 401) {
          fromPromise(reset()).flatMap(() => forward(operation));
        }
      }),
    [reset],
  );

  const link = useMemo(
    () => ApolloLink.from([authLink, onUnauthorizedLink]),
    [authLink, onUnauthorizedLink],
  );

  return link;
};
