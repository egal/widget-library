<template>
  <div v-for="(item, idx) in jsonData" :key="idx" style="margin-bottom: 40px">
    <Calendar :data="item" @update:dateValue="setDate" />
  </div>
</template>

<script lang="ts">
import Calendar from "@/components/Calendar/Calendar.vue";
import jsonData from "./data.json";
import { defineComponent } from "vue";
export default defineComponent({
  name: "App",
  components: {
    Calendar,
  },
  data() {
    return {
      jsonData,
    };
  },
  mounted() {},
  methods: {
    setDate(selectedDays: string[]) {
      // do something
    },
  },
});
</script>

<style lang="scss">
.a {
  display: grid;
  grid-row-gap: 30px;
}
</style>
