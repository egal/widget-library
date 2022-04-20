<template>
  <div class="header-container" :style="grid">
    <div class="header-checkbox">
      <ECheckbox v-if="showCheckbox" @change="checkAllBoxes($event)"></ECheckbox>
    </div>
    <div class="header-cell" v-for="(cell, index) in headerContent" :key="index">
      <TableHeaderCell :cell="cell"></TableHeaderCell>
    </div>
    <div v-if="isExpandable" style="width: 16px"></div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'
import ECheckbox from "@/components/togglers/ECheckbox.vue";
import TableHeaderCell from "@/components/table/TableHeaderCell.vue"
import eventBus from "@/helpers/eventBus";
type HeaderContent = {
  label: string
  path: string
  sortable: boolean
  type: string
}
export default defineComponent({
  name: "TableHeader",
  components: {ECheckbox, BIcon: BootstrapIcon, TableHeaderCell},
  props: {
    headerContent: {
      type: Object as unknown as HeaderContent,
      default: {}
    },
    showCheckbox: {
      type: Boolean,
      default: true
    },
    grid: {
      type: String
    },
    isExpandable: {
      type: Boolean,
      default: false
    }
  },
  emits: ['check-all-boxes'],
  data() {
    return {
      checkBox: false
    }
  },
  methods: {
    checkAllBoxes(value: any) {
      eventBus.$emit('check-all-boxes', value.srcElement.checked)
    }
  }
})
</script>

<style scoped lang="scss">
@import './tableStyles';

</style>