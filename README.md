## Tabs

Определяется тэгом:

```vue
<e-tabs></e-tabs>
```

Принимает 2 параметра в качестве пропа:

1. объект data, содержимое описано в таблице ниже

### Параметры объекта data

| Параметр            |       Тип        | По умолчанию | Возможные значения                 | Описание                                                                                                                                                 |
|---------------------|:----------------:|--------------|:-----------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|
| `options`           |      Array       | `[]`         | Массив объектов возможных значений | Список объектов, необходимых для генерации и конфигурации табов                                                                                          |
| `selected`          | [Number, String] | `null`       | Любое число                        | Ключ выбранного таба                                                                                                                                     |
| `size`              |      String      | `'md'`       | `'xs'`, `'sm'`,`'md'`,`'lg'`       | Размер табов                                                                                                                                             |
| `vertical`          |     Boolean      | `false`      | `true`, `false`                    | Вариант отображения табов. `true` - вертикальные табы, `false` - горизонтальные                                                                          |
| `underline`         |     Boolean      | `true`       | `true`, `false`                    | Отвечает за отрисовку подчёркивания выбранного таба (или индикатор выбранного таба). `true` - показывать подчёркивание, `false` - скрывать подчёркивание |
| `underlinePosition` |      String      | `left`       | `left`, `right`                    | Позиция подчёркивания (доступно только для **вертикальных табов**).                                                                                      |

2. объект styleConfig: Набор стилей для кастомизации табов.

### Пример styleConfig (в примере указаны дефолтные значения)

```javascript
styleConfig = {
  fontFamily: 'Inter',        // Шрифт
  tabsGap: '32px',            // Расстояние между табами. Для lg и md - 32px, для sm и xs - 24px.
  color: '#A0AEC0',           // Цвет табов
  hoverColor: '#718096',      // Цвет табов при наведении
  activeColor: '#0066FF',     // Цвет выбранного таба
  underlineColor: '0066FF',   // Цвет подчёркивания
  underlineThickness: '1px',  // Толщина подчёркивания
}
```

### Пример options

```javascript
const options = [
  {
    key: 1,
    name: 'First Tab',
  },
  {
    key: 'string_key',
    name: 'Second Tab',
    leftIcon: 'circle',
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

| Название   |  Тип параметров  | Описание                                                    |
|------------|:----------------:|-------------------------------------------------------------|
| `selected` | [Number, String] | Срабатывает при клике на таб. Передаёт ключ выбранного таба |

### Примечания
 - Свойство `tabsGap` в объекте `styleConfig` используется для расчёта позиции подчёркивания. Если есть необходимость поменять расстояние между табами,
то необходимо это делать через данное свойство.
