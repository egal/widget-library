<template>
  <div
    class="textarea"
    :class="[
      `textarea--${mergedData.size}`,
      { 'textarea--error': errorMessage || mergedData.error },
      { 'textarea--success': !mergedData.error && !errorMessage && newValue && mergedData.showSuccess },
    ]"
    :style="getStyleVars"
  >
    <div
      class="textarea-label"
      :class="{ 'textarea-label--disabled': mergedData.disabled }"
      v-if="mergedData.label"
    >{{ mergedData.label }}</div>
    <textarea
      @input="inputHandler"
      v-model="newValue"
      :disabled="mergedData.disabled"
      :placeholder="mergedData.placeholder"
    />
    <div
      class="textarea-helper-text"
      :class="{ 'textarea-helper-text--disabled': mergedData.disabled }"
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
          showSuccess: false,
        },
        this.data,
      )
    },
    getStyleVars() {
      return {
        '--font-family': this.styleConfig?.fontFamily || 'Inter',
        '--value-color': this.styleConfig?.valueColor || '#2d3748',
        '--value-font-weight': this.styleConfig?.valueFontWeight || 400,
        '--value-disabled-color': this.styleConfig?.valueDisabledColor || '#CBD5E0',
        '--placeholder-color': this.styleConfig?.placeholderColor || '#a0aec0',
        '--placeholder-disabled-color': this.styleConfig?.placeholderDisabledColor || '#CBD5E0',
        '--background-color': this.styleConfig?.backgroundColor || '#ffffff',
        '--background-disabled-color': this.styleConfig?.backgroundDisabledColor || '#ffffff',
        '--label-color': this.styleConfig?.labelColor || '#a0aec0',
        '--label-disabled-color': this.styleConfig?.labelDisabledColor || '#CBD5E0',
        '--label-font-weight': this.styleConfig?.labelFontWeight || 400,
        '--helper-text-color': this.styleConfig?.helperTextColor || '#a0aec0',
        '--helper-text-disabled-color': this.styleConfig?.helperTextDisabledColor || '#CBD5E0',
        '--helper-text-font-weight': this.styleConfig?.helperTextFontWeight || 400,
        '--helper-text-font-size': this.styleConfig?.helperTextFontSize || '12px',
        '--border-color': this.styleConfig?.borderColor || '#e2e8f0',
        '--border-radius': this.styleConfig?.borderRadius || '8px',
        '--focus-border-color': this.styleConfig?.focusBorderColor || '#76acfb',
        '--error-color': this.styleConfig?.errorColor || '#f16063',
        '--success-color': this.styleConfig?.successColor || '#66CB9F',
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
      this.$emit('update:modelValue', this.newValue)
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
    &--disabled {
      color: var(--label-disabled-color);
    }
  }
  textarea {
    font-family: var(--font-family);
    border-radius: var(--border-radius);
    border: 1px solid var(--border-color);
    line-height: 150%;
    color: var(--value-color);
    font-weight: var(--value-font-weight);
    &::placeholder {
      color: var(--placeholder-color);
    }
    &:focus:enabled {
      border-color: var(--focus-border-color);
    }
    &:focus-visible:enabled {
      border: 1px solid var(--focus-border-color);
      outline: none;
    }
    &:disabled {
      background-color: var(--background-disabled-color);
      color: var(--value-disabled-color);
      &::placeholder {
        color: var(--placeholder-disabled-color);
      }
    }
  }
  &-helper-text {
    color: var(--helper-text-color);
    font-size: var(--helper-text-font-size);
    font-weight: var(--helper-text-font-weight);
    margin-top: 8px;
    &--disabled {
      color: var(--helper-text-disabled-color);
    }
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
      &::placeholder {
        color: var(--error-color);
      }
    }
    .textarea-helper-text {
      color: var(--error-color);
    }
  }
  &--success {
    textarea {
      border-color: var(--success-color);
      color: var(--success-color);
      &:focus:enabled {
        border-color: var(--success-color);
      }
      &:focus-visible:enabled {
        border-color: var(--success-color);
      }
      &::placeholder {
        color: var(--success-color);
      }
    }
    .textarea-helper-text {
      color: var(--success-color);
    }
  }
  &--lg {
    .textarea-label {
      font-size: 16px;
    }
    textarea {
      min-width: 452px;
      min-height: 107px;
      padding: 18px;
      border-radius: 8px;
      font-size: 16px;
      &::placeholder {
        font-size: 16px;
      }
    }
    .textarea-helper-text {
      font-size: 14px;
    }
  }
  &--md {
    .textarea-label {
      font-size: 14px;
    }
    textarea {
      min-width: 400px;
      min-height: 85px;
      padding: 16px;
      border-radius: 8px;
      font-size: 14px;
      &::placeholder {
        font-size: 14px;
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
      min-width: 320px;
      min-height: 76px;
      padding: 14px;
      border-radius: 6px;
      font-size: 12px;
      &::placeholder {
        font-size: 12px;
      }
    }
    .textarea-helper-text {
      font-size: 12px;
      margin-top: 4px;
    }
  }
  &--xs {
    .textarea-label {
      font-size: 10px;
      margin-bottom: 4px;
    }
    textarea {
      min-width: 280px;
      min-height: 70px;
      padding: 12px;
      border-radius: 4px;
      font-size: 10px;

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
