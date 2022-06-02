<template>
  <div class="charts" v-if="sections.datasets?.length > 0" :style="getConfig">
    <div class="row" v-for="item in sections.datasets" :key="item.label">
      <div class="text chart-label">
        <div class="legend-item">
          <div class="legend-item-color" :style="`background: ${item.backgroundColor};`" />
          <span>{{ item.label }}</span>
        </div>
        <span>{{ item.data[0] }}</span>
      </div>
      <div class="progress" :style="`background: ${getConfig.emptyColor};`">
        <span
          :data-fill="item.data[0] + '%'"
          class="progress-bar"
          :style="`width: ${item.data[0]}%; background: ${item.backgroundColor};`"
        ></span>
      </div>
    </div>
  </div>
  <div v-else class="charts empty">
    <span class="chart-label">no data</span>
  </div>
</template>

<script>
import ChartContainer from '@/components/charts/ChartContainer'

export default {
  name: 'HorizontalBarChart',
  components: { ChartContainer },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    options: {
      type: Object,
      default: () => {},
    },
    meta: {
      type: Object,
      default: () => {},
    },
    defaultColors: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {}
  },
  computed: {
    getConfig() {
      return {
        emptyColor: this.options?.emptyColor || '#e2e8f0',
        '--bar-height': this.options?.thickness + 'px' || '7px',
      }
    },

    sections() {
      const newDatasets = this.data?.datasets.map((item, index) => {
        return {
          ...item,
          backgroundColor: item.backgroundColor || this.defaultColors[index] || 'gray',
        }
      })

      return { ...this.data, datasets: newDatasets }
    },
  },
  mounted() {},
  methods: {},
  watch: {},
}
</script>

<style scoped lang="scss">
@import './src/assets/variables';

.charts {
  width: 100%;

  .row {
    margin-bottom: 24px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &.empty {
    min-height: 225px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.text {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 0;

  .legend-item {
    margin-top: 0;
    margin-bottom: 16px;
  }
}

.progress {
  width: 100%;
  height: var(--bar-height);
  border-radius: 3px;
  overflow: hidden;
  transition: 0.3s all ease;
}

.progress-bar {
  animation: load 3s normal forwards;
  display: block;
  height: 100%;
  width: 0;
  background-size: 300% 100%;
  border-radius: 16px;
}

@keyframes load {
  0% {
    width: 0;
  }
  100% {
    //width: attr(data-fill);
  }
}
</style>
