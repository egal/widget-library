<template>
  <div
    :class="`tooltip --size-${size || 'md'} --style-${
      componentStyle || 'normal'
    }`"
    :style="getVars"
  >
    <div class="tooltip__icon">
      <BootstrapIcon icon="info-lg" />
    </div>
    <div :class="`tooltip__text --position-${position || 'top'}`">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, toRefs, computed } from "vue";
import { getFont, getFontWeight } from "src/helpers/configNavigation.js";
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";

type Props = {
  position?: "left" | "right" | "top" | "bottom";
  size?: "sm" | "md" | "lg";
  font?: "Inter" | "Open Sans" | "Raleway";
  weight?: "medium" | "regular" | "bold";
  componentStyle?: "light" | "normal";
};

const props = defineProps<Props>();

const { size, font, weight, componentStyle, position } = toRefs(props);

const getVars = computed(() => ({
  "--font": getFont(font?.value),
  "--font-weight": getFontWeight(weight?.value),
}));
</script>

<style lang="scss" scoped>
@import "src/assets/navigation/variables";

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
