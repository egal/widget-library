<template>
  <div class="calendar" :style="getStyleVars">
    <div class="left" :style="{ 'flex-grow': data?.isAdaptiveSize ? 1 : 0 }">
      <Controls
        :data="data"
        :month-to-display="curMonth"
        @change-month="(value) => changeMonth(value)"
      />
      <ul class="calendar__weekdays">
        <li v-for="weekday in weekdays" :key="weekday">{{ weekday }}</li>
      </ul>
      <Days
        :dates="dates"
        :current-month="curMonth"
        :selected-days="selectedDays"
        :locale="data?.locale"
        @select-date="(date) => selectDate(date)"
        @mouse-enter="(date) => queryHover(date)"
      />

      <SelectTime
        v-if="data?.timePicker"
        :config="data?.timePicker"
        :hours="getHoursFromTimestamp(data?.data?.date_from)?.hours"
        :minutes="getMinutesFromTimestamp(data?.data?.date_from)"
        :format="getHoursFromTimestamp(data?.data?.date_from)?.format"
        :is-disabled="selectedDays.length === 0"
        :select-style-config="selectStyleConfig"
        type="from"
        @select="setTime"
      />
    </div>
    <div class="right" v-if="data?.isDouble" :style="{ 'flex-grow': data?.isAdaptiveSize ? 1 : 0 }">
      <Controls
        :data="data"
        :month-to-display="nextMonth"
        @change-month="(value) => changeMonth(value)"
      />
      <ul class="calendar__weekdays">
        <li v-for="weekday in weekdays" :key="weekday">{{ weekday }}</li>
      </ul>
      <Days
        :dates="nextMonthDates"
        :current-month="nextMonth"
        :selected-days="selectedDays"
        :locale="data?.locale"
        @select-date="(date) => selectDate(date)"
        @mouse-enter="(date) => queryHover(date)"
      />

      <SelectTime
        v-if="data?.timePicker"
        :config="data?.timePicker"
        :hours="getHoursFromTimestamp(data?.data?.date_to)?.hours"
        :minutes="getMinutesFromTimestamp(data?.data?.date_to)"
        :format="getHoursFromTimestamp(data?.data?.date_to)?.format"
        :is-disabled="selectedDays.length <= 1"
        :select-style-config="selectStyleConfig"
        type="to"
        @select="setTime"
      />
    </div>
  </div>
</template>

<script lang="ts">
import SelectTime from '@/components/calendar/components/SelectTime.vue'
import Controls from '@/components/calendar/components/Controls.vue'
import Days from '@/components/calendar/components/Days.vue'

import { defineComponent } from 'vue'
import {
  addLeadingZeros,
  capitalize,
  formatToISODate,
  isDateInCurMonth,
} from '@/assets/calendar/helpers.ts'

// Тип для ISOString, формально строка, но для невозможности пробросить просто string сделан этот тип
// Нужно кастить этот тип к строке ISOString, сделано для более выраженной типизации
interface ISODateDifferentiator extends String {
  [key: string]: unknown
}
export type ISODate = ISODateDifferentiator & string

type Props = {
  '--font-family'?: string
  '--font-weight'?: string | number
  '--font-size'?: string
  '--active-color'?: string
  '--active-background-color'?: string
  '--width'?: string
}

type dataProp = {
  fontFamily?: string
  fontWeight?: string | number
  fontSize?: string
  color?: string
  activeColor?: string
  activeBackgroundColor?: string
  isAdaptiveSize: boolean
  isDouble?: boolean
  locale?: string
  timePicker?: {
    isAMPM?: boolean
    label?: string
  }
  data?: {
    date_from?: string | ISODate
    date_to?: string | ISODate
  }
}

