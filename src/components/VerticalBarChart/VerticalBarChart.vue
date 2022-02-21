<template>
  <div class="legend" v-if="options.legend">
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
import { Chart, registerables } from "chart.js";

import { BarController } from "chart.js";

export default {
  name: "VerticalBar",
  // extends: Custom,
  components: {},
  props: {
    // chartId: {
    //   type: String,
    //   default: "",
    // },
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
  },
  data() {
    return {};
  },
  mounted() {
    this.callRenderFunction();
  },
  methods: {
    callRenderFunction() {
      const metadata = this.meta;

      class Custom extends BarController {
        draw(options) {
          super.draw(arguments);

          const meta = this.getMeta();

          meta.data = meta.data.map((i) => {
            i.options.borderRadius = metadata?.borderRadius || 10;
            i.options.borderColor = metadata?.borderColor || "#fff";
            i.width = metadata?.width || 7;
            return i;
          });
        }
      }

      Custom.id = "vertical-grouped";
      Custom.defaults = BarController.defaults;

      Chart.register(...registerables);
      Chart.register(Custom);

      const ctx = this.$refs.canvas.getContext("2d");

      new Chart(ctx, {
        type: "vertical-grouped",
        data: this.data,
        options: {
          ...this.options,
          plugins: {
            legend: {
              display: false,
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
