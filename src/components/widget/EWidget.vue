<template>
  <component :is="component" :data="widgetData" :styleConfig="styleConfig" :table="true"
             @update:modelValue="(value) => checkValue(value)" @error="(error) => checkError(error)"
             @change="(value) => checkValue(value)" @update:dateValue="(value) => checkValue(value)"/>
</template>

<script>
import {defineAsyncComponent} from 'vue'
import {ActionConstructor} from '@egalteam/framework'
import {tableStore} from "@/components/table/storage/TableStore";
import eventBus from '@/helpers/eventBus'
export default {
  name: 'EWidget',
  props: {
    styleConfig: {
      type: Object,
      default: {},
    },
    field: {
      type: Object,
      default: {}
    },
    item: {
      type: Object,
      default: {}
    }
  },
  data() {
    return {
      widgetData: {},
      constructor: new ActionConstructor(tableStore.getState().url)
    }
  },
  emits: ['updated-value'],
  mounted() {
    this.setInitialValue()
  },
  computed: {
    component() {
      let returnComponent
      this.widgetData = {...this.field.widget.content}
      if (this.field.type === 'string' && this.field.widget.type === 'input') {
        returnComponent = defineAsyncComponent(() =>
            import(`../inputs/Input/EInput.vue`),
        )
        return returnComponent
      } else if (this.field.type === 'bool' && this.field.widget.type === 'checkbox') {
        this.widgetData.checked = this.item.values?.is_active
        returnComponent = defineAsyncComponent(() =>
            import(`../togglers/ECheckbox.vue`),
        )
        return returnComponent
      } else if (this.field.type === 'date' && this.field.widget.type === 'input') {
        returnComponent = defineAsyncComponent(() =>
            import(`../inputs/Input/EInput.vue`),
        )
        return returnComponent
      } else if (this.field.widget.type === 'select') {
        this.setSelectOptions(this.field.widget.options_model)
        returnComponent = defineAsyncComponent(() =>
            import(`../inputs/Select/ESelect.vue`),
        )
        return returnComponent
      } else if (this.field.type === 'float') {
        returnComponent = defineAsyncComponent(() =>
            import(`../inputs/Input/EInput.vue`),
        )
        return returnComponent
      } else if (this.field.type === 'number') {
        returnComponent = defineAsyncComponent(() =>
            import(`../inputs/Counter/ECounter.vue`),
        )
        return returnComponent
      } else if (this.field.type === 'textarea') {
        returnComponent = defineAsyncComponent(() =>
            import(`../inputs/TextArea/ETextArea.vue`),
        )
        return returnComponent
      }
    },
  },
  methods: {
    setSelectOptions(modelName) {
      this.constructor.getItems(tableStore.getState().microserviceName, modelName).call().then((result) => {
        this.widgetData.options = result.items
      }).catch((error) => {
        console.log(error)
      })
    },
    setInitialValue() {
      Object.entries(this.item.values).forEach(entry => {
        let path = this.field.path.includes('[]') ? this.field.path.split('[')[0] : this.field.path
        const [key, value] = entry;
        if (key === path) {
          this.widgetData.modelValue = value
        }
      });
    },
    setCheckbox(value) {

    },
    checkValue(value) {
      eventBus.$emit('updated-value', value)
      console.log(value, 'check value')
    },
    checkError(value) {
    }
  }
}
</script>

<style scoped></style>
