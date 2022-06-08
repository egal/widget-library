<template>
  <div class="chart">
    <ve-progress
      :data="circles"
      :angle="-90"
      color="#0066FF"
      line="round"
      :empty-color="getConfig.emptyColor"
      :size="getConfig.chartSize"
      :thickness="6"
      :hide-legend="getConfig.hasLegend"
      :noData="data.length === 0"
      :gap="getConfig.gap"
    >
      <template #legend-caption v-if="circles.length !== 0">
        <p class="chart-value">{{ options.centerValue }}</p>
        <p class="chart-label">
          {{ circles.length !== 0 ? options.centerLabel : 'no data' }}
        </p>
      </template>
    </ve-progress>

    <div class="legend" v-if="getConfig.hasLegend">
      <span class="legend-item" v-for="item in circles" :key="item.label">
        <span class="legend-item-color" :style="{ backgroundColor: item.color }" />
        <span>{{ item.label }}</span>
      </span>
    </div>
  </div>
</template>

<script>
import { VeProgress } from 'vue-ellipse-progress'
import ChartContainer from '@/components/charts/ChartContainer'

export default {
  name: 'MultiProgressChart',
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
        emptyColor: this.options?.emptyColor || '#e2e8f0',
        chartSize: this.options?.chartSize || 150,
        gap: this.options?.gap || 3,
        angle: this.options?.angle || -90,
        line: this.options?.line || 'round',
        thickness: this.options?.thickness || 6,
        hasLegend: this.options?.hasLegend || false,
      }
    },

    circles() {
      let circlesArray = []

      if (this.data?.datasets) {
        circlesArray = this.data?.datasets.map((item, index) => {
          return {
            progress: item.data[0],
            label: item.label,
            color: item.backgroundColor || this.defaultColors[index] || 'gray',
            thickness: 8 - index,
          }
        })
      } else {
        circlesArray = [
          {
            progress: 0,
            color: '',
            thickness: 8,
            label: '',
          },
          {
            progress: 0,
            color: '',
            thickness: 7,
            label: '',
          },
          {
            progress: 0,
            color: '',
            thickness: 6,
            label: '',
          },
        ]
      }
      return circlesArray
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
</style>
