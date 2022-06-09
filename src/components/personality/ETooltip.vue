<template>
  <div
    :class="`${mergedData.displayIcon ? 'tooltip' : 'tooltip-component'} --size-${
      mergedData.size || 'md'
    } --style-${mergedData.componentStyle || 'normal'}`"
    :style="getVars"
  >
    <div class="tooltip__icon" v-if="mergedData.displayIcon">
      <BootstrapIcon icon="info-lg" />
    </div>
    <div class="tooltip__component" v-else>
      <slot name="element"></slot>
    </div>
    <div
      v-if="hasSlotTooltipText"
      :class="`tooltip__text --position-${mergedData.position || 'top'} --size-${mergedData.size || 'md'}`"
    >
      <slot></slot>
    </div>
  </div>
</template>
<script>
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'

export default {
  name: 'ETooltip',
  components: { BootstrapIcon },
  data() {
    return {}
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    mergedData() {
      return Object.assign(
        {
          font: 'Open Sans',
          weight: 'bold',
          position: 'bottom',
          componentStyle: 'normal',
          size: 'md',
          displayIcon: true,
        },
        this.data,
      )
    },
    getVars() {
      return {
        '--font': this.mergedData.font || 'Inter',
        '--font-weight': this.mergedData.weight || 'bold',
      }
    },

    /**
     * Check if text for tooltip is passed to default slot
     * @return {boolean}
     */
    hasSlotTooltipText() {
      return !!this.$slots?.default
    },
  },
}
</script>
<style lang="scss" scoped>
@import 'src/assets/variables';

.tooltip {
  position: absolute;
  display: inline-block;
  background-color: $gray-500;
  border-radius: 50%;
  margin-left: 300px;
  z-index: 1;
  width: 100%;
  height: 100%;

  &__icon {
    color: $base-white;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  &.--size {
    &-xs {
      width: 12px;
      height: 12px;
      font-size: 10px;
    }
    &-sm {
      width: 14px;
      height: 14px;
      font-size: $p6-font-size;
    }
    &-md {
      width: 16px;
      height: 16px;
      font-size: $p4-font-size;
    }
    &-lg {
      width: 20px;
      height: 20px;
      font-size: $p3-font-size;
    }
  }
}

.tooltip-component {
  position: relative;
  display: inline-block;
  z-index: 1;

  &.--size {
    &-xs {
      font-size: 10px;
    }
    &-sm {
      font-size: $p6-font-size;
    }
    &-md {
      font-size: $p4-font-size;
    }
    &-lg {
      font-size: $p3-font-size;
    }
  }
}

.tooltip,
.tooltip-component {
  &__text {
    position: absolute;
    width: fit-content;
    display: block;
    opacity: 0;
    color: white;
    font-family: var(--font);
    font-weight: var(--font-weight);
    background-color: $gray-800;
    white-space: nowrap;
    border-radius: $all-sides-small;
    transition: opacity 0.2s, transform 0.2s;
    z-index: -1;

    &.--size {
      &-xs {
        font-size: 10px;
        padding: 5px 12px;
      }
      &-sm {
        font-size: 12px;
        padding: 8px 14px;
      }
      &-md {
        font-size: 14px;
        padding: 10px 16px;
      }
      &-lg {
        font-size: 16px;
        padding: 13px 18px;
      }
    }

    &.--position-top {
      bottom: calc(100% + 20px);
      right: 50%;
      transform: translate(50%, 15px);
    }

    &.--position-bottom {
      top: calc(100% + 20px);
      right: 50%;
      transform: translate(50%, -15px);
    }

    &.--position-left {
      right: calc(100% + 20px);
      top: 50%;
      transform: translate(40px, -50%);
    }

    &.--position-right {
      left: calc(100% + 20px);
      top: 50%;
      transform: translate(-40px, -50%);
    }
  }

  &__icon:hover + &__text,
  &__component:hover + &__text {
    opacity: 1;
    z-index: 5;

    &.--position-top {
      transform: translate(50%, 0);
    }

    &.--position-bottom {
      transform: translate(50%, 0);
    }

    &.--position-left {
      transform: translate(0, -50%);
    }

    &.--position-right {
      transform: translate(0, -50%);
    }
  }
}

.bi {
  margin: 0;
}
</style>
