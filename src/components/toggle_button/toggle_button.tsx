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
import styles from './toggle_button_styles';

type sizes = 's' | 'm' | 'l';

interface StyleProps {
  backgroundColor?: string;
  disabledBackgroundColor?: string;
  activeBackgroundColor?: string;
  textColor?: string;
  activeTextColor?: string;
  disabledTextColor?: string;
  iconColor?: string;
}

interface Props {
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  size?: sizes;
  disabled?: boolean;
  isActive: boolean;
  styleProps?: StyleProps;
  label?: string;
}

export const ToggleButton: React.FC<Props> = ({
  size = 'l',
  disabled = false,
  onPress,
  isActive,
  styleProps,
  style,
  label,
}) => {
  const getToggleSize = () => {
    if (size === 's') {
      return {
        width: 22,
        height: 12,
        padding: 1,
      };
    }
    if (size === 'm') {
      return {
        width: 30,
        height: 16,
        padding: 2,
      };
    }
    if (size === 'l') {
      return {
        width: 40,
        height: 22,
        padding: 3,
      };
    }
    return {
      width: 40,
      height: 22,
      padding: 3,
    };
  };

  const getToggleIconSize = () => {
    if (size === 's') {
      return {
        width: 9,
        height: 9,
        borderRadius: 9,
      };
    }
    if (size === 'm') {
      return {
        width: 12,
        height: 12,
        borderRadius: 12,
      };
    }
    if (size === 'l') {
      return {
        width: 16,
        height: 16,
        borderRadius: 16,
      };
    }
    return {
      width: 16,
      height: 16,
      borderRadius: 16,
    };
  };

  const getToggleButtonColor = () => {
    if (disabled) {
      return {
        backgroundColor: styleProps?.disabledBackgroundColor || Theme.gray200,
      };
    }
    if (isActive) {
      return {
        backgroundColor: styleProps?.activeBackgroundColor || Theme.hoverAccent,
      };
    }
    return {
      backgroundColor: styleProps?.backgroundColor || Theme.gray400,
    };
  };

  const getToggleButtonIconColor = () => {
    return {
      backgroundColor: styleProps?.iconColor || Theme.baseWhite,
    };
  };

  const getToggleButtonTextSize = () => {
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

  const getToggleButtonTextMargin = () => {
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

  const getToggleButtonTextColor = () => {
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
      color: styleProps?.textColor || Theme.gray800,
    };
  };

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={StyleSheet.flatten([styles.buttonBox, style])}
    >
      <View
        style={StyleSheet.flatten([
          styles.button,
          getToggleSize(),
          getToggleButtonColor(),
          isActive && { alignItems: 'flex-end' },
        ])}
      >
        <View
          style={StyleSheet.flatten([
            getToggleIconSize(),
            getToggleButtonIconColor(),
          ])}
        />
      </View>

      <Text
        style={StyleSheet.flatten([
          styles.toggleButtonText,
          getToggleButtonTextSize(),
          getToggleButtonTextColor(),
          getToggleButtonTextMargin(),
        ])}
      >
        {label}
      </Text>
    </Pressable>
  );
};
