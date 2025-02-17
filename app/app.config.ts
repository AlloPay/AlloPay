import { ExpoConfig, ConfigContext } from '@expo/config';
import { ConfigPlugin } from 'expo/config-plugins';
import { PluginConfigType as BuildPropertiesConfig } from 'expo-build-properties/build/pluginConfig';
import expoRouterPlugin from 'expo-router/plugin';
import path from 'path';

// Absolute path resolution is required for EAS builds (during gradlew autolinking), but not available for dev client
require('dotenv').config({ path: path.resolve(process.env.EAS_BUILD ? __dirname : '', '../.env') });

type PluginConfig<Plugin> = Plugin extends ConfigPlugin<infer Config> ? Config : never;

const ENV = process.env;

const vary = (value: string, f: (variant: string) => string = (v) => '.' + v) =>
  value + (ENV.APP_VARIANT ? f(ENV.APP_VARIANT) : '');

type ExternalUrl = `https:${string}`;

export const CONFIG = {
  projectId: 'f8f4def1-b838-4dec-8b50-6c07995c4ff5',
  env: ENV.RELEASE_ENV === 'development' ? 'development' : 'production',
  sentryDsn: ENV.APP_SENTRY_DSN!,
  apiUrl: ENV.API_URL!,
  apiGqlWs: ENV.API_GQL_WS!,
  docsUrl: ENV.DOCS_URL! as ExternalUrl,
  walletConnectProjectId: ENV.WALLET_CONNECT_PROJECT_ID!,
  amplitudeKey: ENV.AMPLITUDE_KEY!,
  metadata: {
    iconUri: ENV.ICON_URI!,
    appStore: ENV.APP_STORE_URL! as ExternalUrl,
    playStore: ENV.PLAY_STORE_URL! as ExternalUrl,
    twitter: ENV.TWITTER! as ExternalUrl,
    github: ENV.GITHUB! as ExternalUrl,
  },
  riskRatingUrl: ENV.RISK_RATING_URL!,
  googleOAuth: {
    webClient: ENV.GOOGLE_OAUTH_WEB_CLIENT!,
    iosClient: ENV.GOOGLE_OAUTH_IOS_CLIENT!,
  },
  webAppUrl: ENV.WEB_APP_URL!,
} as const;

export type Config = typeof CONFIG;

const packageId = vary('io.zallo');

// https://docs.expo.dev/versions/latest/config/app/
export default ({ config }: ConfigContext): ExpoConfig => ({
  ...config,
  name: vary('Zallo', (v) => ` (${v})`),
  slug: 'app',
  owner: 'zallo',
  githubUrl: CONFIG.metadata.github,
  version: '0.1.0',
  runtimeVersion: { policy: 'fingerprint' },
  extra: {
    ...CONFIG,
    eas: { projectId: CONFIG.projectId },
  },
  plugins: [
    [
      'expo-build-properties',
      {
        android: {
          minSdkVersion: 24, // 23 is Expo default, 24 is required by @ledgerhq/react-native-hid
          packagingOptions: {
            // https://github.com/margelo/react-native-quick-crypto/issues/90#issuecomment-1321129104
            pickFirst: [
              'lib/x86/libcrypto.so',
              'lib/x86_64/libcrypto.so',
              'lib/armeabi-v7a/libcrypto.so',
              'lib/arm64-v8a/libcrypto.so',
            ],
          },
        },
        ios: {
          useFrameworks: 'static',
        },
      } as BuildPropertiesConfig,
    ],
    ['expo-router', { origin: CONFIG.webAppUrl } as PluginConfig<typeof expoRouterPlugin>],
    ['expo-font', { fonts: ['./assets/fonts/Roboto-Medium.ttf', 'assets/fonts/Roboto.ttf'] }],
    'expo-notifications', // https://docs.expo.dev/versions/latest/sdk/notifications/#configurable-properties
    'expo-localization',
    [
      '@sentry/react-native/expo',
      {
        url: 'https://sentry.io/',
        organization: ENV.SENTRY_ORG,
        project: ENV.APP_SENTRY_PROJECT,
        deployEnv: ENV.env,
        // SENTRY_AUTH_TOKEN read directly from ENV
      },
    ],
    'expo-asset',
    'expo-secure-store',
    'expo-camera',
    'react-native-ble-plx',
    [
      '@react-native-google-signin/google-signin',
      {
        iosUrlScheme: ENV.GOOGLE_OAUTH_IOS_URL_SCHEME ?? `com.googleusercontent.apps.test`,
      },
    ],
    'expo-apple-authentication',
    [
      'react-native-cloud-storage',
      { iCloudContainerEnvironment: CONFIG.env === 'development' ? 'Development' : 'Production' },
    ],
  ],
  icon: './public/icon-1024s.png',
  splash: {
    image: './assets/splash.png',
    resizeMode: 'contain',
    backgroundColor: '#FFFBFE',
  },
  primaryColor: '#6750A4', // primary (light)
  assetBundlePatterns: ['**/*'],
  scheme: 'zallo',
  android: {
    package: packageId,
    adaptiveIcon: {
      foregroundImage: './assets/brand/icon-1024a.png',
      backgroundColor: '#FEF7FF',
      monochromeImage: './assets/brand/icon-1024a-mono.png',
    },
    googleServicesFile:
      ENV[vary('GOOGLE_SERVICES_ANDROID_FILE', (v) => '_' + v.toUpperCase())] ||
      vary('./google-services-android.secret.json'),
    playStoreUrl: ENV.PLAY_STORE_URL,
    intentFilters: [
      {
        action: 'VIEW',
        category: ['BROWSABLE', 'DEFAULT'],
        autoVerify: true,
        data: [
          {
            scheme: CONFIG.webAppUrl ? new URL(CONFIG.webAppUrl).protocol.slice(0, -1) : undefined,
            host: CONFIG.webAppUrl ? new URL(CONFIG.webAppUrl).host : undefined,
          },
        ],
      },
    ],
  },
  androidStatusBar: {
    backgroundColor: '#00000000', // Transparent
  },
  androidNavigationBar: {
    backgroundColor: '#FFFBFE',
  },
  ios: {
    bundleIdentifier: packageId,
    supportsTablet: true,
    usesAppleSignIn: true,
    infoPlist: {
      NSCameraUsageDescription: 'Allow Zallo to use the camera to scan QR codes.',
      NSFaceIDUsageDescription: 'Allow Zallo to (optionally) use Face ID for authentication.',
    },
    config: {
      usesNonExemptEncryption: false,
    },
    googleServicesFile:
      ENV[vary('GOOGLE_SERVICES_IOS_FILE', (v) => '_' + v.toUpperCase())] ||
      vary('./google-services-ios.secret.plist'),
    // appStoreUrl: ENV.APP_STORE_URL,
  },
  web: {
    bundler: 'metro',
    favicon: './public/favicon.png',
  },
  notification: {
    androidMode: 'collapse',
    icon: './assets/brand/icon-96m-mono.png',
  },
  experiments: {
    typedRoutes: true,
    // reactCompiler: true,
  },
  updates: {
    url: `https://u.expo.dev/${CONFIG.projectId}`,
  },
});
