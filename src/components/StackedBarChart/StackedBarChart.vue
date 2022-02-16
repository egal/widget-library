<template>
  <ChartContainer></ChartContainer>
</template>

<script>
import variables from "@/assets/styles/variables.scss";
import ChartContainer from "@/components/ChartContainer";

export default {
  name: "StackedBarChart",
  components: {ChartContainer},
  props: {},
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

</style>