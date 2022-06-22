import { useSafe } from '@features/safe/SafeProvider';
import { Overrides } from 'ethers';
import { executeTx, Signerish } from 'lib';
import { useCallback } from 'react';
import { CombinedGroup } from '~/queries';
import { ProposedTx } from '~/queries/tx/useTxs';
import { USDC } from '~/token/tokens';
import { useApiSubmitExecution } from './useApiSubmitExecution';

const overrides: Overrides = {
  // https://v2-docs.zksync.io/api/js/features.html#overrides
  customData: {
    feeToken: USDC.addr,
  },
};

export const useSubmitExecute = () => {
  const { safe } = useSafe();
  const submitExecution = useApiSubmitExecution();

  const execute = useCallback(
    async (tx: ProposedTx, group: CombinedGroup) => {
      const signers: Signerish[] = tx.approvals.map((approval) => ({
        addr: approval.addr,
        weight: group.approvers.find((a) => a.addr === approval.addr)!.weight,
        signature: approval.signature,
      }));

      console.log('Executing', {
        tx,
        group,
        signers,
      });

      const resp = await executeTx(safe, tx.ops, group, signers, overrides);
      await submitExecution(tx, resp);
    },
    [safe, submitExecution],
  );

  return execute;
};
