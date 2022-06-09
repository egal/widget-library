# Изменения

- Внесены изменения на основе дизайн макета. 
- Установлены новые дефолтные значения `styleConfig`
- Обновлён набор свойств `styleConfig`: добавлены свойства `valueDisabledColor`, `placeholderDisabledColor`,
     `backgroundDisabledColor`, `labelDisabledColor`, `helperTextDisabledColor`, `helperTextFontSize`, `successСolor`
- Обновлены размеры компонента. Добавлен новый размер `xs`
- Добавлен флаг `showSuccess`

### Объект data: Набор параметров для конфигурации

| Параметр     | Тип     | По умолчанию | Возможные значения     | Описание                                   |
|:-------------|:--------|:-------------|:-----------------------|:-------------------------------------------|
| `size`       | String  | `md`         | `xs`, `sm`, `md`, `lg` | Размер поля ввода                          |
| `showSuccess`| Boolean | false        | true, false            | Показывать "успешное" состояние поля ввода |


### Объект styleConfig: Набор стилей для кастомизации

| Параметр                   | Тип    | По умолчанию  | Возможные значения | Описание                                        |
|:---------------------------| :----- |:--------------|:-------------------|:------------------------------------------------|
| `valueDisabledColor`       | String | `#CBD5E0`     |                    | Цвет значения поля ввода в состоянии `disabled` |
| `placeholderDisabledColor` | String | `#CBD5E0`     |                    | Цвет плейсхолдера в состоянии `disabled`        |
| `backgroundDisabledColor`  | String | `#ffffff`     |                    | Цвет background в состоянии `disabled`          |
| `labelDisabledColor`       | String | `#CBD5E0`     |                    | Цвет лейбла в состоянии `disabled`              |
| `helperTextDisabledColor`  | String | `#CBD5E0`     |                    | Цвет хэлпера в состоянии `disabled`             |
| `helperTextFontSize`       | String | `12px`        |                    | Размер шрифта хэлпера                           |
| `successСolor`             | String | `#66CB9F`     |                    | Показывать "успешное" состояние поля ввода      |




