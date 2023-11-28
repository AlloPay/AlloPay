import type { HardhatUserConfig } from 'hardhat/config';
import { CONFIG } from './config';
import { CHAINS } from 'chains';

import '@nomiclabs/hardhat-ethers';
import '@nomicfoundation/hardhat-viem';
import '@nomiclabs/hardhat-solhint'; // https://github.com/protofire/solhint/blob/master/docs/rules.md
import '@matterlabs/hardhat-zksync-toolbox';
import 'hardhat-gas-reporter';
import 'hardhat-abi-exporter';
import 'hardhat-tracer';
import 'hardhat-contract-sizer';
// import 'solidity-coverage';
// import './test/util/matchers';
import '@solidstate/hardhat-4byte-uploader';

// Tasks
import './tasks/export';

// https://hardhat.org/config/
export default {
  solidity: {
    version: '0.8.23',
  },
  zksolc: {
    version: '1.3.17', // https://github.com/matter-labs/zksolc-bin/tree/main/linux-amd64
    settings: {
      isSystem: true, // Required to deploy AA contracts
      optimizer: {
        enabled: true,
        mode: '3',
      },
    },
  },
  defaultNetwork: CONFIG.chain.key,
  networks: {
    // https://hardhat.org/hardhat-network/reference/
    hardhat: { zksync: true },

    ...Object.fromEntries(
      Object.values(CHAINS).map((chain) => [
        chain.key,
        {
          zksync: true,
          chainId: chain.id,
          url: chain.rpcUrls.default.http[0],
          ethNetwork: chain.layer1?.rpcUrls.default.http[0] ?? '',
          verifyURL: chain.verifyUrl,
        },
      ]),
    ),
  },
  // Plugins
  abiExporter: {
    path: './abi',
    runOnCompile: false,
    flat: true,
    clear: true,
  },
  gasReporter: {
    // https://github.com/cgewecke/eth-gas-reporter#options
    enabled: true,
    currency: 'USD',
    coinmarketcap: CONFIG.coinmarketcapApiKey,
  },
  export: [
    {
      path: 'test/contracts',
      contracts: [':*.test.*$'],
      include: ['abi'],
    },
    {
      path: '../packages/lib/src/generated',
      contracts: [':AccountProxy$', ':Account$', ':Factory$', ':TestVerifier$'],
      include: ['abi', 'bytecode', 'factoryDeps'],
    },
  ],
} satisfies HardhatUserConfig;
