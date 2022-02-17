

<script>
import variables from "@/assets/styles/variables.scss";
import ChartContainer from "@/components/ChartContainer";
// import Chart from "@/components/BarChart/Chart";
import { Bar } from 'vue3-chart-v2'

export default {
  name: "StackedBarChart",
  extends: Bar,
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
    return {}
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
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Git777s',
          backgroundColor: '#f87479',
          data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11],
          borderWidth: 5,
          borderRadius: 100,
        },
        {
          label: 'Git3777s',
          backgroundColor: '#f77979',
          data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
        },
        {
          label: 'Git45777s',
          backgroundColor: '#f87449',
          data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
        }
      ]
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