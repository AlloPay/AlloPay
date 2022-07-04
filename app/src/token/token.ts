import { BigNumber } from 'ethers';
import {
  address,
  Address,
  Addresslike,
  createOp,
  Erc20,
  Erc20__factory,
  Op,
} from 'lib';
import _ from 'lodash';
import { CHAIN, PROVIDER } from '~/provider';

export type TokenType = 'ETH' | 'ERC20';

export interface Token {
  type: TokenType;
  name: string;
  symbol: string;
  decimals: number;
  addr: Address; // Current chain address
  addresses: Partial<Record<'mainnet' | 'testnet', Address>>;
  iconUri: string;
}

type TokenDef = Pick<Token, 'name' | 'symbol' | 'decimals'> & {
  type?: TokenType;
  addresses: Partial<Record<'mainnet' | 'testnet', Addresslike>>;
  iconUri?: string;
};

export const createToken = (def: TokenDef): Token => {
  const addresses = _.mapValues(def.addresses, address);
  const addr = address(def.addresses[CHAIN.name]);

  const token: Token = {
    type: 'ERC20',
    ...def,
    addr,
    addresses,
    iconUri:
      def.iconUri ??
      `https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/${def.addresses.mainnet}/logo.png`,
  };

  return token;
};

export const getTokenContract = (token: Token): Erc20 =>
  Erc20__factory.connect(token.addr, PROVIDER);

export const createTransferOp = (
  token: Token,
  to: Address,
  amount: BigNumber,
): Op => {
  const op: Partial<Op> =
    token.type === 'ERC20'
      ? {
          // ERC20
          to: token.addr,
          data: getTokenContract(token).interface.encodeFunctionData(
            'transfer',
            [to, amount],
          ),
        }
      : {
          // ETH
          to,
          value: amount,
        };

  return createOp(op);
};
