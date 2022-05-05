<template>
  <component :is="component" :data="widgetData" :table="true" @update:modelValue="(value) => checkValue(value)"
             @error="(error) => checkError(error)" @input="(value) => sendSearchRequest(value)">
    {{ widgetData.label }}
  </component>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {defineAsyncComponent} from 'vue'
import {ActionConstructor} from '@egalteam/framework'
import {tableStore} from "@/components/table/storage/TableStore";

export default defineComponent({
  name: 'FilterWidget',
  components: {},
  props: {
    styleConfig: {
      type: Object,
      default: {},
    },
    filterData: {
      type: Object,
      default: {}
    },
  },
  data() {
    return {
      widgetData: {},
      constructor: new ActionConstructor(tableStore.getState().url),
      filters: [],
    }
  },
  mounted() {
  },
  computed: {
    component() {
      let returnComponent
      this.widgetData = {...this.filterData.field.widget.content}
      this.widgetData.label = this.filterData.field.label
      console.log(this.widgetData)
      this.widgetData.required = false
      if (this.filterData.filter) {
        this.widgetData.modelValue = this.filterData.filter.value
      }
      if (this.filterData.field.type === 'string' && this.filterData.field.widget.type === 'input') {
        returnComponent = defineAsyncComponent(() =>
            import(`../../inputs/Input/EInput.vue`),
        )
        return returnComponent
      } else if (this.filterData.field.type === 'bool' && this.filterData.field.widget.type === 'checkbox') {
        this.widgetData.checked = this.filterData.filter.value
        returnComponent = defineAsyncComponent(() =>
            import(`../../togglers/ECheckbox.vue`),
        )
        return returnComponent
      } else if (this.filterData.field.type === 'date' && this.filterData.field.widget.type === 'input') {
        returnComponent = defineAsyncComponent(() =>
            import(`../../inputs/Input/EInput.vue`),
        )
        return returnComponent
      } else if (this.filterData.field.widget.type === 'select') {
        this.setSelectOptions(this.filterData.field.widget.options_model)
        returnComponent = defineAsyncComponent(() =>
            import(`../../inputs/Select/ESelect.vue`),
        )
        return returnComponent
      } else if (this.filterData.field.type === 'float') {
        returnComponent = defineAsyncComponent(() =>
            import(`../../inputs/Input/EInput.vue`),
        )
        return returnComponent
      } else if (this.filterData.field.type === 'number') {
        returnComponent = defineAsyncComponent(() =>
            import(`../../inputs/Counter/ECounter.vue`),
        )
        return returnComponent
      } else if (this.filterData.field.type === 'textarea') {
        returnComponent = defineAsyncComponent(() =>
            import(`../../inputs/TextArea/ETextArea.vue`),
        )
        return returnComponent
      }
    },
  },
  methods: {
    setSelectOptions(modelName: string) {
      this.constructor.getItems(tableStore.getState().microserviceName, modelName).call().then((result) => {
        this.widgetData.options = result.items
        this.widgetData.modelValue = []
      }).catch((error) => {
        console.log(error)
      })
    },
    sendSearchRequest(value: any) {
      console.log(value, 'value')
    },
    checkValue(value: any) {
      console.log(value.value, 'value')
      if (value.name === 'select') {
        if (Array.isArray(value.value)) {
          for (let i in value) {
            this.filters.push({
              field: this.filterData.field.path,
              operator: 'eq',
              value: value[i].value.name
            })
          }
        } else {
          this.filters.push({
            field: this.filterData.field.path,
            operator: 'eq',
            value: value.value.name
          })
        }
        console.log(this.filters, 'filters')
      }
    },
    checkError(value: string) {
    }
  }
})
</script>

<style scoped></style>
