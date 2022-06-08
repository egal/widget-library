<template>
  <div class="chart" :class="{ half: options?.half }">
    <ve-progress
      :progress="data?.datasets[0]?.data[0]"
      :angle="getConfig.angle"
      :color="getConfig.lineColor"
      :line="getConfig.line"
      :empty-color="getConfig.emptyColor"
      :size="getConfig.chartSize"
      :thickness="getConfig.thickness"
      :hide-legend="getConfig.hideLegend"
      :noData="data.length === 0"
      :half="options?.half"
    >
      <template #legend-caption>
        <p class="chart-value" v-if="data?.datasets.length !== 0">
          {{ data?.datasets[0]?.data[0] }}
        </p>
        <p class="chart-label">
          {{ data?.datasets.length !== 0 ? data.datasets[0]?.label : 'no data' }}
        </p>
      </template>
    </ve-progress>
  </div>
</template>

<script>
import { VeProgress } from 'vue-ellipse-progress'
import ChartContainer from '@/components/charts/ChartContainer'

export default {
  name: 'ProgressChart',
  components: { ChartContainer, VeProgress },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    options: {
      type: Object,
      default: () => {},
    },
    meta: {
      type: Object,
      default: () => {},
    },
    defaultColors: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {}
  },
  computed: {
    getConfig() {
      return {
        half: this.options?.half || false,
        lineColor: this.options?.lineColor || '#0066ff',
        emptyColor: this.options?.emptyColor || '#e2e8f0',
        chartSize: this.options?.chartSize || 150,

        line: this.options?.line || 'round',
        thickness: this.options?.thickness || 8,
        hideLegend: this.options?.hideLegend ?? true,
        angle: this.options?.angle ? this.options.angle : this.options?.half ? 0 : -90,
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

.chart {
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

  &.half {
    :deep .ep-legend--container {
      top: 0;
      height: 45%;
      position: initial;
    }
  }

  .legend {
    .legend-item {
      display: inline-flex;
      display: -webkit-inline-box;
      display: -ms-inline-flexbox;
      display: inline-flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
    }
  }
}

:deep .ep-legend--value__counter {
  display: none;
}
</style>