export default defineComponent({
  name: 'OptionsCalendar',
  components: { SelectTime, Controls, Days },
  props: {
    data: {
      type: Object as () => dataProp,
      default: () => {},
    },
    // проп со стилями для ESelect
    selectStyleConfig: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      addLeadingZeros,
      capitalize,
      isDateInCurMonth,
      formatToISODate,
      modelValue: {},
      curMonth: {} as any,
      dates: [] as ISODate[],
      selectedDays: [] as string[],
      mouseMayEnter: false,
      nextMonth: {} as any,
      nextMonthDates: [] as ISODate[],
      formattedDateTimes: [] as string[],
    }
  },
  computed: {
    getStyleVars(): Props {
      return {
        '--active-color': this.data?.activeColor || '#0066FF',
        '--active-background-color': this.data?.activeBackgroundColor || '#E5F0FF',
        '--font-family': this.data?.fontFamily || 'Raleway',
        '--font-weight': this.data?.fontWeight || 'normal',
        '--font-size': this.data?.fontSize || '14px',
        '--width': this.data?.isAdaptiveSize ? '' : 'fit-content',
      }
    },

    weekdays(): string[] {
      return new Array(7)
        .fill(new Date())
        .map((weekday, i) => this.generateWeekDaysFromIterator(weekday, i))
        .map((weekday) => {
          return weekday.toLocaleString(this.data?.locale ?? 'en-US', {
            weekday: 'short',
          })
        })
        .map((weekday) => capitalize(weekday))
    },
  },
  mounted() {
    this.renderCalendarDays()
    this.setInitSelectedValues()
  },

  methods: {
    setInitSelectedValues(): void {
      if (this.data?.data?.date_from) {
        this.selectedDays.push(this.getDateFromTimestamp(this.data?.data?.date_from))
      }
      if (this.data?.data?.date_to) {
        this.selectedDays.push(this.getDateFromTimestamp(this.data?.data?.date_to))
      }

      if (this.selectedDays.length !== 0) {
        this.formattedDateTimes = this.selectedDays.map((day) => new Date(`${day}`).toISOString())
      }
    },

    renderCalendarDays(): void {
      this.dates = this.generateDates(new Date())

      const day = new Date()
      day.setDate(1)
      this.curMonth = day

      if (this.data?.isDouble) {
        const newDay = new Date()
        let dayCopy = newDay
        dayCopy.setDate(1)
        dayCopy.setMonth(newDay.getMonth() + 1)
        this.nextMonth = dayCopy

        this.nextMonthDates = this.generateDates(this.nextMonth)
      }
    },

    getDateFromTimestamp(isostr: ISODate | string): ISODate {
      return formatToISODate(new Date(isostr))
    },

    isContainsTime(isostr: string): boolean {
      return isostr.includes('T')
    },
    getHoursFromTimestamp(isostr: ISODate): {
      hours: number | string
      format: string
    } | null {
      if (!isostr || !this.isContainsTime(isostr)) {
        return null
      }

      let hours = new Date(Date.parse(isostr)).getHours()
      let format = ''

      if (this.data?.timePicker?.isAMPM) {
        format = hours >= 12 ? 'PM' : 'AM'
        hours = hours % 12
        hours = hours > 0 ? hours : 12
      }

      return {
        hours,
        format,
      }
    },

    getMinutesFromTimestamp(isostr: ISODate): string | number {
      if (!isostr || !this.isContainsTime(isostr)) {
        return ''
      }
      return new Date(Date.parse(isostr)).getMinutes()
    },

    generateWeekDaysFromIterator(weekday: Date, i: number): Date {
      return new Date(weekday.setDate(weekday.getDate() - weekday.getDay() + i))
    },

    changeMonth(shift: number): void {
      this.curMonth.setMonth(this.curMonth.getMonth() + shift)
      this.curMonth = new Date(this.curMonth)
      this.dates = this.generateDates(this.curMonth)

      if (this.data?.isDouble) {
        this.nextMonth.setMonth(this.nextMonth.getMonth() + shift)
        this.nextMonth = new Date(this.nextMonth)
        this.nextMonthDates = this.generateDates(this.nextMonth)
      }
    },

    //Генерация массива дат на месяц
    generateDates(curMonth: Date | ISODate): ISODate[] {
      return Array.from(
        new Set(
          new Array(31)
            .fill(1)
            .map(() => new Date(curMonth))
            .map((el, i) => {
              el.setDate(i + 1)
              return el
            })
            .filter((el) => isDateInCurMonth(el, curMonth))
            .map((el) => new Array(7).fill(el).map(this.generateWeekDaysFromIterator))
            .flat()
            .map(formatToISODate),
        ),
      )
    },

    //Выбор даты
    selectDate(dateString: ISODate): void {
      ;(this.selectedDays.length == 1 || this.selectedDays.length >= 2) &&
        !this.mouseMayEnter &&
        this.declineSelect()

      this.selectedDays.push(dateString)
      this.selectedDays = Array.from(new Set(this.selectedDays)).sort()
      this.mouseMayEnter = !this.mouseMayEnter

      this.formattedDateTimes = this.selectedDays.map((day) => new Date(`${day}`).toISOString())

      this.$emit('update:dateValue', this.formattedDateTimes)
    },

    declineSelect(): void {
      this.selectedDays = []
      this.formattedDateTimes = []
    },

    //Hover для даты
    queryHover(dateString: ISODate): void {
      if (this.mouseMayEnter) {
        this.selectedDays[1] = dateString
        this.selectedDays = [...this.selectedDays]
      }
    },

    setTime(val): void {
      if (!this.data?.isDouble) {
        this.formattedDateTimes.map((item) => new Date(`${item} ${val.time}`).toISOString())
      } else {
        switch (val.type) {
          case 'to':
            this.formattedDateTimes[1] = new Date(
              `${this.selectedDays[1]} ${val.time}`,
            ).toISOString()
            break
          case 'from':
          default:
            this.formattedDateTimes[0] = new Date(
              `${this.selectedDays[0]} ${val.time}`,
            ).toISOString()
            break
        }
      }

      this.$emit('update:dateValue', this.formattedDateTimes)
    },
  },
  watch: {},
})
</script>

