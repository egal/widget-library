<template>
  <label
    class="e-checkbox"
    :class="[
      `e-checkbox--${mergedData.size}`,
      mergedData.checkboxRight ? 'e-checkbox--right' : 'e-checkbox--left',
    ]"
  >
    <input
      type="checkbox"
      :indeterminate.prop="isIndeterminate"
      class="e-checkbox__input input"
      :checked="mergedData.checked"
      :disabled="mergedData.disabled"
      @change="onChange"
    />

    <span
      class="e-checkbox__text text"
      :class="{ 'e-checkbox__text--empty': hasSlotData }"
      :style="mergedCustomStyles"
      @mouseover="isHover = true"
      @mouseout=";(isHover = false), (isActive = false)"
      @mousedown="isActive = true"
      @mouseup="isActive = false"
    >
      <slot></slot>
    </span>
  </label>
</template>
<script>
export default {
  name: 'ECheckbox',
  emits: ['change'],
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    styleConfig: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      isHover: false,
      isActive: false,
    }
  },
  computed: {
    mergedData() {
      return Object.assign(
        {
          checked: false,
          disabled: false,
          size: 'md',
          checkboxRight: false,
          indeterminate: false,
        },
        this.data,
      )
    },
    /**
     * Проверяет наличие данных в дефолтном слоте.
     * Необходимо, чтобы добавить класс "e-checkbox__text--empty", который убирает
     * margin у чекбокса, если он используется без лэйбла
     * @returns {boolean}
     */
    hasSlotData() {
      return !this.$slots?.default
    },

    isDisabled() {
      return this.mergedData.disabled
    },

    isChecked() {
      return this.mergedData.checked
    },

    isIndeterminate() {
      return this.mergedData.indeterminate
    },

    /**
     * Объединяет объект стилей для лэйбла с объектом CSS переменныx
     * для чекбокса и возвращет полученный результат
     * @returns {object}
     */
    mergedCustomStyles() {
      if (!this.styleConfig?.labelStyle) {
        return Object.assign({}, this.inputStyleVariables)
      }

      const styleProperties = Object.keys(this.styleConfig.labelStyle)

      // Возвращает объект стилей для лейбла без свойств hover, checked, disabled
      const styles = Object.fromEntries(
        Object.entries(this.styleConfig.labelStyle).filter(
          (prop) =>
            prop[0] !== 'hover' &&
            prop[0] !== 'checked' &&
            prop[0] !== 'active' &&
            prop[0] !== 'disabled',
        ),
      )

      // Возвращает объекты стилей для состояний disabled, checked или hover
      if (styleProperties.includes('disabled') && this.isDisabled) {
        return Object.assign(
          {},
          styles,
          this.inputStyleVariables,
          this.styleConfig?.labelStyle?.disabled,
        )
      } else if (styleProperties.includes('checked') && this.isChecked) {
        return Object.assign(
          {},
          styles,
          this.inputStyleVariables,
          this.styleConfig?.labelStyle?.checked,
        )
      } else if (styleProperties.includes('active') && this.isActive) {
        return Object.assign(
          {},
          styles,
          this.inputStyleVariables,
          this.styleConfig?.labelStyle?.active,
        )
      } else if (styleProperties.includes('hover') && this.isHover) {
        return Object.assign(
          {},
          styles,
          this.inputStyleVariables,
          this.styleConfig?.labelStyle?.hover,
        )
      } else {
        return Object.assign({}, this.styleConfig?.labelStyle, this.inputStyleVariables)
      }
    },

    /**
     * Возвращает объект с набором CSS переменных для кастомизации чекбокса
     * @returns {object}
     */
    inputStyleVariables() {
      return {
        '--input-border-color': this.styleConfig.borderColor || null,
        '--input-background-color': this.styleConfig.backgroundColor || null,
        '--input-border-color-hover': this.styleConfig.hover?.borderColor || null,
        '--input-background-color-hover': this.styleConfig.hover?.backgroundColor || null,
        '--input-border-color-active': this.styleConfig.active?.borderColor || null,
        '--input-background-color-active': this.styleConfig.active?.backgroundColor || null,
        '--input-border-color-checked': this.styleConfig.checked?.borderColor || null,
        '--input-background-color-checked': this.styleConfig.checked?.backgroundColor || null,
        '--input-border-color-disabled': this.styleConfig.disabled?.borderColor || null,
        '--input-background-color-disabled': this.styleConfig.disabled?.backgroundColor || null,
      }
    },
  },
  methods: {
    onChange(ev) {
      ev.target.indeterminate = this.isIndeterminate
      this.$emit('change', ev.target.checked)
    },
  },
}
</script>

<style scoped lang="scss">
@import 'src/assets/variables';
@import 'src/assets/togglers/checkboxMixin';

.e-checkbox {
  &--left {
    @include checkbox($pseudo-element: 'before');
  }
  &--right {
    @include checkbox($pseudo-element: 'after');
  }

  &--sm {
    .e-checkbox__text {
      font-size: 10px;
      font-style: $p8-font-style;

      &::before,
      &::after {
        mask-size: 90% !important;
        -webkit-mask-size: 90% !important;
      }
    }
  }
  &--lg {
    .e-checkbox__text {
      font-size: $p5-font-size;
      font-style: $p5-font-style;
    }
  }
}
</style>

