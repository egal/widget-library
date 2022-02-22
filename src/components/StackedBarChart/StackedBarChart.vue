<template>
  <div>
    <div class="legend" v-if="options.legend">
      <div
        class="legend-item"
        v-for="(item, index) in data.datasets"
        :key="item"
      >
        <div
          class="legend-item-color"
          :style="`background: ${
            item.backgroundColor || defaultColors[index]
          };`"
        />
        <span>{{ item.label }}</span>
      </div>
    </div>

    <vue3-chart-js ref="chartRef" v-bind="{ ...barChart }" />
  </div>
</template>

<script>
import { Chart, registerables } from "chart.js";
import { BarController } from "chart.js";
import Vue3ChartJs from "@j-t-mcc/vue3-chartjs";

export default {
  name: "StackedBar",
  components: { Vue3ChartJs },
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
    return {};
  },
  mounted() {},
  methods: {},
  computed: {
    barChart() {
      return {
        type: "stacked",
        data: this.data,
        options: {
          scales: {
            x: {
              stacked: true,
              display: true,
              grid: {
                display: false,
                drawBorder: false,
              },
              ticks: {
                font: {
                  size: 12,
                  family: "Open Sans",
                },
                padding: 4,
                color: "#A0AEC0",
              },
            },
            y: {
              stacked: true,
              grid: {
                display: true,
                drawBorder: false,
                borderDash: [4, 3],
                zeroLineBorderDash: [4, 3],
                zeroLineColor: "#E4ECF7",
                color: "#E4ECF7",
              },

              ticks: {
                color: "#A0AEC0",
                font: {
                  size: 12,
                  family: "Open Sans",
                },

                maxTicksLimit: 6,
                minTicksLimit: 6,
                min: 0,
                max: 100,
                padding: 0,
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
      };
    },
  },
  beforeUnmount() {
    this.$refs.chartRef.destroy();
  },
  beforeMount() {
    const metadata = this.meta;

    class CustomStacked extends BarController {
      draw(options) {
        super.draw(arguments);

        const meta = this.getMeta();
        meta.data = meta.data.map((i) => {
          i.borderSkipped = metadata?.borderSkipped || false;
          i.enableBorderRadius = metadata?.enableBorderRadius || true;
          i.options.borderRadius = metadata?.borderRadius || 10;
          i.options.borderWidth = metadata?.borderWidth || 2;
          i.options.borderColor = metadata?.borderColor || "#fff";
          i.width = metadata?.barWidth || 11;
          return i;
        });
      }
    }

    CustomStacked.id = "stacked";
    CustomStacked.defaults = BarController.defaults;

    Chart.register(...registerables);
    Chart.register(CustomStacked);
  },
  watch: {
    "data.datasets": {
      handler() {
        this.$refs.chartRef.destroy();
        this.$refs.chartRef.render();
      },
      deep: true,
    },
  },
};
</script>

<style scoped lang="scss">
.legend {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-bottom: 24px;
  margin-top: 0;
}
</style>
