<template>
  <div
    class="input"
    :class="`input--${mergedData.size} ${
      mergedData.chips && chipsModel.length === 0 ? 'no-items' : ''
    } ${mergedData.chips && chipsModel.length ? 'con-chips' : ''}`"
    :style="getStyleVars"
  >
    <label
      class="input-label"
      :class="{
        'input-label--required': mergedData.required,
        'input-label--disabled': mergedData.disabled,
      }"
      :for="mergedData.id"
      v-if="mergedData.label"
      >{{ mergedData.label }}</label
    >

    <div
      class="input-container"
      :class="{
        search: mergedData.type === 'search',
        success: !mergedData.error && !errorMessage && newValue && mergedData.showSuccess,
        error: (errorMessage || mergedData.error) && mergedData.showError,
        filled:
          !mergedData.error &&
          !errorMessage &&
          newValue &&
          !mergedData.showSuccess &&
          mergedData.showFilled &&
          mergedData.type !== 'search' &&
          mergedData.type !== 'number',
      }"
    >
      <div class="chips-container">
        <div
          v-for="selected in chipsModel"
          class="con-chip"
          :style="{ display: 'flex', alignItems: 'center', ...chipsInlineStyle }"
        >
          <span class="text-chip chip--text selected">
            {{ truncateString(selected[mergedData.shownKey]) }}
          </span>
          <b-icon icon="x-lg" class="chip--close" @click.stop="$emit('delete-option', selected)" />
        </div>
      </div>

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
          mergedData.iconRight || mergedData.clearable || mergedData.type === 'password'
            ? 'has-icon-right'
            : '',
          mergedData.postfix ? 'has-postfix' : '',
          mergedData.chips ? 'con-chips--input' : '',
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

      <span :class="['icon--right', 'postfix']" v-else-if="mergedData.postfix">{{
        mergedData.postfix
      }}</span>
      <b-icon
        class="icon icon--right icon--password"
        :icon="passwordShown ? 'eye' : 'eye-fill'"
        v-if="newValue && mergedData.type === 'password'"
        @click.stop="showPassword"
      />

      <div class="arrow-icons" v-if="mergedData.type === 'number' && mergedData.showArrows">
        <b-icon class="icon icon--increase" icon="caret-up-fill" @click="increaseValue" />

        <b-icon class="icon icon--decrease" icon="caret-down-fill" @click="decreaseValue" />
      </div>
      <ClearButton
        class="subtract-button"
        :error="(!!mergedData.error || !!errorMessage) && mergedData.showError"
        @delete=";(newValue = ''), $emit('update:modelValue', '')"
        v-show="
          mergedData.clearable &&
          !mergedData.postfix &&
          newValue &&
          mergedData.type !== 'number' &&
          mergedData.type !== 'search' &&
          mergedData.type !== 'password'
        "
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
        { 'helper-text--disabled': mergedData.disabled },
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
    chipsModel: {
      type: Array,
      default: () => [],
    },
    chipsInlineStyle: {
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
      postfixWidth: '0px',
    }
  },
  computed: {
    modelValue() {
      return this.mergedData.modelValue
    },
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
          postfix: '',
          size: 'md',
          showError: true,
          required: false,
          showArrows: true,
          min: undefined,
          max: undefined,
          inputMaxLength: undefined,
          readonly: false,
          clearable: true,
          chips: false,
          shownKey: 'name',
        },
        this.data,
      )
    },
    getStyleVars() {
      return {
        '--font-family': this.styleConfig?.fontFamily || 'Inter',
        '--value-color': this.styleConfig?.valueColor || '#2D3748',
        '--value-disabled-color': this.styleConfig?.valueDisabledColor || '#CBD5E0',
        '--value-font-weight': this.styleConfig?.valueFontWeight || 400,
        '--placeholder-color': this.styleConfig?.placeholderColor || '#A0AEC0',
        '--placeholder-disabled-color': this.styleConfig?.placeholderDisabledColor || '#cbd5e0',
        '--label-color': this.styleConfig?.labelColor || '#a0aec0',
        '--label-disabled-color': this.styleConfig?.labelDisabledColor || '#CBD5E0',
        '--label-font-weight': this.styleConfig?.labelFontWeight || 400,
        '--helper-text-color': this.styleConfig?.helperTextColor || '#a0aec0',
        '--helper-text-disabled-color': this.styleConfig?.helperTextDisabledColor || '#CBD5E0',
        '--helper-text-font-weight': this.styleConfig?.helperTextFontWeight || 400,
        '--helper-text-font-size': this.styleConfig?.helperTextFontSize || '12px',
        '--border-color': this.styleConfig?.borderColor || '#E2E8F0',
        '--border-radius': this.styleConfig?.borderRadius || '6px',
        '--background-color': this.styleConfig?.backgroundColor || '#ffffff',
        '--background-disabled-color': this.styleConfig?.backgroundDisabledColor || '#ffffff',
        '--focus-border-color': this.styleConfig?.focusBorderColor || '#76ACFB',
        '--filled-background-color': this.styleConfig?.filledBackgroundColor || '#ffffff',
        '--filled-font-color': this.styleConfig?.filledFontColor || '#2D3748',
        '--search-background-color': this.styleConfig?.searchBackgroundColor || '#f7fafc',
        '--icon-color': this.styleConfig?.iconColor || '#A0AEC0',
        '--error-color': this.styleConfig?.errorColor || '#f16063',
        '--success-color': this.styleConfig?.successColor || '#66cb9f',
      }
    },
  },
  mounted() {
    this.newValue = this.mergedData.modelValue
    this.newType = this.mergedData.type

    this.calculatePostfixWidth()
  },
  methods: {
    /**
     * Truncate value in string if it is longer than 15 symbols
     */
    truncateString(str) {
      if (str.length <= 15) {
        return str
      }
      return str.slice(0, 15) + '...'
    },
    /**
     * Handle Input data based on Input type
     */
    inputHandler() {
      if (this.mergedData.type === 'number') {
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
      if (this.mergedData.type === 'number' && this.mergedData.showArrows) {
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
      if (this.mergedData.type === 'number' && this.mergedData.showArrows) {
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

    calculatePostfixWidth() {
      if (document.getElementsByClassName('postfix').length !== 0) {
        this.postfixWidth = document.getElementsByClassName('postfix')[0].clientWidth + 20 + 'px'
      } else {
        this.postfixWidth = '0px'
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

/*Убирает крестик для очистки поля у input[type='search']*/
input[type='search']::-webkit-search-decoration,
input[type='search']::-webkit-search-cancel-button,
input[type='search']::-webkit-search-results-button,
input[type='search']::-webkit-search-results-decoration {
  -webkit-appearance: none;
}

.input {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: var(--font-family);

  .postfix {
    top: 8px;
    width: auto !important;
    height: auto;
    font-family: inherit;
    font-size: inherit;
    color: var(--value-color);
    font-weight: var(--value-font-weight);
    background-color: var(--background-color);
    z-index: 2;
  }

  &--lg {
    .input-label {
      font-size: 16px;
    }
    input {
      height: 48px;
      font-size: 16px;
      padding: 0 18px;
    }

    .postfix {
      font-size: 16px;
      top: 14px;
    }

    .subtract-button {
      top: 14px;
      right: 18px;
    }

    .icon {
      top: 14px;
      width: 20px;
      height: 20px;

      &--left {
        left: 18px;
      }
      &--right {
        right: 18px;
      }
    }
    .has-icon {
      &-left {
        padding-left: 44px;
      }
      &-right {
        padding-right: 44px;
      }
    }

    .arrow-icons {
      top: 13px;
      .bi {
        width: 10px;
        height: 10px;
      }
    }

    .helper-text {
      font-size: 14px;
    }

    .has-postfix {
      padding-right: calc(v-bind(postfixWidth) + 10px);
    }
  }
  &--md {
    .input-label {
      font-size: 14px;
      padding: 0 16px;
    }
    input {
      height: 40px;
      font-size: 14px;
    }

    .postfix {
      font-size: 14px;
      top: 12px;
    }

    .subtract-button {
      top: 12px;
      right: 16px;
    }

    .icon {
      top: 12px;
      width: 16px;
      height: 16px;

      &--left {
        left: 16px;
      }
      &--right {
        right: 16px;
      }
    }
    .has-icon {
      &-left {
        padding-left: 42px;
      }
      &-right {
        padding-right: 42px;
      }
    }
    .arrow-icons {
      top: 10px;
      .bi {
        width: 8px;
        height: 8px;
      }
    }

    .helper-text {
      font-size: 12px;
    }

    .has-postfix {
      padding-right: calc(v-bind(postfixWidth) + 5px);
    }
  }
  &--sm {
    .input-label {
      font-size: 12px;
      padding: 0 14px;
    }
    input {
      height: 32px;
      font-size: 12px;
    }

    .postfix {
      font-size: 12px;
      top: 9px;
    }

    .subtract-button {
      top: 9px;
      right: 14px;
    }

    .icon {
      width: 14px;
      height: 14px;
      top: 9px;

      &--left {
        left: 14px;
      }
      &--right {
        right: 14px;
      }
    }
    .has-icon {
      &-left {
        padding-left: 35px;
      }
      &-right {
        padding-right: 35px;
      }
    }
    .arrow-icons {
      top: 7px;
      .bi {
        width: 6px;
        height: 6px;
      }
    }

    .helper-text {
      font-size: 12px;
    }

    .has-postfix {
      padding-right: calc(v-bind(postfixWidth) + 5px);
    }
  }
  &--xs {
    .input-label {
      font-size: 10px;
      padding: 0 12px;
    }
    input {
      height: 24px;
      font-size: 10px;
    }

    .postfix {
      font-size: 10px;
      top: 6px;
    }

    .subtract-button {
      top: 7px;
      right: 12px;
    }

    .icon {
      width: 10px;
      height: 10px;
      top: 7px;

      &--left {
        left: 12px;
      }
      &--right {
        right: 12px;
      }
    }
    .has-icon {
      &-left {
        padding-left: 26px;
      }
      &-right {
        padding-right: 26px;
      }
    }
    .arrow-icons {
      top: 7px;
      .bi {
        width: 6px;
        height: 6px;
      }
    }

    .helper-text {
      font-size: 10px;
    }

    .has-postfix {
      padding-right: calc(v-bind(postfixWidth));
    }
  }
}
.input-label {
  display: block;
  font-weight: var(--label-font-weight);
  color: var(--label-color);
  margin-bottom: 8px;

  &--required::before {
    content: '*';
    margin-right: 5px;
    color: var(--error-color);
  }
  &--disabled {
    color: var(--label-disabled-color);
  }
}
.input-container {
  position: relative;
  width: 100%;
  input {
    font-family: inherit;
    color: var(--value-color);
    width: 100%;
    background-color: var(--background-color);
    border: 1px solid var(--border-color);
    box-sizing: border-box;
    border-radius: var(--border-radius);
    font-weight: var(--value-font-weight);
    &::placeholder {
      color: var(--placeholder-color);
    }
    &:focus,
    &:focus-visible {
      outline: none;
      border-color: var(--focus-border-color);
    }
    &:disabled {
      background: var(--background-disabled-color);
      color: var(--value-disabled-color);

      &::placeholder {
        color: var(--placeholder-disabled-color);
      }
      & + .postfix {
        background: var(--background-disabled-color);
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
      position: absolute;
      color: var(--icon-color);
    }
    &--right {
      position: absolute;
      color: var(--icon-color);
    }
    &--password {
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
  font-weight: var(--helper-text-font-weight);
  margin-top: 8px;
  margin-bottom: 0;
  max-width: fit-content;
  &--error {
    color: var(--error-color);
  }
  &--disabled {
    color: var(--helper-text-disabled-color);
  }
}
.filled {
  input {
    background-color: var(--filled-background-color);
    color: var(--filled-font-color);
    &:focus {
      background-color: var(--background-color);
      color: var(--value-color);

      & + .postfix {
        background-color: var(--background-color);
        color: var(--value-color);
      }
    }
  }
  .bi {
    color: var(--filled-font-color);
  }
  .postfix {
    color: var(--filled-font-color);
    background-color: var(--filled-background-color);
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
      outline: none;
    }
  }
  .bi {
    color: var(--error-color);
  }
  .helper-text {
    color: var(--error-color);
  }
  .postfix {
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
      outline: none;
    }
  }
  .bi {
    color: var(--success-color);
  }
  .helper-text {
    color: var(--success-color);
  }
  .postfix {
    color: var(--success-color);
  }
}
.success + .helper-text {
  color: var(--success-color);
}

// chips styles
.con-chips {
  overflow: hidden;
  background-color: var(--search-background-color);
  color: var(--value-color);
  border: 1px solid var(--border-color);
  box-sizing: border-box;
  border-radius: var(--border-radius);
  font-weight: var(--value-font-weight);
  .input-container {
    width: 100%;
    position: relative;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-wrap: wrap;

    .subtract-button {
      right: 5px;
    }
  }

  .con-chips--input {
    display: inline-block;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    color: inherit;

    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    min-width: 100px;

    margin-left: 2px;
    border: 0;

    margin-right: -9px;

    &:focus,
    &:active {
      outline: none;
    }
  }

  &.no-items {
    .con-chips--input {
      padding-left: 10px;
    }
  }
}

.con-chip {
  border-radius: 20px;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
  font-size: 0.7rem;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  color: var(--value-font-color);
  position: relative;
  float: left;
  margin-top: 0;
  margin-bottom: 0;
  margin-right: 5px;
  padding: 2px;

  &.closable {
    padding-right: 0;
  }

  .chip--text {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    margin-left: 10px;
    font-size: var(--value-font-size);
    font-weight: var(--value-font-weight);
    font-family: var(--font-family);

    &.selected {
      display: flex;
      align-items: center;
      margin-right: 9px;
      span {
        margin-right: 8px;
        white-space: nowrap;
      }
    }
  }

  .chip--close {
    width: 12px;
    height: 12px;
    cursor: pointer;
    margin-bottom: 0;
  }
}
</style>
