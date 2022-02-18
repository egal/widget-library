<template>
  <div v-for="(dataItem, idx) in fakeData" :key="idx">
    <Chart :data="dataItem" />
  </div>

<!--  <h3>Test</h3>-->
<!--  :total-value="metricsData.totalValue" -->
<!--  <Test  class="donut-chart"-->
<!--         css-classes="diagram"-->
<!--         :background-colors="sectionsColors"-->
<!--         :data="stackedChart.data.datasets.map(i => i.data)"-->
<!--         :border-width="9"-->
<!--         :section-padding="0.2"-->
<!--         chart-id="edge-sliced-doughnut"></Test>-->
<!--  <br />-->
<!--  <Test2  class="donut-chart"-->
<!--         css-classes="diagram"-->
<!--         :background-colors="sectionsColors"-->
<!--         :data="stackedChart.data.datasets.map(i => i.data)"-->
<!--         :border-width="9"-->
<!--         :section-padding="0.2"-->
<!--         chart-id="edge-sliced-doughnut"></Test2>-->
<!--  <br />-->

<!--  <br />-->

<!--  <h3>Pie Charts</h3>-->
<!--    <div class="wrapper">-->
<!--      <DonutChart :data="mockData1" :options="donutOptions" header="Donat" description="Donat Description" :style-config="styleConfig1" center-label="Label" />-->
<!--    </div>-->
<!--    <div class="wrapper">-->
<!--      <ProgressChart :data="mockData2" :half="true" header="Half Progress Chart" description="Half Progress Chart Description" />-->
<!--    </div>-->
<!--    <div class="wrapper">-->
<!--      <ProgressChart :data="mockData2" header="Progress Chart" description="Progress Chart Description" :style-config="styleConfig2" />-->
<!--    </div>-->
<!--    <div class="wrapper">-->
<!--      <MultiProgressChart :data="mockData3" header="Multi Progress Chart" description="Multi Progress Chart Description" />-->
<!--    </div>-->
<!--    <br />-->

<!--  <h3>Bar Charts</h3>-->
<!--    <div class="wrapper">-->
<!--      <StackedBarChart :data="stackedChart" header="Stacked Bar chart" description="Stacked Bar Chart Description"></StackedBarChart>-->
<!--    </div>-->
<!--    <div class="wrapper">-->
<!--      <BarChart :data="stackedChart" header="Bar chart" description="Bar Chart Description"></BarChart>-->
<!--    </div>-->
<!--    <div class="wrapper">-->
<!--      <HorizontalBarChart :data="stackedChart"  header="Horizontal Bar chart" description="Horizontal Bar Chart Description"  />-->
<!--    </div>-->
</template>

<script >
import { defineComponent } from 'vue'
import DonutChart from "./components/DonutChart/DonutChart";
import ProgressChart from "./components/ProgressChart/ProgressChart";
import MultiProgressChart from "./components/MultiProgressChart/MultiProgressChart";
import HorizontalBarChart from "@/components/HorizontalBarChart/HorizontalBarChart";
import BarChart from "@/components/BarChart/BarChart";
import StackedBarChart from "@/components/StackedBarChart/StackedBarChart";
import variables from "@/assets/styles/variables.scss";
import Test from "@/components/Test";
import Test2 from "@/components/Test2";
import Chart from "@/components/Chart";

import fakeData from './data.json'

export default defineComponent({
  name: 'App',
  components: {
    Chart,
    Test2,
    Test,
    StackedBarChart,
    BarChart,
    HorizontalBarChart,
    MultiProgressChart,
    ProgressChart,
    DonutChart,
  },
  computed: {
    sectionsColors() {
      return [
        variables.primaryAccent,
        variables.pressedSecondary,
        variables.gray500
      ]
    },

  },
  data() {
    return {
      fakeData,

      // stackedChart: {
      //   id: 'bfdfg',
      //   type: 'bar',
      //   data: {
      //     labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
      //     datasets: [
      //       {
      //         label: 'VueJs',
      //         data: [50, 10, 44, 10],
      //
      //       },
      //       {
      //         label: 'ReactJs',
      //         data: [50, 10, 44, 10],
      //
      //       },
      //       {
      //         label: 'AngularJs',
      //         data: [50, 10, 44, 10],
      //
      //       },
      //       {
      //         label: 'EmberJs',
      //         data: [60, 7, 34, 10],
      //       },
      //       {
      //         label: 'AngularJs',
      //         data: [50, 10, 44, 10],
      //         borderRadius: 100,
      //       },
      //       {
      //         label: 'EmberJs',
      //         data: [60, 70, 34, 10],
      //         borderRadius: 5,
      //       }
      //     ]
      //   },
      //   options: {
      //     // here could be additional options
      //   }
      // },
      //
      // doughnutChart: {
      //   id: 'bar',
      //   type: 'bar',
      //   data: {
      //     labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
      //     datasets: [
      //       {
      //         label: 'Fully Rounded',
      //         data: [50, 10, 44, 10],
      //         backgroundColor: "red",
      //         borderRadius: 5,
      //       },
      //       {
      //         label: 'Small Radius',
      //         data: [60, 70, 34, 10],
      //         backgroundColor: "green",
      //         borderRadius: 5,
      //       }
      //     ]
      //   },
      //   options: {
      //     borderRadius: 10,
      //     barThickness: 7,
      //     // responsive: true,
      //
      //     // categoryPercentage: 0.5,
      //     barPercentage: 1.2,
      //
      //     plugins: {
      //       legend: {
      //         position: 'top',
      //       },
      //       title: {
      //         display: true,
      //         text: 'Chart.js Bar Chart'
      //       }
      //     }
      //
      //   }
      // },
      //
      //
      // styleConfig1: {
      //   chartSize: 200, legendFontSize: '10px', centerFontSize: '14px', fontSize: '18px', fontColor: '#66cb9f'
      // },
      // styleConfig2: {
      //   lineColor: 'green'
      // },
      //
      //
      // mockData1: [
      //   {
      //     label: '111',
      //     value: 30,
      //   },
      //   {
      //     label: '222',
      //     value: 20,
      //   },
      //   {
      //     label: '333g',
      //     value: 3,
      //     color: '#f16063'
      //   },
      // ],
      //
      // mockData2: [
      //   {
      //     label: '333',
      //     value: 60,
      //   },
      // ],
      //
      // mockData3: [
      //   {
      //     label: '111',
      //     value: 10,
      //     color: 'green'
      //   },
      //   {
      //     label: '222',
      //     value: 20,
      //   },
      //   {
      //     label: '333',
      //     value: 30,
      //   },
      //   {
      //     label: '3433',
      //     value: 3,
      //   },
      //   {
      //     label: '3333',
      //     value: 3,
      //   },
      // ],
      //
      // donutOptions: {
      //   backgroundColor: 'rgb(255, 99, 132)',
      //   borderWidth: "5px",
      //   responsive: true,
      //   maintainAspectRatio: false,
      //
      // },
      //
      //
      // barData: [
      //     // labels: ['ss', 'dd'],
      //   {
      //     label: 'Data One',
      //     backgroundColor: '#f87979',
      //     data: [40, 39, 10, 40, 39, 80, 40]
      //   },
      //   {
      //     label: 'Data 3',
      //     backgroundColor: '#f87559',
      //     data: [4, 19, 10, 20, 9, 8, 24]
      //   }
      // ],

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


//.donut-chart {
//  width: 100%;
//  max-height: 400px;
//  max-width: 400px;
//}
</style>
