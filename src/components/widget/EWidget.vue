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
  mounted() {
    console.log(this.type, this.data)
  },
  computed: {
    component() {
      if (this.type === 'counter') {
        return () => defineAsyncComponent(() => import(`@/components/inputs/Counter/ECounter.vue`))
      }
      return null
    },
    //   if (this.type === 'Input') {
    //     return () => import(`./inputs/Input/EInput`)
    //   } else if (this.type === 'Select') {
    //     return () => import(`./inputs/Select/ESelect`)
    //   } else if (this.type === 'counter') {
    //     return () => import(`./inputs/Counter/ECounter`)
    //   } else if (this.type === 'FileUploader') {
    //     return () => import(`./inputs/FileUploader/EFileUploader`)
    //   } else if (this.type === 'DropDown') {
    //     return () => import(`./inputs/Dropdown/EDropdown`)
    //   } else if (this.type === 'TextArea') {
    //     return () => import(`./inputs/TextArea/ETextArea`)
    //   } else if (this.type === 'Breadcrumbs') {
    //     return () => import(`./navigation/EBreadcrumbs`)
    //   } else if (this.type === 'NavBarTop') {
    //     return () => import(`./navigation/ENavbarTop`)
    //   } else if (this.type === 'NavBarRight') {
    //     return () => import(`./navigation/ENavbarRight`)
    //   } else if (this.type === 'Pagination') {
    //     return () => import(`./navigation/EPagination`)
    //   } else if (this.type === 'Avatar') {
    //     return () => import(`./personality/EAvatar`)
    //   } else if (this.type === 'Tag') {
    //     return () => import(`./personality/ETag`)
    //   } else if (this.type === 'Tooltip') {
    //     return () => import(`./personality/ETooltip`)
    //   } else if (this.type === 'Button') {
    //     return () => import(`./togglers/EButton`)
    //   } else if (this.type === 'Checkbox') {
    //     return () => import(`./togglers/ECheckbox`)
    //   } else if (this.type === 'Radio') {
    //     return () => import(`./togglers/ERadio`)
    //   } else if (this.type === 'Toggle') {
    //     return () => import(`./togglers/EToggle`)
    //   }
    // },
  },
}
</script>

<style scoped></style>
