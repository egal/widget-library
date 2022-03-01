<template>
  <div class="input" :class="`input--${size}`" :style="getStyleVars">
    <label
      class="input-label"
      :class="{ 'input-label--required': required }"
      :for="id"
      v-if="label"
      >{{ label }}</label
    >
    <div
      class="input-container"
      :class="{
        search: type === 'search',
        success: !error && !errorMessage && newValue && showSuccess,
        error: (errorMessage || error) && showError,
        filled:
          !error &&
          !errorMessage &&
          newValue &&
          !showSuccess &&
          showFilled &&
          type !== 'search' &&
          type !== 'number',
      }"
    >
      <input
        :id="id"
        :type="type === 'search' ? 'text' : newType"
        :placeholder="placeholder"
        :value="newValue"
        :maxlength="inputMaxLength"
        :disabled="disabled"
        :readonly="readonly"
        :class="[
          iconLeft ? 'has-icon-left' : '',
          iconRight || clearable ? 'has-icon-right' : '',
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
        :icon="iconLeft"
        v-if="iconLeft"
      />
      <b-icon
        :class="['icon', 'icon--right', errorMessage ? 'icon--error' : '']"
        :icon="iconRight"
        v-if="iconRight"
      />
      <b-icon
        class="icon icon--password"
        :icon="passwordShown ? 'eye' : 'eye-fill'"
        v-if="newValue && type === 'password'"
        @click.stop="showPassword"
      />
      <div class="arrow-icons" v-if="type === 'number' && showArrows">
        <b-icon
          class="icon icon--increase"
          icon="caret-up-fill"
          @click="increaseValue"
        />
        <b-icon
          class="icon icon--increase"
          icon="caret-down-fill"
          @click="decreaseValue"
        />
      </div>
      <ClearButton
        class="subtract-button"
        :error="(!!error || !!errorMessage) && showError"
        @delete="(newValue = ''), $emit('update:modelValue', '')"
        v-show="clearable && newValue && type !== 'number' && type !== 'search'"
        :size="size"
        :success="!error && !errorMessage && newValue && showSuccess"
        :filled="
          !error && !errorMessage && newValue && !showSuccess && showFilled
        "
        :style-config="styleConfig"
      />
    </div>
    <p
      :class="[
        'helper-text',
        (errorMessage || error) && showError ? 'helper-text--error' : '',
      ]"
      v-if="errorMessage || error || helperText"
    >
      {{ showError ? errorMessage || error || helperText : helperText }}
    </p>
  </div>
</template>

<script>
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import ClearButton from "@/components/ClearButton/ClearButton";
import { validate } from "@/assets/scripts/validators";
import variables from "../../assets/scss/variables.scss";

