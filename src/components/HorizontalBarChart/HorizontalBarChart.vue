<template>
  <ChartContainer :header="header" :description="description" :style-config="styleConfig">
    <div class="charts" v-if="sections.length > 0">
      <div class="row" v-for="item in sections" :key="item.label">
        <div class="text chart-label">
          <div class="legend-item">
            <div class="legend-item-color" :style="`background: ${item.color};`" />
            <span>{{item.label}}</span>
          </div>
          <span>{{item.value}}</span>
        </div>
        <div class="progress" :style="`background: ${getStyleVars.emptyColor};`">
          <span :data-fill="item.value+'%'" class="progress-bar" :style="`width: ${item.value}%; background: ${item.color};`"></span>
        </div>
      </div>
    </div>
    <div v-else class="charts empty">
      <span class="chart-label">no data</span>
    </div>
  </ChartContainer>
</template>

<script>
import variables from "@/assets/styles/variables.scss";
import ChartContainer from "@/components/ChartContainer";

export default {
  name: "HorizontalBarChart",
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