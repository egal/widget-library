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
        <div class="selected" v-if="mergedData.multiple" v-for="option in selectModel">
          <span>{{ option[mergedData.shownKey] }}</span>
          <b-icon icon="x-lg" @click.stop="deleteOption(option)" />
        </div>
        <div class="selected" v-else-if="!!selectModel.name">{{ selectModel.name }}</div>
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

    <!--    v-else-if="mergedData.searchableInput && selectModel.length && mergedData.multiple" -->
    <!--    :class="{ 'no-items': mergedData.multiple && selectModel.length == 0 }" -->
    <!--      class="con-chips" -->
    <div
      v-else-if="mergedData.searchableInput && selectModel.length && mergedData.multiple"
      :style="getStyleVars"
    >
      <!--      todo    iconLeft: 'search', -->
      <!--      :class="{ 'con-chips--input': mergedData.searchableInput && mergedData.multiple }" -->
      <!--      modelValue: chipInputValue,-->
      <EInput
        class="input-search"
        @click="showDropdown = !showDropdown"
        @keydown.enter="
          (v) => {
            if (mergedData.searchableInput && mergedData.multiple) {
              selectOption(v.target.value)
            }
          }
        "
        @delete-option="(option) => deleteOption(option)"
        v-click-outside="close"
        @update:modelValue="filterOptions"
        :chips="true"
        :chipsModel="selectModel"
        :data="{
          clearable: mergedData.clearable,
          placeholder: mergedData.searchPlaceholder,
          showFilled: false,
          type: 'search',
          iconLeft: mergedData.iconLeft,
          size: mergedData.size,
          modelValue: chipInputValue,
        }"
        :style-config="{
          backgroundColor: '#F7FAFC',
          borderColor: '#E2E8F0',
          iconColor: '#CBD5E0',
          placeholderColor: '#CBD5E0',
          ...inputSearchStyleConfig,
        }"
      />
    </div>

    <EInput
      class="input-search"
      v-else-if="mergedData.searchableInput && !mergedData.multiple"
      @click="showDropdown = !showDropdown"
      v-click-outside="close"
      @update:modelValue="filterOptions"
      :data="{
        clearable: mergedData.clearable,
        placeholder: mergedData.searchPlaceholder,
        showFilled: false,
        type: 'search',
        iconLeft: 'search',
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
      :class="{ 'search-input': mergedData.searchableInput, grouped: mergedData.grouped }"
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
    dropdownStyleConfig: {
      type: Object,
      default: () => {},
    },
    inputSearchStyleConfig: {
      type: Object,
      default: () => {},
    },
  },
  emits: ['update:modelValue', 'error', 'show-more'],
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
          increaseHeight: false, // todo added + name, Запрет увеличения высоты извне. По дефолту если multi = true, увеличивает высоту, иначе - нет
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
        '--placeholder-color': this.styleConfig?.placeholderColor || '#cbd5e0',
        '--placeholder-font-size':
          this.styleConfig?.placeholderFontSize || this.computeDefaultFontSize,
        '--background-color': this.styleConfig?.backgroundColor || '#ffffff',
        '--label-color': this.styleConfig?.labelColor || '#a0aec0',
        '--label-font-weight': this.styleConfig?.labelFontWeight || 500,
        '--label-font-size': this.styleConfig?.labelFontSize || '12px',
        '--helper-text-color': this.styleConfig?.helperTextColor || '#a0aec0',
        '--helper-text-font-weight': this.styleConfig?.helperTextFontWeight || 400,
        '--border-color': this.styleConfig?.borderColor || '#edf2f7',
        '--border-radius': this.styleConfig?.borderRadius || '6px',
        '--focus-border-color': this.styleConfig?.focusBorderColor || '#0066ff',
        '--filled-background-color': this.styleConfig?.filledBackgroundColor || '#0066ff1a',
        '--filled-font-color': this.styleConfig?.filledFontColor || '#0066ff',
        '--error-color': this.styleConfig?.errorColor || '#f16063',
        '--arrow-color': this.styleConfig?.arrowColor || '#cbd5e0',
        '--cross-color': this.styleConfig?.crossColor || '#a0aec0',
        '--focus-box-shadow':
          this.styleConfig?.focusBoxShadow || '0px 0px 0px 2px rgba(76, 111, 255, 0.3)',
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
            this.nonlocalOptions.length < this.mergedData.nonLocalOptionsTotalCount
        : false
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
      console.log(option)
      if (this.mergedData.multiple) {
        if (this.deleteOption(option)) {
          return
        }
        if (this.mergedData.searchableInput && this.mergedData.multiple) {
          let obj = {}
          obj[this.mergedData.shownKey] = option
          this.selectModel.push(obj)
          this.chipInputValue = ''
        }
        this.selectModel.push(option)
        this.$emit('update:modelValue', this.selectModel)
        return
      }
      this.selectModel = option
      this.$emit('update:modelValue', this.selectModel)
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
      // console.log(value)
      // todo
      this.chipInputValue = value
      this.showDropdown = true
      if (!value) {
        this.filteredOptions = this.mergedData.options
        this.selectModel = []
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

        // this.$emit('update:modelValue', value)
      },
      deep: true,
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
    }
  }
}

