import { ComponentPropsWithoutRef } from 'react';
import { StyleSheet } from 'react-native';
import { Keyboard } from 'react-native';
import { FAB as PaperFAB } from 'react-native-paper';
import { IconSource } from 'react-native-paper/lib/typescript/src/components/Icon';

type BaseProps = ComponentPropsWithoutRef<typeof PaperFAB>;

export type FabProps = Omit<BaseProps, 'icon'> &
  Partial<Pick<BaseProps, 'icon'>> & {
    appbar?: boolean;
  };

export const Fab = ({ appbar, onPress, style, ...props }: FabProps) => {
  return (
    <PaperFAB
      icon={undefined as unknown as IconSource} // https://github.com/callstack/react-native-paper/issues/3594
      size={appbar ? 'small' : 'medium'}
      mode={appbar ? 'flat' : 'elevated'}
      style={[styles.fab, style]}
      {...props}
      {...(onPress && {
        onPress: (e) => {
          Keyboard.dismiss();
          onPress(e);
        },
      })}
    />
  );
};

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 22, // Should be 16, but that currently causes the shadow to be clipped by the navbar - https://github.com/callstack/react-native-paper/issues/3957
    right: 16,
  },
});
