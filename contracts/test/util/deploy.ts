import * as hre from 'hardhat';
import {
  asAddress,
  asPolicy,
  asTx,
  deployAccountProxy,
  executeTransaction,
  randomDeploySalt,
  TxOptions,
} from 'lib';
import { network, testNetwork, wallet, wallets } from './network';
import { BytesLike, hexlify, Interface, Overrides } from 'ethers';
import * as zk from 'zksync2-js';
import { getApprovals } from './approval';
import { Abi, Address, parseEther, zeroHash } from 'viem';
import { CONFIG } from '../../config';
import { AbiParametersToPrimitiveTypes } from 'abitype';

type AccountContractName = 'Account' | 'TestAccount';
type ContractName =
  | AccountContractName
  | 'Factory'
  | 'AccountProxy'
  | 'Paymaster'
  | `Test${string}`
  | 'PaymasterManager';

interface DeployOptions<TAbi extends Abi> {
  abi?: TAbi;
  constructorArgs?: AbiParametersToPrimitiveTypes<
    Extract<TAbi[number], { type: 'constructor' }>['inputs']
  >;
  overrides?: Overrides;
  factoryDeps?: BytesLike[];
}

const zkProvider = new zk.Provider(CONFIG.chain.rpcUrls.default.http[0]);

export async function deploy<TAbi extends Abi>(
  contractName: ContractName,
  { constructorArgs, overrides, factoryDeps }: DeployOptions<TAbi> = {},
) {
  const sender = new zk.Wallet(CONFIG.walletPrivateKey, zkProvider);
  const artifact = await hre.artifacts.readArtifact(contractName);

  const factory = new zk.ContractFactory(artifact.abi, artifact.bytecode, sender, 'create2');

  const salt = zeroHash;

  const encodedConstructorArgs = new Interface(artifact.abi).encodeDeploy(
    (constructorArgs as unknown[]) ?? [],
  );

  // const constructorAbiParams =
  //   (artifact.abi as Abi).find((x): x is AbiConstructor => 'type' in x && x.type === 'constructor')
  //     ?.inputs ?? [];
  // const encodedConstructorArgs = encodeAbiParameters(constructorAbiParams, constructorArgs ?? []);

  const potentialAddress = asAddress(
    zk.utils.create2Address(
      sender.address,
      hexlify(zk.utils.hashBytecode(artifact.bytecode)),
      salt,
      encodedConstructorArgs,
    ),
  );

  const isDeployed = !!(await network.getBytecode({ address: potentialAddress }))?.length;
  if (isDeployed) return { address: potentialAddress, deployTx: null, constructorArgs };

  const contract = await factory.deploy(...((constructorArgs as unknown[]) ?? []), {
    customData: { ...overrides, salt, factoryDeps },
  });
  await contract.waitForDeployment();

  return {
    address: asAddress(await contract.getAddress()),
    deployTx: contract.deploymentTransaction(),
    constructorArgs,
  };
}

export type DeployResult = Awaited<ReturnType<typeof deploy>>;

export const deployFactory = async (childContractName: 'AccountProxy') => {
  const childContractArtifact = await hre.artifacts.readArtifact(childContractName);
  const childContractBytecodeHash = zk.utils.hashBytecode(childContractArtifact.bytecode);

  return deploy('Factory', {
    constructorArgs: [childContractBytecodeHash],
    factoryDeps: [childContractArtifact.bytecode],
  });
};

export interface DeployProxyOptions {
  nApprovers?: number;
  accountContract?: AccountContractName;
  extraBalance?: bigint;
  implementation?: Address;
}

export const deployProxy = async ({
  nApprovers = 2,
  accountContract = 'Account',
  extraBalance = 0n,
}: DeployProxyOptions = {}) => {
  const approvers = new Set(wallets.slice(0, nApprovers).map((signer) => signer.address));
  const policy = asPolicy({ key: 1, approvers, threshold: approvers.size });

  const { address: factory } = await deployFactory('AccountProxy');
  const { address: implementation } = await deploy(accountContract);

  const { proxy: account, transactionHash: deployTransactionHash } = (
    await deployAccountProxy({
      network,
      wallet,
      factory,
      implementation,
      policies: [policy],
      salt: randomDeploySalt(),
    })
  )._unsafeUnwrap();
  await network.waitForTransactionReceipt({ hash: deployTransactionHash });

  await testNetwork.setBalance({
    address: asAddress(account),
    value: parseEther('1') + extraBalance,
  });

  return {
    account,
    policy,
    execute: async (txOpts: TxOptions) => {
      const tx = asTx(txOpts);

      const r = await executeTransaction({
        network,
        account: asAddress(account),
        tx,
        policy,
        approvals: await getApprovals(account, approvers, tx),
      });

      if (r.isErr())
        throw new Error(`Execute failed with error ${r.error.message}`, { cause: r.error });

      return r.value;
    },
  };
};

export type DeployProxyData = Awaited<ReturnType<typeof deployProxy>>;
