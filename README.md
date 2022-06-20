## Изменения в параметрах

- Опции стилей вынесены styleConfig и добавились новые параметры. Теперь набор параметров выглядит следующим образом:

| Параметр    |  Тип   | Возможные значения                                                                  |    Описание    |
|:------------|:------:|:------------------------------------------------------------------------------------|:--------------:|
| `size`      | string | `xs`, `sm`, `md`, `lg`                                                              | Размер виджета |
| `leftIcon`  | string | Любое имя иконки, которое есть в Bootstrap (`circle-fill`, `chevron-right`, и т.д.) |  Иконка слева  |
| `rightIcon` | string | Любое имя иконки, которое есть в Bootstrap (`circle-fill`, `chevron-right`, и т.д.) | Иконка справа  |

````javascript
const styleConfig = {
  chevronColor: '#a0aec0',
  color: '#a0aec0',
  hoverColor: '#718096',
  activeColor: '#2D3748',
  font: 'Inter',
  weight: 500,
}
````


## Использование
Хлебные крошки генерируются автоматически. Они так же обрабатывают вложенные и динамические пути.
Если хлебных крошек больше 4, то лишние крошки скрываются за тремя точками. При наведении на них появляется дропдаун со скрытыми маршрутами.

#### Пример:
`router/index.ts`:
````javascript
const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: HomePage,
  },
  {
    path: '/about',
    name: 'About',
    component: AboutPage,
    meta: {
      breadcrumb: 'Page about ${about_title}',
    },
  },
  {
    path: '/about/more',
    name: 'More',
    component: MorePage,
    children: [
      {
        name: 'Links',
        path: 'links',
        component: LinksPage,
      },
      {
        name: 'Media',
        path: 'media/:name',
        component: MediaPage,
        meta: {
          breadcrumb: '${name}',
        },
      },
    ],
  },
]
````

Компонент:
````vue
<template>
  <div>
    <router-link :to="{ name: 'About', params: { about_title: 'Some title'} }">
      About
    </router-link>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Home',
})
</script>
````


Хлебные крошки на роутах:  
``/``: Home  
``/about``: Page about Some title  
``/about/more``: Page about some title / More  
``/about/more/links``: Page about some title / More / Links  
``/about/more/media/twitter``: Page about some title / More / Twitter 

#### Как работает

На основе пути текущего роута определяются все предыдущие роуты. Если, допустим, ``/about/more/links`` это текущий роут, то ``/about/more`` будет предыдущим и т.д.

Хлебные крошки без настроек отображают имя маршрута в качестве текста, но так же можно и указать в ``meta`` свойство ``breadcrumb``. Если указано ``breadcrumb``,
то компонент будет брать значение оттуда.  
Так же в ``breadcrumb`` можно указать простой шаблон в виде ``breadcrumb: 'Page number ${page_number}'``. ``${page_number}`` - это имя передаваемого через роутер параметра. При отрисовке
эта часть заменится на значение параметра ``page_number``.

## Ограничения

Ввиду особенностей Vue Router есть некоторые ограничения при использовании компонента. В основном они связаны с шаблонами и динамическими путями:

- Роут **ОБЯЗАТЕЛЬНО** должен содержать имя. Вся навигация происходит по имени маршрута. Сделано это из-за возможности передавать параметры и обработки динамических путей.
- Чтобы хлебные крошки правильно отображали путь, каждый последующий роут должен содержать путь предыдущего. То есть, ``/about/more`` / ``/about/more/links`` / ``/about/more/links/10`` и т.д. (**ЭТО НЕ КАСАЕТСЯ ВЛОЖЕННЫХ ПУТЕЙ**)
- Если роут содержит динамический шаблон и это **НЕ ДОЧЕРНИЙ** роут, то необходимо передавать ему указанный параметр. То есть, если происходит перенаправление со страницы ``/about/more``, содержащий шаблон ``Page about ${about_title}``, на ``/about/more/links``,
то **ВСЁ РАВНО** нужно передавать параметр ``about_title``, иначе хлебная крошка отобразит ``Page about undefined``
- При перезагрузке страницы текст динамической крошки **СЛЕТАЕТ** и вместо текста отображается ``undefined``. Это происходит из-за того, что параметры нигде не хранятся и при перезагрузке просто очищаются.
