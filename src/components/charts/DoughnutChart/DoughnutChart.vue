<template>
  <div class="chart">
    <vc-donut
      :background="getConfig.backgroundColor"
      :foreground="getConfig.emptyColor"
      :size="getConfig.chartSize"
      unit="px"
      :thickness="getConfig.thickness"
      :has-legend="getConfig.hasLegend"
      :legend-placement="getConfig.legendPlacement"
      :sections="sections"
      :total="getConfig.total"
      :start-angle="getConfig.angle"
    >
      <p class="chart-value" v-if="sections.length !== 0">
        {{ options.centerValue }}
      </p>
      <p class="chart-label">
        {{ sections.length !== 0 ? options.centerLabel : 'no data' }}
      </p>
    </vc-donut>
  </div>
</template>

<script>
import ChartContainer from '@/components/charts/ChartContainer'

export default {
  name: 'DoughnutChart',
  components: { ChartContainer },
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
        thickness: this.options?.thickness || 10,
        backgroundColor: this.options?.background || '#fff',
        hasLegend: this.options?.hasLegend ?? true,
        legendPlacement: this.options?.legendPlacement || 'bottom',
        total: this.options?.total || 100,
        angle: this.options?.angle || 90,
      }
    },

    sections() {
      if (!this.data.datasets) {
        return []
      }

      return this.data.datasets.map((item, index) => {
        return {
          ...item,
          value: item.data[0],
          color: item.backgroundColor || this.defaultColors[index] || 'gray',
        }
      })
    },
  },
  mounted() {},
  methods: {},
  watch: {},
}
</script>

<style scoped lang="scss"></style>
