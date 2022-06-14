# Изменения

- Внесены изменения на основе дизайн макета. Добавлен новый вариант верстки.
- Компонент разделен на 3. Родительский с логикой и 2 дочерних с разными вариантами верстки.
- Обновлены размеры компонента. Добавлен новый размер `xs`
- Добавлен флаг `disabled`
- Добавлена возможность изменять внешний вид счетчика `type`

### Объект data: Набор параметров для конфигурации

| Параметр   | Тип     | По умолчанию | Возможные значения     | Описание                      |
|:-----------|:--------|:-------------|:-----------------------|:------------------------------|
| `size`     | String  | `md`         | `xs`, `sm`, `md`, `lg` | Размер счетчика               |
| `disabled` | Boolean | false        | true, false            | Заблокировать счетчик         |
| `type`     | String  | `primary`    | `primary`, `secondary` | Изменить внешний вид счетчика |


- Установлены новые дефолтные значения `styleConfig`. `fontFamily`: `Open Sans` -> `Inter`
- Добавлены новые свойства в `styleConfig`:
  `valueFontSize`, `valueColorDisabled`, `labelColorDisabled`, `helperTextColorDisabled`,
  `borderFocusColor`, `iconColorHover`, `iconColorDisabled`

### Объект styleConfig: Набор стилей для кастомизации

| Параметр                  | Тип    | По умолчанию | Возможные значения | Описание                                        |
|:--------------------------| :----- |:-------------|:-------------------|:------------------------------------------------|
| `valueFontSize`           | String | `16px`       |                    | Цвет значения поля ввода в состоянии `disabled` |
| `valueColorDisabled`      | String | `#CBD5E0`    |                    | Цвет плейсхолдера в состоянии `disabled`        |
| `labelColorDisabled`      | String | `#CBD5E0`    |                    | Цвет background в состоянии `disabled`          |
| `helperTextColorDisabled` | String | `#CBD5E0`    |                    | Цвет лейбла в состоянии `disabled`              |
| `borderFocusColor`        | String | `#76ACFB`    |                    | Цвет хэлпера в состоянии `disabled`             |
| `iconColorHover`          | String | `#2D3748`    |                    | Размер шрифта хэлпера                           |
| `iconColorDisabled`       | String | `#EDF2F7`    |                    | Показывать "успешное" состояние поля ввода      |