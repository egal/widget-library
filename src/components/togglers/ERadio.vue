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
      :name="name"
      :checked="mergedData.checked"
      :value="mergedData.value"
      :disabled="mergedData.disabled"
      @change="(ev) => $emit('change', ev.target.value)"
    />
    <span
      class="e-radio__text text"
      :class="{ 'e-radio__text--empty': hasSlotData }"
      :style="mergedCustomStyles"
    >
      <slot></slot>
    </span>
  </label>
</template>

<script>
export default {
  name: 'ERadio',
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
  computed: {
    mergedData() {
      return Object.assign(
        {
          checked: false,
          disabled: false,
          size: 'md',
          labelStyle: {},
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

    /**
     * Объединяет объект стилей для лэйбла с объектом CSS переменныx
     * для чекбокса и возвращет полученный результат
     * @returns {object}
     */
    mergedCustomStyles() {
      return Object.assign({}, this.mergedData.labelStyle, this.inputStyleVariables)
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
