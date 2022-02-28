<template>
  <!--  <Calendar />-->
  <!--  <br />-->
  <OptionsCalendar
    :is-double="true"
    @update:modelValue="setDate"
    @select-time="onSelectTime"
  />
  <br />
  <OptionsCalendar @update:modelValue="setDate" @select-time="onSelectTime" />
  <br />
</template>

<script lang="ts">
import { defineComponent } from "vue";

// import Calendar from "./components/Calendar.vue";
import OptionsCalendar from "@/components/OptionsCalendar.vue";

export default defineComponent({
  name: "App",
  components: { OptionsCalendar },
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
