<template>
  <div class="chart-wrapper" ref="chartWrapper" :style="getStyleVars">
    <span class="header">{{ title }}</span>
    <p class="description">{{ description }}</p>
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ChartContainer',
  components: {},
  props: {
    options: {
      type: Object,
      default: () => {},
    },
    title: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      width: 0,
    }
  },
  computed: {
    getStyleVars() {
      return {
        '--font-family': this.options?.fontFamily || 'Open Sans',
        '--main-font-color': this.options?.fontColor || '#2d3748',
        '--second-font-color': this.options?.secondFontColor || '#a0aec0',
        '--main-font-size': this.options?.titleFontSize || '14px',
        '--second-font-size': this.options?.labelsFontSize || '12px',
        '--main-font-weight': this.options?.fontWeight || 'bold',
        '--second-font-weight': this.options?.secondFontWeight || 'normal',
        '--background-color': this.options?.backgroundColor || '#ffffff',
      }
    },
  },
  mounted() {},
  methods: {},
  watch: {},
}
</script>

<style scoped lang="scss">
@import './src/assets/variables.scss';

.chart-wrapper {
  font-family: var(--font-family);
  padding: 24px;
  background: var(--background-color);
  box-shadow: $shadow-sm;
  border-radius: 16px;

  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;

  min-width: -webkit-fit-content;
  min-width: -moz-fit-content;
  min-width: fit-content;
}

.header {
  margin: 0 0 8px 0;
  -ms-flex-item-align: start;
  align-self: flex-start;
  font-weight: var(--main-font-weight);
  font-size: var(--main-font-size);
  color: var(--main-font-color);
}

.description {
  margin: 0 0 24px 0;
  align-self: flex-start;
  font-weight: var(--second-font-weight);
  font-size: var(--main-font-size);
  color: var(--second-font-color);
}

// center text styles
:deep .chart {
  &-value {
    font-weight: var(--main-font-weight);
    font-size: var(--second-font-size);
    color: var(--main-font-color);
    margin: 0;
  }

  &-label {
    margin: 5px 0 0 0;
    font-weight: var(--second-font-weight);
    font-size: var(--second-font-size);
    color: var(--second-font-color);
  }
}

// legend styles
:deep .cdc-legend,
:deep .legend {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

:deep .cdc-legend-item,
:deep .legend-item {
  font-style: normal;
  font-weight: $medium-font-weight;
  font-size: var(--second-font-size);
  color: var(--main-font-color);
  margin: 4px 16px 0 0;

  &:last-child {
    margin-right: 0;
  }
}

:deep .cdc-legend-item-color,
:deep .legend-item-color {
  height: 8px;
  width: 8px;
  border-radius: 50%;
  margin-right: 8px;
  display: inline-block;
}

// styles for custom charts (stacked, vertical, line and curves)
:deep .custom-chart {
  width: 100%;

  &__wrapper {
    margin-left: -10px;
  }
}
</style>
