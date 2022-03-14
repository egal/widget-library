<template>
  <router-view>
    <ENavbarLeft :data="{ links: [{ name: 'dsf' }] }" />
  </router-view>
</template>

<script lang="ts">
import ENavbarLeft from '@/components/navigation/ENavbarLeft.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
  components: {
    ENavbarLeft,
  },
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
