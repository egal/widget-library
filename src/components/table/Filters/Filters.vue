<template>
  <EWidget type=""></EWidget>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import EWidget from "@/components/widget/EWidget.vue";
export default defineComponent({
  name: 'Filters',
  components: {EWidget},
  data() {
    return {
      visibleFilters: [],
      cardFilters: []
    }
  },
  props: {
    fields: {
      type: Array,
      default: []
    }
  }
})
</script>

<style scoped lang="scss"></style>
