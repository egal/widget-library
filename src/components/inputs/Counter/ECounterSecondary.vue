<template>
  <div class="counter" :class="`counter--${mergedData.size}`" :style="getStyleVars">
    <div class="counter-label" v-if="mergedData.label">{{ mergedData.label }}</div>
    <div class="counter-container">
      <input
        v-model="newValue"
        class="counter-container__input"
        v-if="false"
        :disabled="mergedData.disabled"
      />
      <div class="counter-container__value" v-if="true" :class="{ disabled: mergedData.disabled }">
        {{ newValue }}
      </div>
      <div class="counter-container__arrows" :class="{ disabled: mergedData.disabled }">
        <b-icon icon="caret-up-fill" @click="increaseValue" />
        <b-icon
          icon="caret-down-fill"
          @click="decreaseValue"
          :class="{ disabled: mergedData.disabled || newValue === 0 }"
        />
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
  name: 'ECounterSecondary',
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
    }
    .disabled {
      color: var(--text-color-disabled);
      cursor: default;
      .bi {
        color: var(--icon-color-disabled);
        cursor: default;
      }
    }
    &__input {
      border: none;
      font-weight: var(--value-font-weight);
      line-height: 17px;
      color: var(--value-color);
      &:focus {
        outline: none;
        color: var(--placeholder-color);
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

      &__arrows {
        .bi {
          width: 20px;
          height: 20px;
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
      grid-column-gap: 18px;
      padding: 1px 16px;
      min-width: 103px;

      &__input {
        font-size: 14px;
        width: 40px;
      }
      &__arrows {
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

      &__input {
        font-size: 12px;
        width: 34px;
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
  &--xs {
    .counter-label {
      font-size: 10px;
    }
    .counter-container {
      height: 24px;
      grid-column-gap: 16px;
      padding: 1px 12px;
      min-width: 73px;

      &__input {
        font-size: 10px;
        width: 28px;
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
</style>