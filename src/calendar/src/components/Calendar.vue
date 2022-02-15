<template>
  <div class="calendar">
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

<script lang="ts" setup>
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";

import { ref, defineEmits } from "vue";

interface ISODateDifferentiator extends String {
  [key: string]: unknown;
}
export type ISODate = ISODateDifferentiator & string;

const generateWeekDaysFromIterator = (weekday: Date, i: number): Date =>
  new Date(weekday.setDate(weekday.getDate() - weekday.getDay() + i + 1));

const capitalize = (word: string): string =>
  word.split("").shift()?.toUpperCase() + word.slice(1) + "";

const formatToISODate = (el: Date): ISODate =>
  el.toISOString().slice(0, 10) as ISODate;

const isDateInCurMonth = (date: ISODate | Date, curMonth: ISODate | Date) =>
  new Date(date).getMonth() === new Date(curMonth).getMonth();

const emit = defineEmits<{ (e: "selected", payload: ISODate[]): void }>();

const locale = ref<string>("us");

const generateDates = (curMonth: Date): ISODate[] =>
  Array.from(
    new Set(
      new Array(31)
        .fill(1)
        .map(() => new Date(curMonth))
        .map((el, i) => {
          el.setDate(i + 1);
          return el;
        })
        .filter((el) => isDateInCurMonth(el, curMonth))
        .map((el) => new Array(7).fill(el).map(generateWeekDaysFromIterator))
        .flat()
        .map(formatToISODate)
    )
  );

const dates = ref<ISODate[]>(generateDates(new Date()));

const weekdays = ref<string[]>(
  new Array(7)
    .fill(new Date())
    .map((weekday, i) => generateWeekDaysFromIterator(weekday, i - 1))
    .map((weekday) =>
      weekday.toLocaleString(locale.value, {
        weekday: "short",
      })
    )
    .map((weekday) => capitalize(weekday))
);

const isInDateRange = (day: ISODate): boolean => {
  const [min, max] = selectedDays.value
    .map((el) => new Date(el).getTime())
    .sort();
  const dayTime = new Date(day).getTime();
  return dayTime >= min && dayTime <= max;
};

const isDateSelected = (day: ISODate) => selectedDays.value.includes(day);

const isBeyondOrOnDateSelected = (
  day: ISODate,
  mode: "beyond" | "on" = "beyond"
): boolean => {
  const [max, min] = selectedDays.value
    .map((el) => new Date(el))
    .sort((a, b) => a.getTime() - b.getTime());

  if (
    !isInDateRange(day) ||
    day === formatToISODate(max) ||
    day === formatToISODate(min)
  ) {
    return false;
  }

  return (mode === "on" ? min : max).getDay() === new Date(day)?.getDay();
};

const curMonth = ref(
  (() => {
    const day = new Date();
    day.setDate(1);
    return day;
  })()
);

const changeMonth = (shift: number): void => {
  curMonth.value.setMonth(curMonth.value.getMonth() + shift);
  curMonth.value = new Date(curMonth.value);
  dates.value = generateDates(curMonth.value);
};

const selectedDays = ref<ISODate[]>([] as ISODate[]);

const displayOnlyDay = (dateString: ISODate): string =>
  new Date(dateString).toLocaleString(locale.value, {
    day: "numeric",
  });

const displayOnlyMonth = (dateString: ISODate): string =>
  new Date(dateString).toLocaleString(locale.value, {
    month: "long",
    year: "numeric",
  });

let mouseMayEnter = false;

const selectDate = (dateString: ISODate): void => {
  selectedDays.value.length >= 2 && !mouseMayEnter && declineSelect();
  selectedDays.value.push(dateString);
  selectedDays.value = Array.from(new Set(selectedDays.value)).sort();
  emit("selected", selectedDays.value);
  mouseMayEnter = mouseMayEnter ? false : true;
};

const declineSelect = (): void => {
  selectedDays.value = [];
};

const queryHover = (dateString: ISODate): void => {
  if (mouseMayEnter) {
    selectedDays.value[1] = dateString;
    selectedDays.value = [...selectedDays.value];
  }
};
</script>

<style scoped lang="scss">
.calendar {
  display: flex;
  flex-direction: column;
  width: fit-content;
  padding: 24px 30px;

  &__controls {
    display: flex;
    list-style: none;
    justify-content: space-between;
    align-items: center;
    margin: 0;
    padding: 0;
    height: 36px;

    &-left,
    &-right {
      display: flex;
      width: 36px;
      height: 36px;
      justify-content: center;
      align-items: center;
    }
  }

  &__weekdays,
  &__days {
    display: grid;
    grid-template: "a a a a a a a";
    list-style: none;
    padding: 0;
    margin: 0;
    column-gap: 4px;

    li {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 40px;
      height: 40px;
    }
  }

  &__days {
    li {
      &.--active {
        background-color: blue;
        border-radius: 4px;
        z-index: 1;
      }

      &.--in-range {
        position: relative;
        background-color: turquoise;

        &::before,
        &::after {
          position: absolute;
          content: "";
          display: block;
          background-color: turquoise;
          z-index: 0;
          width: 12px;
          height: 100%;
        }

        &::before {
          left: -8px;
          bottom: 0;
        }

        &::after {
          right: -8px;
          top: 0;
        }

        &:nth-child(7n + 1)::before {
          display: none;
        }

        &:nth-child(7n)::after {
          display: none;
        }

        &.--beyond-active:nth-child(7n)::before {
          display: block;
          width: 100%;
          height: 12px;
          left: unset;
          bottom: unset;
          right: 0;
          top: -8px;
        }

        &.--on-active:nth-child(7n + 1)::before {
          display: block;
          width: 50%;
          height: 12px;
          left: 0px;
          bottom: -8px;
        }

        &.--beyond-active:nth-child(7n + 1)::before {
          display: block;
          width: 100%;
          height: 12px;
          left: 0;
          top: -8px;
        }

        &.--on-active:nth-child(7n)::after {
          display: block;
          width: 50%;
          height: 12px;
          right: 0;
          left: unset;
          bottom: -8px;
          top: unset;
        }
      }
    }
  }
}
</style>
