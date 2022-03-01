<template>
  <div v-for="(item, idx) in data" :key="idx" style="margin-bottom: 40px">
    <OptionsCalendar
      :data="item"
      @update:modelValue="setDate"
      @select-time="onSelectTime"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import OptionsCalendar from "@/components/OptionsCalendar.vue";

import data from "./data.json";

export default defineComponent({
  name: "App",
  components: { OptionsCalendar },
  data() {
    return {
      data,
    };
  },
  methods: {
    setDate(v) {
      console.log("setDate", v);
    },
    onSelectTime(v) {
      console.log("onSelectTime", v);
    },
  },
});
</script>

<style lang="scss"></style>
