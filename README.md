## Использование
В meta роутам прописать "Родителя" (Строку (означает отсуствие ссылки для перехода) или объект со свойствами `name` и `path`). 
#### Пример: 
`router/index.ts`:
````javascript
{
    path: '/category',
    name: 'Категории',
    component: Category,
    meta: {
        breadcrumbs: ['Каталог']
    }
},
{
    path: '/products',
    name: 'Продукты',
    component: Products,
    meta: {
        breadcrumbs: [ 'Каталог' ]
    }
}
````
Цепочка хлебных крошек будет выглядеть `Каталог / Категории` и `Каталог / Продукты` на соответсвующих роутах.

### Вложенность
Если необходима вложенность больше чем 2 уровня - в массив `meta.breadcrumbs` элементы прописываются в порядке от корневого до нижнего
#### Пример:

`router/index.ts`:
````javascript
{
    path: '/category',
    name: 'Категории',
    component: Category,
    meta: {
        breadcrumbs: ['Каталог'],
    }
},
{
    path: '/products',
    name: 'Продукты',
    component: Products,
    meta: {
    breadcrumbs: [
        'Каталог',
        { path: '/category', name: 'Категории' },
    ]
}
````

В таком случае, при переходе по роуту `'/products'`, цепочка хлебных крошек будет выглядеть: `Каталог / Категории / Продукты`

