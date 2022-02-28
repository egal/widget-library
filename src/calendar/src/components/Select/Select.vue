<template>
  <div
    class="select"
    :class="[
      `select--${size}`,
      { 'select--error': showError && (error || errorMessage) },
    ]"
    :style="getStyleVars"
  >
    <div class="select-label">{{ label }}</div>
    <div
      class="select-container"
      :class="{
        focus: showDropdown,
        filled: filled && !showDropdown && !error && !errorMessage,
      }"
      @click="showDropdown = !showDropdown"
      v-click-outside="close"
    >
      <div class="select-container__values">
        <div class="placeholder" v-show="!filled">
          {{ placeholder }}
        </div>
        <div v-if="multiple">
          <div class="selected" v-for="(option, i) in selectModel" :key="i">
            <span>{{ option[shownKey] }}</span>
            <b-icon icon="x-lg" @click.stop="deleteOption(option)" />
          </div>
        </div>

        <div class="selected" v-else>{{ selectModel[shownKey] }}</div>
      </div>
      <div class="select-container__clear" v-if="showClearButton">
        <ClearButton
          :error="showError && (errorMessage || error)"
          :size="size"
          :filled="filled && !error && !errorMessage"
          :style-config="styleConfig"
          @delete="clearSelected"
        />
      </div>
      <div class="select-container__arrow" v-else>
        <b-icon
          icon="caret-down-fill"
          :style="showDropdown ? 'transform: rotate(180deg)' : ''"
        />
      </div>
    </div>

    <div class="select-dropdown">
      <!--      // todo removed  @click.native.stop-->
      <Dropdown
        class="dropdown-component"
        v-show="showDropdown"
        :value="selectModel"
        :options="options"
        :size="size"
        :searchable="searchable"
        :grouped="grouped"
        :style-config="dropdownStyleConfig"
        @select="selectOption"
      />
    </div>
  </div>
</template>

<script>
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import Dropdown from "@/components/Dropdown/Dropdown";
import ClearButton from "@/components/ClearButton/ClearButton";
import vClickOutside from "click-outside-vue3";
import { validate } from "@/assets/scripts/validators";
import variables from "../../assets/scss/variables.scss";

export default {
  name: "Select",
  directives: {
    clickOutside: vClickOutside.directive,
  },
  components: {
    ClearButton,
    Dropdown,
    BIcon: BootstrapIcon,
  },
  props: {
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "Select option",
    },
    size: {
      type: String,
      default: "md",
    },
    clearable: {
      type: Boolean,
      default: true,
    },
    searchable: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    options: {
      type: Array,
      default: () => [],
    },
    modelValue: {
      type: [Object, Array],
      default: () => [],
    },
    shownKey: {
      type: String,
      default: "name",
    },
    error: {
      type: String,
      default: "",
    },
    showError: {
      type: Boolean,
      default: true,
    },
    validators: {
      type: Array,
      default: () => [],
    },
    grouped: {
      type: Boolean,
      default: false,
    },
    styleConfig: {
      type: Object,
      // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-empty-function
      default: () => {},
    },
    dropdownStyleConfig: {
      type: Object,
      // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types,@typescript-eslint/no-empty-function
      default: () => {},
    },
  },
  data() {
    return {
      selectModel: this.modelValue,
      showDropdown: false,
      errorMessage: "",
    };
  },
  computed: {
    filled() {
      if (this.multiple) {
        return !!this.selectModel.length;
      }
      return !!Object.keys(this.selectModel).length;
    },
    showClearButton() {
      return this.filled && this.clearable && !this.showDropdown;
    },
    getStyleVars() {
      return {
        "--font-family": this.styleConfig?.fontFamily || variables.openSans,
        "--value-color": this.styleConfig?.valueColor || variables.gray500,
        "--value-font-weight":
          this.styleConfig?.valueFontWeight || variables.mediumFontWeight,
        "--placeholder-color":
          this.styleConfig?.placeholderColor || variables.gray400,
        "--placeholder-font-size":
          this.styleConfig?.placeholderFontSize || variables.p6FontSize,
        "--background-color":
          this.styleConfig?.backgroundColor || variables.baseWhite,
        "--label-color": this.styleConfig?.labelColor || variables.gray500,
        "--label-font-weight":
          this.styleConfig?.labelFontWeight || variables.mediumFontWeight,
        "--label-font-size":
          this.styleConfig?.labelFontSize || variables.p6FontSize,
        "--helper-text-color":
          this.styleConfig?.helperTextColor || variables.gray500,
        "--helper-text-font-weight":
          this.styleConfig?.helperTextFontWeight || variables.regularFontWeight,
        "--border-color": this.styleConfig?.borderColor || variables.gray200,
        "--border-radius": this.styleConfig?.borderRadius || "6px",
        "--focus-border-color":
          this.styleConfig?.focusBorderColor || variables.primaryAccent,
        "--filled-background-color":
          this.styleConfig?.filledBackgroundColor || variables.accentOpacity1,
        "--filled-font-color":
          this.styleConfig?.filledBackgroundColor || variables.info,
        "--error-color": this.styleConfig?.errorColor || variables.danger,
        "--arrow-color": this.styleConfig?.arrowColor || variables.gray400,
        "--cross-color": this.styleConfig?.crossColor || variables.gray500,
      };
    },
  },
  // mounted() {},
  methods: {
    close() {
      this.showDropdown = false;
    },
    selectOption(option) {
      if (this.multiple) {
        if (this.deleteOption(option)) {
          return;
        }
        this.selectModel.push(option);
        return;
      }
      this.selectModel = option;
    },
    /**
     * Delete option if we have this option and return true, otherwise return false
     * @param option
     * @return {boolean}
     */
    deleteOption(option) {
      let index = this.selectModel.findIndex(
        (item) => item[this.shownKey] === option[this.shownKey]
      );
      if (index !== -1) {
        this.selectModel.splice(index, 1);
        return true;
      }
      return false;
    },
    clearSelected() {
      if (this.multiple) {
        this.selectModel = [];
        return;
      }
      this.selectModel = {};
    },
  },
  watch: {
    selectModel: {
      handler(value) {
        if (this.validators) {
          this.errorMessage = validate(this.validators, this.newValue);
          this.$emit("error", this.errorMessage);
        }
        this.$emit("update:modelValue", value);
      },
      deep: true,
    },
    modelValue: {
      handler(value) {
        this.selectModel = value;
      },
      deep: true,
    },
  },
};
</script>
<style scoped lang="scss">
@import "../../assets/scss/variables.scss";

