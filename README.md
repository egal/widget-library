# Изменения
1. Объект `data`. Добавлен проп `position: 'right'` (right, left) + добавлен размер `'xs'`:

| Параметр	  |  Тип	  | По умолчанию	 | Возможные значения       | Описание                                                                                       |
|:-----------|:------:|:-------------:|:-------------------------|:-----------------------------------------------------------------------------------------------|
| `size`     | String |    `'md'`     | `xs`, `'sm'`, `md`, `lg` | Размер меню                                                                                    |
| `position` | String |   `'right'`   | `'left'`, `'right'`      | Расположение выпадающего меню (внизу слева или внизу справа относительно кнопки открытия меню) |

2. Объект в массиве `data.items`. Добавлен проп `iconRight: 'archive'`: 

## Передача параметров для отрисовки списка элементов в выпадающем меню

| Параметр	         |    Тип    | Обязательный | Возможные значения	                     | Описание                                                                      |
|:------------------|:---------:|:------------:|:----------------------------------------|:------------------------------------------------------------------------------|
| `label`           |  String   |      да      | Любая строка                            | Текст элемента списка                                                         | 
| `icon`            |  String   |    нет 	     | Строка с названием иконки из Bootstrap  | Иконка элемента слева от текста                                               |
| `iconRight`       |  String   |    нет 	     | Строка с названием иконки из Bootstrap  | Иконка элемента справа от текста                                              |
| `onClickHandler`	 | Function	 |     нет      | Функция	                                | Функция, определяющая что должно проийзоти после клика на этот элемент списка |

3. В объект `styleConfig` добавлено свойство `backgroundPressed` (поправлены дефолтные значения остальных свойств в таблице):

| Параметр                    |  По умолчанию  | Описание                                                                                                   |
|:----------------------------|:--------------:|:-----------------------------------------------------------------------------------------------------------|
| `fontFamily`	               |  `Open Sans`	  | Шрифт текста в выпадаеющем меню                                                                            |
| `fontWeight`	               |     `500`      | 	Свойство font-weight текста в выпадаеющем меню                                                            |
| `textColor`	                |  `'#2D3748'`   | Цвет текста в выпадающем меню                                                                              | 
| `backgroundHover`           | 	`''#E2E8F0''` | 	Цвет фона при наведении на один из элементов списка меню                                                  |
| `backgroundPressed`         |  `'#cbd5e0'`   | Цвет фона при нажатии на элемент в выпадающем меню                                                         |
| `backgroundColor`           |   `'#fff'`	    | Цвет фона в выпадающем меню и у кнопки с 3мя точками                                                       |
| `iconColor`	                |  `'#2D3748'`   | 	Цвет иконки с 3мя точками                                                                                 |
| `disabled`	                 |       -        | 	Объект, содержащий стили для заблокированного состояния. Содержит 2 свойства: iconColor и backgroundColor |
| `disabled.iconColor`	       |  `'#CBD5E0 '`  | 	Цвет иконки с 3мя точками в заблокированном состоянии                                                     |
| `disabled.backgroundColor`	 |    `'#fff'`    | 	Цвет фона у кнопки с 3мя точками в заблокированном состоянии                                              |
 

### Обновленый пример использования 
````vue
<template>
  <EDotMenu
      :data="{
       items: [
          {
            label: 'Archive',
            icon: 'archive',
            iconRight: 'archive',
            onClickHandler: () => {
              console.log('example')
            },
          },
          {
            label: 'divider',
          },
          { label: 'Trash', icon: 'trash', isDisabled: true },
        ],
      vertical: false,
      disabled: false,
      isOpen: false,
      size: 'lg',
    }"
      :style-config="{
          fontFamily: 'Raleway',
          iconColor: '#000000',
          disabled: {
            iconColor: '#4A5568',
            backgroundColor: 'grey'
          },
      }"
  />
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import EDotMenu from '@/components/navigation/EDotMenu.vue'
export default defineComponent({
  name: 'App',
  components: { EDotMenu },
  data() {
    return {

    }
  },
  methods: {
    openDeleteModal() {
      // opening Modal Window
    },
    setEditMode() {
      // setting Edit Mode...
    },
  },
})
</script>
````


