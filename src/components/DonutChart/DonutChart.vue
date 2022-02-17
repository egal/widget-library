<template>
  <ChartContainer :header="header" :description="description" :style-config="styleConfig">
    <div class="chart">
      <vc-donut background="#fff" :foreground="getStyleVars.emptyColor"
                :size="getStyleVars.size" unit="px" :thickness="10"
                has-legend legend-placement="bottom"
                :sections="sections" :total="100"
                :start-angle="90"
                >
        <p class="chart-value">{{ centerValue }}</p>
        <p class="chart-label">{{ sections.length !== 0 ? centerLabel : 'no data'}}</p>
      </vc-donut>
    </div>
  </ChartContainer>
</template>

<script >
import ChartContainer from "@/components/ChartContainer";
import variables from "@/assets/styles/variables.scss";

export default {
  name: "SimplePieChart",
  components: { ChartContainer },
  props: {
    data: {
      type: Array,
      default: () => [],
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
      type: String,
      default: ""
    },
    centerLabel: {
      type: String,
      default: ""
    },
  },
  data() {
    return {
      displayValue: '',
      displayLabel: '',
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

    sections() {
      return this.data.map((item, index) => {
        return {...item, color: item.color || this.colors[index] || 'gray'}
      } )
    },

  },
  mounted() {
  },
  methods: {
  },
  watch: {}
}
</script>

<style scoped lang="scss">
@import '../../assets/styles/variables';

</style>