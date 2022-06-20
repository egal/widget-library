<template>
  <div
    class="slider"
    :class="[`slider--${mergedData.size}`]"
    :style="getStyleVars"
  >
    <div
      v-if="mergedData.label || mergedData.type === 'standard' || mergedData.type === 'segmented'"
      class="slider-header"
    >
      <div
        v-if="mergedData.label"
        class="slider-header__label"
      >{{ mergedData.label }}</div>
      <div
        v-if="mergedData.type === 'standard' || mergedData.type === 'segmented'"
        class="slider-header__value"
      >{{ modelValue }}</div>
    </div>
    <div class="slider-input">
      <Slider
        v-model="modelValue"
        :min="mergedData.min"
        :max="mergedData.max"
        :step="mergedData.type === 'segmented' ? mergedData.segmentStep : 1"
        @update="$emit('update:modelValue', modelValue)"/>
    </div>
    <div v-if="mergedData.type === 'segmented'" class="slider-footer">
      <div
        class="slider-footer__item"
        v-for="(segment, index) in segmentsValues"
        :key="index"
        :style="{left: `${(segment - mergedData.min) * 100 / (mergedData.max - mergedData.min)}%`}"
      >
        {{ segment }}
      </div>
    </div>
    <div v-else-if="mergedData.type === 'range'" class="slider-footer">
      <input
        type="number"
        v-model="modelValue[0]"
        :style="{ width: minInputWidth }"
        @input="minValueLimitation"
      >
      <input
        type="number"
        v-model="modelValue[1]"
        :style="{ width: maxInputWidth }"
        @input="maxValueLimitation"
      >
    </div>
    <div v-else class="slider-footer">
      <div>{{ mergedData.min }}</div>
      <div>{{ mergedData.max }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import Slider from '@vueform/slider';
import '@vueform/slider/themes/default.scss';

export default defineComponent({
  name: "ESlider",
  components: {
    Slider
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
      modelValue: [] as number | number[],
      segmentsValues: [0, 100],
    }
  },
  computed: {
    mergedData() {
      return Object.assign(
          {
            label: '',
            min: 0,
            max: 100,
            size: 'md',
            type: 'standard',
            intermediateScale: 1,
            segmentStep: 1,
          },
          this.data,
      )
    },
    getStyleVars() {
      return {
        '--font-family': this.styleConfig?.fontFamily || 'Inter',
        '--slider-width': this.styleConfig?.sliderWidth || '280px',
        '--label-font-weight': this.styleConfig?.labelFontWeight || 400,
        '--label-color': this.styleConfig?.labelColor || '#A0AEC0',
        '--helper-text-font-weight': this.styleConfig?.helperTextFontWeight || 400,
        '--helper-text-color': this.styleConfig?.helperTextColor || '#A0AEC0',
        '--bottom-line-color': this.styleConfig?.bottomLineColor || '#E2E8F0',
        '--top-line-color': this.styleConfig?.topLineColor || '#0066FF',
        '--top-line-hover-color': this.styleConfig?.topLineHoverColor || '#3385FF',
        '--top-line-active-color': this.styleConfig?.topLineActiveColor || '#005CE4',
        '--handle-color': this.styleConfig?.handleColor || '#FFFFFF',
        '--range-inputs-value-color': this.styleConfig?.rangeInputsValueColor || '#2D3748',
        '--range-inputs-background-color': this.styleConfig?.rangeInputsBackgroundColor || '#FFFFFF',
      }
    },
    minInputWidth() {
      return `${(this.modelValue[0].toString().length + 1) * 8}px`
    },
    maxInputWidth() {
      return `${(this.modelValue[1].toString().length + 1) * 8}px`
    },
  },
  beforeMount() {
    this.setScaleValues()
    this.setModelValue()
  },
  methods: {
    setScaleValues() {
      const amountSteps = Math.round((this.mergedData.max - this.mergedData.min) / this.mergedData.segmentStep)
      this.segmentsValues = []
      this.segmentsValues.push(this.mergedData.min)
      if (this.mergedData.type === 'segmented') {
        switch (this.mergedData.intermediateScale) {
          case 1:
            this.segmentsValues.push(this.mergedData.segmentStep * Math.floor(amountSteps * 0.5) + this.mergedData.min)
            break
          case 2:
            this.segmentsValues.push(this.mergedData.segmentStep * Math.round(amountSteps * 0.33) + this.mergedData.min)
            this.segmentsValues.push(this.mergedData.segmentStep * Math.floor(amountSteps * 0.66) + this.mergedData.min)
            break
          default:
            this.segmentsValues.push(this.mergedData.segmentStep * Math.round(amountSteps * 0.25) + this.mergedData.min)
            this.segmentsValues.push(this.mergedData.segmentStep * Math.floor(amountSteps * 0.50) + this.mergedData.min)
            this.segmentsValues.push(this.mergedData.segmentStep * Math.floor(amountSteps * 0.75) + this.mergedData.min)
            break
        }
      }
      this.segmentsValues.push(this.mergedData.max)
    },
    setModelValue() {
      if (this.mergedData.type === 'range') {
        this.modelValue = []
        this.modelValue.push(this.mergedData.min)
        this.modelValue.push(this.mergedData.max)
      } else {
        this.modelValue = (this.mergedData.max - this.mergedData.min) / 2 + this.mergedData.min
      }
    },
    minValueLimitation() {
      if (this.modelValue[0] < this.mergedData.min) {
        this.modelValue[0] = this.mergedData.min
      } else if (this.modelValue[0] > this.modelValue[1]) {
        this.modelValue[0] = this.modelValue[1]
      }
      this.$emit('update:modelValue', this.modelValue)
    },
    maxValueLimitation() {
      if (this.modelValue[1] > this.mergedData.max) {
        this.modelValue[1] = this.mergedData.max
      } else if (this.modelValue[1] < this.modelValue[0]) {
        this.modelValue[1] = this.modelValue[0]
      }
      this.$emit('update:modelValue', this.modelValue)
    },
  },
})
</script>

