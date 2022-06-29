import { ComponentPropsWithoutRef } from 'react';
import { ViewProps } from 'react-native';
import { Surface, useTheme } from 'react-native-paper';
import styled from 'styled-components/native';
import {
  borders,
  BordersProps,
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  layout,
  LayoutProps,
  space,
  SpaceProps,
} from 'styled-system';

import { ChildrenProps } from '@util/children';

export interface InternalBoxProps
  extends ChildrenProps,
    ViewProps,
    BordersProps,
    ColorProps,
    FlexboxProps,
    LayoutProps,
    SpaceProps {
  flexed?: boolean;
  center?: boolean;
  horizontal?: boolean;
  vertical?: boolean;
}

const InternalBox = styled.View<InternalBoxProps>`
  ${flexbox};
  ${layout};
  ${borders};
  ${space};
  ${color};

  ${(props: InternalBoxProps) =>
    props.flexed &&
    `
    flex: 1;
  `}

  ${(props: InternalBoxProps) =>
    props.center &&
    `
    justifyContent: center;
    alignItems: center;
  `}

  ${(props: InternalBoxProps) =>
    props.horizontal &&
    `
    display: flex;
    flexDirection: row;
  `}

  ${(props: InternalBoxProps) =>
    props.vertical &&
    `
    display: flex;
    flexDirection: column;
  `}
`;

type SurfaceStyleProps = ComponentPropsWithoutRef<typeof Surface>['style'];

export interface BoxProps extends InternalBoxProps {
  surface?: boolean | SurfaceStyleProps;
}

export const Box = ({
  children,
  surface,
  accessibilityRole: _,
  ...props
}: BoxProps) => {
  return surface ? (
    <Surface
      style={{
        ...(typeof surface === 'object' ? surface : undefined),
      }}
    >
      <InternalBox mx={3} my={3} {...props}>
        {children}
      </InternalBox>
    </Surface>
  ) : (
    <InternalBox {...props}>{children}</InternalBox>
  );
};
