<template>
    <div v-if="Array.isArray(value) && value.length" class="cell-container">
      <div v-for="cell in value" :key="cell" class="array-cell">
        <span>{{ cell }}</span>
      </div>
    </div>
    <div v-else class="cell">
      <span>{{ value }} </span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'TableCell',
  props: {
    value: {
      type: String || Number || Array || Object || Boolean,
      default: '',
    },
    editMode: {
      type: Boolean,
      default: false
    }
  },
})
</script>

<style scoped lang="scss">
@import './tableStyles';
</style>
