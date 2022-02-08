<template>
  <label
    class="e-radio"
    :class="[
      `e-radio--${size}`,
      radioRight ? 'e-radio--right' : 'e-radio--left',
    ]"
  >
    <input
      type="radio"
      class="e-radio__input input"
      :name="name"
      :checked="checked"
      :value="value"
      :disabled="disabled"
      @change="(ev) => $emit('change', ev.target.value)"
    />
    <span
      class="e-radio__text text"
      :class="{ 'e-radio__text--empty': hasSlotData }"
      :style="mergedCustomStyles"
    >
      <slot></slot>
    </span>
  </label>
</template>

<script>
import togglersComputedMixin from "@/helpers/togglersComputedMixin";

export default {
  name: "ERadio",
  mixins: [togglersComputedMixin],
  props: {
    name: {
      type: String,
    },
    checked: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: String,
    },
    size: {
      type: String,
      default: "md",
    },
    radioRight: {
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
@import "../assets/style/radioMixin";

.e-radio {
  &--left {
    @include radio($pseudo-element: "before");
  }
  &--right {
    @include radio($pseudo-element: "after");
  }

  &--sm {
    .e-radio__text {
      font-size: 10px;
      font-style: $p8-font-style;
    }
  }
  &--lg {
    .e-radio__text {
      font-size: $p5-font-size;
      font-style: $p5-font-style;
    }
  }
}
</style>
