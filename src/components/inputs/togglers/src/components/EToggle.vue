<template>
  <label
    class="e-toggle"
    :class="[
      `e-toggle--${size}`,
      toggleRight ? 'e-toggle--right' : 'e-toggle--left',
    ]"
  >
    <input
      type="checkbox"
      class="e-toggle__input input"
      :checked="active"
      :disabled="disabled"
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
import togglersComputedMixin from "@/helpers/togglersComputedMixin";

export default {
  name: "EToggle",
  mixins: [togglersComputedMixin],
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "md",
    },
    toggleRight: {
      type: Boolean,
      default: false,
    },
    labelStyle: {
      type: Object,
      default: () => {
        return {};
      },
    },
    inputStyle: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
};
</script>

<style scoped lang="scss">
@import "../assets/style/variables";
@import "../assets/style/toggleMixin";

.e-toggle {
  &--left {
    @include toggle($pseudo-element: "before");
  }
  &--right {
    @include toggle($pseudo-element: "left");
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