export default {
  name: "Input",
  components: {
    ClearButton,
    BIcon: BootstrapIcon,
  },
  props: {
    id: {
      type: String,
      default: "input-text",
    },
    type: {
      type: String,
      default: "text",
    },
    placeholder: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    error: {
      type: String,
      default: "",
    },
    showSuccess: {
      type: Boolean,
      default: false,
    },
    showFilled: {
      type: Boolean,
      default: true,
    },
    modelValue: {
      type: [String, Number],
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    validators: {
      type: Array,
    },
    helperText: {
      type: String,
      default: null,
    },
    iconLeft: {
      type: String,
      default: null,
    },
    iconRight: {
      type: String,
      default: null,
    },
    size: {
      type: String,
      default: "md",
    },
    showError: {
      type: Boolean,
      default: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
    showArrows: {
      type: Boolean,
      default: true,
    },
    min: {
      type: Number,
      default: undefined,
    },
    max: {
      type: Number,
      default: undefined,
    },
    inputMaxLength: {
      type: Number,
      default: undefined,
    },
    readonly: {
      type: Boolean,
      default: false,
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    styleConfig: {
      type: Boolean,
      default: () => {},
    },
  },
  data() {
    return {
      newValue: this.modelValue || this.type === "number" ? 0 : "",
      newType: this.type,
      errorMessage: "",
      passwordShown: false,
    };
  },
  computed: {
    getStyleVars() {
      return {
        "--font-family": this.styleConfig?.fontFamily || variables.openSans,
        "--value-color": this.styleConfig?.valueColor || variables.gray800,
        "--value-font-weight":
          this.styleConfig?.valueFontWeight || variables.mediumFontWeight,
        "--placeholder-color":
          this.styleConfig?.placeholderColor || variables.gray400,
        "--placeholder-disabled-color":
          this.styleConfig?.placeholderDisabledColor || variables.gray400,
        "--label-color": this.styleConfig?.labelColor || variables.gray500,
        "--label-font-weight":
          this.styleConfig?.labelFontWeight || variables.mediumFontWeight,
        "--helper-text-color":
          this.styleConfig?.helperTextColor || variables.gray500,
        "--helper-text-font-weight":
          this.styleConfig?.helperTextFontWeight || variables.regularFontWeight,
        "--helper-text-font-size":
          this.styleConfig?.helperTextFontSize || variables.p6FontSize,
        "--border-color": this.styleConfig?.borderColor || variables.gray200,
        "--border-radius": this.styleConfig?.borderRadius || "6px",
        "--background-color":
          this.styleConfig?.backgroundColor || variables.baseWhite,
        "--background-disabled-color":
          this.styleConfig?.backgroundDisabledColor || variables.gray200,
        "--focus-border-color":
          this.styleConfig?.focusBorderColor || variables.hoverAccent,
        "--filled-background-color":
          this.styleConfig?.filledBackgroundColor || variables.accentOpacity1,
        "--filled-font-color":
          this.styleConfig?.filledFontColor || variables.info,
        "--search-background-color":
          this.styleConfig?.searchBackgroundColor || variables.gray100,
        "--icon-color": this.styleConfig?.iconColor || variables.gray400,
        "--error-color": this.styleConfig?.errorColor || variables.danger,
        "--success-color": this.styleConfig?.successColor || variables.success,
      };
    },
  },
  //mounted() {},
  methods: {
    /**
     * Handle Input data based on Input type
     */
    inputHandler() {
      if (this.type === "number") {
        this.newValue = this.cutLetterSymbols(this.newValue);
        this.checkMinMaxValidity(this.newValue);
      }
      if (this.validators?.length) {
        this.errorMessage = validate(this.validators, this.newValue);
        this.$emit("error", this.errorMessage);
      }
      this.$emit("update:modelValue", this.newValue);
    },
    /**
     * Shows the password when you click on the icon
     */
    showPassword() {
      this.passwordShown = !this.passwordShown;
      this.newType = this.newType === "password" ? "text" : "password";
    },
    /**
     * Replaces commas with dots and removes all characters except numbers
     * @param word
     * @returns {string}
     */
    cutLetterSymbols(word) {
      word = word.replace(",", ".");
      return word
        .replace(/[^0-9.]/g, "")
        .replace(".", "x")
        .replace(/\./g, "")
        .replace("x", ".");
    },
    checkMinMaxValidity(value) {
      if (this.max) {
        if (Number(this.max) < Number(value)) {
          this.newValue = this.max;
        }
      }
      if (this.min) {
        if (Number(this.min) > Number(value)) {
          this.newValue = this.min;
        }
      }
    },
    /**
     * Increases the number by 1
     */
    increaseValue() {
      if (this.type === "number" && this.showArrows) {
        const increasedNumber = Number(this.newValue) + 1;
        if (this.max !== undefined) {
          if (increasedNumber <= Number(this.max)) {
            this.newValue = increasedNumber;
            this.$emit("update:modelValue", this.newValue);
          }
        } else {
          this.newValue = increasedNumber;
          this.$emit("update:modelValue", this.newValue);
        }
      }
    },
    /**
     * Decreases the number by 1
     */
    decreaseValue() {
      if (this.type === "number" && this.showArrows) {
        const decreasedNumber = Number(this.newValue) - 1;
        if (this.min !== undefined) {
          if (decreasedNumber >= Number(this.min)) {
            this.newValue = decreasedNumber;
            this.$emit("update:modelValue", this.newValue);
          }
        } else {
          this.newValue = decreasedNumber;
          this.$emit("update:modelValue", this.newValue);
        }
      }
    },
  },
  watch: {
    modelValue(value) {
      this.newValue = value || this.type === "number" ? 0 : "";
    },
  },
};
</script>
<style scoped lang="scss">
@import "../../assets/scss/variables.scss";

/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type="number"] {
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
    content: "*";
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
    background-color: var(--backgroud-color);
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
      background: var(--backgroud-disabled-color);
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
