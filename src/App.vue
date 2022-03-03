<template>
  <div v-for="(item, idx) in jsonData" :key="idx" style="margin-bottom: 40px">
    <Calendar :data="item" @update:dateValue="setDate" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Calendar from "@/components/Calendar/Calendar.vue";
import jsonData from "./data.json";

export default defineComponent({
  name: "App",
  components: { Calendar },
  data() {
    return {
      jsonData,
    };
  },
  methods: {
    setDate(selectedDays: string[]) {
      // do something
    },
  },
});
</script>

<style lang="scss"></style>
