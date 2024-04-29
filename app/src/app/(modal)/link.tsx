import QRCode from 'react-native-qrcode-svg';
import { IconButton, Surface } from 'react-native-paper';
import { CloseIcon, ScanIcon, ShareIcon } from '@theme/icons';
import { Actions } from '#/layout/Actions';
import { View } from 'react-native';
import { Blur } from '#/Blur';
import { Button } from '#/Button';
import { gql } from '@api/generated';
import { useQuery } from '~/gql';
import { useSubscription } from 'urql';
import { useEffect } from 'react';
import { Subject } from 'rxjs';
import { LinkingTokenModal_SubscriptionSubscription } from '@api/generated/graphql';
import { Link } from 'expo-router';
import { appLink } from '~/lib/appLink';
import { share } from '~/lib/share';
import { createStyles, useStyles } from '@theme/styles';

export const LINKINGS_FROM_TOKEN = new Subject<LinkingTokenModal_SubscriptionSubscription>();

const Query = gql(/* GraphQL */ `
  query LinkingTokenModal {
    user {
      id
      linkingToken
    }
  }
`);

const Subscription = gql(/* GraphQL */ `
  subscription LinkingTokenModal_Subscription {
    user {
      id
    }
  }
`);

export default function LinkingModal() {
  const { styles } = useStyles(stylesheet);

  const { user } = useQuery(Query).data;
  const link = appLink({ pathname: `/link/token`, params: { token: user.linkingToken } });

  const [subscription] = useSubscription({ query: Subscription });
  useEffect(() => {
    if (!subscription.stale && subscription.data) LINKINGS_FROM_TOKEN.next(subscription.data);
  }, [subscription.data, subscription.stale]);

  return (
    <Blur>
      <View style={styles.container}>
        <Link href=".." asChild>
          <IconButton mode="contained-tonal" icon={CloseIcon} style={styles.close} />
        </Link>

        <View style={styles.qrContainer}>
          <Surface style={styles.qrSurface}>
            <QRCode
              value={link}
              color={styles.qr.color}
              size={styles.qr.fontSize}
              backgroundColor="transparent"
              ecl="L"
            />
          </Surface>
        </View>

        <Actions flex={false} style={styles.actions}>
          <Button mode="contained-tonal" icon={ShareIcon} onPress={() => share({ url: link })}>
            Share token
          </Button>

          <Link href="/scan" asChild>
            <Button mode="contained" icon={ScanIcon}>
              Scan instead
            </Button>
          </Link>
        </Actions>
      </View>
    </Blur>
  );
}

const stylesheet = createStyles(({ colors, corner }, { insets, screen }) => ({
  container: {
    flex: 1,
    marginTop: insets.top,
  },
  close: {
    marginHorizontal: 16,
  },
  textContainer: {
    marginTop: 16,
  },
  text: {
    color: colors.onScrim,
    marginHorizontal: 16,
  },
  textIcon: {
    fontSize: 14,
  },
  qrContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  qrSurface: {
    padding: 32,
    borderRadius: corner.m,
    backgroundColor: colors.primaryContainer,
  },
  qr: {
    fontSize: Math.min(screen.width * 0.8, screen.height * 0.7, 1024 - 96),
    color: colors.onPrimaryContainer,
  },
  primary: {
    color: colors.primary,
  },
  tertiary: {
    color: colors.tertiary,
  },
  actions: {
    width: '100%',
    maxWidth: 1024,
    alignSelf: 'center',
  },
}));

export { ErrorBoundary } from '#/ErrorBoundary';
