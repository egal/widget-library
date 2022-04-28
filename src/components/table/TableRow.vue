<template>
  <div
    class="row-container"
    :style="grid"
    :class="{ active: isActive || checked }"
  >
    <div class="row__checkbox">
      <ECheckbox
        v-if="showCheckbox"
        :data="{ checked: checked }"
        @change="setActiveRow($event)"
      />
    </div>
    <div v-for="field in fields" :key="field.id" class="table-cell-container" >
      <TableCell :value="renderTableCell(item, field)" v-if="!editMode"></TableCell>
      <EWidget v-else :field="field" :item="item"></EWidget>
    </div>
    <div class="row-open-icon" v-if="isExpandable">
      <button @click="expandRow">
        <b-icon
          class="icon icon--open"
          icon="chevron-compact-down"
          :class="{ rotate: isExpanded }"
        />
      </button>
    </div>
  </div>
  <div
    class="slot-container"
    :class="{ 'expand-content': isExpanded, 'collapse-content': !isExpanded }"
  >
    <div class="expanded-content" v-if="isExpanded">
      <slot name="expandedRow"></slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'
import TableCell from '@/components/table/TableCell.vue'
import ECheckbox from '@/components/togglers/ECheckbox.vue'
import EWidget from "@/components/widget/EWidget.vue";
import { format } from 'date-fns'
import eventBus from '@/helpers/eventBus'
import {tableStore} from "@/components/table/storage/TableStore";
export default defineComponent({
  name: 'TableRow',
  components: { ECheckbox, TableCell, BIcon: BootstrapIcon, EWidget },
  emits: ['set-active-row', 'uncheck-row'],
  data() {
    return {
      isActive: false,
      isExpanded: false,
      checked: false,
      editMode: false
    }
  },
  props: {
    item: {
      type: Object,
      default: {},
    },
    fields: {
      type: Array,
      default: [],
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
  mounted() {
    eventBus.$on('uncheck-all', (item: object) => {
      this.checked = item.item.id === this.item.id ? item.value : false
      return this.checked
    })
    eventBus.$on('check-all-boxes', (value: boolean) => {
      this.checked = value
    })
    eventBus.$on('edit-row', (value) => {
      if(!!this.isActive) {
        this.editMode = value
        console.log(value)
      }
    })
  },
  computed: {
  },
  methods: {
    setActiveRow(value: any) {
      this.isActive = value.srcElement.checked
      console.log(this.isActive)
      if (this.isActive) {
        tableStore.setSelectedValues(this.item)
        eventBus.$emit('set-active-row', this.item)
      } else {
        eventBus.$emit('uncheck-row', this.item)
      }
    },
    expandRow() {
      this.isExpanded = !this.isExpanded
    },
    renderTableCell(item: Object, field: Object) {
      let fieldKey = []
      let valuesArr = []
      let fieldPath
      let fieldName
      let nestedArr = []
      if (field.path.includes('[]')) {
        fieldKey = field.path.split('[')[0]
      } else {
        fieldKey = field.path
      }
      for (let i of Object.keys(item.values)) {
        if (i === fieldKey) {
          switch (field.type) {
            case 'string':
              if (Object.keys(field.computed).length === 0) {
                return item.values[i]
              } else {
                return item.values[i]
              }
              break
            case 'string[]':
              fieldPath = field.path.replace(/[[-]]/g, '').split('.')[0]
              fieldName = field.path.substr(field.path.indexOf('.') + 1)
              nestedArr = item.values[fieldPath]
              if (nestedArr.length > 0) {
                for (let i in nestedArr) {
                  valuesArr.push(nestedArr[i][fieldName])
                }
              } else {
                return '-'
              }
              return valuesArr
              break
            case 'date':
              return this.formatDate(item.values[i], field)
            case 'bool':
            case 'float':
            case 'button':
            case 'select':
            default:
              return item.values[i]
          }
        }
      }
    },
    formatDate(item: Date, field: Object) {
      if (field.computed.length) {
        return format(new Date(item), field.computed)
      } else {
        return item
      }
    },
    addComputedProperty(item: any, field: Object) {},
  },
})
</script>

<style scoped lang="scss">
@import './tableStyles';
.row-container {
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: min-content;
  cursor: pointer;
  padding: 24px 0;
}
</style>
