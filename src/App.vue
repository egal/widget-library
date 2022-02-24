<template>
  <div class="wrapper" v-for="(dataItem, idx) in fakeData" :key="idx">
    <Chart :data="dataItem" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Chart from "@/components/Chart.vue";
import fakeData from "../src/data.json";
import CurvesChart from "@/components/CurvesChart/CurvesChart";

export default defineComponent({
  name: "App",
  components: {
    CurvesChart,
    Chart,
  },
  computed: {},
  data() {
    return {
      fakeData,
    };
  },
  mounted() {},
  methods: {},
});
</script>

<style lang="scss">
@import "src/assets/styles/variables";

.wrapper {
  margin-bottom: 30px;
  width: 375px;
}
</style>
