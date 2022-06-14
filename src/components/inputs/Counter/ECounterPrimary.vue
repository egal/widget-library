<template>
  <div class="counter" :class="`counter--${mergedData.size}`" :style="getStyleVars">
    <div class="counter-label" v-if="mergedData.label">{{ mergedData.label }}</div>
    <div class="counter-container">
      <div
        class="counter-container__minus"
        :class="{ disabled: mergedData.disabled || newValue === 0 }"
      >
        <b-icon icon="dash-lg" @click="decreaseValue" />
      </div>
      <div class="counter-container__value" :class="{ disabled: mergedData.disabled }">
        {{ newValue }}
      </div>
      <div class="counter-container__plus" :class="{ disabled: mergedData.disabled }">
        <b-icon icon="plus-lg" @click="increaseValue" />
      </div>
    </div>
    <div class="counter-helper-text" v-if="mergedData.helperText">
      {{ mergedData.helperText }}
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
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    styleConfig: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      newValue: 0,
    }
  },
  computed: {
    mergedData() {
      return Object.assign(
        {
          label: '',
          helperText: '',
          modelValue: 0,
          max: null,
          min: null,
          size: 'md',
          disabled: false,
        },
        this.data,
      )
    },
    getStyleVars() {
      return {
        '--font-family': this.styleConfig?.fontFamily || 'Inter',
        '--value-font-size-text': this.styleConfig?.valueFontSizeText || '16px',
        '--value-color': this.styleConfig?.valueColor || '#A0AEC0',
        '--value-font-weight': this.styleConfig?.valueFontWeight || 700,
        '--label-color': this.styleConfig?.labelColor || '#A0AEC0',
        '--label-font-weight': this.styleConfig?.labelFontWeight || 400,
        '--helper-text-color': this.styleConfig?.helperTextColor || '#A0AEC0',
        '--helper-text-font-weight': this.styleConfig?.helperTextFontWeight || 400,
        '--border-color': this.styleConfig?.borderColor || '#E2E8F0',
        '--border-radius': this.styleConfig?.borderRadius || '8px',
        '--icon-color': this.styleConfig?.iconColor || '#A0AEC0',
        '--icon-color-hover': this.styleConfig?.iconColorHover || '#2D3748',
        '--icon-color-disabled': this.styleConfig?.iconColorDisabled || '#CBD5E0',
        '--text-color-disabled': this.styleConfig?.textColorDisabled || '#CBD5E0',
      }
    },
  },
  mounted() {
    this.newValue = this.mergedData.modelValue
  },
  methods: {
    increaseValue() {
      if (
        (!this.mergedData.max && !this.mergedData.disabled) ||
        (this.mergedData.max && !this.mergedData.disabled && this.newValue < this.mergedData.max)
      ) {
        this.newValue++
      }
      this.$emit('update:modelValue', this.newValue)
    },
    decreaseValue() {
      if (
        (!this.mergedData.min && !this.mergedData.disabled && this.newValue > 0) ||
        (this.mergedData.min && this.newValue > this.mergedData.min)
      ) {
        this.newValue--
      }
      this.$emit('update:modelValue', this.newValue)
    },
  },
  watch: {
    value(value) {
      this.newValue = value
    },
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
      font-size: var(--value-font-size-text);
      line-height: 17px;
    }
    &__minus,
    &__plus,
    &__value {
      height: fit-content;
      align-self: center;
    }
    .disabled {
      color: var(--text-color-disabled);
      .bi {
        color: var(--icon-color-disabled);
        cursor: default;
      }
    }
  }
  &-helper-text {
    font-size: 10px;
    font-weight: var(--helper-text-font-weight);
    color: var(--helper-text-color);
    margin-top: 8px;
  }

  &--lg {
    .counter-label {
      font-size: 16px;
    }
    .counter-container {
      height: 48px;
      padding: 1px 18px;
      grid-column-gap: 22px;
      min-width: 120px;
      &__value {
        font-size: 16px;
      }
      &__minus,
      &__plus {
        .bi {
          width: 20px;
          height: 20px;
        }
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
      grid-column-gap: 18px;
      padding: 1px 16px;
      min-width: 103px;
      &__value {
        font-size: 14px;
      }
      &__minus,
      &__plus {
        .bi {
          width: 16px;
          height: 16px;
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
      grid-column-gap: 16px;
      padding: 1px 14px;
      min-width: 90px;
      &__value {
        font-size: 12px;
      }
      &__minus,
      &__plus {
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
  &--xs {
    .counter-label {
      font-size: 10px;
    }
    .counter-container {
      height: 24px;
      grid-column-gap: 16px;
      padding: 1px 12px;
      min-width: 73px;
      &__value {
        font-size: 10px;
      }
      &__minus,
      &__plus {
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
</style>