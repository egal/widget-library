<template>
  <div class="calendar" :style="getVars">
    <!--    <test :type="isDouble ? 'left' : ''" />-->
    <!--    <test v-if="isDouble" type="right" />-->
    <div class="left">
      <ul class="calendar__controls">
        <li
          class="calendar__controls-left"
          @click="changeMonth(isDouble ? -2 : -1)"
        >
          <BootstrapIcon icon="chevron-left" />
        </li>
        <li class="calendar__controls-month">
          {{ capitalize(displayOnlyMonth(curMonth)) }}
        </li>
        <li
          class="calendar__controls-right"
          @click="changeMonth(1)"
          v-if="!isDouble"
        >
          <BootstrapIcon icon="chevron-right" />
        </li>
        <!--        todo !!-->
        <li class="calendar__controls-right" v-if="isDouble"></li>
      </ul>
      <ul class="calendar__weekdays">
        <li v-for="weekday in weekdays" :key="weekday">{{ weekday }}</li>
      </ul>
      <ul class="calendar__days">
        <li
          v-for="date in dates"
          :key="date"
          :class="{
            '--current':
              isDateInCurMonth(date, curMonth) &&
              currentDay &&
              date === currentDay,
            '--active': isDateSelected(date),
            '--in-range': isInDateRange(date) && !isDateSelected(date),
            '--not-cur-month': !isDateInCurMonth(date, curMonth),
          }"
          @click="isDateInCurMonth(date, curMonth) && selectDate(date)"
          @mouseenter="queryHover(date)"
        >
          {{ displayOnlyDay(date) }}
        </li>
      </ul>

      <CalendarInput :is-am-pm="false" @select="setTime" />
    </div>
    <div class="right" v-if="isDouble">
      <ul class="calendar__controls">
        <li class="calendar__controls-left"></li>
        <li class="calendar__controls-month">
          {{ capitalize(displayOnlyMonth(nextMonth)) }}
        </li>
        <li class="calendar__controls-right" @click="changeMonth(2)">
          <BootstrapIcon icon="chevron-right" />
        </li>
      </ul>
      <ul class="calendar__weekdays">
        <li v-for="weekday in weekdays" :key="weekday">{{ weekday }}</li>
      </ul>
      <ul class="calendar__days">
        <li
          v-for="date in nextMonthDates"
          :key="date"
          :class="{
            '--current':
              isDateInCurMonth(date, nextMonth) &&
              currentDay &&
              date === currentDay,
            '--active': isDateSelected(date),
            '--in-range': isInDateRange(date) && !isDateSelected(date),
            '--not-cur-month': !isDateInCurMonth(date, nextMonth),
          }"
          @click="isDateInCurMonth(date, nextMonth) && selectDate(date)"
          @mouseenter="queryHover(date)"
        >
          {{ displayOnlyDay(date) }}
        </li>
      </ul>

      <CalendarInput :is-am-pm="true" @select="setTime" />
    </div>
  </div>
</template>

<script lang="ts">
import CalendarInput from "@/components/CalendarInput/CalendarInput.vue";
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import { variables, getFont, getFontWeight } from "@/helpers/config.js";
import { defineComponent } from "vue";

// Тип для ISOString, формально строка, но для невозможности пробросить просто string сделан этот тип
// Нужно кастить этот тип к строке ISOString, сделано для более выраженной типизации
interface ISODateDifferentiator extends String {
  [key: string]: unknown;
}
export type ISODate = ISODateDifferentiator & string;

type Props = {
  "--font"?: "Inter" | "Open Sans" | "Raleway";
  "--font-weight"?: "medium" | "regular" | "bold";
  "--color"?: string;
  "--active-color"?: string;
  "--active-background-color"?: string;
};

