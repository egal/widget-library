<template>
  <ChartContainer :header="header" :description="description" :style-config="styleConfig">
    <div class="chart">
      <ve-progress
         :data="circles"
         :angle="-90"
         color="#0066FF"
         line="round"
         :empty-color="getStyleVars.emptyColor"
         :size="getStyleVars.size"
         :thickness="6"
         :hide-legend="false"
         :noData="false"
         :gap="3"
        >

        <template #legend-caption>
          <p class="chart-value">{{ centerValue }}</p>
          <p class="chart-label">{{ circles.length !== 0 ? centerLabel : 'no data'}}</p>
        </template>

      </ve-progress>

      <div class="legend">
        <span class="legend-item" v-for="item in circles" :key="item.label">
          <span class="legend-item-color" :style="{backgroundColor: item.color}" />
          <span>{{item.label}}</span>
        </span>
      </div>
    </div>
  </ChartContainer>
</template>

<script>
import { VeProgress } from "vue-ellipse-progress";
import ChartContainer from "@/components/ChartContainer";
import variables from "@/assets/styles/variables.scss";

export default {
  name: "MultiProgressChart",
  components: {ChartContainer, VeProgress },
  props: {
    data: {
      type: Array,
      default: () => []
    },
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
    centerValue: {
      type: String || Number,
      default: ""
    },
    centerLabel: {
      type: String || Number,
      default: ""
    },
  },
  data() {
    return {
      colors: [
        variables.primaryAccent,
        variables.pressedSecondary,
        variables.gray500,
      ],
    }
  },
  computed: {
    getStyleVars() {
      return {
        emptyColor: this.styleConfig?.emptyColor || variables.gray300,
        size: this.styleConfig?.chartSize || 150
      }
    },

    circles() {
      let circlesArray = []
      if (this.data.length) {
        circlesArray =  this.data.map((item, index) => {
          return {
            progress: item.value,
            label: item.label,
            color: item.color || this.colors[index] || 'gray',
            thickness: 8 - index
          }
        })

      } else {
        circlesArray = [
          {
            progress: 0,
            color: '',
            thickness: 8,
            label: ''
          },
          {
            progress: 0,
            color: '',
            thickness: 7,
            label: ''
          },
          {
            progress: 0,
            color: '',
            thickness: 6,
            label: ''
          }
        ]
      }
      return circlesArray
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


.chart {
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

</style>