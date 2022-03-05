<template>
  <div class="input" :class="`input--${mergedData.size}`" :style="getStyleVars">
    <label
      class="input-label"
      :class="{ 'input-label--required': mergedData.required }"
      :for="mergedData.id"
      v-if="mergedData.label"
      >{{ mergedData.label }}</label
    >
    <div
      class="input-container"
      :class="{
        search: type === 'search',
        success: !mergedData.error && !errorMessage && newValue && mergedData.showSuccess,
        error: (errorMessage || mergedData.error) && mergedData.showError,
        filled:
          !mergedData.error &&
          !errorMessage &&
          newValue &&
          !mergedData.showSuccess &&
          mergedData.showFilled &&
          type !== 'search' &&
          type !== 'number',
      }"
    >
      <input
        :id="mergedData.id"
        :type="mergedData.type === 'search' ? 'text' : newType"
        :placeholder="mergedData.placeholder"
        :value="newValue"
        :maxlength="mergedData.inputMaxLength"
        :disabled="mergedData.disabled"
        :readonly="mergedData.readonly"
        :class="[
          mergedData.iconLeft ? 'has-icon-left' : '',
          mergedData.iconRight || mergedData.clearable ? 'has-icon-right' : '',
        ]"
        v-model="newValue"
        @input="inputHandler"
        autocomplete="off"
        @keydown="(event) => $emit('keydown', event)"
        @keydown.up="increaseValue"
        @keydown.down="decreaseValue"
      />
      <b-icon
        :class="['icon', 'icon--left', errorMessage ? 'icon--error' : '']"
        :icon="mergedData.iconLeft"
        v-if="mergedData.iconLeft"
      />
      <b-icon
        :class="['icon', 'icon--right', errorMessage ? 'icon--error' : '']"
        :icon="mergedData.iconRight"
        v-if="mergedData.iconRight"
      />
      <b-icon
        class="icon icon--password"
        :icon="passwordShown ? 'eye' : 'eye-fill'"
        v-if="newValue && mergedData.type === 'password'"
        @click.stop="showPassword"
      />
      <div class="arrow-icons" v-if="type === 'number' && mergedData.showArrows">
        <b-icon class="icon icon--increase" icon="caret-up-fill" @click="increaseValue" />
        <b-icon class="icon icon--increase" icon="caret-down-fill" @click="decreaseValue" />
      </div>
      <ClearButton
        class="subtract-button"
        :error="(!!mergedData.error || !!errorMessage) && mergedData.showError"
        @delete=";(newValue = ''), $emit('update:modelValue', '')"
        v-show="mergedData.clearable && newValue && type !== 'number' && type !== 'search'"
        :size="mergedData.size"
        :success="!mergedData.error && !errorMessage && newValue && mergedData.showSuccess"
        :filled="
          !mergedData.error &&
          !errorMessage &&
          newValue &&
          !mergedData.showSuccess &&
          mergedData.showFilled
        "
        :style-config="styleConfig"
      />
    </div>
    <p
      :class="[
        'helper-text',
        (errorMessage || mergedData.error) && mergedData.showError ? 'helper-text--error' : '',
      ]"
      v-if="errorMessage || mergedData.error || mergedData.helperText"
    >
      {{
        mergedData.showError
          ? errorMessage || mergedData.error || mergedData.helperText
          : mergedData.helperText
      }}
    </p>
  </div>
</template>

