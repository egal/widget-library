<template>
  <label
    class="e-checkbox"
    :class="[
      `e-checkbox--${size}`,
      checkboxRight ? 'e-checkbox--right' : 'e-checkbox--left',
    ]"
  >
    <input
      type="checkbox"
      class="e-checkbox__input input"
      :checked="checked"
      :disabled="disabled"
      @change="(ev) => $emit('change', ev.target.checked)"
    />
    <span
      class="e-checkbox__text text"
      :class="{ 'e-checkbox__text--empty': hasSlotData }"
      :style="mergedCustomStyles"
    >
      <slot></slot>
    </span>
  </label>
</template>
<script>
import togglersComputedMixin from "src/helpers/togglersComputedMixin";

export default {
  name: "ECheckbox",
  mixins: [togglersComputedMixin],
  props: {
    checked: {
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
    checkboxRight: {
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
@import "src/assets/togglers/variables";
@import "src/assets/togglers/checkboxMixin";

.e-checkbox {
  &--left {
    @include checkbox($pseudo-element: "before");
  }
  &--right {
    @include checkbox($pseudo-element: "after");
  }

  &--sm {
    .e-checkbox__text {
      font-size: 10px;
      font-style: $p8-font-style;
    }
  }
  &--lg {
    .e-checkbox__text {
      font-size: $p5-font-size;
      font-style: $p5-font-style;
    }
  }
}
</style>
