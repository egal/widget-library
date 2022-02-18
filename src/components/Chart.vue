<template>
  <div style="width: 600px; height: 600px;">
    <ChartContainer :header="data.title" :description="data.description">
      <component :is="componentName" :data="data.data" :options="data.options" />
    </ChartContainer>
  </div>
</template>

<script>
import {chartTypes} from "@/assets/globalVariables.ts";
import DonutChart from "@/components/DonutChart/DonutChart";
import ProgressChart from "@/components/ProgressChart/ProgressChart";
import MultiProgressChart from "@/components/MultiProgressChart/MultiProgressChart";
import StackedBarChart from "@/components/StackedBarChart/StackedBarChart";
import HorizontalBarChart from "@/components/HorizontalBarChart/HorizontalBarChart";
import BarChart from "@/components/BarChart/BarChart";
import ChartContainer from "@/components/ChartContainer";

import Test from "@/components/Test";
import Test2 from "@/components/Test2";

export default {
  name: "Chart",
  components: {ChartContainer},
  props: {
    data: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      chartTypes
    }
  },
  computed: {
    componentName() {
      let name
      switch (this.data.type) {
        case chartTypes.Doughnut_bar:
          name = DonutChart
          break
        case chartTypes.Half_progress_bar:
        case chartTypes.Progress_bar:
          name = ProgressChart
          break
        case chartTypes.Multi_progress_bar:
          name = MultiProgressChart
          break
        case chartTypes.Stacked_bar:
          // name = StackedBarChart
            name = Test2
          break
        case chartTypes.Horizontal_bar:
          name = HorizontalBarChart
          break
        default:
          // name = BarChart
          name = Test
          break
      }

      return name
    }

  },
  mounted() {
  },
  methods: {},
  watch: {}
}
</script>

<style scoped lang="scss"></style>