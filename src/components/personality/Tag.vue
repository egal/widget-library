<template>
  <div
    :class="`tag --size-${size || 'md'} --shape-${shape || 'square'} --style-${
      componentStyle || 'normal'
    } --text-style-${textStyle || 'normal'}`"
    :style="getVars"
  >
    <BootstrapIcon v-if="icon" icon="star" class="tag__icon" />
    <p class="tag__text">
      <slot></slot>
    </p>
    <BootstrapIcon v-if="crossIcon" icon="x-lg" class="tag__close-icon" />
  </div>
</template>

<script lang="ts" setup>
import { defineProps, toRefs, computed } from "vue";
//@ts-ignore
import { getFont, getFontWeight } from "@/helpers/config";
//@ts-ignore
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";

type Props = {
  size?: "sm" | "md" | "lg";
  shape?: "square" | "circle";
  font?: "Inter" | "Open Sans" | "Raleway";
  weight?: "medium" | "regular" | "bold";
  icon?: string;
  crossIcon?: boolean;
  componentStyle?: "light" | "normal";
  textStyle?: "light" | "normal";
};

const props = defineProps<Props>();

const { size, shape, font, weight, icon, crossIcon, componentStyle } =
  toRefs(props);

const getVars = computed(() => ({
  "--font": getFont(font?.value),
  "--font-weight": getFontWeight(weight?.value),
}));
</script>

<style lang="scss" scoped>
@import "variables";

.tag {
  display: flex;
  width: fit-content;
  background: $gray-200;
  color: $gray-700;
  justify-content: center;
  align-items: center;

  &.--shape-circle {
    border-radius: 100px !important;
  }

  &.--style-light {
    background: $base-white;
    border: 1px solid $gray-200;
  }

  &.--text-style-light {
    color: $gray-500;
  }

  &__text {
    display: block;
    padding: 0;
    margin: 0;
    font-family: var(--font);
    font-weight: var(--font-weight);
  }

  &.--size {
    &-sm {
      height: 18px;
      padding: 0 8px;
      border-radius: 4px;
      gap: 4px;
    }
    &-md {
      height: 34px;
      padding: 0 14px;
      border-radius: 6px;
      gap: 8px;
    }
    &-lg {
      height: 37px;
      padding: 0 14px;
      border-radius: 6px;
      gap: 8px;
    }
  }
}
</style>
