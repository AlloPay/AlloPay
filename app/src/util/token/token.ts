import assert from 'assert';
import {
  Address,
  Addresslike,
  createIsObj,
  Erc20,
  Erc20__factory,
  isAddress,
  ChainName,
  tryAsAddress,
} from 'lib';
import _ from 'lodash';
import { CHAIN, PROVIDER } from '~/util/network/provider';

export type TokenType = 'ETH' | 'ERC20';

export interface TokenUnit {
  symbol: string;
  decimals: number;
}

export interface Token extends TokenUnit {
  type: TokenType;
  name: string;
  symbol: string;
  decimals: number;
  address: Address; // Current chain address
  addresses: Partial<Record<'ethereum' | 'testnet', Address>>;
  iconUri: string;
  units: [TokenUnit, ...TokenUnit[]];
}

export const isToken = createIsObj<Token>(
  ['type', 'string'],
  ['name', 'string'],
  ['symbol', 'string'],
  ['decimals', 'number'],
  ['address', isAddress],
  ['iconUri', 'string'],
);

type TokenDef = Pick<Token, 'name' | 'symbol' | 'decimals'> & {
  type?: TokenType;
  addresses: Partial<Record<'ethereum' | ChainName, Addresslike>>;
  iconUri?: string;
  units?: TokenUnit[];
};

export const asToken = (def: TokenDef): Token => {
  const addresses = _.mapValues(def.addresses, tryAsAddress);

  const address = addresses[CHAIN.name];
  assert(address, `Token '${def.name}' doesn't support current chain '${CHAIN.name}'`);

  const baseUnit: TokenUnit = { symbol: def.symbol, decimals: def.decimals };

  return {
    type: 'ERC20',
    ...def,
    address,
    addresses,
    iconUri:
      def.iconUri ??
      `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${def.addresses.mainnet}/logo.png`,
    units: [baseUnit, ...(def.units ?? [])],
  };
};

export const ERC20_INTERFACE = Erc20__factory.createInterface();

export const getTokenContract = (token: Token): Erc20 =>
  Erc20__factory.connect(token.address, PROVIDER);

export const convertTokenAmount = (amount: bigint, prevToken: Token, newToken: Token): bigint => {
  const decimalsDiff = prevToken.decimals - newToken.decimals;
  if (decimalsDiff === 0) return amount;

  const factor = 10n ** BigInt(Math.abs(decimalsDiff));

  return decimalsDiff >= 0 ? amount / factor : amount * factor;
};
