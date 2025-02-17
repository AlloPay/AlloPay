import { Chain, isChain } from 'chains';
import { addressMap } from './util';
import { Address, ETH_ADDRESS, asUAddress } from '../address';
import { Hex } from '../bytes';
import { isPresent } from '../util/arrays';

export interface Token {
  name: string;
  symbol: string;
  decimals: number;
  units?: { symbol: string; decimals: number }[];
  address: Partial<Record<Chain, Address>>;
  icon?: string;
  isFeeToken?: boolean;
  pythUsdPriceId?: Hex;
}

export const ETH = {
  name: 'Ether',
  symbol: 'ETH',
  decimals: 18,
  units: [
    { symbol: 'WEI', decimals: 0 },
    { symbol: 'GWEI', decimals: 9 },
  ],
  address: addressMap({
    zksync: ETH_ADDRESS,
    'zksync-sepolia': ETH_ADDRESS,
  }),
  icon: icon('ETH.webp'),
  isFeeToken: true,
  pythUsdPriceId: '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace',
} satisfies Token;

export const WETH = {
  name: 'Wrapped ETH',
  symbol: 'WETH',
  decimals: 18,
  units: [
    { symbol: 'WWEI', decimals: 0 },
    { symbol: 'WGWEI', decimals: 9 },
  ],
  address: addressMap({
    zksync: '0xf00DAD97284D0c6F06dc4Db3c32454D4292c6813',
    'zksync-sepolia': '0x701f3B10b5Cc30CA731fb97459175f45E0ac1247',
  }),
  icon: icon('WETH.webp'),
  isFeeToken: true,
  pythUsdPriceId: '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace',
} satisfies Token;

export const USDC = {
  name: 'USD Coin',
  symbol: 'USDC',
  decimals: 6,
  address: addressMap({
    zksync: '0x1d17CBcF0D6D143135aE902365D2E5e2A16538D4',
    'zksync-sepolia': '0xAe045DE5638162fa134807Cb558E15A3F5A7F853',
  }),
  icon: icon(`USDC.svg`),
  isFeeToken: true,
  pythUsdPriceId: '0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a',
} satisfies Token;

export const USDC_E = {
  name: 'USD Coin (Bridged)',
  symbol: 'USDC.e',
  decimals: 6,
  address: addressMap({
    zksync: '0x3355df6D4c9C3035724Fd0e3914dE96A5a83aaf4',
    'zksync-sepolia': '0xd45ab0E1dc7F503Eb177949c2Fb2Ab772B4B6CFC',
  }),
  icon: icon(`USDC.svg`),
  isFeeToken: true,
  pythUsdPriceId: '0xeaa020c61cc479712813461ce153894a96a6c00b21ed0cfc2798d1f9a9e9c94a',
} satisfies Token;

export const USDT = {
  name: 'Tether USD',
  symbol: 'USDT',
  decimals: 6,
  address: addressMap({
    zksync: '0x493257fD37EDB34451f62EDf8D2a0C418852bA4C',
    'zksync-sepolia': '0x8C9d66bA3E1D7681cfFFfa3C7d9807adae368E74',
  }),
  icon: icon(`USDT.svg`),
  pythUsdPriceId: '0x2b89b9dc8fdf9f34709a5b106b472f0f39bb6ca9ce04b0fd7f2e971688e2e53b',
} satisfies Token;

export const DAI = {
  name: 'Dai',
  symbol: 'DAI',
  decimals: 18,
  address: addressMap({
    zksync: '0x4B9eb6c0b6ea15176BBF62841C6B2A8a398cb656',
  }),
  icon: icon(`DAI.svg`),
  isFeeToken: true,
  pythUsdPriceId: '0xb0948a5e5313200c632b51bb5ca32f6de0d36e9950a942d19751e833f70dabfd',
} satisfies Token;

export const WBTC = {
  name: 'Wrapped Bitcoin',
  symbol: 'wBTC',
  decimals: 8,
  address: addressMap({
    zksync: '0xBBeB516fb02a01611cBBE0453Fe3c580D7281011',
    'zksync-sepolia': '0xBD1AAA3058613dDA84Ca2BC590f39d85aD7AdB48',
  }),
  icon: icon(`WBTC.svg`),
  pythUsdPriceId: '0xc9d8b075a5c69303365ae23633d4e085199bf5c520a3b90fed1322a0342ffc33',
} satisfies Token;

export const RETH = {
  name: 'Rocket Pool ETH',
  symbol: 'rETH',
  decimals: 18,
  address: addressMap({
    zksync: '0x32Fd44bB869620C0EF993754c8a00Be67C464806',
  }),
  icon: icon(`rETH.webp`),
  isFeeToken: true,
  pythUsdPriceId: '0xa0255134973f4fdf2f8f7808354274a3b1ebc6ee438be898d045e8b56ba1fe13',
} satisfies Token;

export const CBETH = {
  name: 'Coinbase Wrapped Staken ETH',
  symbol: 'cbETH',
  decimals: 18,
  address: addressMap({
    zksync: '0x75Af292c1c9a37b3EA2E6041168B4E48875b9ED5',
  }),
  icon: icon(`cbETH.webp`),
  isFeeToken: true,
  pythUsdPriceId: '0x15ecddd26d49e1a8f1de9376ebebc03916ede873447c1255d2d5891b92ce5717',
} satisfies Token;

export const UNI = {
  name: 'Uniswap',
  symbol: 'UNI',
  decimals: 18,
  address: {
    zksync: '0x1C6f53185061D7cC387E481c350aD00C2C876f3E',
    'zksync-sepolia': '0xe1134444211593Cfda9fc9eCc7B43208615556E2',
  },
  icon: icon('UNI.webp'),
  pythUsdPriceId: '0x0bbf28e9a841a1cc788f6a361b17ca072d0ea3098a1e5df1c3922d06719579ff',
} satisfies Token;

export const SHIB = {
  name: 'SHIBA INU',
  symbol: 'SHIB',
  decimals: 18,
  address: {
    zksync: '0x5B09802d62d213c4503B4b1Ef5F727ef62c9F4eF',
    'zksync-sepolia': '0xE0eF1c039a36eC77339E7277ECd4D48e57b61eec',
  },
  icon: icon('SHIB.webp'),
  pythUsdPriceId: '0xf0d57deca57b3da2fe63a493f4c25925fdfd8edf834b20f93e1f84dbd1504d4a',
} satisfies Token;

const LINK = {
  name: 'Chainlink',
  symbol: 'LINK',
  decimals: 18,
  address: {
    zksync: '0x52869bae3E091e36b0915941577F2D47d8d8B534',
    'zksync-sepolia': '0x23A1aFD896c8c8876AF46aDc38521f4432658d1e',
  },
  icon: icon('LINK.webp'),
  pythUsdPriceId: '0x8ac0c70fff57e9aefdf5edf44b51d62c2d433653cbb2cf5cc06bb115af04d221',
} satisfies Token;

export const TOKENS = [ETH, WETH, USDC, USDC_E, USDT, DAI, WBTC, RETH, CBETH, UNI, SHIB, LINK] satisfies Token[];

export function flattenToken(t: Token) {
  return Object.keys(t.address)
    .map((chain) => {
      if (!isChain(chain)) throw new Error(`Unexpected token address map chain ${chain}`);
      const address = asUAddress(t.address[chain], chain);
      if (!address) return undefined;

      return { ...t, address };
    })
    .filter(isPresent);
}

function icon(file: string) {
  return `https://raw.githubusercontent.com/zallo-labs/tokens/main/icons/${file}`;
}
