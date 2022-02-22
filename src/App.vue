<template>
  <div class="wrapper" v-for="(dataItem, idx) in fakeData" :key="idx">
    <Chart :data="dataItem" />
  </div>
  <div class="wrapper">
    <Chart :data="fakeData[2]" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Chart from "@/components/Chart.vue";
import fakeData from "../src/data.json";

export default defineComponent({
  name: "App",
  components: {
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
