<template>
  <div>
    <div class="legend" v-if="options.legend">
      <div class="legend-item" v-for="item in data.datasets" :key="item">
        <div
          class="legend-item-color"
          :style="`background: ${item.backgroundColor};`"
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
  name: "VerticalBar",
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
  mounted() {
    console.log(this.$refs);
  },
  methods: {},
  computed: {
    barChart() {
      return {
        type: "stacked",
        data: this.data,
        options: {
          ...this.options,
          // responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
        },
        width: this.options.width,
        height: this.options.height,
      };
    },
  },
  beforeUnmount() {
    this.$refs.chartRef.destroy();
  },
  beforeMount() {
    const metadata = this.meta;

    class Custom extends BarController {
      draw(options) {
        super.draw(arguments);

        const meta = this.getMeta();
        meta.data = meta.data.map((i) => {
          i.borderSkipped = metadata?.borderSkipped || false;
          i.enableBorderRadius = metadata?.enableBorderRadius || true;
          i.options.borderRadius = metadata?.borderRadius || 10;
          i.options.borderWidth = metadata?.borderWidth || 2;
          i.options.borderColor = metadata?.borderColor || "#fff";
          i.width = metadata?.width || 11;
          return i;
        });
      }
    }

    Custom.id = "stacked";
    Custom.defaults = BarController.defaults;

    Chart.register(...registerables);
    Chart.register(Custom);
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
