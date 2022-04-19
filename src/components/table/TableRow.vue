<template>
  <div class="row-container" :style="grid">
    <div class="row__checkbox">
      <ECheckbox v-if="showCheckbox" :data="{checked: checkBox}"/>
    </div>
    <div v-for="field in fields" :key="field.id">
      <TableCell :value="renderTableCell(item, field)"></TableCell>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import TableCell from "@/components/table/TableCell.vue";
import ECheckbox from "@/components/togglers/ECheckbox.vue";
import { format } from 'date-fns'
import {Logger} from "sass";
export default defineComponent({
  name: "TableRow",
  components: {ECheckbox, TableCell},
  props: {
    item: {
      type: Object,
      default: {}
    },
    fields: {
      type: Array,
      default: []
    },
    showCheckbox: {
      type: Boolean,
      default: true
    },
    grid: {
      type: String
    },
    checkBox: {
      type: Boolean,
      default: false
    }
  },
  methods: {
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
      for (let i of Object.keys(item)) {
        if (i === fieldKey) {
          switch (field.type) {
            case 'string':
              if (Object.keys(field.computed).length === 0) {
                return item[i]
              } else {
                return item[i]
              }
              break
            case 'string[]':
              fieldPath = field.path.replace(/[[-]]/g, '').split('.')[0]
                fieldName = field.path.substr(field.path.indexOf('.') + 1)
                  nestedArr = item[fieldPath]
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
              return this.formatDate(item[i], field)
            case 'bool':
            case 'float':
            case 'button':
            case 'select':
            default:
              return item[i]
          }
        }
      }
    },
    formatDate(item:Date, field:Object) {
      return format(new Date(item), field.computed)
    },
    addComputedProperty(item: any, field: Object){

    }
  }
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