export default defineComponent({
  name: "OptionsCalendar",
  components: { CalendarInput, BootstrapIcon },
  props: {
    isDouble: {
      type: Boolean,
      default: false,
    },
    modelValue: {
      type: [Object, Array],
      default: () => [],
    },
    //  todo footer prop OR label + input props
  },
  data() {
    return {
      // modelValue: {} as ISODate,
      font: "",
      weight: "",
      color: "",
      activeColor: "",
      activeBackgroundColor: "",

      curMonth: null as any,
      dates: [] as ISODate[],

      locale: "ru-RU",
      selectedDays: [] as ISODate[],
      mouseMayEnter: false,

      //  todo double vars
      //  todo or prev month
      nextMonth: null as any,
      nextMonthDates: [] as ISODate[],

      //  todo today ???
      today: null as Date | null,
      currentDay: "",
    };
  },
  computed: {
    getVars(): Props {
      return {
        "--color": this.color || variables.gray600,
        "--active-color": this.activeColor || variables.primaryAccent,
        "--active-background-color":
          this.activeBackgroundColor || variables.accentOpacity1,
        "--font": getFont(this.font),
        "--font-weight": getFontWeight(this.weight),
      };
    },
    weekdays(): string[] {
      return new Array(7)
        .fill(new Date())
        .map((weekday, i) => this.generateWeekDaysFromIterator(weekday, i))
        .map((weekday) => {
          return weekday.toLocaleString(this.locale, {
            weekday: "short",
          });
        })
        .map((weekday) => this.capitalize(weekday));
    },
  },
  mounted() {
    this.today = new Date();
    this.dates = this.generateDates(new Date());

    const day = new Date();
    day.setDate(1);
    this.curMonth = day;

    if (this.isDouble) {
      //todo x
      const x = new Date();
      let test = x;
      test.setDate(1);
      test.setMonth(x.getMonth() + 1);
      this.nextMonth = test;

      this.nextMonthDates = this.generateDates(this.nextMonth);
    }

    //todo get today date
    let m = `${this.today.getMonth() + 1}`;
    if (m.length < 2) {
      m = `0${m}`;
    }
    const ttt = `${this.today.getFullYear()}-${m}-${this.today.getDate()}`;
    this.currentDay = ttt;
  },
  // beforeUnmount() {},
  methods: {
    // Функции-помошники, используются в основном в map или filter
    isDateInCurMonth(date: ISODate | Date, curMonth: ISODate | Date) {
      return new Date(date).getMonth() === new Date(curMonth).getMonth();
    },
    generateWeekDaysFromIterator(weekday: Date, i: number): Date {
      return new Date(
        weekday.setDate(weekday.getDate() - weekday.getDay() + i)
      );
    },
    formatToISODate(el: Date): ISODate {
      return el.toISOString().slice(0, 10) as ISODate;
    },

    capitalize(word: string): string {
      return word.split("").shift()?.toUpperCase() + word.slice(1) + "";
    },

    //Определяет, находится ли дата в диапазоне междувыбранных дат
    isInDateRange(day: ISODate): boolean {
      const [min, max] = this.selectedDays
        .map((el: string | number | Date) => new Date(el).getTime())
        .sort();
      const dayTime = new Date(day).getTime();
      return dayTime >= min && dayTime <= max;
    },
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
        .map((el) => new Date(el))
        .sort((a, b) => a.getTime() - b.getTime());

      if (
        !this.isInDateRange(day) ||
        day === this.formatToISODate(max) ||
        day === this.formatToISODate(min)
      ) {
        return false;
      }

      return (mode === "on" ? min : max).getDay() === new Date(day)?.getDay();
    },

    changeMonth(shift: number): void {
      this.curMonth.setMonth(this.curMonth.getMonth() + shift);
      this.curMonth = new Date(this.curMonth);

      if (this.isDouble) {
        this.nextMonth.setMonth(this.nextMonth.getMonth() + shift);
        this.nextMonthDates = this.generateDates(this.nextMonth);
      }
      this.dates = this.generateDates(this.curMonth);
    },

    //Генерация массива дятна месяц
    generateDates(curMonth: Date): ISODate[] {
      return Array.from(
        new Set(
          new Array(31)
            .fill(1)
            .map(() => new Date(curMonth))
            .map((el, i) => {
              el.setDate(i + 1);
              return el;
            })
            .filter((el) => this.isDateInCurMonth(el, curMonth))
            .map((el) =>
              new Array(7).fill(el).map(this.generateWeekDaysFromIterator)
            )
            .flat()
            .map(this.formatToISODate)
        )
      );
    },

    //Отобрадает только день, даты хранятся в ISODate
    displayOnlyDay(dateString: ISODate): string {
      return new Date(dateString).toLocaleString(this.locale, {
        day: "numeric",
      });
    },

    //Отобрадает только месяц и год, даты хранятся в ISODate
    displayOnlyMonth(dateString: ISODate): string {
      return new Date(dateString).toLocaleString(this.locale, {
        month: "long",
        year: "numeric",
      });
    },

    //Выбор даты
    selectDate(dateString: ISODate): void {
      this.selectedDays.length >= 2 &&
        !this.mouseMayEnter &&
        this.declineSelect();

      this.selectedDays.push(dateString);
      this.selectedDays = Array.from(new Set(this.selectedDays)).sort();
      // todo "update:modelValue"??
      // this.$emit("update:modelValue", selectedDays.value);

      // this.mouseMayEnter = this.mouseMayEnter ? false : true;
      this.mouseMayEnter = !this.mouseMayEnter;

      // todo { date:} or string
      const res =
        this.selectedDays.length === 1
          ? { from: new Date(this.selectedDays[0]).getTime() / 1000 }
          : {
              from: new Date(this.selectedDays[0]).getTime() / 1000,
              to: new Date(this.selectedDays[1]).getTime() / 1000,
            };
      this.$emit("update:modelValue", res);
      //  todo how to send dates
    },

    declineSelect(): void {
      this.selectedDays = [];
    },

    //Hover для даты
    queryHover(dateString: ISODate): void {
      if (this.mouseMayEnter) {
        this.selectedDays[1] = dateString;
        this.selectedDays = [...this.selectedDays];
      }
    },

    setTime(val): void {
      // todo timestamp ?
      // todo check if am pm
      // todo emit
      this.$emit("select-time", val);
    },
  },
  watch: {},
});
</script>

