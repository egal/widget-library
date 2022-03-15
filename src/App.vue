<template>
  <div>
    <ENavbarLeft
      :data="{
         links: links
      }"
    />

    <router-view>
      <div
        :style="{
          marginLeft: '300px',
        }"
      >
        <EBreadcrumbs :data="{
       links:links
      }" />
      </div>
    </router-view>
  </div>
</template>

<script lang="ts">
import EBreadcrumbs from '@/components/navigation/EBreadcrumbs.vue'
import ENavbarLeft from '@/components/navigation/ENavbarLeft.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
  components: { EBreadcrumbs, ENavbarLeft },
  data() {
    return {
      links:[
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
              // links: [{
              //   name: 'Продукты',
              //   to: '/products',
              //   icon: 'dot',
              // },]
            },
            {
              name: 'Продукты',
              to: '/products',
              icon: 'dot',
            },
          ],
        },
      ],
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