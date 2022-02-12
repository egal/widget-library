Переместить файл '/node_modules/widget-library-react-native/src/assets/fonts/icomoon/fonts/icomoon.ttf' в папку '/android/app/src/main/assets/fonts/'

Использование:
```
import { Button } from 'widget-library-react-native';
```
```
<Button
    label="My Egal Button"
    onPress={() => console.log('hello world')}
    size={'m'}
/>
```
Общие интерфейсы:
```
type shapes = 'normal' | 'rounded';
type sizes = 's' | 'm' | 'l';
type types = 'primary' | 'secondary';
```
Для Button:
```
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
```
Для ToggleButton:
```
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
```
Для CheckBox:
```
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
```
Для FloatActionButton:
```
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
```
Для RadioButton:
```
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
```