.select {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  font-family: var(--font-family);
  &-label {
    font-weight: var(--label-font-weight);
    color: var(--label-color);
    font-size: var(--label-font-size);
    margin-bottom: 6px;
  }
  &-container {
    width: 100%;
    display: grid;
    grid-template-columns: auto 16px;
    grid-column-gap: 6px;
    align-items: center;
    padding: 0 12px;
    box-sizing: border-box;
    border: 1px solid var(--border-color);
    background-color: var(--background-color);
    border-radius: var(--border-radius);
    &__values {
      display: flex;
      overflow-x: hidden;
      .placeholder {
        color: var(--placeholder-color);
        font-size: var(--placeholder-font-size);
      }
      .selected {
        display: flex;
        align-items: center;
        margin-right: 10px;
        span {
          margin-right: 8px;
          white-space: nowrap;
        }
        .bi {
          width: 8px;
          height: 8px;
          cursor: pointer;
          margin-bottom: 0;
          color: var(--cross-color);
        }
      }
    }
    &__clear {
      height: fit-content;
      align-self: center;
    }
    &__arrow {
      .bi {
        transition: 0.2s;
        color: var(--arrow-color);
      }
    }
  }
  .focus {
    border-color: var(--focus-border-color);
  }
  .filled {
    //background-color: var(--filled-background-color);
    //color: var(--filled-font-color);
    .selected {
      .bi {
        color: var(--filled-font-color);
      }
    }
  }
  &--error {
    .select-container {
      border-color: var(--error-color);
      color: var(--error-color);
    }
  }
  &--lg {
    .select-container {
      height: 46px;
      .selected {
        font-size: 12px;
      }
      &__arrow {
        .bi {
          width: 17px;
          height: 17px;
        }
      }
    }
    .select-label {
      font-size: 14px;
    }
  }
  &--md {
    .select-container {
      height: 36px;
      .selected {
        font-size: 12px;
      }
      &__arrow {
        .bi {
          width: 12px;
          height: 12px;
        }
      }
    }
  }
  &--sm {
    .select-container {
      height: 26px;
      .placeholder {
        font-size: 10px;
      }
      .selected {
        font-size: 10px;
      }
      &__arrow {
        .bi {
          width: 10px;
          height: 10px;
        }
      }
    }
  }
  &-dropdown {
    position: relative;
    z-index: 2;
    margin-top: 4px;
    .dropdown-component {
      position: absolute;
    }
  }
}
</style>
