<template>
  <div>
    <ENavbarLeft
      :data="{
        links: [
          {
            name: 'user',
            links: [
              {
                name: 'profile',
                to: '/user/profile',
              },
            ],
          },

          { name: 'category', to: '/category' },
        ],
      }"
    />

    <router-view>
      <div
        :style="{
          marginLeft: '300px',
        }"
      >
        <EBreadcrumbs
          :data="{
            crumbs: $route.matched.map((route) =>
              route.children.length > 0 ? { ...route, path: '' } : route,
            ),
          }"
        />
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
    return {}
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
