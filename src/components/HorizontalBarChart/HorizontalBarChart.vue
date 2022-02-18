<template>
<!--  <ChartContainer :header="header" :description="description" :style-config="styleConfig">-->

    <div class="charts" v-if="sections.datasets?.length > 0">
      <div class="row" v-for="item in sections.datasets" :key="item.label">
        <div class="text chart-label">
          <div class="legend-item">
            <div class="legend-item-color" :style="`background: ${item.backgroundColor};`" />
            <span>{{item.label}}</span>
          </div>
          <span>{{item.data[0]}}</span>
        </div>
        <div class="progress" :style="`background: ${getStyleVars.emptyColor};`">

          <span :data-fill="item.data[0]+'%'" class="progress-bar" :style="`width: ${item.data[0]}%; background: ${item.backgroundColor};`"></span>
        </div>
      </div>
    </div>
    <div v-else class="charts empty">
      <span class="chart-label">no data</span>
    </div>
<!--  </ChartContainer>-->
</template>

<script>
import variables from "@/assets/styles/variables.scss";
import ChartContainer from "@/components/ChartContainer";

export default {
  name: "HorizontalBarChart",
  components: {ChartContainer},
  props: {
    data: {
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
    showKey: {
      type: String,
      default: 'value'
    }
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

      const newDatasets = this.data?.datasets.map((item, index) => {
        return {...item, backgroundColor: item.backgroundColor || this.colors[index] || 'gray'}
      })

      return {...this.data, datasets: newDatasets}
    },
  },
  mounted() {
  },
  methods: {},
  watch: {}
}
</script>

<style scoped lang="scss">
@import '../../assets/styles/variables';

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