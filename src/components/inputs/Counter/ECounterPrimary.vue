<template>
  <div class="counter" :class="`counter--${data.size}`" :style="styleVars">
    <div
        class="counter-label"
        v-if="data.label"
        :class="{ disabled: data.disabled }"
    >
      {{ data.label }}
    </div>
    <div class="counter-container">
      <div
          class="counter-container__minus"
          :class="{ disabled: data.disabled || value === 0 }"
      >
        <b-icon icon="dash-lg" @click="$emit('decreaseValue')" />
      </div>
      <div class="counter-container__value" :class="{ disabled: data.disabled }">
        {{ value }}
      </div>
      <div class="counter-container__plus" :class="{ disabled: data.disabled }">
        <b-icon icon="plus-lg" @click="$emit('increaseValue')" />
      </div>
    </div>
    <div
        class="counter-helper-text"
        v-if="data.helperText"
        :class="{ disabled: data.disabled }"
    >
      {{ data.helperText }}
    </div>
  </div>
</template>

<script>
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'
export default {
  name: 'ECounterArrow',
  components: {
    BIcon: BootstrapIcon,
  },
  emits: ['increaseValue', 'decreaseValue'],
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    styleVars: {
      type: Object,
      default: () => {},
    },
    styleConfig: {
      type: Object,
      default: () => {},
    },
    value: {
      type: Number,
      require: true,
    }
  },
  data() {
    return {
      newValue: 0,
    }
  },
}
</script>

<style scoped lang="scss">
@import 'src/assets/variables';
.counter {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  user-select: none;
  font-family: var(--font-family);
  &-label {
    color: var(--label-color);
    font-weight: var(--label-font-weight);
    margin-bottom: 8px;
    &.disabled {
      color: var(--label-color-disabled);
    }
  }
  &-container {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    box-sizing: border-box;
    &__minus,
    &__plus {
      .bi {
        cursor: pointer;
        color: var(--icon-color);
        &:hover {
          color: var(--icon-color-hover);
        }
      }
    }
    &__value {
      font-weight: var(--value-font-weight);
      color: var(--value-color);
      font-size: var(--value-font-size);
      line-height: 17px;
      &.disabled {
        color: var(--value-color-disabled);
      }
    }
    &__minus,
    &__plus,
    &__value {
      height: fit-content;
      align-self: center;
    }
    .disabled {
      .bi {
        color: var(--icon-color-disabled);
        cursor: default;
      }
    }
  }
  &-helper-text {
    font-weight: var(--helper-text-font-weight);
    color: var(--helper-text-color);
    margin-top: 8px;
    &.disabled {
      color: var(--helper-text-color-disabled);
    }
  }
  &--lg {
    .counter-label {
      font-size: 16px;
    }
    .counter-container {
      height: 48px;
      padding: 1px 18px;
      grid-column-gap: 8px;
      min-width: 120px;
      &__value {
        font-size: 16px;
        width: 34px;
        text-align: center;
      }
      &__minus,
      &__plus {
        .bi {
          width: 16px;
          height: 16px;
        }
      }
    }
    .counter-helper-text {
      font-size: 14px;
    }
  }
  &--md {
    .counter-label {
      font-size: 14px;
    }
    .counter-container {
      height: 40px;
      grid-column-gap: 7px;
      padding: 1px 16px;
      min-width: 103px;
      &__value {
        font-size: 14px;
        width: 27px;
        text-align: center;
      }
      &__minus,
      &__plus {
        .bi {
          width: 14px;
          height: 14px;
        }
      }
    }
    .counter-helper-text {
      font-size: 12px;
    }
  }
  &--sm {
    .counter-label {
      font-size: 12px;
    }
    .counter-container {
      height: 32px;
      grid-column-gap: 6px;
      padding: 1px 14px;
      min-width: 90px;
      border-radius: 6px;
      &__value {
        font-size: 12px;
        width: 24px;
        text-align: center;
      }
      &__minus,
      &__plus {
        .bi {
          width: 12px;
          height: 12px;
        }
      }
    }
    .counter-helper-text {
      font-size: 12px;
    }
  }
  &--xs {
    .counter-label {
      font-size: 10px;
    }
    .counter-container {
      height: 24px;
      grid-column-gap: 5px;
      padding: 1px 12px;
      min-width: 73px;
      border-radius: 4px;
      &__value {
        font-size: 10px;
        width: 21px;
        text-align: center;
      }
      &__minus,
      &__plus {
        .bi {
          width: 8px;
          height: 8px;
        }
      }
    }
    .counter-helper-text {
      font-size: 10px;
    }
  }
}
</style>