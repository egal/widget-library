<template>
  <div class="calendar">
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
          '--over-active': isOverOrOnDateSelected(date),
          '--on-active': isOverOrOnDateSelected(date, 'on'),
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

const emit = defineEmits<{ (e: "selected", payload: ISODate[]): void }>();

const dates = ref<ISODate[]>(
  Array.from(
    new Set(
      new Array(31)
        .fill(1)
        .map(() => new Date())
        .map((el, i) => {
          el.setUTCDate(i + 1);
          return el;
        })
        .filter((el) => el.getMonth() === new Date().getMonth())
        .map((el) => new Array(7).fill(el).map(generateWeekDaysFromIterator))
        .flat()
        .map(formatToISODate)
    )
  )
);

const weekdays = ref<string[]>(
  new Array(7)
    .fill(new Date())
    .map((weekday, i) => generateWeekDaysFromIterator(weekday, i))
    .map((weekday) =>
      weekday.toLocaleString("ru", {
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

const isOverOrOnDateSelected = (
  day: ISODate,
  mode: "over" | "on" = "over"
): boolean => {
  const [max, min] =
    mode === "over"
      ? selectedDays.value.map((el) => new Date(el)).sort()
      : selectedDays.value
          .map((el) => new Date(el))
          .sort()
          .reverse();

  if (!isInDateRange(day)) {
    return false;
  }

  return (function generateValues(current): boolean {
    return formatToISODate(current) === day &&
      formatToISODate(current) !== formatToISODate(max) &&
      formatToISODate(current) !== formatToISODate(min)
      ? true
      : isInDateRange(formatToISODate(current))
      ? mode === "over"
        ? generateValues(new Date(current.getTime() - 1000 * 60 * 60 * 24 * 7))
        : generateValues(new Date(current.getTime() + 1000 * 60 * 60 * 24 * 7))
      : false;
  })(max);
};

const selectedDays = ref<ISODate[]>(["2022-02-13", "2022-02-28"] as ISODate[]);

const displayOnlyDay = (dateString: ISODate): string =>
  new Date(dateString).toLocaleString("ru", {
    day: "numeric",
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

        &.--over-active:nth-child(7n)::before {
          width: 100%;
          height: 12px;
          left: 0px;
          bottom: -8px;
        }

        &.--over-active:nth-child(7n + 1)::before {
          display: block;
          width: 50%;
          height: 12px;
          left: 0px;
          bottom: -8px;
        }

        &.--on-active:nth-child(7n + 1)::after {
          width: 100%;
          height: 12px;
          right: 0;
          top: -8px;
        }

        &.--on-active:nth-child(7n)::after {
          display: block;
          width: 50%;
          height: 12px;
          right: 0;
          top: -8px;
        }
      }
    }
  }
}
</style>
