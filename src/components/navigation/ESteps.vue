<template>
  <div class="steps" :style="getStyleVars">
    <div
      class="step"
      v-for="(step, index) in mergedData.steps"
      :key="index"
      :style="getVerticalTypeStyle"
      :class="[
        `step--${mergedData.type}`,
        `step--${mergedData.size}`,
        `${mergedData.type === 'horizontal' ? `-${mergedData.underlineType}` : ''}`,
        `${step.isCompleted ? '-completed' : ''}`,
        `${step.isActive ? '-active' : ''}`,
        `${step.isMissing ? '-missing' : ''}`,
      ]"
      @click="selectStep(step.key)"
    >
      <div class="step--icon" v-if="mergedData.withIcons">
        <BIcon :icon="mergedData.iconCompleted" v-if="step.isCompleted"/>
        <BIcon :icon="mergedData.iconMissing" v-else-if="step.isMissing"/>
        <div v-else>{{ index + 1 }}</div>
      </div>
      <div class="step--content">{{ step.name }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from "vue";
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import {IStepsOptions} from "@/assets/steps/interfaces";

export default defineComponent({
  name: "ESteps",
  components: {BIcon: BootstrapIcon},
  emits: ['selected'],
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
    return {}
  },
  computed: {
    mergedData() {
      return Object.assign(
          {
            steps: [] as IStepsOptions[],
            selected: null,
            completed: null,
            type: 'horizontal',
            size: 'md',
            underline: true,
            underlineType: 'solid',
            verticalAlignment: 'left',
            withIcons: true,
            iconCompleted: 'check2',
            iconMissing: 'exclamation-triangle',
          },
          this.data,
      )
    },
    getStyleVars() {
      return {
        '--font-family': this.styleConfig?.fontFamily || 'Inter',
        '--font-weight': this.styleConfig?.fontWeight || 500,
        '--color': this.styleConfig?.color || '#A0AEC0',
        '--hover-color': this.styleConfig?.hoverColor || '#718096',
        '--active-color': this.styleConfig?.activeColor || '#0066FF',
        '--missing-color': this.styleConfig?.missingColor || '#FFD363',
        '--completed-color': this.styleConfig?.completedColor || '#0066FF',
        '--underline-width': this.mergedData.underline ? this.styleConfig?.underlineWidth || '1px' : 0,
        '--space-between-steps': this.styleConfig?.spaceBetweenSteps || '20px',
        '--flex-direction-value': this.mergedData.type === 'horizontal' ? 'row' : 'column',
      }
    },
    /**
     * Вычисляет стили для вертикально ориентированных Шагов
     */
    getVerticalTypeStyle(): object | void {
      if (this.mergedData.type === 'vertical' && this.mergedData.verticalAlignment === 'left') {
        return {
          borderLeft: `var(--underline-width) solid`,
          alignSelf: 'start',
        }
      } else if (this.mergedData.type === 'vertical' && this.mergedData.verticalAlignment === 'right') {
        return {
          borderRight: `var(--underline-width) solid`,
          alignSelf: 'end',
        }
      }
    }
  },
  mounted() {
    this.selectStep(this.mergedData.selected)
    this.completeStep(this.mergedData.completed)
  },
  methods: {
    /**
     * Делает активным выбранный Шаг и гененрирует событие со значением ключа выбранного Шага
     * @param key - ключ выбранного Шага
     */
    selectStep(key): void {
      const index = this.mergedData.steps.findIndex(el => el.key === key)
      this.mergedData.steps.forEach(el => el.isActive = false)
      this.mergedData.steps[index].isActive = true
      this.missingStep(index)
      this.$emit('selected', key)
    },
    /**
     * Отмечает все не завершенные, находящиеся слева от выбранного Шаги как пропущенные
     * @param index - индекс выбранного Шага
     */
    missingStep(index): void {
      this.mergedData.steps.forEach(el => el.isMissing = false)
      this.mergedData.steps
          .slice(0, index)
          .filter(el => el.isCompleted !== true)
          .forEach(el => el.isMissing = true)
    },
    /**
     * Меняет значение isCompleted для выбранного Шага
     * @param key
     */
    completeStep(key): void {
      const step = this.mergedData.steps.find(el => el.key == key)
      if (step) step!.isCompleted = !step!.isCompleted
    }
  },
  watch: {
    'mergedData.selected'() {
      this.selectStep(this.mergedData.selected)
    },
    'mergedData.completed'() {
      this.completeStep(this.mergedData.completed)
    }
  },
})
</script>

<style lang="scss" scoped>
@import "@/assets/variables.scss";

.steps {
  display: flex;
  flex-direction: var(--flex-direction-value);
  font-family: var(--font-family);
  .step {
    display: flex;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    color: var(--color);
    &.-missing {
      color: var(--missing-color);
      border-color: var(--missing-color);
    }
    &.-active {
      color: var(--active-color);
      border-color: var(--active-color);
    }
    &.-completed {
      color: var(--completed-color);
      border-color: var(--completed-color);
    }
    &:hover {
      color: var(--hover-color);
      border-color: var(--hover-color);
    }
    &--icon {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      object-fit: cover;
      .bi {
        position: relative;
        top: 1px;
        left: -3px;
      }
    }
    &--lg {
      font-size: $p3-font-size;
      .step--icon {
        width: 28px;
        height: 20px;
      }
      .bi {
        width: 20px;
        height: 20px;
      }
    }
    &--md {
      font-size: $p4-font-size;
      .step--icon {
        width: 24px;
        height: 16px;
      }
      .bi {
        width: 16px;
        height: 16px;
      }
    }
    &--sm {
      font-size: $p6-font-size;
      .step--icon {
        width: 20px;
        height: 14px;
      }
      .bi {
        width: 14px;
        height: 14px;
      }
    }
    &--xs {
      font-size: 10px;
      .step--icon {
        width: 18px;
        height: 14px;
      }
      .bi {
        width: 14px;
        height: 14px;
        left: -2px;
      }
    }
  }
}

// стили для горизонтальной ориентации
.step--horizontal {
  padding-top: 8px;
  padding-bottom: 8px;
  border-bottom: var(--underline-width) solid ;
  margin-left: var(--space-between-steps);
  &.-solid {
    padding-left: var(--space-between-steps);
    margin-left: 0;
  }
  &.-none {
    border-bottom: none;
  }
  &:first-child {
    margin-left: 0;
    padding-left: 0;
  }
}

// стили для вертикальной ориентации
.step--vertical {
  padding: 0 18px;
  &.step--lg {
    height: 48px;
  }
  &.step--md {
    height: 40px;
  }
  &.step--sm {
    height: 32px;
  }
  &.step--xs {
    height: 24px;
  }
}
</style>