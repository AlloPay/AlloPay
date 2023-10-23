import { useEffect } from 'react';
import { SplashScreen } from 'expo-router';
import { loadAsync } from 'expo-font';
import { Font } from 'react-native-paper/lib/typescript/types';
import { logError } from '~/util/analytics';

const FONTS = {
  'Roboto-Regular': require('assets/fonts/Roboto-400-Regular.ttf'),
  'Roboto-Medium': require('assets/fonts/Roboto-500-Medium.ttf'),
} as const;

export const FONT_BY_WEIGHT: Partial<
  Record<NonNullable<Font['fontWeight']>, keyof typeof FONTS & Font['fontFamily']>
> = {
  '400': 'Roboto-Regular',
  '500': 'Roboto-Medium',
};

SplashScreen.preventAutoHideAsync();

export function Fonts() {
  useEffect(() => {
    loadAsync(FONTS)
      .then(() => {
        console.log('loaded');
      })
      .catch((error) => logError('Failed to load fonts', { error }))
      .finally(SplashScreen.hideAsync);
  }, []);

  return null;
}