//// ---------------------
//.con-chips {
//  width: 100%;
//  position: relative;
//  display: -webkit-box;
//  display: -ms-flexbox;
//  display: flex;
//  -webkit-box-align: center;
//  -ms-flex-align: center;
//  align-items: center;
//  -webkit-box-pack: end;
//  -ms-flex-pack: end;
//  justify-content: flex-end;
//  -ms-flex-wrap: wrap;
//  flex-wrap: wrap;
//
//  border-radius: 5px;
//  overflow: hidden;
//  //padding: 5px;
//  background-color: var(--search-background-color);
//  padding: 7px 9px;
//
//  .con-chips--input {
//    display: inline-block;
//    -webkit-box-flex: 1;
//    -ms-flex: 1;
//    flex: 1;
//    color: inherit;
//    //padding: 9px;
//    -webkit-box-sizing: border-box;
//    box-sizing: border-box;
//    min-width: 100px; // todo ?
//    border: 0;
//    margin-left: 2px;
//
//    ::v-deep(.input-container > input) {
//      //display: inline-block;
//      //-webkit-box-flex: 1;
//      //-ms-flex: 1;
//      //flex: 1;
//      //
//      ////padding: 9px;
//      //-webkit-box-sizing: border-box;
//      //box-sizing: border-box;
//      //min-width: 80px;
//      border: 0;
//      //margin-left: 2px;
//    }
//
//    // todo
//    ::v-deep(.input-container) {
//      margin-right: -9px;
//
//      //outline: none;
//      //  .con-chips {
//      //    outline: 2px solid red;
//      //  }
//    }
//  }
//
//  &.no-items {
//    .con-chips--input {
//      padding-left: 10px;
//    }
//  }
//}
//
//// todo вынести чипсы в инпут ,?
//// todo other sizes
//::v-deep(.input--lg) {
//  input {
//    height: 32px;
//  }
//  .subtract-button {
//    bottom: 9px;
//  }
//}
//
//.con-vs-chip {
//  border-radius: 20px;
//  display: -webkit-box;
//  display: -ms-flexbox;
//  display: flex;
//  -webkit-box-align: center;
//  -ms-flex-align: center;
//  align-items: center;
//  font-size: 0.7rem;
//  -webkit-box-pack: center;
//  -ms-flex-pack: center;
//  justify-content: center;
//  min-height: 28px;
//  color: rgba(0, 0, 0, 0.7);
//  position: relative;
//  margin-right: 2px;
//  float: left;
//  margin-top: 0;
//  margin-bottom: 0;
//  padding: 2px;
//  color: rgba(0, 0, 0, 0.7);
//
//  &.closable {
//    padding-right: 0;
//  }
//
//  .vs-chip--text {
//    display: -webkit-box;
//    display: -ms-flexbox;
//    display: flex;
//    -webkit-box-align: center;
//    -ms-flex-align: center;
//    align-items: center;
//    -webkit-box-pack: center;
//    -ms-flex-pack: center;
//    justify-content: center;
//    margin-left: 10px;
//
//    font-size: 16px;
//    // todo
//    //font-size: var(--value-font-size);
//
//    // todo
//    font-weight: inherit;
//    font-family: inherit;
//
//    &.selected {
//      display: flex;
//      align-items: center;
//      margin-right: 10px;
//      span {
//        margin-right: 8px;
//        white-space: nowrap;
//      }
//      .bi {
//        width: 8px;
//        height: 8px;
//        cursor: pointer;
//        margin-bottom: 0;
//        color: var(--cross-color);
//      }
//    }
//  }
//
//  .vs-chip--close {
//    width: 20px;
//    height: 20px;
//    display: -webkit-box;
//    display: -ms-flexbox;
//    display: flex;
//    -webkit-box-align: center;
//    -ms-flex-align: center;
//    align-items: center;
//    -webkit-box-pack: center;
//    -ms-flex-pack: center;
//    justify-content: center;
//    border-radius: 50%;
//    border: 0;
//    margin: 0 4px;
//    cursor: pointer;
//    background: rgba(0, 0, 0, 0.15);
//    color: #fff;
//    -webkit-transition: all 0.3s ease;
//    transition: all 0.3s ease;
//  }
//}
</style>
