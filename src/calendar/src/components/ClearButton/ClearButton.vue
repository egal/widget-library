<template>
  <div
    class="mask-icon-container"
    :class="`mask-icon-container--${size}`"
    :style="getStyleVars"
  >
    <button
      :class="[
        'mask-icon-subtract',
        { error: error, success: success, filled: filled },
      ]"
      :disabled="disabled"
      @click.stop="$emit('delete')"
    />
  </div>
</template>

<script>
import variables from "../../assets/scss/variables.scss";

export default {
  name: "ClearButton",
  components: {},
  props: {
    error: {
      type: Boolean,
      default: false,
    },
    success: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    filled: {
      type: Boolean,
      default: false,
    },
    size: {
      type: String,
      default: "md",
    },
    styleConfig: {
      type: Object,
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {},
    },
  },
  data() {
    return {};
  },
  computed: {
    getStyleVars() {
      return {
        "--error-color": this.styleConfig?.errorColor || variables.danger,
        "--success-color": this.styleConfig?.successColor || variables.success,
        "--filled-color": this.styleConfig?.filledColor || variables.info,
        "--color": this.styleConfig?.clearButtonColor || variables.gray400,
      };
    },
  },
  // mounted() {},
  methods: {},
};
</script>
<style scoped lang="scss">
@import "../../assets/scss/variables.scss";

.mask-icon-container {
  display: flex;
  &--lg {
    .mask-icon-subtract {
      width: 17px;
      height: 16px;
    }
  }
  &--md {
    .mask-icon-subtract {
      width: 15px;
      height: 14px;
    }
  }
  &--sm {
    .mask-icon-subtract {
      width: 10px;
      height: 10px;
      -webkit-mask-size: 10px;
    }
  }
}
.mask-icon-subtract {
  box-sizing: border-box;
  mask-image: url("../../assets/img/clear.svg");
  mask-repeat: no-repeat;
  mask-size: cover;
  mask-position: center;
  background-color: var(--color);
  align-self: center;
  cursor: pointer;
  z-index: 1;
  border-color: transparent;
}
.error {
  background-color: var(--error-color);
}
.success {
  background-color: var(--success-color);
}
.filled {
  background-color: var(--filled-color);
}
</style>
