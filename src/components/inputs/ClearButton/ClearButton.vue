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
export default {
  name: 'ClearButton',
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
      default: 'md',
    },
    styleConfig: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {}
  },
  computed: {
    getStyleVars() {
      return {
        '--error-color': this.styleConfig?.errorColor || '#f16063',
        '--success-color': this.styleConfig?.successColor || '#66cb9f',
        '--filled-color': this.styleConfig?.filledColor || '#3385ff',
        '--color': this.styleConfig?.clearButtonColor || '#cbd5e0',
      }
    },
  },
  mounted() {},
  methods: {},
}
</script>

<style scoped lang="scss">
@import 'src/assets/variables';

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
  mask-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='15' height='14' viewBox='0 0 15 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cmask id='mask0' mask-type='alpha' maskUnits='userSpaceOnUse' x='0' y='0' width='15' height='14'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M15 7C15 10.866 11.6421 14 7.5 14C3.35786 14 0 10.866 0 7C0 3.13401 3.35786 0 7.5 0C11.6421 0 15 3.13401 15 7ZM4.21875 6.5C3.95987 6.5 3.75 6.72386 3.75 7C3.75 7.27614 3.95987 7.5 4.21875 7.5H10.7812C11.0401 7.5 11.25 7.27614 11.25 7C11.25 6.72386 11.0401 6.5 10.7812 6.5H4.21875Z' fill='black'/%3e%3c/mask%3e%3cg mask='url(%23mask0)'%3e%3crect width='15' height='14' fill='%23CBD5E0'/%3e%3c/g%3e%3c/svg%3e");
  mask-repeat: no-repeat;
  mask-size: cover;
  mask-position: center;
  -webkit-mask-image: url("data:image/svg+xml;charset=UTF-8,%3csvg width='15' height='14' viewBox='0 0 15 14' fill='none' xmlns='http://www.w3.org/2000/svg'%3e%3cmask id='mask0' mask-type='alpha' maskUnits='userSpaceOnUse' x='0' y='0' width='15' height='14'%3e%3cpath fill-rule='evenodd' clip-rule='evenodd' d='M15 7C15 10.866 11.6421 14 7.5 14C3.35786 14 0 10.866 0 7C0 3.13401 3.35786 0 7.5 0C11.6421 0 15 3.13401 15 7ZM4.21875 6.5C3.95987 6.5 3.75 6.72386 3.75 7C3.75 7.27614 3.95987 7.5 4.21875 7.5H10.7812C11.0401 7.5 11.25 7.27614 11.25 7C11.25 6.72386 11.0401 6.5 10.7812 6.5H4.21875Z' fill='black'/%3e%3c/mask%3e%3cg mask='url(%23mask0)'%3e%3crect width='15' height='14' fill='%23CBD5E0'/%3e%3c/g%3e%3c/svg%3e");
  -webkit-mask-repeat: no-repeat;
  -webkit-mask-size: cover;
  -webkit-mask-position: center;
  background-color: var(--color);
  align-self: center;
  cursor: pointer;
  z-index: 1;
  border-color: transparent;
  border-radius: 50%;
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
