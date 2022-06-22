<template>
  <label
    class="e-radio"
    :class="[
      `e-radio--${mergedData.size}`,
      mergedData.radioRight ? 'e-radio--right' : 'e-radio--left',
    ]"
  >
    <input
      type="radio"
      class="e-radio__input input"
      :name="mergedData.name"
      :checked="mergedData.checked"
      :value="mergedData.value"
      :disabled="mergedData.disabled"
      @change="(ev) => $emit('change', ev.target.value)"
    />
    <span
      class="e-radio__text text"
      :class="{ 'e-radio__text--empty': hasSlotData }"
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
  name: 'ERadio',
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
          name: '',
          value: '',
          radioRight: false,
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
          this.styleConfig.labelStyle.disabled,
        )
      } else if (styleProperties.includes('checked') && this.isChecked) {
        return Object.assign(
          {},
          styles,
          this.inputStyleVariables,
          this.styleConfig.labelStyle.checked,
        )
      } else if (styleProperties.includes('active') && this.isActive) {
        return Object.assign(
          {},
          styles,
          this.inputStyleVariables,
          this.styleConfig.labelStyle.active,
        )
      } else if (styleProperties.includes('hover') && this.isHover) {
        return Object.assign(
          {},
          styles,
          this.inputStyleVariables,
          this.styleConfig.labelStyle.hover,
        )
      } else {
        return Object.assign({}, this.styleConfig.labelStyle, this.inputStyleVariables)
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
        '--input-dot-color': this.styleConfig.dotColor || null,
        '--input-border-color-hover': this.styleConfig.hover?.borderColor || null,
        '--input-background-color-hover': this.styleConfig.hover?.backgroundColor || null,
        '--input-dot-color-hover': this.styleConfig.hover?.dotColor || null,
        '--input-border-color-active': this.styleConfig.active?.borderColor || null,
        '--input-background-color-active': this.styleConfig.active?.backgroundColor || null,
        '--input-dot-color-active': this.styleConfig.active?.dotColor || null,
        '--input-border-color-checked': this.styleConfig.checked?.borderColor || null,
        '--input-background-color-checked': this.styleConfig.checked?.backgroundColor || null,
        '--input-dot-color-checked': this.styleConfig.checked?.dotColor || null,
        '--input-border-color-disabled': this.styleConfig.disabled?.borderColor || null,
        '--input-background-color-disabled': this.styleConfig.disabled?.backgroundColor || null,
        '--input-dot-color-disabled': this.styleConfig.disabled?.dotColor || null,
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import 'src/assets/variables';
@import 'src/assets/togglers/radioMixin';

.e-radio {
  &--left {
    @include radio($pseudo-element: 'before');
  }

  &--right {
    @include radio($pseudo-element: 'after');
  }

  &--sm {
    .e-radio__text {
      font-size: 10px;
      font-style: $p8-font-style;
    }
  }
  &--lg {
    .e-radio__text {
      font-size: $p5-font-size;
      font-style: $p5-font-style;
    }
  }
}
</style>
