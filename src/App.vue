<template>
  <h3>Pie Charts</h3>
    <div class="wrapper">
      <DonutChart :data="mockData1" :options="donutOptions" header="Donat" description="Donat Description" :style-config="styleConfig1" center-label="Label" />
    </div>
    <div class="wrapper">
      <ProgressChart :data="mockData2" :half="true" header="Half Progress Chart" description="Half Progress Chart Description" />
    </div>
    <div class="wrapper">
      <ProgressChart :data="mockData2" header="Progress Chart" description="Progress Chart Description" :style-config="styleConfig2" />
    </div>
    <div class="wrapper">
      <MultiProgressChart :data="mockData3" header="Multi Progress Chart" description="Multi Progress Chart Description" />
    </div>
    <br />

  <h3>Bar Charts</h3>
    <div class="wrapper">
      <StackedBarChart :data="stackedChart" header="Stacked Bar chart" description="Stacked Bar Chart Description"></StackedBarChart>
    </div>
    <div class="wrapper">
      <BarChart :data="doughnutChart" header="Bar chart" description="Bar Chart Description"></BarChart>
    </div>
    <div class="wrapper">
      <HorizontalBarChart :data="barData"  header="Horizontal Bar chart" description="Horizontal Bar Chart Description"  />
    </div>
</template>

<script >
import { defineComponent } from 'vue'
import DonutChart from "./components/DonutChart/DonutChart";
import ProgressChart from "./components/ProgressChart/ProgressChart";
import MultiProgressChart from "./components/MultiProgressChart/MultiProgressChart";
import HorizontalBarChart from "@/components/HorizontalBarChart/HorizontalBarChart";
import BarChart from "@/components/BarChart/BarChart";
import StackedBarChart from "@/components/StackedBarChart/StackedBarChart";

export default defineComponent({
  name: 'App',
  components: {
    StackedBarChart,
    BarChart,
    HorizontalBarChart,
    MultiProgressChart,
    ProgressChart,
    DonutChart,
  },
  data() {
    return {
      stackedChart: {
        id: 'bfdfg',
        type: 'bar',
        data: {
          labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
          datasets: [
            {
              label: 'VueJs',
              data: [50, 10, 44, 10],
              backgroundColor: "blue",
              borderRadius: 100,
            },
            {
              label: 'ReactJs',
              data: [50, 10, 44, 10],
              backgroundColor: "yellow",
              borderRadius: 100,
            },
            {
              label: 'AngularJs',
              data: [50, 10, 44, 10],
              backgroundColor: "red",
              borderRadius: 100,
            },
            {
              label: 'EmberJs',
              data: [60, 70, 34, 10],
              backgroundColor: "green",
              borderRadius: 5,

            }
          ]
        },
        options: {
          // here could be additional options
        }
      },

      doughnutChart: {
        id: 'bar',
        type: 'bar',
        data: {
          labels: ['VueJs', 'EmberJs', 'ReactJs', 'AngularJs'],
          datasets: [
            {
              label: 'Fully Rounded',
              data: [50, 10, 44, 10],
              backgroundColor: "red",
              borderRadius: 5,
            },
            {
              label: 'Small Radius',
              data: [60, 70, 34, 10],
              backgroundColor: "green",
              borderRadius: 5,
            }
          ]
        },
        options: {
          borderRadius: 10,
          barThickness: 7,
          // responsive: true,

          // categoryPercentage: 0.5,
          barPercentage: 1.2,

          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Chart.js Bar Chart'
            }
          }

        }
      },


      styleConfig1: {
        chartSize: 200, legendFontSize: '10px', centerFontSize: '14px', fontSize: '18px', fontColor: '#66cb9f'
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
      ],

      donutOptions: {
        backgroundColor: 'rgb(255, 99, 132)',
        borderWidth: "5px",
        responsive: true,
        maintainAspectRatio: false,

      },


      barData: [
          // labels: ['ss', 'dd'],
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 39, 10, 40, 39, 80, 40]
        },
        {
          label: 'Data 3',
          backgroundColor: '#f87559',
          data: [4, 19, 10, 20, 9, 8, 24]
        }
      ],

      // todo commonOptions (from stacked)
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
