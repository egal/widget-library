<template>
  <ENavbarLeft :style="{ height: '100%' }" :data="sidebarConfig">
    <!--   todo name -->
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

        // todo concrete styles
        activeColor: '#00A8E8',
        color: '#646E78',
        hoverColor: '#E7EFC5', // todo added
        commonStyle: {
          borderRadius: '16px',
          width: 'initial',
          // padding: '12px 20px',
        },
        hoverStyle: {
          backgroundColor: '#B0A1BA',
        },
        activeStyle: {
          backgroundColor: '#ABC8C7',
        },
        defaultStyle: {
          backgroundColor: '#BFF0D4',
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
