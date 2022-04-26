<template>
  <span>{{ cell.label }}</span>
  <button @click.stop="sortColumn()" v-if="cell.sortable">
    <b-icon
      class="icon icon--sort"
      :icon="sortItemUp ? 'sort-up' : 'sort-down'"
    />
  </button>
</template>

<script>
import { defineComponent } from 'vue'
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'
import eventBus from '@/helpers/eventBus'
export default defineComponent({
  name: 'TableHeaderCell',
  components: { BIcon: BootstrapIcon },
  props: {
    cell: {
      type: Object,
      default: {},
    },
  },
  emits: ['sort-column'],
  data() {
    return {
      sortItemUp: false,
      order: 'desc',
    }
  },
  methods: {
    sortColumn() {
      this.sortItemUp = !this.sortItemUp
      switch (this.order) {
        case 'desc':
          this.order = 'asc'
          break
        case 'asc':
          this.order = 'desc'
      }
      let sortColumn = [this.cell.path, this.order]
      eventBus.$emit('sort-column', sortColumn)
    },
  },
})
</script>

<style scoped lang="scss">
@import './tableStyles';
</style>
