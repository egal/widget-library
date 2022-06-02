<template>
  <div class="legend" v-if="datasets.length !== 0">
    <div class="legend-item" v-for="item in datasets" :key="item">
      <div
        class="legend-item-color"
        :style="`background: ${item.backgroundColor || item.borderColor};`"
      />
      <span>{{ item.label }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Legend",
  components: {},
  props: {
    datasets: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  beforeDestroy() {},
  methods: {},
  watch: {},
};
</script>

<style scoped lang="scss">
.legend {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin-bottom: 24px;
  margin-top: 0;
}
</style>
