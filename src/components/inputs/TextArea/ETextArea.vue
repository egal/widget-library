<template>
  <div
    class="textarea"
    :class="[
      `textarea--${mergedData.size}`,
      { 'textarea--error': errorMessage || mergedData.error },
    ]"
    :style="getStyleVars"
  >
    <div class="textarea-label" v-if="mergedData.label">
      {{ mergedData.label }}
    </div>
    <textarea
      @input="inputHandler"
      v-model="newValue"
      :disabled="mergedData.disabled"
      :placeholder="mergedData.placeholder"
    />
    <div
      class="textarea-helper-text"
      v-if="mergedData.helperText || mergedData.error || errorMessage"
    >
      {{ mergedData.error || errorMessage || mergedData.helperText }}
    </div>
  </div>
</template>

<script>
import { validate } from '@/helpers/validators'
export default {
  name: 'ETextArea',
  components: {},
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    styleConfig: {
      type: Object,
      default: () => {},
    },
    table: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    mergedData() {
      return Object.assign(
        {
          label: '',
          placeholder: '',
          modelValue: '',
          helperText: '',
          disabled: false,
          size: 'md',
          validators: [],
          error: '',
        },
        this.data,
      )
    },
    getStyleVars() {
      return {
        '--font-family': this.styleConfig?.fontFamily || 'Open Sans',
        '--value-color': this.styleConfig?.valueColor || '#a0aec0',
        '--value-font-weight': this.styleConfig?.valueFontWeight || 400,
        '--placeholder-color': this.styleConfig?.placeholderColor || '#a0aec0',
        '--background-color': this.styleConfig?.backgroundColor || '#ffffff',
        '--label-color': this.styleConfig?.labelColor || '#2d3748',
        '--label-font-weight': this.styleConfig?.labelFontWeight || 500,
        '--helper-text-color': this.styleConfig?.helperTextColor || '#a0aec0',
        '--helper-text-font-weight':
          this.styleConfig?.helperTextFontWeight || 400,
        '--border-color': this.styleConfig?.borderColor || '#edf2f7',
        '--border-radius': this.styleConfig?.borderRadius || '8px',
        '--focus-border-color': this.styleConfig?.focusBorderColor || '#76ACFB',
        '--error-color': this.styleConfig?.errorColor || '#f16063',
      }
    },
  },
  mounted() {
    this.newValue = this.mergedData.modelValue
  },
  data() {
    return {
      newValue: '',
      errorMessage: '',
    }
  },
  methods: {
    inputHandler() {
      if (this.mergedData.validators.length) {
        this.errorMessage = validate(this.mergedData.validators, this.newValue)
        this.$emit('error', this.errorMessage)
      }
      if (this.table) {
        this.$emit('update:modelValue', {name: 'textarea', value: this.newValue})
      } else {
        this.$emit('update:modelValue', this.newValue)
      }
    },
  },
  watch: {
    modelValue(value) {
      this.newValue = value
    },
  },
}
</script>
<style scoped lang="scss">
@import 'src/assets/variables';
.textarea {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: var(--font-family);
  background-color: var(--background-color);
  &-label {
    color: var(--label-color);
    font-weight: var(--label-font-weight);
    margin-bottom: 8px;
  }
  textarea {
    font-family: var(--font-family);
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color);
    padding: 12px;
    color: var(--value-color);
    font-weight: var(--value-font-weight);
    &::placeholder {
      color: var(--placeholder-color);
    }
    &:focus:enabled {
      border-color: var(--focus-border-color);
    }
    &:focus-visible:enabled {
      border: 2px solid var(--focus-border-color);
      outline: none;
    }
  }
  &-helper-text {
    color: var(--helper-text-color);
    font-weight: var(--helper-text-font-weight);
    margin-top: 8px;
  }
  &--error {
    textarea {
      border-color: var(--error-color);
      color: var(--error-color);
      &:focus:enabled {
        border-color: var(--error-color);
      }
      &:focus-visible:enabled {
        border-color: var(--error-color);
      }
    }
    .textarea-helper-text {
      color: var(--error-color);
    }
  }
  &--lg {
    .textarea-label {
      font-size: 14px;
    }
    textarea {
      min-width: 304px;
      min-height: 160px;
      font-size: 14px;
      line-height: 21px;
      &::placeholder {
        font-size: 14px;
      }
    }
    .textarea-helper-text {
      font-size: 14px;
    }
  }
  &--md {
    .textarea-label {
      font-size: 12px;
    }
    textarea {
      min-width: 250px;
      min-height: 110px;
      font-size: 12px;
      line-height: 14px;
      &::placeholder {
        font-size: 12px;
      }
    }
    .textarea-helper-text {
      font-size: 12px;
    }
  }
  &--sm {
    .textarea-label {
      font-size: 12px;
      margin-bottom: 4px;
    }
    textarea {
      min-width: 158px;
      min-height: 74px;
      font-size: 10px;
      line-height: 12px;
      &::placeholder {
        font-size: 10px;
      }
    }
    .textarea-helper-text {
      font-size: 10px;
      margin-top: 4px;
    }
  }
}
</style>
