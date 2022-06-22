<template>
  <ECounterPrimary
      v-if="mergedData.type === 'primary'"
      :data="mergedData"
      :style-vars="getStyleVars"
      :style-config="styleConfig"
      :value="newValue"
      @increase-value="increaseValue"
      @decrease-value="decreaseValue"
  />
  <ECounterSecondary
      v-if="mergedData.type === 'secondary'"
      v-model="newValue"
      :data="mergedData"
      :style-vars="getStyleVars"
      :style-config="styleConfig"
      @increase-value="increaseValue"
      @decrease-value="decreaseValue"
      @update:modelValue="$emit('update:modelValue', newValue)"
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
    getStyleVars() {
      return {
        '--font-family': this.styleConfig?.fontFamily || 'Inter',
        '--value-font-size': this.styleConfig?.valueFontSize || '16px',
        '--value-font-weight': this.styleConfig?.valueFontWeight || 700,
        '--value-color': this.styleConfig?.valueColor || '#A0AEC0',
        '--value-color-disabled': this.styleConfig?.valueColorDisabled || '#CBD5E0',
        '--label-font-weight': this.styleConfig?.labelFontWeight || 400,
        '--label-color': this.styleConfig?.labelColor || '#A0AEC0',
        '--label-color-disabled': this.styleConfig?.labelColorDisabled || '#CBD5E0',
        '--helper-text-font-weight': this.styleConfig?.helperTextFontWeight || 400,
        '--helper-text-color': this.styleConfig?.helperTextColor || '#A0AEC0',
        '--helper-text-color-disabled': this.styleConfig?.helperTextColorDisabled || '#CBD5E0',
        '--border-color': this.styleConfig?.borderColor || '#E2E8F0',
        '--border-focus-color': this.styleConfig?.borderFocusColor || '#76ACFB',
        '--border-radius': this.styleConfig?.borderRadius || '8px',
        '--icon-color': this.styleConfig?.iconColor || '#A0AEC0',
        '--icon-color-hover': this.styleConfig?.iconColorHover || '#2D3748',
        '--icon-color-disabled': this.styleConfig?.iconColorDisabled || '#EDF2F7',
      }
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
