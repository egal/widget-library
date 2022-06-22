<template>
  <div
    class="tabs"
    :class="[
      `tabs--${mergedData.size}`,
      `tabs--underline-${mergedData.underlinePosition}`,
      { 'tabs--vertical': mergedData.vertical },
    ]"
    :style="getStyleVars"
  >
    <div class="tabs-container">
      <div
        class="tab"
        :class="{ 'tab--active': tab.key === mergedData.selected }"
        ref="tabs"
        v-for="tab in mergedData.options"
        @click="$emit('selected', tab.key)"
      >
        <BootstrapIcon class="tab__icon tab__icon--left" :icon="tab.leftIcon" v-if="tab.leftIcon" />
        <span class="tab__name">{{ tab.name }}</span>
        <BootstrapIcon
          class="tab__icon tab__icon--right"
          :icon="tab.rightIcon"
          v-if="tab.rightIcon"
        />
      </div>
    </div>
    <div
      class="tabs__tab-underline"
      :style="underlineStyles"
      v-if="mergedData.underline && mergedData.selected"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { ITabOptions } from '@/assets/tabs/interfaces'
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'

export default defineComponent({
  name: 'ETabs',
  components: { BootstrapIcon },
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
    return {
      isActive: true,
      tabsWidthArr: [] as number[],
    }
  },
  computed: {
    mergedData() {
      return Object.assign(
        {
          options: [] as ITabOptions[],
          selected: null,
          size: 'md',
          vertical: false,
          underline: true,
          underlinePosition: 'right',
        },
        this.data,
      )
    },
    getStyleVars() {
      return {
        '--tabs-gap': this.styleConfig?.tabsGap || `${this.tabsGap}px`,
        '--font-family': this.styleConfig?.fontFamily || `Inter`,
        '--color': this.styleConfig?.color || `#A0AEC0`,
        '--hover-color': this.styleConfig?.hoverColor || `#718096`,
        '--active-color': this.styleConfig?.activeColor || `#0066FF`,
        '--underline-color':
          this.styleConfig?.underlineColor || this.styleConfig?.activeColor || '#0066FF',
        '--underline-thickness': this.styleConfig?.underlineThickness || `1px`,
      }
    },

    /**
     * Возвращает расстояние между табами.
     * Сперва проверяется styleConfig. Если там нет этого значения, то берётся одно из стандартных (32, 24)
     * @return { number } - Расстояние между табами
     */
    tabsGap(): number {
      if (this.styleConfig?.tabsGap) {
        return Number(this.styleConfig.tabsGap.replace(/\D/g, ''))
      }

      return this.mergedData.size === 'lg' || this.mergedData.size === 'md' ? 32 : 24
    },

    /**
     * Высчитывает смещение для подчёркивания активного элемента.
     * Сперва находит индекс текущего элемента, после чего прогоняет цикл по массиву с размерами табов
     * и суммирует их (с добавлением расстояния между табами)
     * @return { number } - Смещение для линии, указывающей на активный таб
     */
    underlineOffset(): number {
      let underlinePosition = 0
      const activeTabIndex = this.mergedData.options.findIndex(
        (tab) => tab.key === this.mergedData.selected,
      )

      for (let i = 0; i < activeTabIndex; i++) {
        underlinePosition += this.tabsWidthArr[i] + this.tabsGap
      }

      return underlinePosition
    },

    /**
     * Возвращает ширину для подчёркивания активного таба.
     * @return { number } - Ширина подчёркивания
     */
    underlineWidth(): number {
      if (!this.mergedData.options.length) {
        return 0
      }

      const activeTabIndex = this.mergedData.options.findIndex(
        (tab) => tab.key === this.mergedData.selected,
      )
      return this.tabsWidthArr[activeTabIndex]
    },

    /**
     * Возвращает набор стилей для подчёркивания активного таба.
     * Стили отличаются значениями css правил для вертикальных табов и горизонтальных.
     * @return { string } - Стили для подчёркивания
     */
    underlineStyles(): string {
      return this.mergedData.vertical
        ? `width: var(--underline-thickness); height: ${
            this.underlineWidth + 14
          }px; transform: translateY(${this.underlineOffset - 7}px)`
        : `width: ${this.underlineWidth}px; height: var(--underline-thickness); transform: translateX(${this.underlineOffset}px)`
    },
  },
  async mounted() {
    this.tabsWidthArr = await this.getTabsSize()
  },
  methods: {
    /**
     * Возвращает массив с шириной каждого таба.
     * @return { Promise<number[]> } - Массив ширин
     */
    async getTabsSize(): Promise<number[]> {
      if (!this.mergedData.options.length) {
        return []
      }

      await this.$nextTick()

      const tabs: HTMLElement[] = this.$refs.tabs as HTMLElement[]
      return tabs.map((tab) => (this.mergedData.vertical ? tab.offsetHeight : tab.offsetWidth))
    },
  },
  watch: {
    async 'mergedData.options'() {
      this.tabsWidthArr = await this.getTabsSize()
    },
  },
})
</script>

