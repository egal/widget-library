<template>
  <div class="custom-chart">
    <Legend v-if="options?.legend" :datasets="data.datasets" />

    <div class="custom-chart__wrapper">
      <vue3-chart-js ref="chartRef" v-bind="{ ...barChart }" />
    </div>
  </div>
</template>

<script>
import { Chart, registerables } from 'chart.js'
import { BarController } from 'chart.js'
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
import Legend from '@/components/charts/Legend'

export default {
  name: 'VerticalBar',
  components: { Vue3ChartJs, Legend },
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
  methods: {},
  computed: {
    barChart() {
      return {
        type: 'vertical',
        data: this.data,
        options: {
          legend: true,
          scales: {
            x: {
              display: true,
              grid: {
                display: false,
                drawBorder: false,
              },
              ticks: {
                font: {
                  size: 12,
                  family: this.options?.fontFamily || 'Open Sans',
                },
                padding: 4,
                color: '#A0AEC0',
              },
            },
            y: {
              grid: {
                display: true,
                drawBorder: false,
                borderDash: [4, 3],
                zeroLineBorderDash: [4, 3],
                color: '#E4ECF7',
              },

              ticks: {
                color: '#A0AEC0',
                font: {
                  size: 12,
                  family: this.options?.fontFamily || 'Open Sans',
                },

                maxTicksLimit: 6,
                minTicksLimit: 6,
                min: 0,
                padding: 10,
              },
            },
          },
          ...this.options,
          plugins: {
            legend: {
              display: false,
            },
          },
        },
        width: this.options?.width || 327,
        height: this.options?.height || 243,
      }
    },
  },
  beforeUnmount() {
    this.$refs.chartRef.destroy()
  },
  beforeMount() {
    const metadata = this.meta

    class Custom extends BarController {
      draw(options) {
        super.draw(arguments)

        const meta = this.getMeta()
        meta.data = meta.data.map((i) => {
          i.borderSkipped = metadata?.borderSkipped || false
          i.enableBorderRadius = metadata?.enableBorderRadius || true
          i.options.borderRadius = metadata?.borderRadius || 10
          i.options.borderWidth = metadata?.borderWidth || 2
          i.options.borderColor = metadata?.borderColor || '#fff'
          i.width = metadata?.barWidth || 11
          return i
        })
      }
    }

    Custom.id = 'vertical'
    Custom.defaults = BarController.defaults

    Chart.register(...registerables)
    Chart.register(Custom)
  },
  watch: {
    'data.datasets': {
      handler() {
        this.$refs.chartRef.destroy()
        this.$refs.chartRef.render()
      },
      deep: true,
    },
  },
}
</script>

<style scoped lang="scss"></style>
