<template>
  <div
      class="select"
      :class="[
      `select--${mergedData.size}`,
      {
        'select--error':
          mergedData.showError && (mergedData.error || errorMessage),
      },
    ]"
      :style="getStyleVars"
  >
    <div class="select-label">{{ mergedData.label }}</div>
    <div
        v-if="!mergedData.searchableInput"
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
        <div
            class="selected"
            v-if="mergedData.multiple"
            v-for="option in selectModel"
            :style="chipsStyleConfig"
        >
          <span>{{ option[mergedData.shownKey] }}</span>
          <b-icon icon="x-lg" @click.stop="deleteOption(option)"/>
        </div>
        <div class="selected" v-else-if="!!selectModel.name">
          {{ selectModel.name }}
        </div>
        <div class="selected" v-else>
          {{ selectModel[mergedData.shownKey] }}
        </div>
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
        <b-icon
            icon="caret-down-fill"
            :style="showDropdown ? 'transform: rotate(180deg)' : ''"
        />
      </div>
    </div>

    <div
        v-else-if="mergedData.searchableInput && mergedData.multiple"
        :style="getStyleVars"
    >
      <EInput
          class="input-search"
          @click="showDropdown = true"
          @keydown.enter="onEnter"
          @delete-option="(option) => deleteOption(option)"
          v-click-outside="close"
          @update:modelValue="filterOptions"
          :chipsModel="selectModel"
          :data="{
          clearable: mergedData.clearable,
          placeholder: mergedData.searchPlaceholder,
          showFilled: false,
          type: 'search',
          iconLeft: mergedData.iconLeft,
          iconRight: mergedData.iconRight,
          size: mergedData.size,
          modelValue: chipInputValue,
          chips: mergedData.multiple && mergedData.searchableInput,
          shownKey: mergedData.shownKey,
        }"
          :style-config="{
          backgroundColor: '#F7FAFC',
          borderColor: '#E2E8F0',
          iconColor: '#CBD5E0',
          placeholderColor: '#CBD5E0',
          ...inputSearchStyleConfig,
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
        clearable: mergedData.clearable,
        placeholder: mergedData.searchPlaceholder,
        showFilled: false,
        type: 'search',
        iconLeft: mergedData.iconLeft,
        iconRight: mergedData.iconRight,
        size: mergedData.size,
        modelValue: selectModel[mergedData.shownKey],
      }"
        :style-config="{
        backgroundColor: '#F7FAFC',
        borderColor: '#E2E8F0',
        iconColor: '#CBD5E0',
        placeholderColor: '#CBD5E0',
        ...inputSearchStyleConfig,
      }"
    />

    <div
        class="select-dropdown"
        :class="{
        'search-input': mergedData.searchableInput,
        grouped: mergedData.grouped,
      }"
    >
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
          :style-config="dropdownStyleConfig"
          :dropdown-position="mergedData.dropdownPosition"
          :show-more-button-display="isDisplayShowMore"
          :show-more-button-text="mergedData.showMoreButtonText"
          :input-search-style-config="{
          backgroundColor: '#F7FAFC',
          borderColor: '#E2E8F0',
          iconColor: '#CBD5E0',
          placeholderColor: '#CBD5E0',
          ...inputSearchStyleConfig,
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
import {validate} from '@/helpers/validators'

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
      default: () => {
      },
    },
    styleConfig: {
      type: Object,
      default: () => {
      },
    },
    dropdownStyleConfig: {
      type: Object,
      default: () => {
      },
    },
    inputSearchStyleConfig: {
      type: Object,
      default: () => {
      },
    },
    chipsStyleConfig: {
      type: Object,
      default: () => {
      },
    },
    table: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:modelValue', 'error', 'show-more', 'input'],
  data() {
    return {
      selectModel: [],
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
            size: 'md',
            clearable: true,
            searchable: false,
            multiple: false,
            options: [],
            isLocalOptions: true,
            nonLocalOptionsTotalCount: 0,
            modelValue: [],
            shownKey: 'name',
            error: '',
            showError: true,
            validators: [],
            grouped: false,
            searchPlaceholder: 'Search',
            searchableInput: false,
            emptyDropdownText: 'no data',
            dropdownPosition: 'bottom',
            showMoreButtonDisplay: false,
            showMoreButtonText: 'Show more...',
            closeDropdownAfterSelection: true,
            openDropdown: false,
          },
          this.data,
      )
    },
    openDropdown() {
      return this.mergedData.openDropdown
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
        '--value-font-size':
            this.styleConfig?.valueFontSize || this.computeDefaultFontSize,
        '--value-color': this.styleConfig?.valueColor || '#2D3748',
        '--value-font-weight': this.styleConfig?.valueFontWeight || 500,
        '--placeholder-color': this.styleConfig?.placeholderColor || '#cbd5e0',
        '--placeholder-font-size':
            this.styleConfig?.placeholderFontSize || this.computeDefaultFontSize,
        '--background-color': this.styleConfig?.backgroundColor || '#ffffff',
        '--label-color': this.styleConfig?.labelColor || '#a0aec0',
        '--label-font-weight': this.styleConfig?.labelFontWeight || 500,
        '--label-font-size': this.styleConfig?.labelFontSize || '12px',
        '--helper-text-color': this.styleConfig?.helperTextColor || '#a0aec0',
        '--helper-text-font-weight':
            this.styleConfig?.helperTextFontWeight || 400,
        '--border-color': this.styleConfig?.borderColor || '#edf2f7',
        '--border-radius': this.styleConfig?.borderRadius || '6px',
        '--focus-border-color': this.styleConfig?.focusBorderColor || '#0066ff',
        '--filled-background-color':
            this.styleConfig?.filledBackgroundColor || '#0066ff1a',
        '--filled-font-color': this.styleConfig?.filledFontColor || '#0066ff',
        '--error-color': this.styleConfig?.errorColor || '#f16063',
        '--arrow-color': this.styleConfig?.arrowColor || '#cbd5e0',
        '--cross-color': this.styleConfig?.crossColor || '#a0aec0',
        '--focus-box-shadow':
            this.styleConfig?.focusBoxShadow ||
            '0px 0px 0px 2px rgba(76, 111, 255, 0.3)',
        '--search-background-color':
            this.inputSearchStyleConfig?.searchBackgroundColor || '#f7fafc',
      }
    },

    nonlocalOptions() {
      return this.mergedData.options
    },

    isDisplayShowMore() {
      return this.mergedData.showMoreButtonDisplay
          ? this.mergedData.isLocalOptions === false &&
          this.nonlocalOptions.length <
          this.mergedData.nonLocalOptionsTotalCount
          : false
    },
  },
  mounted() {
    this.selectModel = this.mergedData.modelValue
  },
  methods: {
    onEnter(event) {
      if (this.mergedData.searchableInput && this.mergedData.multiple) {
        if (this.selectModel.find((i) => i.name === event.target.value)) {
          return
        }

        if (
            this.mergedData.searchableInput &&
            this.mergedData.multiple &&
            event.target.value
        ) {
          let obj = {}
          obj[this.mergedData.shownKey] = event.target.value
          this.selectModel.push(obj)
          if (this.table) {
            this.$emit('input', {
              name: 'input', target: {
                value: '',
              }
            })
          } else {
            this.$emit('input', {
              target: {
                value: '',
              },
            })
          }
          if (this.table) {
            this.$emit('update:modelValue', {name: 'select', value: this.selectModel})
          } else {
            this.$emit('update:modelValue', this.selectModel)
          }
          this.filterOptions('')
        }
      }
    },
    close() {
      this.showDropdown = false
    },
    selectOption(option) {
      if (this.mergedData.multiple && !this.mergedData.searchableInput) {
        if (this.deleteOption(option)) {
          return
        }
        this.selectModel.push(option)
        if (this.table) {
          this.$emit('update:modelValue', {name: 'select', value: this.selectModel})
        } else {
          this.$emit('update:modelValue', this.selectModel)
        }
        return
      } else if (this.mergedData.searchableInput && this.mergedData.multiple) {
        if (this.deleteOption(option)) {
          return
        }
        this.selectModel.push(option)
        if (this.table) {
          this.$emit('update:modelValue', {name: 'select', value: this.selectModel})
        } else {
          this.$emit('update:modelValue', this.selectModel)
        }
        this.filterOptions('')
        return
      }
      this.selectModel = option
      if (this.table) {
        this.$emit('update:modelValue', {name: 'select', value: this.selectModel})
      } else {
        this.$emit('update:modelValue', this.selectModel)
      }

      if (
          this.mergedData.closeDropdownAfterSelection &&
          !this.mergedData.multiple
      ) {
        this.showDropdown = false
      }
    },
    /**
     * Delete option if we have this option and return true, otherwise return false
     * @param option
     * @return {boolean}
     */
    deleteOption(option) {
      let index = this.selectModel.findIndex(
          (item) =>
              item[this.mergedData.shownKey] === option[this.mergedData.shownKey],
      )
      if (index !== -1) {
        this.selectModel.splice(index, 1)
        if (this.table) {
          this.$emit('update:modelValue', {name: 'select', value: this.selectModel})
        } else {
          this.$emit('update:modelValue', this.selectModel)
        }
        return true
      }
      return false
    },
    clearSelected() {
      if (this.mergedData.multiple) {
        this.selectModel = []
        if (this.table) {
          this.$emit('update:modelValue', {name: 'select', value: this.selectModel})
        } else {
          this.$emit('update:modelValue', this.selectModel)
        }
        return
      }
      this.selectModel = {}
      if (this.table) {
        this.$emit('update:modelValue', {name: 'select', value: this.selectModel})
      } else {
        this.$emit('update:modelValue', this.selectModel)
      }
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
        if (this.table) {
          this.$emit('update:modelValue', {name: 'select', value: this.selectModel})
        } else {
          this.$emit('update:modelValue', this.selectModel)
        }
        return
      }

      if (!this.mergedData.isLocalOptions) {
        this.filteredOptions = this.mergedData.options
        return
      }

      if (!this.mergedData.grouped) {
        this.filteredOptions = this.mergedData.options.filter(
            (option) =>
                option[this.mergedData.shownKey]
                    .toLowerCase()
                    .indexOf(value.toLowerCase()) !== -1,
        )
      } else {
        this.filteredOptions = this.mergedData.options.map((group) => {
          const filteredGroupsOptions = group.options.filter(
              (option) =>
                  option[this.mergedData.shownKey]
                      .toLowerCase()
                      .indexOf(value.toLowerCase()) !== -1,
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
          if (this.table) {
            this.$emit('error', {name: 'select', value: this.errorMessage})
          } else {
            this.$emit('error', {name: 'select', value: this.errorMessage})
          }
        }

        // this.$emit('update:modelValue', value)
      },
      deep: true,
    },
    closeDropDown() {
      if (!this.mergedData.openDropdown) {
        this.showDropdown = false
      }
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
    box-shadow: var(--focus-box-shadow);
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

  .input-search {
    width: 100%;
  }

  &--lg {
    .select-container {
      height: 46px;

      &__arrow {
        .bi {
          width: 17px;
          height: 17px;
        }
      }
    }

    ::v-deep(.dropdown--top) {
      bottom: calc(46px + 16px);
    }

    .select-label {
      font-size: 14px;
    }
  }

  &--md {
    .select-container {
      height: 36px;

      &__arrow {
        .bi {
          width: 12px;
          height: 12px;
        }
      }
    }

    ::v-deep(.dropdown--top) {
      bottom: calc(36px + 16px);
    }
  }

  &--sm {
    .select-container {
      height: 26px;

      &__arrow {
        .bi {
          width: 10px;
          height: 10px;
        }
      }
    }

    ::v-deep(.dropdown--top) {
      bottom: calc(26px + 16px);
    }
  }

  .placeholder {
    font-size: var(--placeholder-font-size);
  }

  .selected {
    font-size: var(--value-font-size);
  }

  &-dropdown {
    position: relative;
    z-index: 2;
    margin-top: 8px;
    width: calc(100% + 14%);

    &.search-input {
      width: inherit;
      margin-top: 12px;
    }

    .dropdown-component {
      position: absolute;
      width: 100%;
      z-index: 10;
    }
  }
}
</style>
