<template>
  <button
    class="egal-button"
    :class="[
      `egal-button--${mergedData.size}`,
      { 'egal-button--soft': mergedData.softColors },
      { 'egal-button--outline': mergedData.outlined },
      { 'egal-button--clear': mergedData.light },
      { 'egal-button--rounded': mergedData.rounded },
      { 'egal-button--empty': isNoText },
    ]"
    :style="customStyle"
    :disabled="mergedData.disabled"
    @mouseover="isHover = true"
    @mouseout=";(isHover = false), (isActive = false)"
    @mousedown="isActive = true"
    @mouseup="isActive = false"
  >
    <BootstrapIcon
      class="egal-button__icon egal-button__icon--left"
      :icon="mergedData.leftIcon"
      v-if="mergedData.leftIcon"
    ></BootstrapIcon>
    <slot></slot>
    <BootstrapIcon
      class="egal-button__icon egal-button__icon--right"
      :icon="mergedData.rightIcon"
      v-if="mergedData.rightIcon"
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
  mounted() {},
  computed: {
    isDisabled() {
      return this.mergedData.disabled
    },
    isNoText() {
      return this.$slots.default === undefined
    },
    mergedData() {
      return Object.assign(
        {
          disabled: false,
          rounded: false,
          size: 'md',
          softColors: false,
          outlined: false,
          light: false,
          leftIcon: '',
          rightIcon: '',
        },
        this.data,
      )
    },
    /**
     * Возвращает стили состояний из объекта styleConfig в зависимости от флагов disabled, isActive, isHover
     * @returns {object}
     */
    customStyle() {
      const styleProperties = Object.keys(this.styleConfig)

      // Возвращает объект стилей без свойств hover, active, disabled
      const styles = Object.fromEntries(
        Object.entries(this.styleConfig).filter(
          (prop) => prop[0] !== 'hover' && prop[0] !== 'active' && prop[0] !== 'disabled',
        ),
      )

      if (styleProperties.includes('disabled') && this.isDisabled) {
        return Object.assign({}, styles, this.styleConfig.disabled)
      } else if (styleProperties.includes('active') && this.isActive) {
        return Object.assign({}, styles, this.styleConfig.active)
      } else if (styleProperties.includes('hover') && this.isHover) {
        return Object.assign({}, styles, this.styleConfig.hover)
      } else {
        return styles
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

  &--xs {
    @include button($font-size: 10px, $padding: 6px 12px, $radius: $all-sides-small);

    .egal-button--rounded {
      padding: 7px 8px;
    }
  }

  &--sm {
    @include button($font-size: 12px, $padding: 9px 14px, $radius: 6px);

    line-height: 120%;
    .egal-button--rounded {
      padding: 10px 11px;
    }
  }

  &--md {
    @include button($font-size: $h6-font-size, $padding: 10px 16px, $radius: $all-sides-large);
    line-height: 150%;
    .egal-button--rounded {
      padding: 14px 15px;
    }
  }
  &--lg {
    line-height: 19px;
    @include button($font-size: $h5-font-size, $padding: 14px 18px, $radius: $all-sides-large);
    .egal-button--rounded {
      padding: 16px 17px;
    }
  }

  &--soft {
    @include button-soft();
  }

  &--outline {
    @include button-outline();
  }

  &--clear {
    @include button-clear();
  }

  &--rounded {
    border-radius: 64px;
    //border-radius: $all-sides-pill;
  }

  &--empty {
    .egal-button__icon {
      margin: 0;
    }

    &.egal-button--xs {
      padding: 7px;
    }

    &.egal-button--sm {
      padding: 10px;
    }

    &.egal-button--md {
      padding: 13px;
    }

    &.egal-button--lg {
      padding: 16px;
    }
  }

  :deep(.bi) {
    margin-bottom: 0;
  }
}
</style>
