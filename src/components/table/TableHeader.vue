<template>
  <div class="header-container" :style="grid">
    <div class="header-checkbox">
      <ECheckbox
        v-if="showCheckbox"
        v-model="checked"
        @change="checkAllBoxes($event)"
        :data="{ checked: checked }"
      ></ECheckbox>
    </div>
    <div
      class="header-cell"
      v-for="(cell, index) in headerContent"
      :key="index"
    >
      <TableHeaderCell :cell="cell"></TableHeaderCell>
    </div>
    <div v-if="isExpandable" style="width: 43px"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'
import ECheckbox from '@/components/togglers/ECheckbox.vue'
import TableHeaderCell from '@/components/table/TableHeaderCell.vue'
import eventBus from '@/helpers/eventBus'
type HeaderContent = {
  label: string
  path: string
  sortable: boolean
  type: string
}
export default defineComponent({
  name: 'TableHeader',
  components: { ECheckbox, BIcon: BootstrapIcon, TableHeaderCell },
  props: {
    headerContent: {
      type: Object as unknown as HeaderContent,
      default: {},
    },
    showCheckbox: {
      type: Boolean,
      default: true,
    },
    grid: {
      type: String,
    },
    isExpandable: {
      type: Boolean,
      default: false,
    },
  },
  emits: ['check-all-boxes'],
  data() {
    return {
      checkBox: false,
      checked: false,
    }
  },
  mounted() {
    eventBus.$on('uncheck-all', (item: object) => {
      this.checked = item.value
    })
  },
  methods: {
    checkAllBoxes(value: any) {
      if (!value.srcElement.checked) {
        eventBus.$emit('uncheck-all-boxes', value.srcElement.checked )
      } else {
        this.checked = value.srcElement.checked
        console.log(this.checked)
        eventBus.$emit('check-all-boxes', value.srcElement.checked)
      }
    },
  },
})
</script>

<style scoped lang="scss">
@import './tableStyles';
</style>