<style scoped lang="scss">
@import "../assets/scss/variables.scss";

.calendar {
  display: flex;
  flex-direction: row;
  width: fit-content;
  padding: 24px 30px;
  font-family: var(--font);
  box-shadow: $shadow-2xl;
  border-radius: 20px;

  .left {
  }
  .right {
    margin-left: 40px;
  }

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

      .bi {
        color: $gray-600;
        transition: 0.3s ease color;
      }

      &:hover {
        cursor: pointer;

        .bi {
          color: $gray-800;
        }
      }
    }

    &-month {
      // TODO FF?
      //font-family: "Poppins";
      font-family: "Open Sans";

      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 24px;
      /* identical to box height, or 171% */

      color: $gray-800;
    }
  }

  &__weekdays {
    font-size: $p6-font-size;

    // TODO
    //font-family: Open Sans;
    font-weight: normal;
    //line-height: 120%;
    /* or 14px */

    color: $gray-500;
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
      //transition: 0.3s;
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
        //transition: 0.2s;
      }
    }
  }

  &__days {
    li {
      font-size: $p5-font-size;
      //transition: 0.2s ease all;
      border-radius: 4px;

      // todo styles
      font-family: "Open Sans";
      font-style: normal;
      font-weight: normal;

      line-height: 150%;
      /* identical to box height, or 21px */

      &.--current {
        border: 1px solid $primary-accent;
        color: $pressed-accent;
        background-color: $base-white;
      }

      &:hover {
        cursor: pointer;
        //todo color ????
        background-color: $accent-opacity-1;
        color: $pressed-accent;
      }

      &.--active {
        background-color: var(--active-color);
        color: white;
        z-index: 1;
      }

      &.--in-range {
        position: relative;
        border-radius: 0;
        background-color: var(--active-background-color);
        color: $primary-accent;
        border: none;
        transition: 0s all;

        &:hover {
          cursor: default;
        }

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

        //&.--beyond-active:nth-child(7n)::before {
        //  display: block;
        //  width: 100%;
        //  height: 12px;
        //  left: unset;
        //  bottom: unset;
        //  right: 0;
        //  top: -8px;
        //}
        //
        //&.--on-active:nth-child(7n + 1)::before {
        //  display: block;
        //  width: 50%;
        //  height: 12px;
        //  left: 0px;
        //  bottom: -8px;
        //}
        //
        //&.--beyond-active:nth-child(7n + 1)::before {
        //  display: block;
        //  width: 100%;
        //  height: 12px;
        //  left: 0;
        //  top: -8px;
        //}
        //
        //&.--on-active:nth-child(7n)::after {
        //  display: none;
        //}
      }

      &.--not-cur-month {
        cursor: default;
        color: $gray-300;
        background-color: $base-white;

        &:before,
        &:after {
          display: none;
          // background-color: $base-white;
        }

        &:hover {
          background-color: initial;
        }
      }
    }
  }
}
</style>
