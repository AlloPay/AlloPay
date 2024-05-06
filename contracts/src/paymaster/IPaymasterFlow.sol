// SPDX-License-Identifier: AGPL-3.0-or-later
pragma solidity 0.8.25;

import {Secp256k1} from 'src/validation/signature/Secp256k1.sol';

/// @notice Data signed by paymaster signer
struct PaymasterSignedData {
  uint256 paymasterFee;
  uint256 discount;
}

interface IPaymasterFlow {
  function payForTransaction(
    address token,
    uint256 allowance,
    PaymasterSignedData calldata paymasterData,
    Secp256k1.Signature calldata paymasterSignature
  ) external;
}
