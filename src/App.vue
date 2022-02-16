<template>
  <div class="wrapper">
    <DonutChart :data="mockData1" chart-header="Donat" chart-description="Donat Description" :style-config="styleConfig1" center-label="Label" />
  </div>
  <div class="wrapper">
    <ProgressChart :data="mockData2" :half="true" chart-header="Half Progress Chart" chart-description="Half Progress Chart Description" />
  </div>
  <div class="wrapper">
    <ProgressChart :data="mockData2" chart-header="Progress Chart" chart-description="Progress Chart Description" :style-config="styleConfig2" />
  </div>
  <div class="wrapper">
    <MultiProgressChart :data="mockData3" chart-header="Multi Progress Chart" chart-description="Multi Progress Chart Description" />
  </div>
</template>

<script >
import { defineComponent } from 'vue'
import DonutChart from "./components/DonutChart/DonutChart";
import ProgressChart from "./components/ProgressChart/ProgressChart";
import MultiProgressChart from "./components/MultiProgressChart/MultiProgressChart";



export default defineComponent({
  name: 'App',
  components: {
    MultiProgressChart,
    ProgressChart,
    DonutChart,
  },
  data() {
    return {
      styleConfig1: {
        chartSize: 200, legendFontSize: '10px', centerFontSize: '14px', fontSize: '18px'
      },
      styleConfig2: {
        lineColor: 'green'
      },
      

      mockData1: [
        {
          label: '111',
          value: 30,
        },
        {
          label: '222',
          value: 20,
        },
        {
          label: '333g',
          value: 3,
          color: '#f16063'
        },
      ],

      mockData2: [
        {
          label: '333',
          value: 60,
        },
      ],

      mockData3: [
        {
          label: '111',
          value: 10,
          color: 'green'
        },
        {
          label: '222',
          value: 20,
        },
        {
          label: '333',
          value: 30,
        },
        {
          label: '3433',
          value: 3,
        },
        {
          label: '3333',
          value: 3,
        },
      ]
    }
  }
})
</script>

<style lang="scss">
@import 'src/assets/styles/variables';

.wrapper {
  margin-bottom: 30px;
  width: 375px;
}
</style>
