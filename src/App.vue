<template>
  <div>
    <ENavbarLeft
      :data="{
        links
      }"
    />

    <router-view>
      <div
        :style="{
          marginLeft: '300px',
        }"
      >
        <EBreadcrumbs :data="{
        links
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
      links: [
        {
          name: 'user',
          to: '',
          links: [
            {
              name: 'profile',
              to: '',
              links: [{ name: 'posts', to: '/posts' }],
            },
          ],
        },

        { name: 'posts 2 ', to: '/posts2' },
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