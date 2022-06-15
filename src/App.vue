<template>
  <div>
    <EPagination :data="{ ...pData }"></EPagination>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import EPagination from '@/components/navigation/EPagination.vue'

export default defineComponent({
  name: 'App',
  components: { EPagination },
  data() {
    return {
      // numberOfPages	Общее количество страниц	number	0
      // modelValue	Текущая страница, внутреннее название во vue, в компонентах нужно использоват v-model	number	0
      // leftArrowLabel?	Текст рядом с левой стрелкой	string
      // rightArrowLabel?	Текст рядом с правой стрелкой	string
      // size?	Размер	"sm", "md", "lg"	md
      // componentStyle?	Стиль компонента	"normal", "light"	normal
      // font?	Шрифт	"Inter", "Open Sans", "Raleway"	Open Sans
      // weight?	Толщина шрифта	"medium", "regular", "bold"	regular
      // color?	Цвет шрифта (обычный)	string
      // activeColor?	Цвет шрифта (активный)	string
      // activeBackgroundColor?	Цвет заднего плана (активный)	string
      // borderColor?	Цвет рамки	string
      // perPage	Количество записей на страницу	number	10
      // dropdownPosition	Установка позиционирования списка опций	bottom, top	bottom
      // selectOptions
      pData: {},
    }
  },
  mounted() {},
  methods: {},
})
</script>

<style lang="scss">
.a {
  display: grid;
  grid-row-gap: 30px;
}
</style>
