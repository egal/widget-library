<template>
  <ChartContainer
    :title="data.title"
    :description="data.description"
    :options="data.options"
  >
    <component
      :is="componentName"
      :data="data.data"
      :options="data.options"
      :meta="data.meta ?? {}"
      :theme-colors="defaultColors"
    />
  </ChartContainer>
</template>

<script>
import { chartTypes } from "@/assets/globalVariables.ts";
import DoughnutChart from "@/components/DoughnutChart/DoughnutChart";
import ProgressChart from "@/components/ProgressChart/ProgressChart";
import MultiProgressChart from "@/components/MultiProgressChart/MultiProgressChart";
import HorizontalBarChart from "@/components/HorizontalBarChart/HorizontalBarChart";
import ChartContainer from "@/components/ChartContainer";
import VerticalBarChart from "@/components/VerticalBarChart/VerticalBarChart";
import StackedBarChart from "@/components/StackedBarChart/StackedBarChart";
import LineChart from "@/components/LineChart/LineChart";
import CurvesChart from "@/components/CurvesChart/CurvesChart";
import variables from "@/assets/styles/variables.scss";

export default {
  name: "Chart",
  components: { ChartContainer },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      chartTypes,
      defaultColors: [
        variables.primaryAccent,
        variables.pressedSecondary,
        variables.gray500,
      ],
    };
  },
  computed: {
    componentName() {
      let name;
      switch (this.data.type) {
        case chartTypes.Doughnut:
          name = DoughnutChart;
          break;
        case chartTypes.Half_progress_bar:
        case chartTypes.Progress_bar:
          name = ProgressChart;
          break;
        case chartTypes.Multi_progress_bar:
          name = MultiProgressChart;
          break;
        case chartTypes.Stacked_bar:
          name = StackedBarChart;
          break;
        case chartTypes.Horizontal_bar:
          name = HorizontalBarChart;
          break;
        case chartTypes.Line_chart:
          name = LineChart;
          break;
        case chartTypes.Curves_chart:
          name = CurvesChart;
          break;
        case chartTypes.Vertical_bar:
        default:
          name = VerticalBarChart;
          break;
      }

      return name;
    },
  },
  mounted() {},
  methods: {},
  watch: {},
};
</script>

<style scoped lang="scss"></style>
