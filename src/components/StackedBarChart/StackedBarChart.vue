<template>
  <ChartContainer :header="header" :description="description" :style-config="styleConfig">
    <div style="width: 330px; height: 250px;">
      <vue3-chart-js
          :id="data.id"
          :type="data.type"
          :data="data.data"
          :options="options"
      ></vue3-chart-js>
    </div>
  </ChartContainer>
</template>

<script>
import variables from "@/assets/styles/variables.scss";
import ChartContainer from "@/components/ChartContainer";
import Vue3ChartJs from '@j-t-mcc/vue3-chartjs'

export default {
  name: "StackedBarChart",
  components: {ChartContainer, Vue3ChartJs},
  props: {
    data: {
      type: Object,
      default: () => {},
    },
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
      id: 'stacked',
      type: 'bar',

      options: {
        barThickness: 7,
        borderRadius: 10,

        // categoryPercentage: 0.2,
        // barPercentage:  0.7,


        plugins: {

          legend: {
            position: 'top',
            // align: 'center',
            fullWidth: true,
            maintainAspectRatio: false,

            labels: {
              boxWidth: 5,
              padding: 15,
              usePointStyle: true, // circle points
            },
          },
        },


        scales: {
          x: {
            stacked: true,
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
            stacked: true,
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
          padding: {
            top: 2,
            bottom: 2,
          },
        },
        hover: {
          mode: 'nearest',
        },
        responsive: true,
        maintainAspectRatio: false,

      }
    }
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