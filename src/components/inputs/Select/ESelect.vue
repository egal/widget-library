<template>
  <div
    class="select"
    :class="[
      `select--${mergedData.size}`,
      { 'select--error': mergedData.showError && (mergedData.error || errorMessage) },
    ]"
    :style="getStyleVars"
  >
    <div class="select-label">{{ mergedData.label }}</div>
    <div
      class="select-container"
      :class="{
        focus: showDropdown,
        filled: filled && !showDropdown && !mergedData.error && !errorMessage,
      }"
      @click="showDropdown = !showDropdown"
      v-click-outside="close"
    >
      <div class="select-container__values">
        <div class="placeholder" v-show="!filled">
          {{ mergedData.placeholder }}
        </div>
        <div class="selected" v-if="mergedData.multiple" v-for="option in selectModel">
          <span>{{ option[mergedData.shownKey] }}</span>
          <b-icon icon="x-lg" @click.stop="deleteOption(option)" />
        </div>
        <div class="selected" v-else>{{ selectModel[mergedData.shownKey] }}</div>
      </div>
      <div class="select-container__clear" v-if="showClearButton">
        <ClearButton
          :error="mergedData.showError && (errorMessage || mergedData.error)"
          :size="mergedData.size"
          :filled="filled && !mergedData.error && !errorMessage"
          :style-config="styleConfig"
          @delete="clearSelected"
        />
      </div>
      <div class="select-container__arrow" v-else>
        <b-icon icon="caret-down-fill" :style="showDropdown ? 'transform: rotate(180deg)' : ''" />
      </div>
    </div>

    <div class="select-dropdown">
      <EDropdown
        class="dropdown-component"
        v-show="showDropdown"
        :value="selectModel"
        :options="mergedData.options"
        :size="mergedData.size"
        :searchable="mergedData.searchable"
        :grouped="mergedData.grouped"
        :style-config="dropdownStyleConfig"
        @select="selectOption"
        @click.native.stop
      />
    </div>
  </div>
</template>

<script>
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'
import EDropdown from '@/components/inputs/Dropdown/EDropdown'
import ClearButton from '@/components/inputs/ClearButton/ClearButton'
import vClickOutside from 'click-outside-vue3'
import { validate } from '@/helpers/validators'
export default {
  name: 'ESelect',
  directives: {
    clickOutside: vClickOutside.directive,
  },
  components: {
    ClearButton,
    EDropdown,
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
    dropdownStyleConfig: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      selectModel: [],
      showDropdown: false,
      errorMessage: '',
    }
  },
  computed: {
    mergedData() {
      return Object.assign(
        {
          label: '',
          placeholder: 'Select option',
          size: 'md',
          clearable: true,
          searchable: false,
          multiple: false,
          options: [],
          modelValue: [],
          shownKey: 'name',
          error: '',
          showError: true,
          validators: [],
          grouped: false,
        },
        this.data,
      )
    },
    filled() {
      if (this.mergedData.multiple) {
        return !!this.selectModel.length
      }
      return !!Object.keys(this.selectModel).length
    },
    showClearButton() {
      return this.filled && this.mergedData.clearable && !this.showDropdown
    },
    getStyleVars() {
      return {
        '--font-family': this.styleConfig?.fontFamily || 'Open Sans',
        '--value-color': this.styleConfig?.valueColor || '#a0aec0',
        '--value-font-weight': this.styleConfig?.valueFontWeight || 500,
        '--placeholder-color': this.styleConfig?.placeholderColor || '#cbd5e0',
        '--placeholder-font-size': this.styleConfig?.placeholderFontSize || '12px',
        '--background-color': this.styleConfig?.backgroundColor || '#ffffff',
        '--label-color': this.styleConfig?.labelColor || '#a0aec0',
        '--label-font-weight': this.styleConfig?.labelFontWeight || 500,
        '--label-font-size': this.styleConfig?.labelFontSize || '12px',
        '--helper-text-color': this.styleConfig?.helperTextColor || '#a0aec0',
        '--helper-text-font-weight': this.styleConfig?.helperTextFontWeight || 400,
        '--border-color': this.styleConfig?.borderColor || '#edf2f7',
        '--border-radius': this.styleConfig?.borderRadius || '6px',
        '--focus-border-color': this.styleConfig?.focusBorderColor || '#0066ff',
        '--filled-background-color': this.styleConfig?.filledBackgroundColor || '#e5f0ff',
        '--filled-font-color': this.styleConfig?.filledFontColor || '#3385ff',
        '--error-color': this.styleConfig?.errorColor || '#f16063',
        '--arrow-color': this.styleConfig?.arrowColor || '#cbd5e0',
        '--cross-color': this.styleConfig?.crossColor || '#a0aec0',
      }
    },
  },
  mounted() {
    this.selectModel = this.mergedData.modelValue
  },
  methods: {
    close() {
      this.showDropdown = false
    },
    selectOption(option) {
      if (this.mergedData.multiple) {
        if (this.deleteOption(option)) {
          return
        }
        this.selectModel.push(option)
        return
      }
      this.selectModel = option
    },
    /**
     * Delete option if we have this option and return true, otherwise return false
     * @param option
     * @return {boolean}
     */
    deleteOption(option) {
      let index = this.selectModel.findIndex(
        (item) => item[this.mergedData.shownKey] === option[this.mergedData.shownKey],
      )
      if (index !== -1) {
        this.selectModel.splice(index, 1)
        return true
      }
      return false
    },
    clearSelected() {
      if (this.mergedData.multiple) {
        this.selectModel = []
        return
      }
      this.selectModel = {}
    },
  },
  watch: {
    selectModel: {
      handler(value) {
        if (this.mergedData.validators) {
          this.errorMessage = validate(this.mergedData.validators, this.newValue)
          this.$emit('error', this.errorMessage)
        }
        this.$emit('update:modelValue', value)
      },
      deep: true,
    },
    modelValue: {
      handler(value) {
        this.selectModel = value
      },
      deep: true,
    },
  },
}
</script>
<style scoped lang="scss">
@import 'src/assets/variables';
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
    background-color: var(--filled-background-color);
    color: var(--filled-font-color);
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
