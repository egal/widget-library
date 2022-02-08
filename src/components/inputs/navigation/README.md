# Navigation (содержит хлебные крошки, навбар и пагинацию)

## Важные особенности

Стилизация общих частей задается при помощи конфигурационного файла configNavigation.js.

| Экспортируемые значения | Что делает                                                                                          | Тип или сигнатура функции                                                                                                                             |
| ----------------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| variables               | SCSS-переменные, экспортированные и файла variables.scss cм. файл variables.scss, раздел :export {} | Object, описание слишком большое                                                                                                                      |
| fontList                | Список шрифтов, используемых в пакте и их css представление                                         | `{ Raleway: variables.raleway, "Open Sans": variables.openSans, Inter: variables.inter, default: variables.raleway, };`                               |
| weightList              | Список толщин шрифтов и их css представление                                                        | `{ medium: variables.mediumFontWeight, regular: variables.regularFontWeight, bold: variables.boldFontWeight, default: variables.mediumFontWeight, };` |
| getFont()               | Функция, которая ищет шрифт в списке щрифтов, и если его там нет, возвращает default                | `(font: string) => string`                                                                                                                            |
| getFontWeight()         | Функция ищет толщину в списке толщин шрифтов, и если не находит, возвращает default                 | `(weight: string) => string`                                                                                                                          |

## Breadcrumbs

Компонент хлебных крошек, автоматически парсит путь и создает соответствующие ссылки, название для ссылки получает из роутера

| Параметр      | Что делает                    | Доступные значения              | По-умолчанию  |
| ------------- | ----------------------------- | ------------------------------- | ------------- |
| size?         | Размер                        | "sm", "md", "lg"                | "md"          |
| font?         | Шрифт                         | "Inter", "Open Sans", "Raleway" | см. configNavigation.js |
| weight?       | Толщина шрифта                | "medium", "regular", "bold"     | см. configNavigation.js |
| color?        | Цвет текста неактивной ссылки | string;                         | ""            |
| chevronColor? | Цвет иконки стрелки           | string;                         | ""            |
| activeColor?  | Цвет текста активной ссылки   | string;                         | ""            |

## Pagination

Компонент пагинации, удобно реализован двусторонний биндинг через v-model

| Параметр               | Что делает                                                                              | Доступные значения               | По-умолчанию  |
| ---------------------- | --------------------------------------------------------------------------------------- | -------------------------------- | ------------- |
| numberOfPages          | Общее количество страниц                                                                | number                           | 0;            |
| modelValue             | Текущая страница, внутреннее название во vue, в компонентах нужно использоват `v-model` | number                           | 0             |
| leftArrowLabel?        | Текст рядом с левой стрелкой                                                            | string                           | ""            |
| rightArrowLabel?       | Текст рядом с правой стрелкой                                                           | string                           | ""            |
| size?                  | Размер                                                                                  | "sm", "md", "lg"                 | "md"          |
| componentStyle?        | Стиль компонента                                                                        | "normal", "light"                | "normal"      |
| font?:                 | Шрифт                                                                                   | "Inter", "Open Sans", "Raleway"; | см. configNavigation.js |
| weight?                | Толщина шрифта                                                                          | "medium", "regular", "bold"      | см. configNavigation.js |
| color?                 | Цвет шрифта (обычный)                                                                   | string;                          | ""            |
| activeColor?           | Цвет шрифта (активный)                                                                  | string;                          | ""            |
| activeBackgroundColor? | Цвет заднего плана (активный)                                                           | string;                          | ""            |
| borderColor?           | Цвет рамки                                                                              | string;                          | ""            |

## NavbarVertical

Вертикальный навбар

| Параметр      | Что делает                                              | Доступные значения              | По-умолчанию  |
| ------------- | ------------------------------------------------------- | ------------------------------- | ------------- |
| logo          | Большой логотип, отбражается в открытом состоянии       | string                          | required      |
| smallLogo     | Маленький логотип, отбражается в закрытом состоянии     | string                          | required      |
| links         | Массив со объектами ссылок, `[{to: '/', name: 'Home'}]` | Link[]                          | required      |
| font?         | Шрифт                                                   | "Inter", "Open Sans", "Raleway" | см. configNavigation.js |
| weight?       | Толщина шрифта                                          | "medium", "regular", "bold"     | см. configNavigation.js |
| color?        | Цвет неактивного текста                                 | string                          | ""            |
| activeColor?  | Цвет активного текста или при наведении                 | string                          | ""            |
| chevronColor? | Цвет стрелки                                            | string                          | ""            |

## NavbarVertical

Горизонтальный навбар

| Параметр      | Что делает                                              | Доступные значения              | По-умолчанию  |
| ------------- | ------------------------------------------------------- | ------------------------------- | ------------- |
| logo          | Большой логотип, отбражается в открытом состоянии       | string                          | required      |
| links         | Массив со объектами ссылок, `[{to: '/', name: 'Home'}]` | Link[]                          | required      |
| font?         | Шрифт                                                   | "Inter", "Open Sans", "Raleway" | см. configNavigation.js |
| weight?       | Толщина шрифта                                          | "medium", "regular", "bold"     | см. configNavigation.js |
| color?        | Цвет неактивного текста                                 | string                          | ""            |
| activeColor?  | Цвет активного текста или при наведении                 | string                          | ""            |

Имеет именованный слот avatar для аватара, не имеет параметров