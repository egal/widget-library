<template>
  <div class="chart-wrapper" :style="getStyleVars">
    <span class="header">{{ title }}</span>
    <p class="description">{{ description }}</p>
    <slot />
  </div>
</template>

<script>
import variables from "@/assets/styles/variables.scss";

export default {
  name: "ChartContainer",
  components: {},
  props: {
    options: {
      type: Object,
      default: () => {},
    },
    title: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
  },
  data() {
    return {};
  },
  computed: {
    getStyleVars() {
      return {
        "--font-family": this.options?.fontFamily || variables.openSans,
        "--main-font-color": this.options?.fontColor || variables.gray800,
        "--second-font-color":
          this.options?.secondFontColor || variables.gray500,
        "--main-font-size": this.options?.titleFontSize || variables.p5FontSize,
        "--second-font-size":
          this.options?.labelsFontSize || variables.p6FontSize,
        "--background-color":
          this.options?.backgroundColor || variables.baseWhite,
      };
    },
  },
  mounted() {},
  methods: {},
  watch: {},
};
</script>

<style scoped lang="scss">
@import "src/assets/styles/variables";

.chart-wrapper {
  font-family: var(--font-family);
  padding: 24px;
  background: var(--background-color);
  box-shadow: $shadow-sm;
  border-radius: 16px;

  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;

  min-width: -webkit-fit-content;
  min-width: -moz-fit-content;
  min-width: fit-content;
}

.header {
  margin: 0 0 8px 0;
  -ms-flex-item-align: start;
  align-self: flex-start;
  font-weight: bold;
  font-size: var(--main-font-size);
  color: var(--main-font-color);
}

.description {
  margin: 0 0 24px 0;
  align-self: flex-start;
  font-weight: normal;
  font-size: var(--main-font-size);
  color: var(--second-font-color);
}

// center text styles
/deep/ .chart {
  &-value {
    font-weight: bold;
    font-size: var(--second-font-size);
    color: var(--main-font-color);
    margin: 0;
  }

  &-label {
    margin: 5px 0 0 0;
    font-size: var(--second-font-size);
    color: var(--second-font-color);
  }
}

// legend styles
/deep/ .cdc-legend,
/deep/ .legend {
  margin-top: 20px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}

/deep/ .cdc-legend-item,
/deep/ .legend-item {
  font-style: normal;
  font-weight: $medium-font-weight;
  font-size: var(--second-font-size);
  color: var(--main-font-color);
  margin: 4px 16px 0 0;

  &:last-child {
    margin-right: 0;
  }
}

/deep/ .cdc-legend-item-color,
/deep/ .legend-item-color {
  height: 8px;
  width: 8px;
  border-radius: 50%;
  margin-right: 8px;
  display: inline-block;
}
</style>
