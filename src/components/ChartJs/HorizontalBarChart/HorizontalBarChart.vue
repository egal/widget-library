
<script>
import variables from "@/assets/styles/variables.scss";
import ChartContainer from "@/components/ChartContainer";
import { Bar } from 'vue3-chart-v2'

export default {
  name: "HorizontalBarChart",
  extends: Bar,
  components: {ChartContainer},
  props: {
    data: {
      type: Array,
      default: () => []
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
    options: {
      type: Object,
      default: () => {}
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
        emptyColor: this.styleConfig?.emptyColor || variables.gray300,
      }
    },

    sections() {
      return this.data.map((item, index) => {
        return {...item, color: item.color || this.colors[index] || 'gray'}
      } )
    },
  },
  mounted() {
    this.renderChart({
      labels: ['1', '2', '3', '4', '5', '6', '7'],
      datasets: [{
        label: 'My First Dataset',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(201, 203, 207, 0.2)'
        ],
      }]
    }, this.options)
  },
  methods: {},
  watch: {}
}
</script>

<style scoped lang="scss">
@import '@/assets/styles/variables';

.charts {
  width: 100%;

  &.empty {
    min-height: 225px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.row {
  margin-bottom: 24px;
}

.text {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .legend-item {
    margin-bottom: 16px;
  }
}

.progress {
  width: 100%;
  height: 7px;
  background-color: $gray-300;
  border-radius: 3px;
  overflow: hidden;
  transition: 0.3s all ease;
}

.progress-bar {
  animation: load 3s normal forwards;
  display: block;
  height: 100%;
  width: 0%;
  background-size: 300% 100%;
  border-radius: 16px;
}

@keyframes load {
  0% { width: 0; }
  100% { width: attr(data-fill); }
}

</style>