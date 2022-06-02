<template>
  <div class="wrapper" v-for="(dataItem, idx) in fakeData" :key="idx">
    <Chart :data="dataItem" />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Chart from '@/components/charts/Chart.vue'
import fakeData from './assets/charts/data.json'
import CurvesChart from '@/components/charts/CurvesChart/CurvesChart'
export default defineComponent({
  name: 'App',
  components: {
    CurvesChart,
    Chart,
  },
  computed: {},
  data() {
    return {
      fakeData,
    }
  },
  mounted() {},
  methods: {},
})
</script>

<style lang="scss">
@import 'src/assets/variables';
.wrapper {
  margin-bottom: 30px;
  width: 375px;
}
</style>
