# Изменения
1. Изменен объект `data`. Добавлены `hoverBackgroundColor`, `pressedBackgroundColor`, `isPerPageSelect`, `variant`, `perPageLabel`. Убраны `leftArrowLabel`, `rightArrowLabel`, `componentStyle`.

|         Параметр         | Что делает                                                                                                                      | Доступные значения                        |                       По умолчанию                        |
|:------------------------:|:--------------------------------------------------------------------------------------------------------------------------------|:------------------------------------------|:---------------------------------------------------------:|
|     `numberOfPages`      | Общее количество страниц                                                                                                        | number                                    |                         `**10** `                         |
|       `modelValue`       | Текущая страница, внутреннее название во vue, в компонентах нужно использовать `v-model`                                        | number                                    |                         ` **1** `                         |
|          `size`          | Размер                                                                                                                          | `"sm"`, `"md"`, `"lg"`                    |                          `'md'`                           |
|          `font`          | Шрифт                                                                                                                           | `"Inter"`, `"Open Sans"`, `"Raleway"`,... |                       `"Open Sans"`                       |
|         `weight`         | Толщина шрифта                                                                                                                  | `"medium"`, `"regular"`, `"bold"`         |                           `500`                           |
|         `color`          | Цвет шрифта (обычный)                                                                                                           | string                                    |                        `'#2D3748'`                        |
|      `activeColor`       | Цвет шрифта (активный)                                                                                                          | string                                    |                        `'#0066ff'`                        |
| `activeBackgroundColor`  | Цвет фона у номера страницы (активный)                                                                                          | string                                    |                        `'#DEEBFC'`                        |
|  `hoverBackgroundColor`  | Цвет фона у номера страницы при наведении                                                                                       | string                                    |                        `'#A6C8FA'`                        |
| `pressedBackgroundColor` | Цвет фона у номера страницы при нажатии                                                                                         | string                                    |                        `'#76ACFB'`                        |
|      `borderColor`       | Цвет рамки                                                                                                                      | string                                    |                        `'#e2e8f0'`                        |
|        `perPage`         | Количество записей на страницу                                                                                                  | number                                    |                           `10`                            |
|    `isPerPageSelect`     | Определяет отображение селекта с выбором количества вывода элементов на страницу                                                | boolean                                   |                          `false`                          |
|      `perPageLabel`      | Текст около селекта с выбором количсества элементов на страницу                                                                 | string                                    |                        `'Show: '`                         |
|    `dropdownPosition`    | Установка позиционирования списка опций                                                                                         | `bottom`, `top`                           |                         `bottom`                          |
|     `selectOptions`      | Массив их объектов типа `{ name: 5 }`. Отвечает за опции, которые можно выбрать в дропдауне (количество элементов на страницу). | object                                    | `[{ name: 5 }, { name: 10 }, { name: 25 }, { name: 50 }]` |
|        `variant`         | Стиль компонента                                                                                                                | `primary`, `clear`                        |                         `primary`                         |
 
2. `minimalisticVersion` - теперь ненужный проп, но оставлен для совместимости. Вместо него можно использовать `isPerPageSelect`
