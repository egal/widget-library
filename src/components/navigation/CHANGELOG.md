## Steps

Определяется тэгом:

```vue
<e-steps></e-steps>
```

Принимает 2 параметра в качестве пропа:

1. Объект data, содержимое описано в таблице ниже

### Параметры объекта data

| Параметр            |       Тип        | По умолчанию           | Возможные значения                    | Описание                                                                                          |
|---------------------|:----------------:|------------------------|:--------------------------------------|---------------------------------------------------------------------------------------------------|
| `steps`             |      Array       | `[]`                   | Массив объектов возможных значений    | Список объектов, необходимых для генерации шагов                                                  |
| `selected`          | [Number, String] | `null`                 | Любое число или строка                | Ключ выбранного шага                                                                              |
| `completed`         | [Number, String] | `null`                 | Любое число или строка                | Ключ шага, для которого меняется состояние `isCompleted`                                          |
| `type`              |      String      | `'horizontal'`         | `'horizontal'`, `'vertical'`          | Определяет как будет ориентирован компонент                                                       |
| `size`              |      String      | `'md'`                 | `'xs'`, `'sm'`,`'md'`,`'lg'`          | Размер шагов                                                                                      |
| `underline`         |     Boolean      | `true`                 | `true`, `false`                       | Отвечает подчёркивание шагов. `true` - показывать подчёркивание, `false` - скрывать подчёркивание |
| `underlineType`     |      String      | `'solid'`              | `'solid'`, `'dashed'`                 | Тип подчёркивания (доступно только для **горизонтальных шагов**).                                 |
| `verticalAlignment` |      String      | `'right'`              | `'right'`, `'left'`                   | Выравнивание шагов (доступно только для **вертикальных шагов**).                                  |
| `withIcons`         |     Boolean      | `true`                 | `true`, `false`                       | Отвечает за наличие иконок у шагов                                                                |
| `iconCompleted`     |      String      | `check2`               | Любое название иконки Bootstrap Icons | Иконка для шагов с состоянием `isCompleted: true`                                                 |
| `iconMissing`       |      String      | `exclamation-triangle` | Любое название иконки Bootstrap Icons | Иконка для шагов с состоянием `isMissing: true`                                                   |

2. объект styleConfig: Набор стилей для кастомизация шагов.

### Пример styleConfig (в примере указаны дефолтные значения)

```javascript
styleConfig = {
  fontFamily: 'Inter',        // Шрифт
  fontWeight: 500,            // Тощина шрифта
  color: '#A0AEC0',           // Цвет шагов
  hoverColor: '#718096',      // Цвет шагов при наведении
  focusColor: '#0066FF',      // Цвет выбранного шага
  missingColor: '#FFD363',    // Цвет пропущенного шага
  completedColor: '#0066FF',  // Цвет выполненного шага
  underlineWidth: '1px',      // Толщина подчеркивающей линии
  spaceBetweenSteps: '30px',  // Расстояние между шагами
}
```

### Пример data.steps

```javascript
const steps = [
  {
    key: 1,
    name: 'First Step',
    isCompleted: true,
  },
  {
    key: 'string_key',
    name: 'Second Step',
    isFocus: true,
  },
  {
    key: 3,
    name: 'Third Tab',
    leftIcon: 'circle',
    rightIcon: 'chevron-right',
  },
]
```

### События

| Название   |  Тип параметров  | Описание                                                     |
|------------|:----------------:|--------------------------------------------------------------|
| `selected` | [Number, String] | Срабатывает при клике на шаг. Передаёт ключ выбранного ключа |
