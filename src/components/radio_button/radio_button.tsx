import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from 'react-native';
import { CustomIcon } from '../../custom_icon/CustomIcon';
import { Theme } from '../../theme/theme';
import styles from './radio_button_styles';

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
  isActive: boolean;
  styleProps?: StyleProps;
}

export const RadioButton: React.FC<Props> = ({
  disabled = false,
  size = 'l',
  onPress,
  label,
  isActive = false,
  styleProps,
  style,
}) => {
  const getRadioButtonSize = () => {
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

  const getRadioButtonColor = (pressed: boolean) => {
    if (disabled) {
      return styleProps?.disabledBackgroundColor || Theme.gray300;
    }
    if (isActive) {
      return pressed
        ? styleProps?.pressedAccentColor || Theme.pressedAccent
        : styleProps?.defaultAccentColor || Theme.defaultAccent;
    }
    return pressed
      ? styleProps?.defaultAccentColor || Theme.defaultAccent
      : styleProps?.disabledTextColor || Theme.gray500;
  };

  const getRadioButtonTextSize = () => {
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

  const getRadioButtonTextMargin = () => {
    if (size === 's') {
      return {
        marginLeft: 10,
      };
    }
    if (size === 'm') {
      return {
        marginLeft: 12,
      };
    }
    if (size === 'l') {
      return {
        marginLeft: 14,
      };
    }
    return {
      marginLeft: 14,
    };
  };

  const getRadioButtonTextColor = () => {
    if (disabled) {
      return {
        color: styleProps?.disabledTextColor || Theme.gray500,
      };
    }
    if (isActive) {
      return {
        color: styleProps?.activeTextColor || Theme.gray800,
      };
    }
    return {
      color: styleProps?.textColor || Theme.gray600,
    };
  };

  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={StyleSheet.flatten([styles.radioButtonContainer, style])}
      children={({ pressed }) => (
        <>
          <CustomIcon
            name={isActive ? 'radio-button-active' : 'radio-button'}
            size={getRadioButtonSize()}
            color={getRadioButtonColor(pressed)}
          />
          <Text
            style={StyleSheet.flatten([
              styles.radioButtonText,
              getRadioButtonTextSize(),
              getRadioButtonTextColor(),
              getRadioButtonTextMargin(),
            ])}
          >
            {label}
          </Text>
        </>
      )}
    />
  );
};
