import { MD3LightTheme as PaperLightTheme, useTheme as baseUseTheme } from 'react-native-paper';
import { space, typoSpace, space2, font } from './styledComponents';
import color from 'color';

const c = (c: string, f: (color: color<string>) => color<string>) => f(color(c)).rgb().string();

const overrided: typeof PaperLightTheme = {
  ...PaperLightTheme,
};

const opacityModifier = {
  // https://m3.material.io/foundations/interaction-states
  hover: 0.08,
  focus: 0.12,
  press: 0.12,
  drag: 0.16,
} as const;

const opacity = {
  disabled: 0.38,
  opaque: 0.6,
} as const;

// https://github.com/callstack/react-native-paper/blob/main/src/styles/themes/v3/DarkTheme.tsx
export const PAPER_THEME = {
  ...overrided,

  colors: {
    ...overrided.colors,

    surfaceFocussed: c(overrided.colors.surface, (c) => c.opaquer(opacityModifier.focus)),
    surfacePressed: c(overrided.colors.surface, (c) => c.opaquer(opacityModifier.press)),
    surfaceDisabled: c(overrided.colors.onSurface, (c) => c.alpha(opacityModifier.focus)),
    onSurfaceOpaque: c(overrided.colors.onSurface, (c) => c.alpha(opacity.opaque)),
    onSurfaceDisabled: c(overrided.colors.onSurface, (c) => c.alpha(opacity.disabled)),
    primaryContainerDisabled: c(overrided.colors.primaryContainer, (c) =>
      c.alpha(opacity.disabled),
    ),
    onPrimaryContainerDisabled: c(overrided.colors.onPrimaryContainer, (c) =>
      c.alpha(opacity.disabled),
    ),

    // Green
    green: '#4b6708',
    onGreen: '#ffffff',
    greenContainer: '#cdef85',
    onGreenContainer: '#131f00',
    // Orange
    orange: '#914c00',
    onOrange: '#ffffff',
    orangeContainer: '#ffdcc1',
    onOrangeContainer: '#2f1500',
  },
  color: c,
  opacity,
  opacityModifier,

  state: {
    focussed: (color: string) => c(color, (c) => c.opaquer(opacityModifier.focus)),
    pressed: (color: string) => c(color, (c) => c.opaquer(opacityModifier.press)),
  },

  space,
  typoSpace,
  s: space2,
  font,
  iconSize2: (n: number) => n * 1.5,

  onBackground: (backgroundColor?: string): string | undefined => {
    if (backgroundColor) {
      const bgKey = Object.keys(overrided.colors).find(
        (key) => (overrided.colors as any)[key] === backgroundColor,
      );

      if (bgKey) {
        const onColor = (overrided.colors as any)[`on${bgKey[0].toUpperCase()}${bgKey.slice(1)}`];

        if (onColor) return onColor;
      }
    }

    return overrided.colors.onSurface;
  },

  iconSize: {
    small: 24,
    medium: 40,
    large: 60,
  },
  iconButton: {
    size: 24,
    containerSize: 40,
  },
  corner: {
    // https://m3.material.io/styles/shape/shape-scale-tokens
    xs: 4,
    s: 8,
    m: 12,
    l: 16,
    xl: 28,
    full: 1000,
  },
};

export type ThemeOverride = typeof PAPER_THEME;

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace ReactNativePaper {
    // type Theme = ThemeOverride;
    interface Theme extends ThemeOverride {}
  }
}

export const useTheme = (overrides?: Partial<ThemeOverride>): ThemeOverride =>
  baseUseTheme<ThemeOverride>(overrides);
