<template>
  <div
    :class="`tooltip --size-${mergedData.size || 'md'} --style-${
      mergedData.componentStyle || 'normal'
    }`"
    :style="getVars"
  >
    <div class="tooltip__icon">
      <BootstrapIcon icon="info-lg" />
    </div>
    <div :class="`tooltip__text --position-${mergedData.position || 'top'}`">
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
        },
        this.data,
      )
    },
    getVars() {
      return {
        '--font': this.mergedData.font,
        '--font-weight': this.mergedData.weight,
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import 'src/assets/variables';

.tooltip {
  position: relative;
  display: inline-block;
  background-color: $gray-800;
  border-radius: 50%;
  margin-left: 300px;

  &__icon {
    color: $base-white;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
  }

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
    padding: 8px 12px;
    border-radius: $all-sides-small;
    transition: opacity 0.2s, transform 0.2s;
    z-index: -1;

    &.--position-top {
      bottom: calc(100% + 20px);
      right: 50%;
      transform: translate(50%, 40px);
    }

    &.--position-bottom {
      top: calc(100% + 20px);
      right: 50%;
      transform: translate(50%, -40px);
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

  &__icon:hover + &__text {
    opacity: 1;

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

  &.--size {
    &-sm {
      width: 16px;
      height: 16px;
      font-size: $p6-font-size;
    }
    &-md {
      width: 20px;
      height: 20px;
      font-size: $p4-font-size;
    }
    &-xl {
      width: 24px;
      height: 24px;
      font-size: $p3-font-size;
    }
  }
}
</style>
