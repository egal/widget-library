<template>
  <button
    class="egal-button"
    :class="[
      `egal-button--${size}`,
      { 'egal-button--soft': softColors },
      { 'egal-button--rounded': rounded },
    ]"
    :style="customStyle"
    :disabled="disabled"
    @mouseover="isHover = true"
    @mouseout=";(isHover = false), (isActive = false)"
    @mousedown="isActive = true"
    @mouseup="isActive = false"
  >
    <BootstrapIcon
      class="egal-button__icon egal-button__icon--left"
      :icon="leftIcon"
      v-if="leftIcon"
    ></BootstrapIcon>
    <slot></slot>
    <BootstrapIcon
      class="egal-button__icon egal-button__icon--right"
      :icon="rightIcon"
      v-if="rightIcon"
    ></BootstrapIcon>
  </button>
</template>

<script>
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'

export default {
  name: 'EButton',
  components: {
    BootstrapIcon,
  },
  props: {
    disabled: {
      type: Boolean,
      default: false,
    },
    rounded: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: 'md',
    },
    softColors: {
      type: Boolean,
      default: false,
    },
    leftIcon: {
      type: String,
    },
    rightIcon: {
      type: String,
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
      isDisabled: this.disabled,
    }
  },
  computed: {
    /**
     * Возвращает стили состояний из объекта styleConfig в зависимости от флагов disabled, isActive, isHover
     * @returns {object}
     */
    customStyle() {
      const styleProperties = Object.keys(this.styleConfig)

      if (styleProperties.includes('disabled') && this.isDisabled) {
        return this.styleConfig.disabled
      } else if (styleProperties.includes('active') && this.isActive) {
        return this.styleConfig.active
      } else if (styleProperties.includes('hover') && this.isHover) {
        return this.styleConfig.hover
      } else {
        // Возвращает объект стилей без свойств hover, active, disabled
        return Object.fromEntries(
          Object.entries(this.styleConfig).filter(
            (prop) => prop[0] !== 'hover' || prop[0] !== 'active' || prop[0] !== 'disabled',
          ),
        )
      }
    },
  },
}
</script>

<style scoped lang="scss">
@import 'src/assets/variables';
@import 'src/assets/togglers/buttonMixin';

.egal-button {
  @include button();

  &--sm {
    @include button($font-size: 10px, $padding: 8px 16px, $radius: $all-sides-small);
  }
  &--lg {
    @include button($font-size: $h6-font-size, $padding: 16px 24px, $radius: $all-sides-large);
  }

  &--soft {
    @include button-soft();
  }

  &--rounded {
    border-radius: $all-sides-pill;
  }
}
</style>
