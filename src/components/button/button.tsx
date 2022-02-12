import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { Theme } from '../../theme/theme';
import styles from './button_styles';
import { CustomIcon } from '../../custom_icon/CustomIcon';

type shapes = 'normal' | 'rounded';
type sizes = 's' | 'm' | 'l';
type types = 'primary' | 'secondary';

interface StyleProps {
  pressedAccentColor?: string;
  pressedSecondaryColor?: string;
  defaultAccentColor?: string;
  defaultSecondaryColor?: string;
  disabledBackgroundColor?: string;
  disabledTextColor?: string;
  textColor?: string;
  pressedSecondaryTextColor?: string;
  defaultSecondaryTextColor?: string;
}

interface Props {
  disabled?: boolean;
  label?: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  shape?: shapes;
  size?: sizes;
  type?: types;
  leftIconName?: string;
  rightIconName?: string;
  styleProps?: StyleProps;
}

export const Button: React.FC<Props> = ({
  disabled = false,
  shape = 'normal',
  size = 'l',
  type = 'primary',
  onPress,
  label,
  leftIconName,
  rightIconName,
  styleProps,
  style,
}) => {
  const getButtonTextSize = () => {
    if (size === 's') {
      return {
        fontSize: 10,
        lineHeight: 15,
      };
    }
    if (size === 'm') {
      return {
        fontSize: 12,
        lineHeight: 18,
      };
    }
    if (size === 'l') {
      return {
        fontSize: 14,
        lineHeight: 21,
      };
    }
    return {
      fontSize: 14,
      lineHeight: 21,
    };
  };

  const getButtonPaddingSize = () => {
    if (size === 's') {
      return {
        paddingHorizontal: 16,
        paddingVertical: 8,
      };
    }
    if (size === 'm') {
      return {
        paddingHorizontal: 20,
        paddingVertical: 12,
      };
    }
    if (size === 'l') {
      return {
        paddingHorizontal: 24,
        paddingVertical: 16,
      };
    }
    return {
      paddingHorizontal: 24,
      paddingVertical: 16,
    };
  };

  const getButtonBorderRadiusSize = () => {
    if (shape === 'rounded') {
      return {
        borderRadius: 50,
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

  const getButtonIconSize = () => {
    if (size === 's') {
      return 10;
    }
    if (size === 'm') {
      return 12;
    }
    if (size === 'l') {
      return 16;
    }
    return 16;
  };

  const getButtonColor = (pressed: boolean) => {
    if (disabled) {
      return {
        backgroundColor: styleProps?.disabledBackgroundColor || Theme.gray200,
      };
    }
    if (type === 'secondary') {
      return {
        backgroundColor: pressed
          ? styleProps?.pressedSecondaryColor || Theme.pressedSecondary
          : styleProps?.defaultSecondaryColor || Theme.defaultSecondary,
      };
    }
    return {
      backgroundColor: pressed
        ? styleProps?.pressedAccentColor || Theme.pressedAccent
        : styleProps?.defaultAccentColor || Theme.defaultAccent,
    };
  };

  const getButtonTextColor = (pressed: boolean) => {
    if (disabled) {
      return {
        color: styleProps?.disabledTextColor || Theme.gray500,
      };
    }
    if (type === 'secondary') {
      return {
        color: pressed
          ? styleProps?.pressedSecondaryTextColor || Theme.baseWhite
          : styleProps?.defaultSecondaryTextColor || Theme.defaultAccent,
      };
    }
    return {
      color: styleProps?.textColor || Theme.baseWhite,
    };
  };

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) =>
        StyleSheet.flatten([
          styles.button,
          getButtonColor(pressed),
          getButtonBorderRadiusSize(),
          getButtonPaddingSize(),
          style,
        ])
      }
      children={({ pressed }) => (
        <View style={styles.buttonBox}>
          {leftIconName && (
            <CustomIcon
              name={leftIconName}
              size={getButtonIconSize()}
              style={StyleSheet.flatten([
                styles.leftIcon,
                getButtonTextColor(pressed),
              ])}
            />
          )}
          <Text
            style={StyleSheet.flatten([
              styles.buttonText,
              getButtonTextColor(pressed),
              getButtonTextSize(),
            ])}
          >
            {label}
          </Text>
          {rightIconName && (
            <CustomIcon
              name={rightIconName}
              size={getButtonIconSize()}
              style={StyleSheet.flatten([
                styles.rightIcon,
                getButtonTextColor(pressed),
              ])}
            />
          )}
        </View>
      )}
    />
  );
};