<style scoped lang="scss">
@import '../../assets/variables.scss';

.calendar {
  display: flex;
  flex-direction: row;
  width: var(--width);
  padding: 24px 30px;
  font-family: var(--font-family);
  box-shadow: $shadow-2xl;
  border-radius: 20px;

  .left,
  .right {
    display: flex;
    flex-direction: column;
  }

  .left {
    :deep .calendar__controls-right.hidden {
      visibility: hidden;
    }
  }

  .right {
    margin-left: 40px;

    :deep .calendar__controls-left {
      visibility: hidden;
    }
  }

  :deep &__controls {
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
      font-style: normal;
      font-weight: var(--font-weight);
      font-size: var(--font-size);
      line-height: 171%;
      color: $gray-800;
    }
  }

  :deep &__weekdays {
    font-size: calc(var(--font-size) - 2px);
    font-weight: normal;
    line-height: 120%;
    color: $gray-500;
  }

  :deep &__weekdays,
  :deep &__days {
    display: grid;
    grid-template: 'a a a a a a a';
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
      position: relative;

      &::before,
      &::after {
        position: absolute;
        content: '';
        display: block;
        background-color: transparent;
        z-index: 0;
        width: 12px;
        height: 100%;
      }
    }
  }

  :deep &__days {
    margin-bottom: auto;

    li {
      font-size: var(--font-size);
      border-radius: 4px;
      font-weight: var(--font-weight);
      line-height: 150%;
      box-sizing: border-box;

      &.--current {
        border: 1px solid var(--active-color);

        color: var(--active-color);
        background-color: $base-white;
      }

      &:hover {
        cursor: pointer;
        background-color: var(--active-background-color);

        color: var(--active-color);
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
        color: var(--active-color);
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

        &.--beyond-active:nth-child(7n)::before {
          display: block;
          width: 100%;
          height: 12px;
          left: unset;
          bottom: unset;
          right: 0;
          top: -8px;
        }

        &.--beyond-active:nth-child(7n + 1)::before {
          display: block;
          width: 100%;
          height: 12px;
          left: 0;
          top: -8px;
        }

        &.--on-active:nth-child(7n)::after {
          display: none;
        }
      }

      &.--not-cur-month {
        color: $gray-300;
      }

      &.--past {
        color: $gray-500;
      }
    }
  }

  :deep .footer {
    .label {
      font-size: calc(var(--font-size) - 2px);
    }
  }
}
</style>
