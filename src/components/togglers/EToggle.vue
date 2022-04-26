<template>
  <label
    class="e-toggle"
    :class="[
      `e-toggle--${mergedData.size}`,
      mergedData.toggleRight ? 'e-toggle--right' : 'e-toggle--left',
    ]"
  >
    <input
      type="checkbox"
      class="e-toggle__input input"
      :checked="mergedData.active"
      :disabled="mergedData.disabled"
      @change="(ev) => $emit('change', ev.target.checked)"
    />
    <span
      class="e-toggle__text text"
      :class="{ 'e-toggle__text--empty': hasSlotData }"
      :style="mergedCustomStyles"
    >
      <slot></slot>
    </span>
  </label>
</template>

<script>
export default {
  name: 'EToggle',
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
          active: false,
          disabled: false,
          size: 'md',
          toggleRight: false,
          labelStyle: {},
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
      return Object.assign(
        {},
        this.mergedData.labelStyle,
        this.inputStyleVariables,
      )
    },

    /**
     * Возвращает объект с набором CSS переменных для кастомизации чекбокса
     * @returns {object}
     */
    inputStyleVariables() {
      return {
        '--input-border-color': this.styleConfig.borderColor || null,
        '--input-background-color': this.styleConfig.backgroundColor || null,
        '--input-border-color-hover':
          this.styleConfig.hover?.borderColor || null,
        '--input-background-color-hover':
          this.styleConfig.hover?.backgroundColor || null,
        '--input-border-color-active':
          this.styleConfig.active?.borderColor || null,
        '--input-background-color-active':
          this.styleConfig.active?.backgroundColor || null,
        '--input-border-color-checked':
          this.styleConfig.checked?.borderColor || null,
        '--input-background-color-checked':
          this.styleConfig.checked?.backgroundColor || null,
        '--input-border-color-disabled':
          this.styleConfig.disabled?.borderColor || null,
        '--input-background-color-disabled':
          this.styleConfig.disabled?.backgroundColor || null,
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import 'src/assets/variables';
@import 'src/assets/togglers/toggleMixin';

.e-toggle {
  &--left {
    @include toggle($pseudo-element: 'before');
  }
  &--right {
    @include toggle($pseudo-element: 'left');
  }

  &--sm {
    .e-toggle__text {
      font-size: 10px;
      font-style: $p8-font-style;
    }
  }
  &--lg {
    .e-toggle__text {
      font-size: $p5-font-size;
      font-style: $p5-font-style;
    }
  }
}
</style>
