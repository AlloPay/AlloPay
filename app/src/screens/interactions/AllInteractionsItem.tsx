import { useImmerAtom } from 'jotai-immer';
import { Address, Selector, Targets } from 'lib';
import { POLICY_DRAFT_ATOM } from '../policy/PolicyDraft';
import { ListItem } from '~/components/list/ListItem';
import { Switch } from 'react-native-paper';

export interface AllInteractionsItemProps {
  contract: Address | '*';
  targets: Targets;
  interactions: Set<Selector | '*'>;
}

export const AllInteractionsItem = ({ contract, targets }: AllInteractionsItemProps) => {
  const [, updateDraft] = useImmerAtom(POLICY_DRAFT_ATOM);

  const handleChange = (enable: boolean) => {
    updateDraft(({ permissions: { targets } }) => {
      if (!targets[contract]) targets[contract] = new Set([]);

      if (enable) {
        targets[contract] = new Set(['*']);
      } else {
        targets[contract].delete('*');
      }
    });
  };

  const enabled = targets[contract] ? targets[contract].has('*') : targets['*'].has('*');

  return (
    <ListItem
      headline="All interactions"
      supporting="Allow all interactions with this contract"
      trailing={<Switch value={enabled} onValueChange={handleChange} />}
    />
  );
};
