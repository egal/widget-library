<template>
  <div
    class="select"
    :class="[
      `select--${mergedData.size}`,
      { 'select--error': mergedData.showError && (mergedData.error || errorMessage) },
      { 'select--success': mergedData.showSuccess },
      { disabled: mergedData.disabled },
    ]"
    :style="getStyleVars"
  >
    <div class="select-label">{{ mergedData.label }}</div>
    <div
      v-if="!mergedData.searchableInput"
      class="select-container"
      :class="{
        focus: showDropdown,
        filled:
          mergedData.showFilled && filled && !showDropdown && !mergedData.error && !errorMessage,
      }"
      @click="toggle"
      v-click-outside="close"
    >
      <div class="select-container__values">
        <div class="placeholder" v-show="!filled">
          {{ mergedData.placeholder }}
        </div>
        <div
          class="selected"
          v-if="mergedData.multiple"
          :style="{
            ...chipsStyleConfig,
          }"
        >
          <span> {{ selectModel.map((item) => item[mergedData.shownKey]).join(', ') }}</span>
          <!--          <span v-for="(option, idx) in selectModel"-->
          <!--            >{{ option[mergedData.shownKey] }}{{ idx < selectModel.length - 1 ? ',' : '' }}</span-->
          <!--          >-->
        </div>

        <div class="selected" v-else>{{ selectModel[0][mergedData.shownKey] }}</div>
      </div>

      <div
        class="select-container__clear"
        v-if="mergedData.multiple && selectModel.length > 0"
        @click="clearSelected"
      >
        <span>{{ selectModel.length }}</span
        ><b-icon icon="x" />
      </div>
      <div class="select-container__arrow">
        <b-icon icon="caret-down-fill" :style="showDropdown ? 'transform: rotate(180deg)' : ''" />
      </div>
    </div>

    <div v-else-if="mergedData.searchableInput && mergedData.multiple" :style="getStyleVars">
      <EInput
        class="input-search"
        @click="showDropdown = true"
        @keydown.enter="onEnter"
        @delete-option="(option) => deleteOption(option)"
        v-click-outside="close"
        @update:modelValue="filterOptions"
        :chipsModel="selectModel"
        :data="{
          clearable: mergedData.inputConfig?.clearable || true,
          placeholder: mergedData.inputConfig?.searchPlaceholder || 'Search',
          showFilled: false,
          type: 'search',
          iconLeft: mergedData.inputConfig?.iconLeft || 'search',
          iconRight: mergedData.inputConfig?.iconRight || '',
          size: mergedData.size,
          modelValue: chipInputValue,
          chips: mergedData.multiple && mergedData.searchableInput,
          shownKey: mergedData.shownKey,
          ...mergedData.inputConfig,
        }"
        :style-config="{
          backgroundColor: '#F7FAFC',
          borderColor: '#E2E8F0',
          iconColor: '#CBD5E0',
          placeholderColor: '#CBD5E0',
          ...mergedData.inputSearchStyleConfig,
        }"
        :chips-inline-style="chipsStyleConfig"
      />
    </div>

    <EInput
      class="input-search"
      v-else-if="mergedData.searchableInput && !mergedData.multiple"
      @click="showDropdown = true"
      v-click-outside="close"
      @update:modelValue="filterOptions"
      :data="{
        clearable: mergedData.inputConfig?.clearable || true,
        placeholder: mergedData.inputConfig?.searchPlaceholder || 'Search',
        showFilled: false,
        type: 'search',
        iconLeft: mergedData.inputConfig?.iconLeft || 'search',
        iconRight: mergedData.inputConfig?.iconRight || '',
        size: mergedData.size,
        modelValue: selectModel[mergedData.shownKey],
        ...mergedData.inputConfig,
      }"
      :style-config="{
        backgroundColor: '#F7FAFC',
        borderColor: '#E2E8F0',
        iconColor: '#CBD5E0',
        placeholderColor: '#CBD5E0',
        ...mergedData.inputSearchStyleConfig,
      }"
    />

    <div class="select-helper" v-if="mergedData.helperText || errorMessage">
      {{ errorMessage ? errorMessage : mergedData.helperText }}
    </div>

    <div class="select-dropdown" :class="{ grouped: mergedData.grouped }">
      <EDropdown
        class="dropdown-component"
        v-show="showDropdown"
        :value="selectModel"
        :empty-dropdown-text="mergedData.emptyDropdownText"
        :options="filteredOptions"
        :size="mergedData.size"
        :searchable="mergedData.searchable"
        :grouped="mergedData.grouped"
        :search-placeholder="mergedData.searchPlaceholder"
        :style-config="{
          ...styleConfig,
          ...mergedData.dropdownStyleConfig,
          optionColor: this.styleConfig?.valueColor,
        }"
        :dropdown-position="mergedData.dropdownPosition"
        :show-more-button-display="isDisplayShowMore"
        :show-more-button-text="mergedData.showMoreButtonText"
        :icon-left="mergedData.iconLeft"
        :icon-right="mergedData.iconRight"
        :shown-key="mergedData.shownKey"
        :shown-badge-key="mergedData.shownBadgeKey"
        :input-search-style-config="{
          backgroundColor: '#F7FAFC',
          borderColor: '#E2E8F0',
          iconColor: '#CBD5E0',
          placeholderColor: '#CBD5E0',
          ...mergedData.inputSearchStyleConfig,
        }"
        @select="selectOption"
        @show-more="$emit('show-more')"
        @click.native.stop
        @touchstart.native.stop
      />
    </div>
  </div>
