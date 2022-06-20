<template>
  <div class="rating" :class="[`rating--size-${mergedData.size}`]" :style="getVars">
    <div
      class="rating__item"
      :class="{
        active: isActive(index),
        disabled: mergedData.disabled,
        readonly: mergedData.readonly,
      }"
      v-for="index in Number(mergedData.maximum) || 5"
      :key="index"
      @click="changeRating(index)"
      @mouseover="hoverStar(index)"
      @mouseleave="leaveStar(index)"
    >
      <!--       todo add  ;transition group -->
      <b-icon v-if="isActive(index)" :icon="mergedData.iconFilled" />
      <b-icon v-else :icon="mergedData.icon" />
    </div>
  </div>
</template>

<script>
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'

export default {
  name: 'ERating',
  components: { BIcon: BootstrapIcon },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      hoveredStars: 0,
    }
  },
  //todo add disabled cond
  // todo add readonly
  computed: {
    mergedData() {
      return Object.assign(
        {
          color: '#FFAC0A',
          size: 'md',
          icon: 'star',
          iconFilled: 'star-fill',
          maximum: 5,
          modelValue: 0,
          disabled: false,
          readonly: false,
        },
        this.data,
      )
    },
    getVars() {
      return { '--color': this.mergedData.color }
    },
  },
  mounted() {},
  beforeDestroy() {},
  methods: {
    isActive(index) {
      return index <= this.mergedData.modelValue || index <= this.hoveredStars
    },

    changeRating(index) {
      if (this.mergedData.disabled || this.mergedData.readonly) {
        return
      }

      this.$emit('update:modelValue', index)
    },

    hoverStar(index) {
      if (this.mergedData.disabled || this.mergedData.readonly) {
        return
      }

      if (index !== this.hoveredStars) {
        this.hoveredStars = index
      }
    },

    leaveStar(index) {
      if (index === 1) {
        this.hoveredStars = 0
      }
    },
  },
  watch: {},
}
</script>

<style scoped lang="scss">
@import 'src/assets/variables';

.rating {
  display: flex;

  &__item {
    margin-right: 4px;
    color: var(--color);

    &:last-child {
      margin-right: 0;
    }
    &:hover {
      cursor: pointer;
    }

    &.readonly {
      &:hover {
        cursor: default;
      }
    }
    &.disabled {
      color: $gray-400;
      &:hover {
        cursor: default;
      }
    }
  }

  &--size {
    &-lg {
      .bi {
        width: 20px;
        height: 20px;
      }
    }
    &-md {
      .bi {
        width: 16px;
        height: 16px;
      }
    }
    &-sm {
      .bi {
        width: 14px;
        height: 14px;
      }
    }
    &-xs {
      .bi {
        width: 10px;
        height: 10px;
      }
    }
  }
}
</style>
