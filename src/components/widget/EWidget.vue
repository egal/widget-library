<template>
  <component :is="component" :data="data" :styleConfig="styleConfig" />
</template>

<script>
import { defineAsyncComponent } from 'vue'

export default {
  name: 'EWidget',
  props: {
    type: {
      type: String,
      required: true,
    },
    data: {
      type: Object,
      default: {},
    },
    styleConfig: {
      type: Object,
      default: {},
    },
  },
  mounted() {},
  computed: {
    component() {
      let returnComponent
      if (this.type === 'counter') {
        returnComponent = defineAsyncComponent(() =>
          import(`@/components/inputs/Counter/ECounter.vue`),
        )
        return returnComponent
      } else if (this.type === 'input') {
        returnComponent = defineAsyncComponent(() => import(`@/components/inputs/Input/EInput.vue`))
        return returnComponent
      } else if (this.type === 'select') {
        returnComponent = defineAsyncComponent(() =>
          import(`@/components/inputs/Select/ESelect.vue`),
        )
        return returnComponent
      } else if (this.type === 'fileUploader') {
        returnComponent = defineAsyncComponent(() =>
          import(`@/components/inputs/FileUploader/EFileUploader.vue`),
        )
        return returnComponent
      } else if (this.type === 'textArea') {
        returnComponent = defineAsyncComponent(() =>
          import(`@/components/inputs/TextArea/ETextArea.vue`),
        )
        return returnComponent
      } else if (this.type === 'breadcrumbs') {
        returnComponent = defineAsyncComponent(() =>
          import(`@/components/navigation/EBreadcrumbs.vue`),
        )
        return returnComponent
      } else if (this.type === 'pagination') {
        returnComponent = defineAsyncComponent(() =>
          import(`@/components/navigation/EPagination.vue`),
        )
        return returnComponent
      } else if (this.type === 'avatar') {
        returnComponent = defineAsyncComponent(() => import(`@/components/personality/EAvatar.vue`))
        return returnComponent
      } else if (this.type === 'tag') {
        returnComponent = defineAsyncComponent(() => import(`@/components/personality/ETag.vue`))
        return returnComponent
      } else if (this.type === 'tooltip') {
        returnComponent = defineAsyncComponent(() =>
          import(`@/components/personality/ETooltip.vue`),
        )
        return returnComponent
      } else if (this.type === 'button') {
        returnComponent = defineAsyncComponent(() => import(`@/components/togglers/EButton.vue`))
        return returnComponent
      } else if (this.type === 'checkbox') {
        returnComponent = defineAsyncComponent(() => import(`@/components/togglers/ECheckbox.vue`))
        return returnComponent
      } else if (this.type === 'radio') {
        returnComponent = defineAsyncComponent(() => import(`@/components/togglers/ERadio.vue`))
        return returnComponent
      } else if (this.type === 'toggle') {
        returnComponent = defineAsyncComponent(() => import(`@/components/togglers/EToggle.vue`))
        return returnComponent
      }
    },
  },
}
</script>

<style scoped></style>
