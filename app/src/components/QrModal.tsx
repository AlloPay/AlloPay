import QRCode from 'react-native-qrcode-svg';
import { Address } from 'lib';
import { IconButton, Surface, Text } from 'react-native-paper';
import { CloseIcon, ShareIcon, materialCommunityIcon } from '@theme/icons';
import { Actions } from '~/components/layout/Actions';
import { ScaledSize, View, useWindowDimensions } from 'react-native';
import { useAddressLabel } from '~/components/address/AddressLabel';
import { buildAddressLink } from '~/util/addressLink';
import { Blur } from '~/components/Blur';
import { Button } from '~/components/Button';
import { gql } from '@api/generated';
import { OperationContext, useMutation } from 'urql';
import { useQuery } from '~/gql';
import { share } from '~/lib/share';
import { useRouter } from 'expo-router';
import { createStyles, useStyles } from '@theme/styles';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';

const Query = gql(/* GraphQL */ `
  query QrModal($account: Address!) {
    requestableTokens(input: { account: $account })
  }
`);

const RequestTokens = gql(/* GraphQL */ `
  mutation QrModal_RequestTokens($account: Address!) {
    requestTokens(input: { account: $account })
  }
`);

const FaucetIcon = materialCommunityIcon('water');

const queryContext: Partial<OperationContext> = { suspense: false };

export interface QrModalProps {
  address: Address;
  faucet?: boolean;
}

export function QrModal({ address, faucet }: QrModalProps) {
  const { styles } = useStyles(stylesheet);
  const router = useRouter();
  const requestTokens = useMutation(RequestTokens)[1];

  const { requestableTokens = [] } =
    useQuery(Query, { account: address }, { pause: !faucet, context: queryContext }).data ?? {};

  return (
    <Blur>
      <View style={styles.container(useSafeAreaInsets())}>
        <IconButton
          mode="contained-tonal"
          icon={CloseIcon}
          style={styles.close}
          onPress={router.back}
        />

        <View style={styles.headerContainer}>
          <Text variant="displaySmall" style={styles.name}>
            {useAddressLabel(address)}
          </Text>
        </View>

        <View style={styles.qrContainer}>
          <Surface style={styles.qrSurface}>
            <QRCode
              value={address}
              color={styles.qr.color}
              size={styles.qrSize(useWindowDimensions()).fontSize}
              backgroundColor="transparent"
              ecl="M"
              enableLinearGradient
              linearGradient={[styles.primary.color, styles.tertiary.color]}
            />
          </Surface>
        </View>

        <Actions>
          {requestableTokens.length > 0 && (
            <Button
              mode="contained-tonal"
              icon={FaucetIcon}
              onPress={() => requestTokens({ account: address })}
            >
              Request testnet tokens
            </Button>
          )}

          <Button
            mode="contained"
            icon={ShareIcon}
            onPress={() => share({ url: buildAddressLink(address) })}
          >
            Share
          </Button>
        </Actions>
      </View>
    </Blur>
  );
}

const stylesheet = createStyles(({ colors }) => ({
  container: (insets: EdgeInsets) => ({
    flex: 1,
    marginTop: insets.top,
  }),
  close: {
    marginHorizontal: 16,
  },
  name: {
    textAlign: 'center',
    color: colors.onScrim,
  },
  headerContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 32,
  },
  qrContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: 32,
  },
  qrSurface: {
    padding: 16,
    borderRadius: 16,
  },
  qrSize: (window: ScaledSize) => ({
    fontSize: {
      compact: Math.min(window.width * 0.8, window.height * 0.8),
      medium: Math.min(window.width * 0.7, window.height * 0.7),
      expanded: Math.min(window.width * 0.5, window.height * 0.5),
    },
  }),
  qr: {
    color: colors.onSurface,
  },
  primary: {
    color: colors.primary,
  },
  tertiary: {
    color: colors.tertiary,
  },
  requestButton: {
    color: colors.inverseOnSurface,
  },
}));
