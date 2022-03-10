<template>
  <div>
    <ENavbarLeft
      :data="{
        links: [
          {
            name: 'dsfsdf',
            to: '/user',
            links: [
              {
                name: 'ssd',
                to: '/user/profile',
                links: [{ name: 'posts', to: '/user/profile/posts' }],
              },
            ],
          },
          { name: 'ssd', to: '/user/profile' },
          { name: 'posts', to: '/user/profile/posts' },
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
            crumbs: $route.matched,
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
