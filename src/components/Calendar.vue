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

<script lang="ts" setup>
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";

import { ref, defineEmits, defineProps, computed, toRefs } from "vue";

import { variables, getFont, getFontWeight } from "@/helpers/config";

// Тип для ISOString, формально строка, но для невозможности пробросить просто string сделан этот тип
// Нужно кастить этот тип к строке ISOString, сделано для более выраженной типизации
interface ISODateDifferentiator extends String {
  [key: string]: unknown;
}
export type ISODate = ISODateDifferentiator & string;

type Props = {
  modelValue?: ISODate;
  font?: "Inter" | "Open Sans" | "Raleway";
  weight?: "medium" | "regular" | "bold";
  color?: string;
  activeColor?: string;
  activeBackgroundColor?: string;
};

const props = defineProps<Props>();

const { modelValue, font, weight, color, activeColor, activeBackgroundColor } =
  toRefs(props);

// Функции-помошники, используются в основном в map или filter
const generateWeekDaysFromIterator = (weekday: Date, i: number): Date =>
  new Date(weekday.setDate(weekday.getDate() - weekday.getDay() + i + 1));

const capitalize = (word: string): string =>
  word.split("").shift()?.toUpperCase() + word.slice(1) + "";

const formatToISODate = (el: Date): ISODate =>
  el.toISOString().slice(0, 10) as ISODate;

const isDateInCurMonth = (date: ISODate | Date, curMonth: ISODate | Date) =>
  new Date(date).getMonth() === new Date(curMonth).getMonth();

//Эммиты
const emit =
  defineEmits<{ (e: "update:modelValue", payload: ISODate[]): void }>();

//Локаль для форматирования даты
const locale = ref<string>("us");

//Генерация массива дятна месяц
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

//Генерация дней недели
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

//Определяет, находится ли дата в диапазоне междувыбранных дат
const isInDateRange = (day: ISODate): boolean => {
  const [min, max] = selectedDays.value
    .map((el) => new Date(el).getTime())
    .sort();
  const dayTime = new Date(day).getTime();
  return dayTime >= min && dayTime <= max;
};

//Определяет, выбрана ли дата
const isDateSelected = (day: ISODate) => selectedDays.value.includes(day);

//Определяет, находится ли дата над или под выбранной датой, нужно для верстки
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

//Дата для текущего месяца
const curMonth = ref(
  (() => {
    const day = new Date();
    day.setDate(1);
    return day;
  })()
);

//Функция для смены месяца
const changeMonth = (shift: number): void => {
  curMonth.value.setMonth(curMonth.value.getMonth() + shift);
  curMonth.value = new Date(curMonth.value);
  dates.value = generateDates(curMonth.value);
};

const selectedDays = ref<ISODate[]>([] as ISODate[]);

//Отобрадает только день, даты хранятся в ISODate
const displayOnlyDay = (dateString: ISODate): string =>
  new Date(dateString).toLocaleString(locale.value, {
    day: "numeric",
  });

//Отобрадает только месяц и год, даты хранятся в ISODate
const displayOnlyMonth = (dateString: ISODate): string =>
  new Date(dateString).toLocaleString(locale.value, {
    month: "long",
    year: "numeric",
  });

let mouseMayEnter = false;

//Выбор даты
const selectDate = (dateString: ISODate): void => {
  selectedDays.value.length >= 2 && !mouseMayEnter && declineSelect();
  selectedDays.value.push(dateString);
  selectedDays.value = Array.from(new Set(selectedDays.value)).sort();
  emit("update:modelValue", selectedDays.value);
  mouseMayEnter = mouseMayEnter ? false : true;
};

const declineSelect = (): void => {
  selectedDays.value = [];
};

//Hover для даты
const queryHover = (dateString: ISODate): void => {
  if (mouseMayEnter) {
    selectedDays.value[1] = dateString;
    selectedDays.value = [...selectedDays.value];
  }
};

const getVars = computed(() => ({
  "--color": color?.value || variables.gray600,
  "--active-color": activeColor?.value || variables.primaryAccent,
  "--active-background-color":
    activeBackgroundColor?.value || variables.accentOpacity1,
  "--font": getFont(font?.value),
  "--font-weight": getFontWeight(weight?.value),
}));
</script>

<style scoped lang="scss">
@import "../assets/scss/variables.scss";

.calendar {
  display: flex;
  flex-direction: column;
  width: fit-content;
  padding: 24px 30px;
  font-family: var(--font);
  box-shadow: $shadow-2xl;
  border-radius: 20px;

  &__controls {
    display: flex;
    list-style: none;
    justify-content: space-between;
    align-items: center;
    font-size: $p5-font-size;
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

  &__weekdays {
    font-size: $p6-font-size;
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
      transition: 0.3s;
      position: relative;

      &::before,
      &::after {
        position: absolute;
        content: "";
        display: block;
        background-color: transparent;
        z-index: 0;
        width: 12px;
        height: 100%;
        transition: 0.2s;
      }
    }
  }

  &__days {
    li {
      font-size: $p5-font-size;

      &.--active {
        background-color: var(--active-color);
        color: white;
        border-radius: 4px;
        z-index: 1;
      }

      &.--in-range {
        position: relative;
        background-color: var(--active-background-color);
        color: $primary-accent;

        &::before,
        &::after {
          background-color: var(--active-background-color);
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