</template>

<script>
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'
import EDropdown from '@/components/inputs/Dropdown/EDropdown'
import EInput from '@/components/inputs/Input/EInput'
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
    EInput,
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
    // dropdownStyleConfig: {
    //   type: Object,
    //   default: () => {},
    // },
    // inputSearchStyleConfig: {
    //   type: Object,
    //   default: () => {},
    // },
    chipsStyleConfig: {
      type: Object,
      default: () => {},
    },
  },
  emits: ['update:modelValue', 'error', 'show-more', 'input'],
  data() {
    return {
      selectModel: this.data?.modelValue || [],
      showDropdown: false,
      errorMessage: '',
      searchValue: '',
      filteredOptions: this.data?.options ?? [],
      chipInputValue: '',
    }
  },
  computed: {
    mergedData() {
      return Object.assign(
        {
          label: '',
          placeholder: 'Select option',
          helperText: '',
          size: 'md',
          clearable: true,
          searchable: false,
          multiple: false,
          disabled: false, // added
          options: [],
          isLocalOptions: true,
          nonLocalOptionsTotalCount: 0,
          modelValue: [],
          shownKey: 'name',
          shownBadgeKey: '',
          error: '',
          showError: true,
          showSuccess: false,
          validators: [],
          grouped: false,
          searchPlaceholder: 'Search',
          searchableInput: false,
          emptyDropdownText: 'No results found',
          dropdownPosition: 'bottom',
          showMoreButtonDisplay: false,
          showMoreButtonText: 'Show more...',
          closeDropdownAfterSelection: true,
          openDropdown: false,
          showFilled: false,
          dropdownStyleConfig: {},
          inputSearchStyleConfig: {},
          inputConfig: {},
        },
        this.data,
      )
    },
    // openDropdown() {
    //
    //   return this.mergedData.openDropdown
    // },
    filled() {
      if (this.mergedData.multiple) {
        return !!this.selectModel.length
      }
      return !!Object.keys(this.selectModel).length
    },
    // showClearButton() {
    //   return this.filled && this.mergedData.clearable && !this.showDropdown
    // },
    computeDefaultFontSize() {
      return this.mergedData.size === 'lg'
        ? '14px'
        : this.mergedData.size === 'md'
        ? '12px'
        : '10px'
    },
    getStyleVars() {
      return {
        '--font-family': this.styleConfig?.fontFamily || 'Open Sans',
        '--value-font-size': this.styleConfig?.valueFontSize || this.computeDefaultFontSize,
        '--value-color': this.styleConfig?.valueColor || '#2D3748',
        '--value-font-weight': this.styleConfig?.valueFontWeight || 500,
        '--placeholder-color': this.styleConfig?.placeholderColor || '#A0AEC0',
        '--placeholder-font-size':
          this.styleConfig?.placeholderFontSize || this.computeDefaultFontSize,
        '--background-color': this.styleConfig?.backgroundColor || '#ffffff',
        '--label-color': this.styleConfig?.labelColor || '#a0aec0',
        '--label-font-weight': this.styleConfig?.labelFontWeight || 400,
        '--label-font-size': this.styleConfig?.labelFontSize || '12px',
        '--helper-text-color': this.styleConfig?.helperTextColor || '#a0aec0',
        '--helper-text-font-weight': this.styleConfig?.helperTextFontWeight || 400,
        '--border-color': this.styleConfig?.borderColor || '#E2E8F0',
        '--border-radius': this.styleConfig?.borderRadius || '6px',
        '--focus-border-color': this.styleConfig?.focusBorderColor || '#76ACFB',
        '--filled-background-color': this.styleConfig?.filledBackgroundColor || '#0066ff1a',
        '--filled-font-color': this.styleConfig?.filledFontColor || '#0066ff',
        '--error-color': this.styleConfig?.errorColor || '#f16063',
        '--success-color': this.styleConfig?.successColor || '#66cb9f', // added
        '--arrow-color': this.styleConfig?.arrowColor || '#A0AEC0',
        '--cross-color': this.styleConfig?.crossColor || '#a0aec0',
        '--focus-box-shadow':
          this.styleConfig?.focusBoxShadow || '0px 0px 0px 2px rgba(76, 111, 255, 0.3)',
        '--search-background-color':
          this.mergedData?.inputSearchStyleConfig?.searchBackgroundColor || '#f7fafc',
      }
    },

    nonlocalOptions() {
      return this.mergedData.options
    },

    isDisplayShowMore() {
      return this.mergedData.showMoreButtonDisplay
        ? this.mergedData.isLocalOptions === false &&
            this.nonlocalOptions.length < this.mergedData.nonLocalOptionsTotalCount
        : false
    },
  },
  mounted() {
    this.selectModel = this.mergedData.modelValue
    this.showDropdown = this.mergedData.openDropdown
  },
  methods: {
    onEnter(event) {
      if (this.mergedData.searchableInput && this.mergedData.multiple) {
        if (this.selectModel.find((i) => i.name === event.target.value)) {
          return
        }

        if (this.mergedData.searchableInput && this.mergedData.multiple && event.target.value) {
          let obj = {}
          obj[this.mergedData.shownKey] = event.target.value
          this.selectModel.push(obj)
          this.$emit('input', {
            target: {
              value: '',
            },
          })
          this.$emit('update:modelValue', this.selectModel)
          this.filterOptions('')
        }
      }
    },
    close() {
      this.showDropdown = false
    },
    toggle() {
      if (this.showDropdown) {
        this.close()
      } else {
        this.showDropdown = !this.mergedData.disabled
      }
    },
    selectOption(option) {
      if (this.mergedData.multiple) {
        if (this.deleteOption(option)) {
          return
        }
        this.selectModel.push(option)
        this.$emit('update:modelValue', this.selectModel)

        if (this.mergedData.searchableInput) {
          this.filterOptions('')
        }
        return
      } else {
        if (this.deleteOption(option)) {
          return
        } else {
          this.selectModel = [option]
          this.$emit('update:modelValue', this.selectModel)
        }
      }

      if (this.mergedData.closeDropdownAfterSelection && !this.mergedData.multiple) {
        this.showDropdown = false
      }
    },
    /**
     * Delete option if we have this option and return true, otherwise return false
     * @param option
     * @return {boolean}
     */
    deleteOption(option) {
      console.log(this.selectModel)
      let index = this.selectModel.findIndex(
        (item) => item[this.mergedData.shownKey] === option[this.mergedData.shownKey],
      )
      if (index !== -1) {
        this.selectModel.splice(index, 1)
        this.$emit('update:modelValue', this.selectModel)
        return true
      }
      return false
    },
    clearSelected() {
      if (this.mergedData.multiple) {
        this.selectModel = []
        this.$emit('update:modelValue', this.selectModel)
        return
      }
      this.selectModel = {}
      this.$emit('update:modelValue', this.selectModel)
    },
    /**
     * Filer options by search value
     * @param value
     */
    filterOptions(value) {
      this.chipInputValue = value
      this.showDropdown = true
      if (!value) {
        this.filteredOptions = this.mergedData.options

        if (!this.mergedData.multiple && !this.mergedData.searchableInput) {
          this.selectModel = []
        }
        this.$emit('update:modelValue', this.selectModel)
        return
      }

      if (!this.mergedData.isLocalOptions) {
        this.filteredOptions = this.mergedData.options
        return
      }

      if (!this.mergedData.grouped) {
        this.filteredOptions = this.mergedData.options.filter(
          (option) =>
            option[this.mergedData.shownKey].toLowerCase().indexOf(value.toLowerCase()) !== -1,
        )
      } else {
        this.filteredOptions = this.mergedData.options.map((group) => {
          const filteredGroupsOptions = group.options.filter(
            (option) =>
              option[this.mergedData.shownKey].toLowerCase().indexOf(value.toLowerCase()) !== -1,
          )

          return {
            ...group,
            options: filteredGroupsOptions,
          }
        })
      }
    },
  },
  watch: {
    selectModel: {
      handler(value) {
        if (this.mergedData.validators) {
          this.errorMessage = validate(this.mergedData.validators, value)

          this.$emit('error', this.errorMessage)
        }
      },
      deep: true,
    },

    'mergedData.openDropdown'(value) {
      this.showDropdown = !value
    },
    'mergedData.modelValue'(value) {
      this.selectModel = value
    },

    nonlocalOptions(options) {
      if (!this.mergedData.isLocalOptions) {
        this.filteredOptions = options
      }
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
  position: relative;
  &-label {
    font-weight: var(--label-font-weight);
    color: var(--label-color);
    font-size: var(--label-font-size);
    margin-bottom: 8px;
  }
  &-container {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 0 12px;
    box-sizing: border-box;
    border: 1px solid var(--border-color);
    background-color: var(--background-color);
    border-radius: var(--border-radius);
    &__values {
      display: flex;
      flex-grow: 1;
      overflow: hidden;
      white-space: nowrap;
      margin-right: auto;

      text-overflow: ellipsis;

      .placeholder {
        color: var(--placeholder-color);
        font-size: var(--placeholder-font-size);
      }
      .selected {
        display: flex;
        align-items: center;
        margin-right: 10px;
        color: var(--value-color);
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        span {
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
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
      background: $gray-200;
      padding: 0 6px;
      border-radius: 24px;
      font-weight: 400;
      font-size: 16px;
      line-height: 150%;
      color: $gray-800;
      margin-right: 5px;
      text-align: center;
      cursor: pointer;
      min-width: 35px;
      display: flex;
      justify-content: center;
      align-items: center;

      .bi {
        width: 18px;
      }
    }

    &__arrow {
      .bi {
        transition: 0.2s;
        color: var(--arrow-color);
      }
    }
  }
  &-helper {
    position: absolute;
    left: 0;
    top: 100%;
    margin-top: 8px;
    color: var(--helper-text-color);
    line-height: 150%;
  }

  &--error {
    .select-helper,
    .selected,
    .select-container__arrow > .bi {
      color: var(--error-color);
    }
    .select-container {
      border-color: var(--error-color);
      color: var(--error-color);
    }
  }

  &--success {
    .select-helper,
    .selected,
    .select-container__arrow > .bi {
      color: var(--success-color);
    }
    .select-container {
      border-color: var(--success-color);
      color: var(--success-color);
    }
  }

  .focus {
    border-color: var(--focus-border-color);

    &.select-helper {
      color: var(--helper-text-color);
    }
    .selected {
      color: var(--value-color);
    }
    .select-container__arrow > .bi {
      color: var(--cross-color);
    }
  }

  .filled {
    background-color: var(--filled-background-color);
    color: var(--filled-font-color);
    .selected,
    .select-container__arrow {
      .bi {
        color: var(--filled-font-color);
      }
    }
  }

  .input-search {
    width: 100%;
  }

  .placeholder {
    font-size: var(--placeholder-font-size);
  }

  .selected {
    font-size: var(--value-font-size);
  }

  &--lg {
    .select-container {
      height: 48px;
      font-size: 16px;

      &__arrow {
        .bi {
          width: 17px;
          height: 17px;
        }
      }
    }

    :deep(.dropdown--top) {
      bottom: calc(46px + 8px);
    }

    .select-helper {
      font-size: 14px;
    }

    .select-label,
    .selected > span,
    .placeholder,
    .select-container__clear {
      font-size: 16px;
    }

    .select-container__clear {
      min-width: 35px;
    }
  }
  &--md {
    .select-container {
      font-size: 14px;
      height: 40px;

      &__arrow {
        .bi {
          width: 12px;
          height: 12px;
        }
      }
    }

    :deep(.dropdown--top) {
      bottom: calc(36px + 8px);
    }

    .select-helper {
      font-size: 12px;
    }

    .select-label,
    .selected > span,
    .placeholder,
    .select-container__clear {
      font-size: 14px;
    }

    .select-container__clear {
      min-width: 25px;
    }
  }
  &--sm {
    .select-container {
      font-size: 12px;
      height: 32px;

      &__arrow {
        .bi {
          width: 10px;
          height: 10px;
        }
      }
    }

    :deep(.dropdown--top) {
      bottom: calc(26px + 8px);
    }

    .select-helper {
      font-size: 12px;
    }

    .select-label,
    .selected > span,
    .placeholder,
    .select-container__clear {
      font-size: 12px;
    }

    .select-container__clear {
      min-width: 20px;
    }
  }
  &--xs {
    .select-container {
      height: 24px;
      font-size: 10px;

      &__arrow {
        .bi {
          width: 23px;
          height: 10px;
        }
      }
    }

    :deep(.dropdown--top) {
      bottom: calc(26px + 8px);
    }

    .select-helper {
      font-size: 10px;
    }

    .select-label,
    .selected > span,
    .placeholder,
    .select-container__clear {
      font-size: 10px;
    }

    .select-container__clear {
      min-width: 15px;
    }
  }

  &-dropdown {
    position: relative;
    z-index: 2;
    width: 100%;

    &.search-input {
      width: inherit;
      margin-top: 12px;
    }

    .dropdown-component {
      position: absolute;
      //width: 100%;
      z-index: 10;
    }
  }

  &.disabled {
    color: $gray-400;

    .select-label {
      color: $gray-400;
    }

    .select-container {
      border-color: $gray-300;

      .placeholder {
        color: $gray-400;
      }

      &__arrow > .bi {
        color: $gray-400;
      }
    }
  }
}
</style>
