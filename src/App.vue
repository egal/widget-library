<template>
  <div :style="{ width: '300px' }">
    <EPagination :minimalistic-version="true"></EPagination>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import EPagination from '@/components/navigation/EPagination.vue'
export default defineComponent({
  name: 'App',
  components: { EPagination },
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
