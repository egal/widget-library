<template>
<!--  <ChartContainer :header="header" :description="description" :style-config="styleConfig">-->

    <div class="chart" :class="{half: options?.half}" >
      <ve-progress
          :progress="data?.datasets[0]?.data[0]"
          :angle="options?.half ? 0 : -90"
          :color="getStyleVars.lineColor"
          line="round"
          :empty-color="getStyleVars.emptyColor"
          :size="getStyleVars.size"
          :thickness="8"
          :hide-legend="true"
          :noData="data.length === 0"
          :half="options?.half"
      >

        <template #legend-caption>
          <p class="chart-value">{{ data?.datasets.length !== 0 ? data?.datasets[0]?.data[0] : ''}}</p>
          <p class="chart-label">{{ data?.datasets.length !== 0 ? data.labels[0] : 'no data'}}</p>
        </template>

      </ve-progress>

    </div>
<!--  </ChartContainer>-->
</template>

<script>
import { VeProgress } from "vue-ellipse-progress";
import ChartContainer from "@/components/ChartContainer";
import variables from "@/assets/styles/variables.scss";

export default {
  name: "SimpleProgressChart",
  components: { ChartContainer, VeProgress },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    options: {
      type: Object,
      default: () => {},
    },
    // half: {
    //   type: Boolean,
    //   default: false
    // },
    styleConfig: {
      type: Object,
      default: () => {},
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
  },

  methods: {},
  watch: {}
}
</script>

<style scoped lang="scss">
@import '../../assets/styles/variables';


.chart  {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
      -ms-flex-direction: column;
      flex-direction: column;
    -webkit-box-pack: center;
      -ms-flex-pack: center;
      justify-content: center;
    -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;

  &.half {
    /deep/ .ep-legend--container {
      top: 0;
      height: 45%;
      position: initial;
    }
  }

  .legend {
    .legend-item {
      display: inline-flex;
      display: -webkit-inline-box;
      display: -ms-inline-flexbox;
      display: inline-flex;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
    }
  }
}

/deep/ .ep-legend--value__counter {
  display: none;
}
</style>