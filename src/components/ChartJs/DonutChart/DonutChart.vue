

<script>
import variables from "@/assets/styles/variables.scss";
import ChartContainer from "@/components/ChartContainer";
// import Chart from "@/components/BarChart/Chart";
import { Doughnut } from 'vue3-chart-v2'

export default {
  name: "DonutChart",
  extends: Doughnut,
  components: { ChartContainer},
  props: {
    data: {
      type: Array,
      default: () => []
    },
    options: {
      type: Object,
      default: () => {}
    },
    styleConfig: {
      type: Object,
      default: () => {}
    },
    header: {
      type: String,
      default: ""
    },
    description: {
      type: String,
      default: ""
    },
  },
  data() {
    return {
      colors: [
        variables.primaryAccent,
        variables.pressedSecondary,
        variables.gray500
      ],
    }
  },
  computed: {
    getStyleVars() {
      return {
        lineColor: this.styleConfig?.lineColor || variables.primaryAccent,
        emptyColor: this.styleConfig?.emptyColor || variables.gray300,
        size: this.styleConfig?.chartSize || 150
      }
    },
  },
  mounted() {
    this.renderChart({
      labels: [
        'Red',
        'Blue',
        'Yellow'
      ],
      datasets: [{
        label: 'My First Dataset',
        data: [30, 50, 10],
        backgroundColor: this.colors,

      }, ]
    }, this.options)
  },
  methods: {},
  watch: {}
}
</script>

<style scoped lang="scss">
@import '../../../assets/styles/variables';

.chart{
  display:table;
  table-layout: fixed;

  width:60%;
  max-width:700px;
  height:200px;
  margin:0 auto;

  background-image: linear-gradient(bottom, rgba(0, 0, 0, 0.1) 2%, transparent 2%);
  background-size: 100% 50px;
  background-position: left top;

  li{
    position:relative;
    display:table-cell;
    vertical-align:bottom;
    height:200px;
  }

  span{
    margin:0 1em;
    display: block;
    background: rgba(#d1ecfa, .75);
    animation: draw 1s ease-in-out;

    &:before{
      position:absolute;
      left:0;right:0;top:100%;
      padding:5px 1em 0;
      display:block;
      text-align:center;
      content:attr(title);
      word-wrap: break-word;
    }

  }

}

@keyframes draw{
  0%{height:0;}
}
</style>