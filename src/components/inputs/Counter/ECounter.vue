<template>
  {{ newValue}}
  <ECounterPrimary
    v-if="mergedData.type === 'primary'"
    :data="mergedData"
    @update:modelValue="newValue"
  />
  <ECounterSecondary
    v-if="mergedData.type === 'secondary'"
    :data="mergedData"
    :style-config="styleConfig"
  />
</template>

<script>
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'
import ECounterPrimary from '@/components/inputs/Counter/ECounterPrimary'
import ECounterSecondary from '@/components/inputs/Counter/ECounterSecondary'

export default {
  name: 'ECounter',
  components: {
    ECounterSecondary,
    ECounterPrimary,
    BIcon: BootstrapIcon,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    styleConfig: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      newValue: 0,
    }
  },
  computed: {
    mergedData() {
      return Object.assign(
        {
          label: '',
          helperText: '',
          modelValue: 0,
          max: null,
          min: null,
          size: 'md',
          disabled: false,
          type: 'primary',
        },
        this.data,
      )
    },
  },
  mounted() {
    this.newValue = this.mergedData.modelValue
  },
  methods: {
    increaseValue() {
      if (
        (!this.mergedData.max && !this.mergedData.disabled) ||
        (this.mergedData.max && !this.mergedData.disabled && this.newValue < this.mergedData.max)
      ) {
        console.log(this.newValue)
        this.newValue++
      }
      this.$emit('update:modelValue', this.newValue)
    },
    decreaseValue() {
      if (
        (!this.mergedData.min && !this.mergedData.disabled && this.newValue > 0) ||
        (this.mergedData.min && this.newValue > this.mergedData.min)
      ) {
        this.newValue--
      }
      this.$emit('update:modelValue', this.newValue)
    },
  },
  watch: {
    value(value) {
      this.newValue = value
    },
  },
}
</script>

<style scoped lang="scss"></style>
