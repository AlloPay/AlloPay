import { useEffect } from 'react';
import { SplashScreen } from 'expo-router';
import { loadAsync } from 'expo-font';
import { Font } from 'react-native-paper/lib/typescript/types';
import { logError } from '~/util/analytics';

const FONTS = {
  Roboto: require('assets/fonts/Roboto.ttf'),
  'Roboto-Medium': require('assets/fonts/Roboto-Medium.ttf'),
} as const;

export const FONT_BY_WEIGHT: Partial<
  Record<NonNullable<Font['fontWeight']>, keyof typeof FONTS & Font['fontFamily']>
> = {
  '400': 'Roboto',
  '500': 'Roboto-Medium',
};

SplashScreen.preventAutoHideAsync();

export function Fonts() {
  useEffect(() => {
    // Dynamic loading is required for web
    loadAsync(FONTS)
      .catch((error) => logError('Failed to load fonts', { error }))
      .finally(SplashScreen.hideAsync);
  }, []);

  return null;
}
