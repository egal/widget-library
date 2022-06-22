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
      <input
          class="counter-container__input"
          type="number"
          :value="modelValue"
          @input="$emit('update:modelValue', Number($event.target.value))"
          :disabled="data.disabled"
      />
      <div class="counter-container__arrows">
        <b-icon
            icon="caret-up-fill"
            @click="$emit('increaseValue')"
            :class="{ disabled: data.disabled }"
        />
        <b-icon
            icon="caret-down-fill"
            @click="$emit('decreaseValue')"
            :class="{ disabled: data.disabled || modelValue === 0 }"
        />
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
  name: 'ECounterSecondary',
  components: {
    BIcon: BootstrapIcon,
  },
  emits: ['update:modelValue', 'increaseValue', 'decreaseValue'],
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
    modelValue: {
      type: Number,
      default: () => {},
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
    grid-template-columns: auto 1fr;
    justify-items: end;
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius);
    box-sizing: border-box;
    &__arrows {
      display: flex;
      flex-flow: column wrap;
      .bi {
        margin: 0;
        cursor: pointer;
        color: var(--icon-color);
        &:hover {
          color: var(--icon-color-hover);
        }
        &.disabled {
          color: var(--icon-color-disabled);
        }
      }
    }
    &__value {
      font-weight: var(--value-font-weight);
      color: var(--value-color);
      font-size: 14px;
      line-height: 17px;
    }
    &__arrows {
      height: fit-content;
      align-self: center;
      &.disabled {
        .bi {
          color: var(--icon-color-disabled);
          cursor: default;
        }
      }
    }
    &__input {
      border: none;
      font-weight: var(--value-font-weight);
      line-height: 17px;
      color: var(--value-color);
      &:focus {
        border-color: var(--border-focus-color);
        outline: none;
      }
      &:disabled {
        background: none;
        color: var(--value-color-disabled)
      }
    }
  }
  &-helper-text {
    font-size: 10px;
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
      grid-column-gap: 12px;
      min-width: 120px;
      &__arrows {
        .bi {
          width: 16px;
          height: 16px;
        }
      }
      &__input {
        font-size: 16px;
        width: 49px;
      }
    }
    .helper-text {
      font-size: 14px;
    }
  }
  &--md {
    .counter-label {
      font-size: 14px;
    }
    .counter-container {
      height: 40px;
      grid-column-gap: 10px;
      padding: 1px 16px;
      min-width: 103px;
      &__input {
        font-size: 14px;
        width: 41px;
      }
      &__arrows {
        .bi {
          width: 14px;
          height: 14px;
        }
      }
      .helper-text {
        font-size: 12px;
      }
    }
  }
  &--sm {
    .counter-label {
      font-size: 12px;
    }
    .counter-container {
      height: 32px;
      grid-column-gap: 8px;
      padding: 1px 14px;
      min-width: 90px;
      border-radius: 6px;
      &__input {
        font-size: 12px;
        width: 34px;
      }
      &__arrows {
        .bi {
          width: 12px;
          height: 12px;
        }
      }
      .helper-text {
        font-size: 12px;
      }
    }
  }
  &--xs {
    .counter-label {
      font-size: 10px;
    }
    .counter-container {
      height: 24px;
      grid-column-gap: 6px;
      padding: 1px 12px;
      min-width: 73px;
      border-radius: 4px;
      &__input {
        font-size: 10px;
        width: 27px;
      }
      &__arrows {
        .bi {
          width: 10px;
          height: 10px;
        }
      }
      .helper-text {
        font-size: 10px;
      }
    }
  }
}
input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
}
input[type='number'],
input[type="number"]:hover,
input[type="number"]:focus {
  appearance: none;
  -moz-appearance: textfield;
}
</style>