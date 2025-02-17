import { ArrowDropDownIcon } from '@theme/icons';
import { SelectChip } from '#/fields/SelectChip';
import _ from 'lodash';
import { match } from 'ts-pattern';
import { useEffect } from 'react';
import { usePolicyDraft } from '~/lib/policy/policyAsDraft';
import { createStyles, useStyles } from '@theme/styles';

export function ThresholdChip() {
  const [{ threshold, approvers }, updateDraft] = usePolicyDraft();
  const { styles } = useStyles(getStylesheet({ threshold }));

  const validThresholds = _.range(Math.min(approvers.size, 1), approvers.size + 1);
  const entries = validThresholds.map(
    (n) =>
      ({
        title: match(n)
          .with(0, () => 'No approval required - executable by anyone')
          .with(1, () => '1 approval required')
          .otherwise((n) => `${n} approvals required`),
        value: n,
      }) as const,
  );

  useEffect(() => {
    if (!validThresholds.includes(threshold)) {
      updateDraft((draft) => {
        draft.threshold = draft.approvers.size;
      });
    }
  }, [validThresholds, threshold, updateDraft]);

  return (
    <SelectChip
      value={Math.min(threshold, approvers.size)}
      entries={entries}
      onChange={(value) =>
        updateDraft((draft) => {
          draft.threshold = value;
        })
      }
      chipProps={{
        closeIcon: ArrowDropDownIcon,
        style: styles.chip,
        textStyle: styles.chipLabel,
      }}
    />
  );
}

const getStylesheet = ({ threshold }: { threshold: number }) =>
  createStyles(({ colors }) => ({
    chip: {
      ...(!threshold && {
        backgroundColor: colors.warningContainer,
      }),
    },
    chipLabel: {
      ...(!threshold && {
        color: colors.onWarningContainer,
      }),
    },
  }));
