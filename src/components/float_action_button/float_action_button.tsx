import React from 'react';
import { Pressable, StyleProp, StyleSheet, ViewStyle } from 'react-native';
import { Theme } from '../../theme/theme';
import styles from './float_action_button_styles';
import { CustomIcon } from '../../custom_icon/CustomIcon';

type shapes = 'normal' | 'rounded';
type sizes = 's' | 'm' | 'l';

interface StyleProps {
  pressedAccentColor?: string;
  defaultAccentColor?: string;
  disabledBackgroundColor?: string;
  disabledIconColor?: string;
  iconColor?: string;
}

export interface Props {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  shape?: shapes;
  size?: sizes;
  disabled?: boolean;
  iconName?: string;
  styleProps?: StyleProps;
}

export const FloatActionButton: React.FC<Props> = ({
  shape = 'normal',
  size = 'l',
  disabled = false,
  onPress,
  iconName = 'plus',
  styleProps,
  style,
}) => {
  const getButtonIconSize = () => {
    if (size === 's') {
      return 14;
    }
    if (size === 'm') {
      return 16;
    }
    if (size === 'l') {
      return 18;
    }
    return 18;
  };

  const getButtonSize = () => {
    if (size === 's') {
      return {
        width: 26,
        height: 26,
      };
    }
    if (size === 'm') {
      return {
        width: 36,
        height: 36,
      };
    }
    if (size === 'l') {
      return {
        width: 46,
        height: 46,
      };
    }
    return {
      width: 46,
      height: 46,
    };
  };

  const getButtonBorderRadiusSize = () => {
    if (shape === 'rounded') {
      return {
        borderRadius: 100,
      };
    }
    if (size === 's') {
      return {
        borderRadius: 4,
      };
    }
    if (size === 'm') {
      return {
        borderRadius: 6,
      };
    }
    if (size === 'l') {
      return {
        borderRadius: 8,
      };
    }
    return {
      borderRadius: 8,
    };
  };

  const getButtonColors = (pressed: boolean) => {
    if (disabled) {
      return {
        backgroundColor: styleProps?.disabledBackgroundColor || Theme.gray200,
      };
    }
    return {
      backgroundColor: pressed
        ? styleProps?.pressedAccentColor || Theme.pressedAccent
        : styleProps?.defaultAccentColor || Theme.defaultAccent,
    };
  };

  const getIconColor = () => {
    if (disabled) {
      return styleProps?.disabledIconColor || Theme.gray500;
    }
    return styleProps?.iconColor || Theme.baseWhite;
  };

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) =>
        StyleSheet.flatten([
          styles.button,
          getButtonColors(pressed),
          getButtonSize(),
          getButtonBorderRadiusSize(),
          style,
        ])
      }
    >
      <CustomIcon
        name={iconName}
        size={getButtonIconSize()}
        color={getIconColor()}
      />
    </Pressable>
  );
};
