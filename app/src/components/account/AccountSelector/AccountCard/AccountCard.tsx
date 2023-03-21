import { Box } from '~/components/layout/Box';
import { withSuspense } from '~/components/skeleton/withSuspense';
import { Text } from 'react-native-paper';
import { Card, CardProps } from '~/components/card/Card';
import { AccountCardSkeleton, ACCOUNT_CARD_STYLE } from './AccountCardSkeleton';
import { useSelectedToken } from '~/components/token/useSelectedToken';
import { useTokenValue } from '@token/useTokenValue';
import { FiatValue } from '~/components/fiat/FiatValue';
import { makeStyles } from '@theme/makeStyles';
import { AccountId, useAccount } from '@api/account';
import { useTokenAvailable } from '@token/useTokenAvailable';
import { MastercardIcon } from '@theme/icons';

export interface AccountCardProps extends CardProps {
  account: AccountId;
  available?: boolean;
}

export const AccountCard = withSuspense(
  ({ account: addr, available, ...cardProps }: AccountCardProps) => {
    const styles = useStyles();
    const account = useAccount(addr);
    const token = useSelectedToken();
    const fiatValue = useTokenValue(token, useTokenAvailable(token, addr));

    return (
      <Card elevation={2} style={styles.card} {...cardProps}>
        <Box flex={1} vertical justifyContent="space-between">
          <Box horizontal justifyContent="space-between" alignItems="center">
            <Text variant="titleLarge">{account.name}</Text>

            <MastercardIcon size={48} />
          </Box>

          {available && (
            <Box horizontal justifyContent="space-between" alignItems="baseline">
              <Text variant="bodyLarge">{token.symbol}</Text>

              <Text variant="titleMedium">
                <FiatValue value={fiatValue} />
              </Text>
            </Box>
          )}
        </Box>
      </Card>
    );
  },
  AccountCardSkeleton,
);

const useStyles = makeStyles(({ colors }) => ({
  card: ACCOUNT_CARD_STYLE,
  icon: {
    color: colors.onSurface,
  },
  caption: {
    color: colors.onSurfaceOpaque,
  },
}));
