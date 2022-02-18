<template>
<!--  <ChartContainer  :header="header" :description="description" :style-config="styleConfig">-->
    <div style="width: 400px;">
      <vue3-chart-js
          type="bar"
          :data="dataset"
          :options="options"
      ></vue3-chart-js>
    </div>
<!--  </ChartContainer>-->
</template>

<script>
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'
import ChartContainer from "@/components/ChartContainer";
import variables from "@/assets/styles/variables.scss";

export default {
  name: "BarChart",
  components: {
    ChartContainer,
    Vue3ChartJs
  },
  props: {
    data: {
      type: Object,
      default: () => {}
    },
    // options: {
    //   type: Object,
    //   default: () => {}
    // },
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
  },
  data() {
    return {
      colors: [
        variables.primaryAccent,
        variables.pressedSecondary,
        variables.gray500
      ],

      options: {
        // barThickness: 7,
        borderRadius: 10,

        categoryPercentage: 0.9,
        barPercentage: 0.5,


        plugins: {
          legend: {
            position: 'top',
            align: 'start',
            fullWidth: true,
            maintainAspectRatio: false,
            labels: {
              boxWidth: 5,
              usePointStyle: true, // circle points
            },
          },
        },


        scales: {
          x: {

            display: true,
            grid: {
              display: false,
              drawBorder: false,
            },
            ticks: {
              fontColor: '#1865c9',
              // fontFamily: 'Poppins',
              padding: 4,
              // padding: 14,
              color: (context) => context.tick && context.tick.major && '#00ff04',
              font: function(context) {
                if (context.tick && context.tick.major) {
                  return {
                    weight: 'bold'
                  };
                }
              }
            },
          },
          y: {

            // padding: 34,
            grid: {
              display: true,
              drawBorder: false,
              borderDash: [4, 3],
              zeroLineBorderDash: [4, 3],
              zeroLineColor: '#E4ECF7',
              color: '#E4ECF7',
            },


            ticks: {
              // fontColor: '#A0AEC0',
              // fontFamily: 'Poppins',
              maxTicksLimit: 6,
              minTicksLimit: 6,
              min: 0,
              max: 100,
              padding: 0,
            },
          }
        },

        layout: {
          // padding: {
          //   top: 2,
          //   bottom: 2,
          // },
        },
        hover: {
          mode: 'nearest',
        },
        responsive: true,


      }
    }
  },
  computed: {
    dataset() {
     const newDatasets = this.data?.datasets.map((item, index) => {
        return {...item, backgroundColor: item.backgroundColor || this.colors[index] || 'gray'}
      })
      return {...this.data, datasets: newDatasets}
    }
  },
  mounted() {
  },
  methods: {},
  watch: {}
}
</script>

<style scoped lang="scss"></style>