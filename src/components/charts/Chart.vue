<template>
  <ChartContainer :title="data.title" :description="data.description" :options="data.options">
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
import { chartTypes } from '@/assets/charts/globalVariables.ts'
import DoughnutChart from '@/components/charts/DoughnutChart/DoughnutChart'
import ProgressChart from '@/components/charts/ProgressChart/ProgressChart'
import MultiProgressChart from '@/components/charts/MultiProgressChart/MultiProgressChart'
import HorizontalBarChart from '@/components/charts/HorizontalBarChart/HorizontalBarChart'
import ChartContainer from '@/components/charts/ChartContainer.vue'
import VerticalBarChart from '@/components/charts/VerticalBarChart/VerticalBarChart'
import StackedBarChart from '@/components/charts/StackedBarChart/StackedBarChart'
import LineChart from '@/components/charts/LineChart/LineChart'
import CurvesChart from '@/components/charts/CurvesChart/CurvesChart'

export default {
  name: 'Chart',
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
      defaultColors: ['#0066ff', '#76acfb', '#a0aec0'],
    }
  },
  computed: {
    componentName() {
      let name
      switch (this.data.type) {
        case chartTypes.Doughnut:
          name = DoughnutChart
          break
        case chartTypes.Half_progress_bar:
        case chartTypes.Progress_bar:
          name = ProgressChart
          break
        case chartTypes.Multi_progress_bar:
          name = MultiProgressChart
          break
        case chartTypes.Stacked_bar:
          name = StackedBarChart
          break
        case chartTypes.Horizontal_bar:
          name = HorizontalBarChart
          break
        case chartTypes.Line_chart:
          name = LineChart
          break
        case chartTypes.Curves_chart:
          name = CurvesChart
          break
        case chartTypes.Vertical_bar:
        default:
          name = VerticalBarChart
          break
      }

      return name
    },
  },
  mounted() {},
  methods: {},
  watch: {},
}
</script>

<style scoped lang="scss"></style>
