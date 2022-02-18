<template>
  <div class="legend">
    <div class="legend-item" v-for="item in data.datasets" :key="item">
      <div
        class="legend-item-color"
        :style="`background: ${item.backgroundColor};`"
      />
      <span>{{ item.label }}</span>
    </div>
  </div>

  <canvas ref="canvas"></canvas>
</template>

<script>
import { Chart } from "chart.js";

import { BarController } from "chart.js";
class Custom extends BarController {
  draw() {
    super.draw(arguments);

    const meta = this.getMeta();

    meta.data = meta.data.map((i) => {
      i.borderSkipped = false;
      i.enableBorderRadius = true;
      i.options.borderRadius = 10;
      i.options.borderWidth = 2;
      i.options.borderColor = "#fff";

      i.width = 11;
      return i;
    });

    const pt0 = meta.data[0];
    const { x, y } = pt0.getProps(["x", "y"]);
    const { radius } = pt0.options;
    const ctx = this.chart.ctx;

    ctx.save();
    ctx.fillStyle = "#cd6eee";
    ctx.strokeStyle = "red";
    ctx.lineWidth = 10;
    ctx.font = "600 28px Poppins";
    ctx.strokeRect(x - radius, y - radius, 2 * radius, 2 * radius);
    ctx.restore();
  }
}

export default {
  name: "Test2",
  extends: Custom,
  components: {},
  props: {
    chartId: {
      type: String,
      default: "",
    },
    backgroundColors: {
      type: Array,
      default: () => [],
    },
    data: {
      type: Object,
      default: () => {},
    },
    options: {
      type: Object,
      default: () => {},
    },
    borderWidth: {
      type: Number,
      default: 15,
    },
    totalValue: {
      type: [String, Number],
      default: 0,
    },
    sectionPadding: {
      type: Number,
      default: 0.15,
    },
  },
  data() {
    return {};
  },
  mounted() {
    this.callRenderFunction();
  },
  methods: {
    callRenderFunction() {
      Custom.id = "stacked";
      Custom.defaults = BarController.defaults;

      Chart.defaults.plugins.legend.display = false;
      Chart.register(Custom);

      const ctx = this.$refs.canvas.getContext("2d");

      new Chart(ctx, {
        type: "stacked",
        data: this.data,
        options: {
          ...this.options,
          // categoryPercentage: 0.5,
          // barPercentage: 1.0,

          scales: {
            x: {
              stacked: true,
              display: true,
              grid: {
                display: false,
                drawBorder: false,
              },
              ticks: {
                fontColor: "#1865c9",
                // fontFamily: 'Poppins',
                padding: 4,
                // padding: 14,
                color: (context) =>
                  context.tick && context.tick.major && "#00ff04",
                font: function (context) {
                  if (context.tick && context.tick.major) {
                    return {
                      weight: "bold",
                    };
                  }
                },
              },
            },
            y: {
              stacked: true,
              // padding: 34,
              grid: {
                display: true,
                drawBorder: false,
                borderDash: [4, 3],
                zeroLineBorderDash: [4, 3],
                zeroLineColor: "#E4ECF7",
                color: "#E4ECF7",
              },

              ticks: {
                // fontColor: '#A0AEC0',
                // fontFamily: 'Poppins',
                maxTicksLimit: 6,
                minTicksLimit: 6,
                min: 0,
                max: 100,
                padding: 0,
              },
            },
          },
        },
      });
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
