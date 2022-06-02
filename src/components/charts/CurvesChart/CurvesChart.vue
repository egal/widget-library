<template>
  <div class="custom-chart">
    <Legend v-if="options.legend" :datasets="data.datasets" />

    <div class="custom-chart__wrapper">
      <vue3-chart-js v-bind="{ ...lineChart }" />
    </div>
  </div>
</template>

<script>
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
import Legend from '@/components/charts/Legend'
import { drawTooltip } from '@/assets/charts/scripts'

export default {
  name: 'CurvesChart',
  components: { Legend, Vue3ChartJs },
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
    return {
      lineChart: {
        type: 'line',
        data: this.data,
        options: {
          responsive: true,
          maintainAspectRatio: true,
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
                max: 100,
                padding: 10,
              },
            },
          },

          ...this.options,
          plugins: {
            legend: {
              display: false,
            },
            tooltip: {
              enabled: false,
              external: (context) => drawTooltip(context, this.options),
            },
          },
        },
      },
    }
  },
  computed: {},
  mounted() {},
  beforeDestroy() {},
  methods: {},
  watch: {},
}
</script>

<style scoped lang="scss"></style>
