<template>
  <ul class="calendar__days">
    <li
      v-for="date in dates"
      :key="date"
      :class="{
        '--current':
          isDateInCurMonth(date, currentMonth) &&
          currentDay &&
          date === currentDay,
        '--active': isDateSelected(date),
        '--beyond-active': isBeyondOrOnDateSelected(date, 'beyond'),
        '--on-active': isBeyondOrOnDateSelected(date, 'on'),
        '--in-range': isInDateRange(date) && !isDateSelected(date),
        '--not-cur-month': !isDateInCurMonth(date, currentMonth),
      }"
      @click="
        isDateInCurMonth(date, currentMonth) && $emit('select-date', date)
      "
      @mouseenter="$emit('mouse-enter', date)"
    >
      {{ displayOnlyDay(date) }}
    </li>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { ISODate } from "@/components/Calendar/Calendar.vue";
import { formatToISODate, isDateInCurMonth } from "@/assets/scripts/helpers";

export default defineComponent({
  name: "Days",
  components: {},
  props: {
    dates: {
      type: Array as () => ISODate[],
      default: () => [],
    },
    currentMonth: {
      type: Object as () => ISODate | Date,
      default: null,
    },
    selectedDays: {
      type: Array,
      default: () => [],
    },
    locale: {
      type: String,
      default: "en-US",
    },
  },
  data() {
    return {
      isDateInCurMonth,
      formatToISODate,

      currentDay: "",
    };
  },
  computed: {},
  mounted() {
    const today = new Date();

    this.currentDay = formatToISODate(today);
  },
  methods: {
    //Определяет, выбрана ли дата
    isDateSelected(day: ISODate): boolean {
      return this.selectedDays.includes(day);
    },

    //Определяет, находится ли дата над или под выбранной датой, нужно для верстки
    isBeyondOrOnDateSelected(
      day: ISODate,
      mode: "beyond" | "on" = "beyond"
    ): boolean {
      const [max, min] = this.selectedDays
        .map((el: any) => new Date(el))
        .sort((a, b) => a.getTime() - b.getTime());

      if (
        !this.isInDateRange(day) ||
        day === formatToISODate(max) ||
        day === formatToISODate(min)
      ) {
        return false;
      }

      return (mode === "on" ? min : max).getDay() === new Date(day)?.getDay();
    },

    //Определяет, находится ли дата в диапазоне междувыбранных дат
    isInDateRange(day: ISODate): boolean {
      const [min, max] = this.selectedDays
        .map((el: any) => new Date(el).getTime())
        .sort();
      const dayTime = new Date(day).getTime();
      return dayTime >= min && dayTime <= max;
    },

    //Отобрадает только день, даты хранятся в ISODate
    displayOnlyDay(dateString: ISODate): string {
      return new Date(dateString).toLocaleString(this.locale, {
        day: "numeric",
      });
    },
  },
  watch: {},
});
</script>

<style scoped lang="scss"></style>
