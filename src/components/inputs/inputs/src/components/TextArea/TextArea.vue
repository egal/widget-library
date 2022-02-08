<template>
  <div
    class="textarea"
    :class="[`textarea--${size}`, { 'textarea--error': errorMessage || error }]"
    :style="getStyleVars"
  >
    <div class="textarea-label" v-if="label">{{ label }}</div>
    <textarea
      @input="inputHandler"
      v-model="newValue"
      :disabled="disabled"
      :placeholder="placeholder"
    />
    <div class="textarea-helper-text" v-if="helperText || error || errorMessage">
      {{ error || errorMessage || helperText }}
    </div>
  </div>
</template>

<script>
import { validate } from '@/assets/scripts/validators'
import variables from '@/assets/styles/variables.scss'

export default {
  name: 'TextArea',
  components: {},
  props: {
    label: {
      type: String,
      default: '',
    },
    placeholder: {
      type: String,
      default: '',
    },
    modelValue: {
      type: String,
      default: '',
    },
    helperText: {
      type: String,
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'md',
    },
    validators: {
      type: Array,
      default: () => [],
    },
    error: {
      type: String,
      default: '',
    },
    styleConfig: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    getStyleVars() {
      return {
        '--font-family': this.styleConfig?.fontFamily || variables.openSans,
        '--value-color': this.styleConfig?.valueColor || variables.gray500,
        '--value-font-weight': this.styleConfig?.valueFontWeight || variables.mediumFontWeight,
        '--placeholder-color': this.styleConfig?.placeholderColor || variables.gray500,
        '--background-color': this.styleConfig?.bacckgroundColor || variables.baseWhite,
        '--label-color': this.styleConfig?.labelColor || variables.gray800,
        '--label-font-weight': this.styleConfig?.labelFontWeight || variables.mediumFontWeight,
        '--helper-text-color': this.styleConfig?.helperTextColor || variables.gray500,
        '--helper-text-font-weight':
          this.styleConfig?.helperTextFontWeight || variables.regularFontWeight,
        '--border-color': this.styleConfig?.borderColor || variables.gray200,
        '--border-radius': this.styleConfig?.borderRadius || variables.allSidesLarge,
        '--focus-border-color': this.styleConfig?.focusBorderColor || variables.hoverAccent,
        '--error-color': this.styleConfig?.errorColor || variables.danger,
      }
    },
  },
  mounted() {},
  data() {
    return {
      newValue: this.modelValue,
      errorMessage: '',
    }
  },
  methods: {
    inputHandler() {
      if (this.validators.length) {
        this.errorMessage = validate(this.validators, this.newValue)
        this.$emit('error')
      }
      this.$emit('update:modelValue', this.newValue)
    },
  },
}
</script>

<style scoped lang="scss">
@import '../../assets/styles/variables';

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
      border: 1px solid var(--focus-border-color);
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
