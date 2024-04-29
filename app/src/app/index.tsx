import { ScrollView, View } from 'react-native';
import { createStyles, useStyles } from '@theme/styles';
import { LandingHeader } from '#/landing/LandingHeader';
import { PrimarySection } from '#/landing/PrimarySection';
import { LinearGradient } from 'expo-linear-gradient';
import { gql } from '@api';
import { useQuery } from '~/gql';
import { useSelectedAccount } from '~/hooks/useSelectedAccount';
import { Redirect } from 'expo-router';
import { OperationContext } from 'urql';
import { z } from 'zod';
import { useLocalParams } from '~/hooks/useLocalParams';
import { zBool } from '~/lib/zod';
import { useMemo } from 'react';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import { withSuspense } from '#/skeleton/withSuspense';
import { ScreenSkeleton } from '#/skeleton/ScreenSkeleton';

const Query = gql(/* GraphQL */ `
  query HelloScreen {
    accounts {
      id
      address
    }
  }
`);

const context = { suspense: false } satisfies Partial<OperationContext>;

const LandingScreenParams = z.object({ redirect: zBool().default('true') });

function LandingScreen() {
  const { styles, theme } = useStyles(stylesheet);
  const { redirect } = useLocalParams(LandingScreenParams);
  const selectedAccount = useSelectedAccount();
  const insets = useSafeAreaInsets();

  const query = useQuery(Query, undefined, { context });

  const account = useMemo(() => {
    const accounts = query.data?.accounts ?? [];
    if (!selectedAccount && (!accounts.length || query.stale)) return undefined;

    return accounts.find((a) => a.address === selectedAccount)?.address ?? accounts[0]?.address;
  }, [query.data?.accounts, query.stale, selectedAccount]);

  if (redirect && account)
    return <Redirect href={{ pathname: `/(drawer)/[account]/(home)/`, params: { account } }} />;

  return (
    <ScrollView contentContainerStyle={styles.root(insets)} stickyHeaderIndices={[0]}>
      <LandingHeader />

      <LinearGradient
        colors={[theme.colors.primaryContainer, theme.colors.surface]}
        style={styles.gradient}
        locations={[0.6, 1]}
      >
        <View style={styles.container}>
          <PrimarySection account={account} />
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

const stylesheet = createStyles((_theme, { screen }) => ({
  root: (insets: EdgeInsets) => ({
    flexGrow: 1,
    paddingBottom: insets.bottom,
  }),
  gradient: {
    flex: 1,
    maxHeight: screen.height,
  },
  container: {
    flex: 1,
    alignSelf: 'center',
    paddingHorizontal: 16,
    maxWidth: 1280,
    width: '100%',
  },
}));

export default withSuspense(LandingScreen, <ScreenSkeleton />);

export { ErrorBoundary } from '#/ErrorBoundary';
