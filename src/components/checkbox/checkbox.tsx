import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import { Theme } from '../../theme/theme';
import styles from './checkbox_styles';
import { CustomIcon } from '../../custom_icon/CustomIcon';

type sizes = 's' | 'm' | 'l';

interface StyleProps {
  pressedAccentColor?: string;
  defaultAccentColor?: string;
  disabledBackgroundColor?: string;
  disabledTextColor?: string;
  textColor?: string;
  activeTextColor?: string;
  borderColor?: string;
}

export interface Props {
  disabled?: boolean;
  label?: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  size?: sizes;
  isChecked: boolean;
  styleProps?: StyleProps;
}

export const Checkbox: React.FC<Props> = ({
  disabled = false,
  size = 'l',
  onPress,
  label,
  isChecked = false,
  styleProps,
}) => {
  const getCheckboxTextSize = () => {
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

  const getCheckboxMargin = () => {
    if (size === 's') {
      return {
        marginRight: 8,
      };
    }
    if (size === 'm') {
      return {
        marginRight: 10,
      };
    }
    if (size === 'l') {
      return {
        marginRight: 12,
      };
    }
    return {
      marginRight: 12,
    };
  };

  const getCheckboxColor = (pressed: boolean) => {
    if (disabled) {
      return styleProps?.disabledBackgroundColor || Theme.gray300;
    }
    if (isChecked) {
      return pressed
        ? styleProps?.pressedAccentColor || Theme.pressedAccent
        : styleProps?.defaultAccentColor || Theme.defaultAccent;
    }
    return styleProps?.borderColor || Theme.gray300;
  };

  const getIcon = () => {
    if (disabled) {
      return 'checkbox-disabled';
    }
    if (isChecked) {
      return 'check-square-fill';
    }
    return 'checkbox';
  };

  const getCheckboxButtonSize = () => {
    if (size === 's') {
      return 16;
    }
    if (size === 'm') {
      return 18;
    }
    if (size === 'l') {
      return 20;
    }
    return 20;
  };

  const getCheckboxTextColor = () => {
    if (disabled) {
      return {
        color: styleProps?.disabledTextColor || Theme.gray500,
      };
    }
    if (isChecked) {
      return {
        color: styleProps?.activeTextColor || Theme.gray800,
      };
    }
    return {
      color: styleProps?.textColor || Theme.gray700,
    };
  };
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={styles.checkboxContainer}
      children={({ pressed }) => (
        <>
          <CustomIcon
            name={getIcon()}
            size={getCheckboxButtonSize()}
            color={getCheckboxColor(pressed)}
            style={getCheckboxMargin()}
          />
          <Text
            style={StyleSheet.flatten([
              styles.checkboxText,
              getCheckboxTextSize(),
              getCheckboxTextColor(),
            ])}
          >
            {label}
          </Text>
        </>
      )}
    />
  );
};