<style lang="scss" scoped>
@import 'src/assets/variables';
.slider {
  display: flex;
  flex-direction: column;
  font-family: var(--font-family);
  width: var(--slider-width);
  &-header {
    display: flex;
    justify-content: space-between;
    color: var(--label-color);
    margin-bottom: 8px;
    font-size: $p4-font-size;
    &__lebel {
      display: flex;
      flex-grow: 1;
      justify-content: start;
    }
    &__value {
      display: flex;
      flex-grow: 1;
      justify-content: end;
    }
  }
  &-footer {
    position: relative;
    display: flex;
    justify-content: space-between;
    margin-top: 8px;
    width: 100%;
    color: var(--helper-text-color);
    font-size: $p6-font-size;
    &__item {
      position: absolute;
      display: flex;
      justify-content: center;
      transform: translateX(-50%);
      &:first-child {
        position: static;
        justify-content: start;
        transform: translateX(0);
      }
      &:last-child {
        position: static;
        justify-content: end;
        transform: translateX(0);
      }
    }
    input {
      min-width: 62px;
      max-width: 35%;
      padding: 0 18px;
      margin-top: 8px;
      border: 1px solid var(--bottom-line-color);
      border-radius: 8px;
      outline: none;
      color: var(--range-inputs-value-color);
      background-color: var(--range-inputs-background-color);
    }
  }
  &--lg {
    .slider-header {
      font-size: $p3-font-size;
    }
    .slider-footer {
      font-size: $p5-font-size;
    }
    input {
      font-size: $p3-font-size;
      height: 46px;
    }
  }
  &--md {
    .slider-header {
      font-size: $p5-font-size;
    }
    .slider-footer {
      font-size: $p6-font-size;
    }
    input {
      font-size: $p5-font-size;
      height: 38px;
    }
  }
  &--sm {
    .slider-header {
      font-size: $p6-font-size;
    }
    .slider-footer {
      font-size: $p6-font-size;
    }
    input {
      font-size: $p6-font-size;
      height: 30px;
    }
  }
  &--xs {
    .slider-header {
      font-size: 10px;
    }
    .slider-footer {
      font-size: 10px;
    }
    input {
      font-size: $p6-font-size;
      height: 30px;
    }
  }
}

:deep(.slider-target) {
  height: 4px;
  &:hover {
    .slider-handle, .slider-connect {
      background-color: var(--top-line-hover-color);
    }
  }
  &:active {
    .slider-handle, .slider-connect {
      background-color: var(--top-line-active-color);
    }
  }
  .slider-connects {
    background-color: var(--bottom-line-color);
  }
  .slider-connect {
    background-color: var(--top-line-color);
  }
  .slider-handle {
    box-shadow: none;
    background-color: var(--top-line-color);
    &::after {
      content: '';
      position: absolute;
      left: 2px;
      top: 2px;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background-color: var(--handle-color);
    }
    &:focus {
      box-shadow: none;
    }
  }
  .slider-tooltip {
    display: none;
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