<template>
  <div v-if="Array.isArray(value) && value.length">
    <div v-for="cell in value" :key="cell">
      <span>{{ cell }}</span>
    </div>
  </div>
  <div v-else>
    <span>{{ value }} </span>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
export default defineComponent({
  name: "TableCell",
  props: {
    value: {
      type: String || Number || Array || Object || Boolean,
      default: ''
    }
  }
})
</script>

<style scoped lang="scss">
@import './tableStyles';
</style>