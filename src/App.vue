<template>
  <div v-for="(item, idx) in data" :key="idx" style="margin-bottom: 40px">
    <Calendar :data="item" @update:dateValue="setDate" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Calendar from "@/components/Calendar/Calendar.vue";
import data from "./data.json";

export default defineComponent({
  name: "App",
  components: { Calendar },
  data() {
    return {
      data,
    };
  },
  methods: {
    setDate(v) {
      console.log("setDate", v);
    },
  },
});
</script>

<style lang="scss"></style>
