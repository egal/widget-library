<template>
  <div
    :class="`tag --size-${mergedData.size || 'md'} --shape-${
      mergedData.shape || 'square'
    } --style-${mergedData.componentStyle || 'normal'} ${mergedData.disabled ? '--disabled' : ''}`"
    :style="getVars"
  >
    <BootstrapIcon
      v-if="mergedData.icon"
      :icon="mergedData.icon"
      class="tag__icon"
      @click="!mergedData.disabled && $emit('on:icon-click')"
    />
    <p class="tag__text">
      <slot></slot>
    </p>
    <BootstrapIcon
      v-if="mergedData.crossIcon"
      icon="x-lg"
      class="tag__close-icon"
      @click="!mergedData.disabled && $emit('on:close')"
    />
  </div>
</template>

<script>
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'

export default {
  name: 'ETag',
  components: { BootstrapIcon },
  data() {
    return {}
  },
  emits: ['on:close', 'on:icon-click'],
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    styleConfig: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    mergedData() {
      return Object.assign(
        {
          componentStyle: 'normal',
          size: 'md',
          shape: 'square',
          crossIcon: true,
          icon: '',
          textStyle: 'normal',
          disabled: false,
        },
        this.data,
      )
    },
    getVars() {
      return {
        '--font': this.styleConfig?.font || 'Open Sans',
        '--font-weight': this.styleConfig?.weight || '500',
      }
    },
  },
}
</script>
<style lang="scss" scoped>
@import 'src/assets/variables';

.tag {
  display: flex;
  width: fit-content;
  background: $gray-200;
  color: $gray-800;
  stroke: $gray-800;
  justify-content: center;
  align-items: center;
  transition: 0.2s ease all;

  &.--shape-circle {
    border-radius: 64px !important;
  }

  &__text {
    display: block;
    padding: 0;
    margin: 0;
    font-family: var(--font);
    font-weight: var(--font-weight);
    cursor: default;
  }

  &__close-icon {
    height: 0.7em;
    margin-bottom: 0;
  }

  &__close-icon:hover,
  .tag__icon:hover {
    cursor: pointer;
  }

  &.--size {
    &-xs {
      height: 12px;
      padding: 6px 12px;
      border-radius: 4px;
      gap: 4px;
      font-size: 10px;
    }
    &-sm {
      height: 16px;
      padding: 8px 14px;
      border-radius: 6px;
      gap: 4px;
      font-size: 12px;
    }
    &-md {
      height: 18px;
      padding: 11px 16px;
      border-radius: 8px;
      gap: 8px;
      font-size: 14px;
    }
    &-lg {
      height: 20px;
      padding: 14px 18px;
      border-radius: 8px;
      gap: 8px;
      font-size: 16px;
    }
  }

  &:hover {
    background-color: $gray-300;
    color: $gray-700;
    stroke: $gray-700;
  }

  &:active {
    background-color: $gray-400;
    color: $gray-800;
    stroke: $gray-800;
  }

  &.--disabled {
    background-color: $gray-200;
    color: $gray-500;
    stroke: $gray-500;
    cursor: default;

    .tag__close-icon:hover,
    .tag__icon:hover {
      cursor: default;
    }
  }

  &.--style-outlined {
    background: $base-white;
    border: 1px solid $gray-400;
    color: $gray-800;
    stroke: $gray-800;

    &:hover {
      background: $base-white;
      border: 1px solid $gray-600;
      color: $gray-800;
      stroke: $gray-800;
    }

    &:active {
      background: $base-white;
      border: 1px solid $gray-800;
      color: $gray-800;
      stroke: $gray-800;
    }

    &.--disabled {
      background: $base-white;
      border: 1px solid $gray-400;
      color: $gray-400;
      stroke: $gray-400;
      cursor: default;
    }
  }
  &.--style-light {
    background: $base-white;
    color: $gray-800;
    stroke: $gray-800;

    &:hover {
      background: $base-white;
      color: $gray-600;
      stroke: $gray-600;
    }

    &:active {
      background: $base-white;
      color: $gray-800;
      stroke: $gray-800;
    }

    &.--disabled {
      background: $base-white;
      color: $gray-400;
      stroke: $gray-400;
      cursor: default;
    }
  }
}
</style>
