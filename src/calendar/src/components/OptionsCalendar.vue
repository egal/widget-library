<template>
  <div class="calendar" :style="getVars">
    <ul class="calendar__controls">
      <li class="calendar__controls-left" @click="changeMonth(-1)">
        <BootstrapIcon icon="chevron-left" />
      </li>
      <li class="calendar__controls-month">
        {{ capitalize(displayOnlyMonth(curMonth)) }}
      </li>
      <li class="calendar__controls-right" @click="changeMonth(1)">
        <BootstrapIcon icon="chevron-right" />
      </li>
    </ul>
    <ul class="calendar__weekdays">
      <li v-for="weekday in weekdays" :key="weekday">{{ weekday }}</li>
    </ul>
    <ul class="calendar__days">
      <li
        v-for="date in dates"
        :key="date"
        :class="{
          '--active': isDateSelected(date),
          '--in-range': isInDateRange(date) && !isDateSelected(date),
          '--beyond-active': isBeyondOrOnDateSelected(date, 'beyond'),
          '--on-active': isBeyondOrOnDateSelected(date, 'on'),
          '--not-cur-month': isDateInCurMonth(date, curMonth),
        }"
        @click="selectDate(date)"
        @mouseenter="queryHover(date)"
      >
        {{ displayOnlyDay(date) }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import { ref, defineEmits, defineProps, computed, toRefs } from "vue";
import { variables, getFont, getFontWeight } from "@/helpers/config";

export default {
  name: "OptionsCalendar",
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {
    getVars() {
      "--color": color?.value || variables.gray600,
          "--active-color": activeColor?.value || variables.primaryAccent,
          "--active-background-color":
      activeBackgroundColor?.value || variables.accentOpacity1,
          "--font": getFont(font?.value),
          "--font-weight": getFontWeight(weight?.value),
    }
  },
  mounted() {},
  beforeUnmount() {},
  methods: {},
  watch: {},
};
</script>

<style scoped lang="scss"></style>
