// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity ^0.8.0;

import {IAccount} from '@matterlabs/zksync-contracts/l2/system-contracts/interfaces/IAccount.sol';
import {Transaction, TransactionHelper} from '@matterlabs/zksync-contracts/l2/system-contracts/libraries/TransactionHelper.sol';
import {ACCOUNT_VALIDATION_SUCCESS_MAGIC} from '@matterlabs/zksync-contracts/l2/system-contracts/interfaces/IAccount.sol';
import {IContractDeployer, DEPLOYER_SYSTEM_CONTRACT, BOOTLOADER_FORMAL_ADDRESS} from '@matterlabs/zksync-contracts/l2/system-contracts/Constants.sol';
import {SystemContractsCaller} from '@matterlabs/zksync-contracts/l2/system-contracts/libraries/SystemContractsCaller.sol';

import {Initializable} from './Initializable.sol';
import {Upgradeable} from './Upgradeable.sol';
import {Rule, RuleKey} from './rule/Rule.sol';
import {RuleManager} from './rule/RuleManager.sol';
import {RuleVerifier} from './rule/RuleVerifier.sol';
import {Executor} from './Executor.sol';
import {ERC165} from './standards/ERC165.sol';
import {ERC721Receiver} from './standards/ERC721Receiver.sol';
import {ERC1271Validator} from './standards/ERC1271Validator.sol';
import {TransactionHasher} from './standards/TransactionHasher.sol';

contract Account is
  IAccount,
  Initializable,
  Upgradeable,
  RuleManager,
  RuleVerifier,
  Executor,
  ERC165,
  ERC721Receiver,
  ERC1271Validator
{
  using TransactionHelper for Transaction;
  using TransactionHasher for Transaction;

  error InsufficientBalance();
  error FailedToPayBootloader();
  error OnlyCallableByBootloader();

  /*//////////////////////////////////////////////////////////////
                             INITIALIZATION
  //////////////////////////////////////////////////////////////*/

  constructor() {
    // Disable initializing the implementation contract; avoiding any potential nonsense (e.g. selfdestruct)
    _disableInitializers();
  }

  function initialize(Rule[] calldata rules) external initializer {
    _addRules(rules);
    // _initializeArbitraryNonceOrdering();
  }

  /*//////////////////////////////////////////////////////////////
                                FALLBACK
  //////////////////////////////////////////////////////////////*/

  receive() external payable {}

  fallback() external payable {}

  /*//////////////////////////////////////////////////////////////
                          TRANSACTION HANDLING
  //////////////////////////////////////////////////////////////*/

  /// @inheritdoc IAccount
  function validateTransaction(
    bytes32 /* _txHash */,
    bytes32 /* suggestedSignedHash */,
    Transaction calldata transaction
  ) external payable override onlyBootloader returns (bytes4 magic) {
    _validateTransaction(transaction.hash(), transaction);
    magic = ACCOUNT_VALIDATION_SUCCESS_MAGIC;
  }

  function _validateTransaction(bytes32 txHash, Transaction calldata transaction) internal {
    _incrementNonceIfEquals(transaction);

    if (transaction.totalRequiredBalance() > address(this).balance) revert InsufficientBalance();

    (Rule memory rule, bytes[] memory signatures) = _decodeAndVerifySignature(
      transaction.signature
    );
    _verifySignatureRule(rule, signatures, txHash);
    _verifyTransactionRule(rule, transaction);
  }

  /// @inheritdoc IAccount
  function executeTransaction(
    bytes32 /* _txHash */,
    bytes32 /* suggestedSignedHash */,
    Transaction calldata transaction
  ) external payable override onlyBootloader {
    _executeTransaction(transaction.hash(), transaction);
  }

  /// @inheritdoc IAccount
  function executeTransactionFromOutside(
    Transaction calldata transaction
  ) external payable override {
    bytes32 txHash = transaction.hash();
    _validateTransaction(txHash, transaction);
    _executeTransaction(txHash, transaction);
  }

  /*//////////////////////////////////////////////////////////////
                                PAYMASTER
  //////////////////////////////////////////////////////////////*/

  function payForTransaction(
    bytes32, // txHash
    bytes32, // suggestedSignedHash
    Transaction calldata transaction
  ) external payable override onlyBootloader {
    bool success = transaction.payToTheBootloader();
    if (!success) revert FailedToPayBootloader();
  }

  function prepareForPaymaster(
    bytes32, // txHash
    bytes32, // suggestedSignedHash
    Transaction calldata transaction
  ) external payable override onlyBootloader {
    transaction.processPaymasterInput();
  }

  /*//////////////////////////////////////////////////////////////
                                MODIFIERS
  //////////////////////////////////////////////////////////////*/

  modifier onlyBootloader() {
    if (msg.sender != BOOTLOADER_FORMAL_ADDRESS) revert OnlyCallableByBootloader();
    _;
  }
}
