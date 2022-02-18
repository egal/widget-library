<template>
  <div class="legend">
    <div class="legend-item" v-for="item in data.datasets" :key="item">
      <div class="legend-item-color" :style="`background: ${item.backgroundColor};`" />
      <span>{{item.label}}</span>
    </div>
  </div>

  <canvas ref="canvas" ></canvas>
</template>

<script>
import { Chart } from 'chart.js'

import {BarController,} from 'chart.js';
class Custom extends BarController {
  draw() {
    super.draw(arguments);

    const meta = this.getMeta();

    meta.data = meta.data.map(i => {
      i.options.borderRadius = 10
      i.options.borderColor = '#fff'
      i.width = 7
      return i
    })



    const pt0 = meta.data[0];
    const {x, y} = pt0.getProps(['x', 'y']);
    const {radius} = pt0.options;
    const ctx = this.chart.ctx;


    ctx.save();
    ctx.fillStyle = '#cd6eee'
    ctx.strokeStyle = 'red';
    ctx.lineWidth = 10;
    ctx.font = '600 28px Poppins'
    ctx.strokeRect(x - radius, y - radius, 2 * radius, 2 * radius);
    ctx.restore();

  }
}



export default {
  name: 'Test',
  extends: Custom,
  components: {},
  props: {
    chartId: {
      type: String,
      default: '',
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
      default: () => {}
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
    return {

    }
  },
  mounted() {
     this.callRenderFunction()


  },
  methods: {
    callRenderFunction() {
      Custom.id = 'vertical-grouped';
      Custom.defaults = BarController.defaults;


      Chart.defaults.plugins.legend.display = false
      Chart.register(Custom);

      const ctx = this.$refs.canvas.getContext('2d')


      new Chart(ctx, {
           type: 'vertical-grouped',
           data: this.data,
           options: {

// ...this.options,
             //todo width og 1 category OR bars alignment
             categoryPercentage: 0.4,
             barPercentage: 1.0,
           }
         });

    },
  }
}
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
