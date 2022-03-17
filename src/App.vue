<template>
  <ENavbarLeft :style="{ height: '100%' }" :data="sidebarConfig">
    <span>B</span>
  </ENavbarLeft>
</template>

<script lang="ts">
import ENavbarLeft from '@/components/navigation/ENavbarLeft.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
  components: { ENavbarLeft },
  data() {
    return {
      sidebarConfig: {
        links: [
          {
            name: 'Главная',
            to: '/',
            icon: 'house',
          },
          {
            name: 'Каталог',
            to: '',
            icon: 'book',
            links: [
              {
                name: 'Категории продуктов',
                to: '/category-product',
                icon: 'dot',
              },
            ],
          },
        ],
        hoverStyle: {
          padding: '12px 20px',
          backgroundColor: 'red',
        },
        activeStyle: {
          padding: '12px 20px',
          backgroundColor: 'blue',
        },
        defaultStyle: {
          padding: '12px 20px',
          backgroundColor: 'red',
          color: 'green',
        },
      },
    }
  },
  methods: {},
})
</script>

<style lang="scss">
.a {
  display: grid;
  grid-row-gap: 30px;
}
</style>
