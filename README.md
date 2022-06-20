# ERating
Определяется тэгом 
````vue
<e-rating></e-rating>
````

Комопнент принимает 1 параметр в качестве пропа:
Объект `data` который может содержать следующие параметры:


color: '#FFAC0A',
size: 'md',
icon: 'star',
iconFilled: 'star-fill',
maximum: 5,
modelValue: 0,
disabled: false,
readonly: false,

|   Параметр    | Описание                                                                 | Доступные значения                        | По умолчанию |
|:-------------:|:-------------------------------------------------------------------------|:------------------------------------------|:-------------|
|    `color`    | Цвет иконки                                                              | Любая стркоа                              | `#FFAC0A`    |
|    `size`     | Размер компонента                                                        | `lg`, `md`, `sm`, `xs`                    | `md`         |
|    `icon`     | Иконка когда значение не выбрано )                                       | Любое название иконки из Bootstrap Icons  | `star`       |
| `iconFilled`  | Иконка когда значение выбрано                                            | Любое название иконки из Bootstrap Icons  | `star-fill`  |
|   `maximum`   | Максимальное значение рейтинга, влияет на количество отображаемых иконок | Number                                    | `5`          |
| `modelValue`  | Текйщее значение рейтинга                                                | Number                                    | `0`          |
|  `disabled`   | Определяет заблокирован ли компонент                                     | `false`, `true`                           | `false`      |
|  `readonly`   | Отображает компонент только для просмотра                                | `false`, `true`                           | `false`      |

Если какой-то из параметров не передан, будет применено дефолтное значение.


## Пример использования
````vue
<template>
  <ERating :data="ratingData" @update:modelValue="updateRating" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ERating from '@/components/personality/ERating.vue'

export default defineComponent({
  name: 'App',
  components: { ERating },
  data() {
    return {
      ratingData: {
        modelValue: 1,
        color: '#ffd60a',
        size: 'lg',
        icon: 'star',
        iconFilled: 'star-fill',
        maximum: 5,
        disabled: false,
        readonly: false,
      },
    }
  },
  methods: {
    updateRating(value) {
      this.ratingData.modelValue = value
    },
  },
})
</script>

<style lang="scss">
</style>

````
