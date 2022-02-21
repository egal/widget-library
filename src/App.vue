<template>
  <div class="wrapper" v-for="(dataItem, idx) in fakeData" :key="idx">
    <Chart :data="dataItem" />
  </div>

  <hr />

  <div class="wrapper">
    <Chart :data="fakeData[2]" />
  </div>
</template>

<script>
import { defineComponent } from "vue";
import Chart from "@/components/Chart";

import fakeData from "./data.json";

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
});
</script>

<style lang="scss">
@import "src/assets/styles/variables";

.wrapper {
  margin-bottom: 30px;
  width: 375px;
}
</style>