<script>
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'
import ClearButton from '@/components/inputs/ClearButton/ClearButton'
import { validate } from '@/helpers/validators'
export default {
  name: 'EInput',
  components: {
    ClearButton,
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
      newValue: '',
      newType: '',
      errorMessage: '',
      passwordShown: false,
      type: '',
    }
  },
  computed: {
    mergedData() {
      return Object.assign(
        {
          id: 'input-text',
          type: 'text',
          placeholder: '',
          label: '',
          error: '',
          showSuccess: false,
          showFilled: true,
          modelValue: null,
          disabled: false,
          validators: [],
          helperText: null,
          iconLeft: null,
          iconRight: null,
          size: 'md',
          showError: true,
          required: false,
          showArrows: true,
          min: undefined,
          max: undefined,
          inputMaxLength: undefined,
          readonly: false,
          clearable: true,
        },
        this.data,
      )
    },
    getStyleVars() {
      return {
        '--font-family': this.styleConfig?.fontFamily || 'Open Sans',
        '--value-color': this.styleConfig?.valueColor || '#2d3748',
        '--value-font-weight': this.styleConfig?.valueFontWeight || 500,
        '--placeholder-color': this.styleConfig?.placeholderColor || '#cbd5e0',
        '--placeholder-disabled-color': this.styleConfig?.placeholderDisabledColor || '#cbd5e0',
        '--label-color': this.styleConfig?.labelColor || '#a0aec0',
        '--label-font-weight': this.styleConfig?.labelFontWeight || 500,
        '--helper-text-color': this.styleConfig?.helperTextColor || '#a0aec0',
        '--helper-text-font-weight': this.styleConfig?.helperTextFontWeight || 400,
        '--helper-text-font-size': this.styleConfig?.helperTextFontSize || '12px',
        '--border-color': this.styleConfig?.borderColor || '#edf2f7',
        '--border-radius': this.styleConfig?.borderRadius || '6px',
        '--background-color': this.styleConfig?.backgroundColor || '#ffffff',
        '--background-disabled-color': this.styleConfig?.backgroundDisabledColor || '#edf2f7',
        '--focus-border-color': this.styleConfig?.focusBorderColor || '#3385ff',
        '--filled-background-color': this.styleConfig?.filledBackgroundColor || '#e5f0ff',
        '--filled-font-color': this.styleConfig?.filledFontColor || '#3385ff',
        '--search-background-color': this.styleConfig?.searchBackgroundColor || '#f7fafc',
        '--icon-color': this.styleConfig?.iconColor || '#cbd5e0',
        '--error-color': this.styleConfig?.errorColor || '#f16063',
        '--success-color': this.styleConfig?.successColor || '#66cb9f',
      }
    },
  },
  mounted() {
    this.newValue = this.mergedData.modelValue
    this.newType = this.mergedData.type
  },
  methods: {
    /**
     * Handle Input data based on Input type
     */
    inputHandler() {
      if (this.type === 'number') {
        this.newValue = this.cutLetterSymbols(this.newValue)
        this.checkMinMaxValidity(this.newValue)
      }
      if (this.mergedData.validators?.length) {
        this.errorMessage = validate(this.mergedData.validators, this.newValue)
        this.$emit('error', this.errorMessage)
      }
      this.$emit('update:modelValue', this.newValue)
    },
    /**
     * Shows the password when you click on the icon
     */
    showPassword() {
      this.passwordShown = !this.passwordShown
      this.newType = this.newType === 'password' ? 'text' : 'password'
    },
    /**
     * Replaces commas with dots and removes all characters except numbers
     * @param word
     * @returns {string}
     */
    cutLetterSymbols(word) {
      word = word.replace(',', '.')
      return word
        .replace(/[^0-9.]/g, '')
        .replace('.', 'x')
        .replace(/\./g, '')
        .replace('x', '.')
    },
    checkMinMaxValidity(value) {
      if (this.mergedData.max) {
        if (Number(this.mergedData.max) < Number(value)) {
          this.newValue = this.mergedData.max
        }
      }
      if (this.mergedData.min) {
        if (Number(this.mergedData.min) > Number(value)) {
          this.newValue = this.mergedData.min
        }
      }
    },
    /**
     * Increases the number by 1
     */
    increaseValue() {
      if (this.type === 'number' && this.mergedData.showArrows) {
        const increasedNumber = Number(this.newValue) + 1
        if (this.mergedData.max !== undefined) {
          if (increasedNumber <= Number(this.mergedData.max)) {
            this.newValue = increasedNumber
            this.$emit('update:modelValue', this.newValue)
          }
        } else {
          this.newValue = increasedNumber
          this.$emit('update:modelValue', this.newValue)
        }
      }
    },
    /**
     * Decreases the number by 1
     */
    decreaseValue() {
      if (this.type === 'number' && this.mergedData.showArrows) {
        const decreasedNumber = Number(this.newValue) - 1
        if (this.mergedData.min !== undefined) {
          if (decreasedNumber >= Number(this.mergedData.min)) {
            this.newValue = decreasedNumber
            this.$emit('update:modelValue', this.newValue)
          }
        } else {
          this.newValue = decreasedNumber
          this.$emit('update:modelValue', this.newValue)
        }
      }
    },
  },
  watch: {
    modelValue(value) {
      this.newValue = value || this.type === 'number' ? 0 : ''
    },
  },
}
</script>
<style scoped lang="scss">
@import 'src/assets/variables';
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type='number'] {
  -moz-appearance: textfield;
}
.input {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: var(--font-family);
  &--lg {
    .input-label {
      font-size: 14px;
    }
    input {
      height: 46px;
      font-size: 16px;
    }
    .subtract-button {
      bottom: 14px;
    }
    .icon {
      top: 14px;
      width: 16px;
      height: 16px;
    }
    .has-icon {
      &-left {
        padding-left: 40px;
      }
      &-right {
        padding-right: 40px;
      }
    }
    .arrow-icons {
      top: 13px;
      .bi {
        width: 10px;
        height: 10px;
      }
    }
  }
  &--md {
    .input-label {
      font-size: 12px;
    }
    input {
      height: 36px;
      font-size: 14px;
    }
    .subtract-button {
      bottom: 10px;
    }
    .icon {
      top: 11px;
      width: 14px;
      height: 14px;
    }
    .has-icon {
      &-left {
        padding-left: 40px;
      }
      &-right {
        padding-right: 40px;
      }
    }
    .arrow-icons {
      top: 10px;
      .bi {
        width: 8px;
        height: 8px;
      }
    }
  }
  &--sm {
    .input-label {
      font-size: 12px;
    }
    input {
      height: 26px;
      font-size: 10px;
    }
    .subtract-button {
      bottom: 7px;
    }
    .icon {
      width: 10px;
      height: 10px;
      top: 8px;
    }
    .has-icon {
      &-left {
        padding-left: 30px;
      }
      &-right {
        padding-right: 30px;
      }
    }
    .arrow-icons {
      top: 7px;
      .bi {
        width: 6px;
        height: 6px;
      }
    }
  }
}
.input-label {
  display: block;
  font-weight: var(--label-font-weight);
  color: var(--label-color);
  margin-bottom: 6px;
  &--required::before {
    content: '*';
    margin-right: 5px;
    color: var(--error-color);
  }
}
.input-container {
  position: relative;
  width: 100%;
  input {
    color: var(--value-color);
    width: 100%;
    background-color: var(--background-color);
    border: 1px solid var(--border-color);
    box-sizing: border-box;
    border-radius: var(--border-radius);
    font-weight: var(--value-font-weight);
    padding: 0 16px;
    &::placeholder {
      color: var(--placeholder-color);
    }
    &:focus {
      border: 1px solid var(--focus-border-color);
      outline: none;
    }
    &:disabled {
      background: var(--background-disabled-color);
      &::placeholder {
        color: var(--placeholder-disabled-color);
      }
    }
    &:disabled + .icon,
    &:disabled + .icon + .icon {
      color: var(--icon-color);
    }
  }
  .icon {
    color: var(--icon-color);

    &--left {
      left: 16px;
      position: absolute;
    }
    &--right {
      right: 16px;
      position: absolute;
    }
    &--password {
      right: 16px;
      position: absolute;
      cursor: pointer;
      color: var(--icon-color);
    }
    &--error {
      color: var(--icon-color);
    }
  }
  .subtract-button {
    position: absolute;
    right: 17px;
  }
  .arrow-icons {
    right: 7px;
    display: flex;
    flex-flow: column nowrap;
    position: absolute;
    user-select: none;
    .icon {
      cursor: pointer;
      color: var(--icon-color);
    }
  }
}
.helper-text {
  font-size: var(--helper-text-font-size);
  color: var(--helper-text-color);
  margin-top: 6px;
  margin-bottom: 0;
  max-width: fit-content;
  &--error {
    color: var(--error-color);
  }
}
.filled {
  input {
    background-color: var(--filled-background-color);
    color: var(--filled-font-color);
    &:focus {
      background-color: var(--background-color);
      color: var(--value-color);
    }
  }
  .bi {
    color: var(--filled-font-color);
  }
}
.search {
  input {
    background-color: var(--search-background-color);
    &:focus {
      background-color: var(--background-color);
    }
  }
}
.error {
  input {
    border-color: var(--error-color);
    color: var(--error-color);
    &:focus {
      border-color: var(--error-color);
    }
  }
  .bi {
    color: var(--error-color);
  }
  .helper-text {
    color: var(--error-color);
  }
}
.error + .helper-text {
  color: var(--error-color);
}
.success {
  input {
    border-color: var(--success-color);
    color: var(--success-color);
    &:focus {
      border-color: var(--success-color);
    }
  }
  .bi {
    color: var(--success-color);
  }
  .helper-text {
    color: var(--success-color);
  }
}
.success + .helper-text {
  color: var(--success-color);
}
</style>
