import { ActivateIcon } from '@theme/icons';
import { FC } from 'react';
import { useActivateAccount } from '~/mutations/account/useActivateAccount.api';
import { CombinedAccount } from '~/queries/account/useAccount.api';
import { FabProps } from '../buttons/Fab';

type RequiredProps = Pick<FabProps, 'icon' | 'label' | 'loading' | 'onPress'>;

export interface ActivateAccountButtonProps {
  children: FC<RequiredProps>;
  account: CombinedAccount;
}

export const ActivateAccountButton = ({
  children: Button,
  account,
}: ActivateAccountButtonProps) => {
  const activate = useActivateAccount(account);

  if (!activate) return null;

  return <Button icon={ActivateIcon} label="Activate" onPress={activate} />;
};
