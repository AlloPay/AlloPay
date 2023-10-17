import { Route, Stack, useLocalSearchParams } from 'expo-router';
import { useCallback, useState } from 'react';
import { Platform, StyleSheet, View } from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Button, Text } from 'react-native-paper';
import { parseAddressLink } from '~/util/addressLink';
import { isWalletConnectUri, useWalletConnect } from '~/util/walletconnect';
import { Actions } from '~/components/layout/Actions';
import { Address, tryAsAddress } from 'lib';
import * as Linking from 'expo-linking';
import useAsyncEffect from 'use-async-effect';
import { showError } from '~/components/provider/SnackbarProvider';
import { getPathFromDeepLink } from '~/util/config';
import { useFocusEffect, useRouter } from 'expo-router';
import { ScanOverlay } from '~/components/ScanOverlay';
import { Subject } from 'rxjs';
import { useGetEvent } from '~/hooks/useGetEvent';
import { AppbarOptions } from '~/components/Appbar/AppbarOptions';

export const SCANNED_ADDRESSES = new Subject<Address>();
export function useScanAddress() {
  const getEvent = useGetEvent();

  return (account?: Address) =>
    getEvent({ pathname: `/scan/`, params: { ...(account && { account }) } }, SCANNED_ADDRESSES);
}

export type ScanScreenRoute = `/scan/`;
export type ScanScreenParams = {
  account?: string;
};

export default function ScanScreen() {
  const account = tryAsAddress(useLocalSearchParams<ScanScreenParams>().account);
  const router = useRouter();
  const walletconnect = useWalletConnect();

  const [scan, setScan] = useState(true);

  useFocusEffect(useCallback(() => setScan(true), [setScan]));

  const tryHandle = async (data: string) => {
    setScan(false);

    const address = tryAsAddress(data) || parseAddressLink(data)?.target_address;
    if (address) {
      if (SCANNED_ADDRESSES.observed) {
        SCANNED_ADDRESSES.next(address);
      } else {
        router.push({
          pathname: `/scan/[address]`,
          params: { address, ...(account && { account }) },
        });
      }
      return true;
    } else if (isWalletConnectUri(data)) {
      try {
        await walletconnect.core.pairing.pair({ uri: data });
        router.back();
        return true;
      } catch {
        showError('Failed to connect. Please refresh the DApp and try again');
      }
    } else if (getPathFromDeepLink(data)) {
      router.push(getPathFromDeepLink(data) as Route<string>);
      return true;
    }

    setScan(true);
    return false;
  };

  const [permissionsRequested, setPermissionsRequested] = useState(false);
  const [permission, requestPermission] = Camera.useCameraPermissions();

  useAsyncEffect(
    async (isMounted) => {
      if (!permission?.granted) {
        await requestPermission();
        if (isMounted()) setPermissionsRequested(true);
      }
    },
    [requestPermission],
  );

  return permission?.granted || !permissionsRequested ? (
    <Camera
      onBarCodeScanned={scan ? ({ data }) => tryHandle(data) : undefined}
      barCodeScannerSettings={{ barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr] }}
      style={StyleSheet.absoluteFill}
      ratio="16:9"
      useCamera2Api={false} // Causes crash on screen unmount - https://github.com/expo/expo/issues/18996
    >
      <Stack.Screen options={{ headerShown: false }} />
      <ScanOverlay onData={tryHandle} />
    </Camera>
  ) : (
    <View style={styles.grantContainer}>
      <Stack.Screen options={{ headerShown: true }} />
      <AppbarOptions headline="Camera permission required" />

      <Text variant="headlineMedium" style={styles.grantText}>
        Please grant camera permissions in order to scan a QR code
      </Text>

      <Actions>
        {Platform.OS !== 'web' && (
          <Button
            mode="contained"
            onPress={async () => {
              await Linking.openSettings();
              requestPermission();
            }}
          >
            Open app settings
          </Button>
        )}
      </Actions>
    </View>
  );
}

const styles = StyleSheet.create({
  grantContainer: {
    flex: 1,
  },
  grantText: {
    textAlign: 'center',
    marginHorizontal: 16,
    marginVertical: 32,
  },
  actionButton: {
    alignSelf: 'stretch',
  },
});
