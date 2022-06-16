import { SECONDARY_ICON_SIZE } from '@components/list/Item';
import { MaterialIcons } from '@expo/vector-icons';
import { ChildrenProps } from '@util/children';
import { ReactNode, useCallback } from 'react';
import { Animated } from 'react-native';
import { RectButton, Swipeable } from 'react-native-gesture-handler';
import { SwipeableProps } from 'react-native-gesture-handler/lib/typescript/components/Swipeable';
import { useTheme } from 'react-native-paper';

const AnimatedMaterialIcon = Animated.createAnimatedComponent(MaterialIcons);

const BUTTON_WIDTH = 64;

export interface SwipeToDeleteProps extends SwipeableProps {
  children: ReactNode;
  onDelete?: () => void;
}

export const SwipeToDelete = ({
  children,
  onDelete,
  ...swipeableProps
}: SwipeToDeleteProps) => {
  const { colors } = useTheme();

  const renderRightActions = useCallback(
    (
      progress: Animated.AnimatedInterpolation,
      _dragX: Animated.AnimatedInterpolation,
    ) => {
      progress.interpolate({
        inputRange: [0, 1],
        outputRange: [BUTTON_WIDTH, 0],
      });

      return (
        <Animated.View style={{ width: BUTTON_WIDTH }}>
          <RectButton
            onPress={onDelete}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: colors.delete,
            }}
          >
            <AnimatedMaterialIcon
              name="delete"
              size={SECONDARY_ICON_SIZE}
              color={colors.onSurface}
            />
          </RectButton>
        </Animated.View>
      );
    },
    [colors.delete, colors.onSurface, onDelete],
  );

  return (
    <Swipeable renderRightActions={renderRightActions} {...swipeableProps}>
      {children}
    </Swipeable>
  );
};