<style scoped lang="scss">
@import '@/assets/variables.scss';

.tabs {
  .tabs-container {
    display: flex;

    .tab {
      display: flex;
      flex-wrap: nowrap;
      align-items: center;
      cursor: pointer;

      &:not(:last-child) {
        margin-right: var(--tabs-gap);
      }

      &:hover:not(&--active) {
        .tab__icon,
        .tab__name {
          color: var(--hover-color);
        }
      }

      &--active {
        cursor: default;

        .tab__icon,
        .tab__name {
          color: var(--active-color);
        }
      }

      &__name {
        font-family: var(--font-family);
        font-weight: $medium-font-weight;
        color: var(--color);
        transition: 0.1s ease-in-out;
      }
      &__icon {
        color: var(--color);
        transition: 0.05s ease-in-out;
        margin-bottom: 0;

        &--left {
          margin-right: 8px;
        }
        &--right {
          margin-left: 8px;
        }
      }
    }
  }
  &__tab-underline {
    height: 1px;
    background-color: var(--underline-color);
    margin: 8px 0 0 0;
    transition: 0.17s ease-in-out;
  }

  &--vertical {
    display: flex;

    .tabs-container {
      flex-direction: column;
      order: 2;

      .tab {
        &:not(:last-child) {
          margin-right: 0;
          margin-bottom: var(--tabs-gap);
        }
      }
    }

    .tabs__tab-underline {
      order: 1;
      width: 1px;
      height: 50px;
      margin-top: 0;
      margin-right: 18px;
    }

    &.tabs--underline-right {
      .tab {
        justify-content: flex-end;
      }
      .tabs__tab-underline {
        order: 2;
      }
    }
  }

  &--lg {
    .tab__name {
      font-size: 16px;
    }
    .tab__icon {
      width: 20px;
      height: 20px;
    }

    &.tabs--vertical {
      .tabs__tab-underline {
        margin-right: 18px;
      }

      &.tabs--underline-right {
        .tabs__tab-underline {
          margin-left: 18px;
        }
      }
    }
  }

  &--md {
    .tab__name {
      font-size: 14px;
    }
    .tab__icon {
      width: 16px;
      height: 16px;
    }

    &.tabs--vertical {
      .tabs__tab-underline {
        margin-right: 16px;
      }

      &.tabs--underline-right {
        .tabs__tab-underline {
          margin-right: 0;
          margin-left: 16px;
        }
      }
    }
  }

  &--sm {
    .tab__name {
      font-size: 12px;
    }
    .tab__icon {
      width: 14px;
      height: 14px;
    }

    &.tabs--vertical {
      .tabs__tab-underline {
        margin-right: 14px;
      }

      &.tabs--underline-right {
        .tabs__tab-underline {
          margin-right: 0;
          margin-left: 14px;
        }
      }
    }
  }

  &--xs {
    .tab__name {
      font-size: 10px;
    }
    .tab__icon {
      width: 10px;
      height: 10px;
    }

    &.tabs--vertical {
      .tabs__tab-underline {
        margin-right: 10px;
      }

      &.tabs--underline-right {
        .tabs__tab-underline {
          margin-right: 0;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>
