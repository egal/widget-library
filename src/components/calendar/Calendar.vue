<template>
  <div class="calendar-wrapper" v-click-outside="close">
    <div
      :class="`date-inputs date-inputs--${mergedData?.inputData?.size ?? 'sm'} ${
        imitateInputsFocus ? 'focused' : ''
      } ${mergedData.showInput && mergedData.timePicker && !mergedData.isDouble ? 'doubled' : ''}`"
      :style="getInputFocusStyle"
    >
      <EInput
        class="calendar__input left"
        :style-config="mergedInputStyles"
        :data="mergedLeftInputData"
        v-if="mergedData.showInput"
        @error="(error) => handleInputError(error, 'date')"
        @keyup.enter="(event) => handleModelUpdate(event.target.value, 'date')"
        @mouseup="open"
      />
      <EInput
        class="calendar__input right"
        :class="{ ampm: this?.mergedData?.timePicker?.isAMPM }"
        :style-config="mergedInputStyles"
        :data="mergedRightInputData"
        v-if="mergedData.showInput && mergedData.timePicker && !mergedData.isDouble"
        @error="(error) => handleInputError(error, 'time')"
        @keyup.enter="(event) => handleModelUpdate(event.target.value, 'time')"
        @mouseup="open"
      />
    </div>

    <div class="calendar" :style="getStyleVars" v-if="isOpen">
      <div class="left">
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
          :locale="mergedData?.locale"
          :is-range-fully-completed="formattedDateTimes.length === 2"
          :is-double="mergedData.isDouble"
          @select-date="(date) => selectDate(date)"
          @mouse-enter="(date) => queryHover(date)"
        />

        <SelectTime
          v-if="mergedData?.timePicker && !mergedData.isDouble"
          :config="mergedData?.timePicker"
          :hours="getHoursFromTimestamp(leftSelectTime)?.hours"
          :minutes="
            getHoursFromTimestamp(leftSelectTime)?.hours && !getMinutesFromTimestamp(leftSelectTime)
              ? '00'
              : getMinutesFromTimestamp(leftSelectTime)
          "
          :format="getHoursFromTimestamp(leftSelectTime)?.format ?? ''"
          :is-disabled="isSelectTimeDisabled"
          :select-style-config="selectStyleConfig"
          :select-data="mergedSelectData"
          :clear="isClearTimeSelect"
          type="time"
          @select="setTime"
        />
      </div>

      <div class="right" v-if="mergedData?.isDouble">
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
          :locale="mergedData?.locale"
          :is-range-fully-completed="formattedDateTimes.length === 2"
          :is-double="mergedData.isDouble"
          @select-date="(date) => selectDate(date)"
          @mouse-enter="(date) => queryHover(date)"
        />

        <!--        <SelectTime-->
        <!--          v-if="mergedData?.timePicker && !mergedData.isDouble"-->
        <!--          :config="mergedData?.timePicker"-->
        <!--          :hours="getHoursFromTimestamp(rightSelectTime)?.hours"-->
        <!--          :minutes="-->
        <!--            getHoursFromTimestamp(rightSelectTime)?.hours &&-->
        <!--            !getMinutesFromTimestamp(rightSelectTime)-->
        <!--              ? '00'-->
        <!--              : getMinutesFromTimestamp(rightSelectTime)-->
        <!--          "-->
        <!--          :format="getHoursFromTimestamp(rightSelectTime)?.format ?? ''"-->
        <!--          :is-disabled="isSelectTimeDisabled"-->
        <!--          :select-style-config="selectStyleConfig"-->
        <!--          :select-data="mergedSelectData"-->
        <!--          :clear="isClearTimeSelect"-->
        <!--          :minutes-step="mergedData?.minuteIncrement"-->
        <!--          type="to"-->
        <!--          @select="setTime"-->
        <!--        />-->
      </div>
    </div>
  </div>
</template>

<script>
import SelectTime from '@/components/calendar/components/SelectTime.vue'
import Controls from '@/components/calendar/components/Controls.vue'
import Days from '@/components/calendar/components/Days.vue'
import EInput from '@/components/inputs/Input/EInput'
import vClickOutside from 'click-outside-vue3'
import { defineComponent } from 'vue'
import {
  addLeadingZeros,
  capitalize,
  formatToISODate,
  isDateInCurMonth,
} from '@/assets/calendar/helpers'

export default defineComponent({
  name: 'Calendar',
  components: { SelectTime, Controls, Days, EInput },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  emits: ['close', 'open', 'update:dateValue', 'onError:inputValue'],
  props: {
    data: {
      type: Object,
      default: () => {},
    },

    styleConfig: {
      type: Object,
      default: () => {},
    },
    selectStyleConfig: {
      type: Object,
      default: () => {},
    },
    inputStyleConfig: {
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
      curMonth: {},
      dates: [],
      selectedDays: [],
      mouseMayEnter: false,
      nextMonth: {},
      nextMonthDates: [],
      formattedDateTimes: [],
      isOpen: false,
      leftInputValue: '',
      rightInputValue: '',
      isClearTimeSelect: false,
      leftSelectTime: this.data?.date?.date_from ?? undefined,
      rightSelectTime: this.data?.date?.date_to ?? undefined,
      localeOptions: {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      },
      imitateInputsFocus: false,
    }
  },
  computed: {
    mergedSelectData() {
      return Object.assign({}, this.data?.timeSelectData)
    },

    mergedLeftInputData() {
      return Object.assign(
        {
          id: 'calendar-input--date',
          type: 'text',

          size: 'sm',
          clearable: false,
          iconLeft: 'calendar',
          readonly: true,
        },
        this.data?.inputData,
        { modelValue: this.leftInputValue },
      )
    },

    mergedRightInputData() {
      return Object.assign(
        {
          id: 'calendar-input--time',
          type: 'text',
          size: 'sm',
          clearable: false,
          iconLeft: 'clock',
          readonly: true,
        },
        this.data?.inputData,
        { modelValue: this.rightInputValue },
      )
    },

    mergedData() {
      return Object.assign(
        {
          inputData: {},
          showInput: true,
          isRange: false,
          isDouble: false,
          locale: 'en-US',
          // localeOptions: {
          //   year: '2-digit',
          //   month: 'short',
          //   day: 'numeric',
          // },
          timePicker: undefined,
          date: {
            date_from: '',
            date_to: '',
          },
          minuteIncrement: 1,
        },
        this.data,
      )
    },

    // Селекты заблокированы если выбрано меншье чем 1 дата (или меньше чем 2 для диапазона дат)
    isSelectTimeDisabled() {
      return (
        ((this.mergedData.isRange || this.mergedData.isDouble) &&
          Object.keys(this.selectedDays).length < 2) ||
        (!this.mergedData.isRange && Object.keys(this.selectedDays).length < 1)
      )
    },

    getStyleVars() {
      return {
        '--active-color': this.styleConfig?.activeColor || '#0066FF',
        '--active-background-color': this.styleConfig?.activeBackgroundColor || '#e6f0ff',
        '--current-day-border-color': this.styleConfig?.currentDayBorderColor || '#b3d1ff',
        '--font-family': this.styleConfig?.fontFamily || 'Raleway',
        '--font-weight': this.styleConfig?.fontWeight || '500',
        '--font-size': this.styleConfig?.fontSize || '14px',
      }
    },

    getInputFocusStyle() {
      return {
        '--focus-input-border-color': this.mergedInputStyles?.focusBorderColor || '#76ACFB',
        '--border-radius': this.styleConfig?.borderRadius || '6px',
        '--filled-input-background-color': this.styleConfig?.filledBackgroundColor || '#DEEBFC',
      }
    },

    mergedInputStyles() {
      return Object.assign(
        {
          valueColor: '#718096',
          valueFontWeight: '400',
          fontFamily: this.styleConfig?.fontFamily,
          fontSize: '10px',
        },
        this.inputStyleConfig,
      )
    },

    weekdays() {
      return new Array(7)
        .fill(new Date())
        .map((weekday, i) => this.generateWeekDaysFromIterator(weekday, i))
        .map((weekday) => {
          return weekday.toLocaleDateString(this.mergedData?.locale ?? 'en-US', {
            weekday: 'short',
          })
        })
        .map((weekday) => capitalize(weekday))
    },
  },
  mounted() {
    this.setInitSelectedValues()

    if (this.mergedData.showInput === false) {
      this.isOpen = true
    }
  },

  methods: {
    close() {
      this.imitateInputsFocus = false
      this.isOpen = false
      this.$emit('close')
    },

    open() {
      if (this.isOpen) {
        this.close()
        return
      }
      this.imitateInputsFocus = true
      this.isClearTimeSelect = false
      this.isOpen = true
      this.$emit('open', this.isOpen)
    },

    // Обновляет значения выбранного времени\даты после изменений в инпуте
    handleModelUpdate(value, inputType = 'date') {
      this.isClearTimeSelect = false

      // check if Invalid Date:
      if (new Date(value) instanceof Date && isNaN(new Date(value).getTime())) {
        this.handleInputError('Invalid Date', inputType)
        return
      }

      if (inputType === 'date') {
        this.selectedDays[0] = this.getDateFromTimestamp(new Date(value))
        this.formattedDateTimes[0] = new Date(value).toISOString()
        this.leftSelectTime = new Date(value).toISOString()
      } else if (inputType === 'time') {
        this.selectedDays[1] = this.getDateFromTimestamp(new Date(value))
        this.formattedDateTimes[1] = new Date(value).toISOString()
        this.rightSelectTime = new Date(value).toISOString()
      }

      this.$emit('update:dateValue', this.formattedDateTimes)
    },

    // Clear all fields if error
    handleInputError(error, inputType = 'date') {
      if (inputType === 'date') {
        this.formattedDateTimes[0] = null
        this.leftInputValue = ''
        this.leftSelectTime = undefined
      } else if (inputType === 'time') {
        this.formattedDateTimes[1] = null
        this.rightSelectTime = undefined
      }

      this.selectedDays = []
      this.isClearTimeSelect = true
      // this.$emit('onError:inputValue', error)
    },

    // Устанавливает начальные значения даты и времени (из пропсов)
    setInitSelectedValues() {
      const dateOptions = this.localeOptions

      if (this.mergedData?.timePicker === undefined) {
        delete dateOptions.hour12
        delete dateOptions.hour
        delete dateOptions.minute
      }

      if (!this.mergedData?.date?.date_to && !this.mergedData?.date?.date_from) {
        this.renderCalendarDays()
      }

      if (this.mergedData?.date?.date_from) {
        dateOptions.hour12 = this.mergedData?.timePicker?.isAMPM
        this.curMonth = new Date(this.mergedData?.date?.date_from)
        this.dates = this.generateDates(this.curMonth)

        if (this.isContainsTime(this.mergedData?.date?.date_from)) {
          dateOptions.hour12 = this.mergedData?.timePicker?.isAMPM
          dateOptions.hour = '2-digit'
          dateOptions.minute = '2-digit'

          const fromISOToLocaleDate = new Date(this.mergedData?.date?.date_from).toLocaleString(
            this.mergedData.locale,
            dateOptions,
          )

          let [date, year, time] = fromISOToLocaleDate.split(', ')

          this.leftInputValue = date + ', ' + year
          this.rightInputValue = time
        } else {
          this.leftInputValue = new Date(this.mergedData?.date?.date_from).toLocaleString(
            this.mergedData.locale,
            dateOptions,
          )
        }

        this.selectedDays.push(this.getDateFromTimestamp(this.mergedData?.date?.date_from))
      }

      if (this.mergedData?.date?.date_to) {
        dateOptions.hour12 = this.mergedData?.timePicker?.isAMPM
        this.nextMonth = new Date(this.mergedData?.date?.date_to)
        this.nextMonthDates = this.generateDates(this.nextMonth)

        if (this.isContainsTime(this.mergedData?.date?.date_to)) {
          dateOptions.hour12 = this.mergedData?.timePicker?.isAMPM
          dateOptions.hour = '2-digit'
          dateOptions.minute = '2-digit'
        }

        this.leftInputValue +=
          ' - ' +
          new Date(this.mergedData?.date?.date_to).toLocaleString(
            this.mergedData.locale,
            dateOptions,
          )
        this.selectedDays.push(this.getDateFromTimestamp(this.mergedData?.date?.date_to))
      } else {
        let dayCopy = new Date()
        dayCopy.setDate(1)
        dayCopy.setMonth(this.curMonth.getMonth() + 1)
        this.nextMonth = dayCopy

        this.nextMonthDates = this.generateDates(this.nextMonth)
      }

      if (this.selectedDays.length !== 0) {
        this.formattedDateTimes = this.selectedDays.map((day) => new Date(`${day}`).toISOString())
      }
    },

    renderCalendarDays() {
      this.dates = this.generateDates(new Date())

      const day = new Date()
      day.setDate(1)
      this.curMonth = day

      const inputDate = new Date().toLocaleString(this.mergedData?.locale ?? 'en-US', {
        ...this.localeOptions,
        hour12: this.mergedData?.timePicker?.isAMPM,
        hour: '2-digit',
        minute: '2-digit',
      })

      let [date, year, time] = inputDate.split(', ')
      this.leftInputValue = date + ', ' + year
      this.rightInputValue = time

      if (this.mergedData?.isDouble) {
        const newDay = new Date()
        let dayCopy = newDay
        dayCopy.setDate(1)
        dayCopy.setMonth(newDay.getMonth() + 1)
        this.nextMonth = dayCopy

        this.nextMonthDates = this.generateDates(this.nextMonth)
      }
    },

    getDateFromTimestamp(isostr) {
      return formatToISODate(new Date(isostr))
    },

    isContainsTime(isostr) {
      return isostr.includes('T')
    },

    getHoursFromTimestamp(isostr) {
      if (!isostr || !this.isContainsTime(isostr)) {
        return null
      }

      let hours = new Date(Date.parse(isostr)).getHours()
      let format = ''

      if (this.mergedData?.timePicker?.isAMPM) {
        format = hours >= 12 ? 'PM' : 'AM'
        hours = hours % 12
        hours = hours > 0 ? hours : 12
        hours = hours < 10 ? `0${hours}` : hours
      }

      return {
        hours,
        format,
      }
    },

    getMinutesFromTimestamp(isostr) {
      if (!isostr || !this.isContainsTime(isostr)) {
        return ''
      }

      let minutes = new Date(Date.parse(isostr)).getMinutes()
      minutes = minutes < 10 ? `0${minutes}` : minutes
      return minutes
    },

    generateWeekDaysFromIterator(weekday, i) {
      return new Date(weekday.setDate(weekday.getDate() - weekday.getDay() + i))
    },

    changeMonth(shift) {
      this.curMonth.setMonth(this.curMonth.getMonth() + shift)
      this.curMonth = new Date(this.curMonth)
      this.dates = this.generateDates(this.curMonth)

      if (this.mergedData?.isDouble) {
        this.nextMonth.setMonth(this.nextMonth.getMonth() + shift)
        this.nextMonth = new Date(this.nextMonth)
        this.nextMonthDates = this.generateDates(this.nextMonth)
      }
    },

    //Генерация массива дат на месяц
    generateDates(curMonth) {
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

    setInputValues(options) {
      let tempFormattedDateTimes = undefined

      tempFormattedDateTimes = this.formattedDateTimes.map((date) =>
        new Date(date).toLocaleString(this.mergedData.locale, options),
      )

      if (tempFormattedDateTimes.length !== 0) {
        if (tempFormattedDateTimes.length === 1) {
          // сли в дате есть время (т.е. переданы соответсвующие поции) - записать его в правй инпут
          if (options?.hour || options?.hour12 || options?.minute) {
            let [inputDate, inputYear, inputTime] = tempFormattedDateTimes[0].split(', ')
            this.leftInputValue = inputDate + ', ' + inputYear
            this.rightInputValue = inputTime
          } else {
            this.leftInputValue = tempFormattedDateTimes[0]
          }
        } else if (tempFormattedDateTimes.length > 1) {
          this.leftInputValue = tempFormattedDateTimes[0] + ' - ' + tempFormattedDateTimes[1]
        }
      } else {
        this.leftInputValue = ''
      }
    },

    //Выбор даты
    selectDate(dateString) {
      this.isClearTimeSelect = false

      if (this.selectedDays.length >= 2 && !this.mouseMayEnter) {
        this.declineSelect()
      }

      if (this.selectedDays.length === 1 && !this.mergedData.isRange) {
        this.declineSelect()
      }

      this.selectedDays.push(dateString)
      this.selectedDays = Array.from(new Set(this.selectedDays)).sort()

      if (!this.mergedData.isRange && !this.mergedData.isDouble) {
        this.mouseMayEnter = false
      } else {
        this.mouseMayEnter = !this.mouseMayEnter
      }

      this.formattedDateTimes = this.selectedDays.map((day) => new Date(`${day}`).toISOString())

      this.setInputValues(this.localeOptions)

      this.$emit('update:dateValue', this.formattedDateTimes)
    },

    declineSelect() {
      this.selectedDays = []
      this.formattedDateTimes = []
    },

    //Hover для даты
    queryHover(dateString) {
      if (this.mouseMayEnter) {
        this.selectedDays[1] = dateString
        this.selectedDays = [...this.selectedDays]
      }
    },

    setTime(val) {
      this.isClearTimeSelect = false

      if (!this.mergedData?.isDouble) {
        this.formattedDateTimes = this.selectedDays.map((item) =>
          new Date(`${item} ${val.time}`).toISOString(),
        )
      } else {
        this.formattedDateTimes[0] = new Date(`${this.selectedDays[0]} ${val.time}`).toISOString()
        // this.rightSelectTime = val.time
      }

      this.setInputValues({
        ...this.localeOptions,
        hour12: this.mergedData?.timePicker?.isAMPM,
        hour: '2-digit',
        minute: '2-digit',
      })
      this.$emit('update:dateValue', this.formattedDateTimes)
    },
  },
  watch: {},
})
</script>

<style scoped lang="scss">
@import '../../assets/variables.scss';
.calendar-wrapper {
  position: relative;
  width: fit-content;
  font-feature-settings: 'pnum' on, 'lnum' on;

  .calendar__input {
    margin-bottom: 8px;

    ::v-deep(input) {
      &:hover {
        cursor: pointer;
      }
    }
  }

  .date-inputs {
    display: flex;
    border-radius: var(--border-radius);
    margin-bottom: 8px;

    &--lg {
      .left {
        ::v-deep(input) {
          width: 165px;
          padding-right: 0;
        }
      }
    }
    &--md {
      .left {
        ::v-deep(input) {
          width: 144px;
          padding-right: 0;
        }
      }
    }
    &--sm {
      .left {
        ::v-deep(input) {
          width: 99px;
          padding-right: 0;
          padding-left: 23px;
        }

        ::v-deep(.bi.icon.icon--left) {
          left: 9px;
        }
      }
    }

    &.doubled {
      &.focused {
        outline: 2px solid var(--focus-input-border-color);
      }

      .left,
      .right {
        margin-bottom: 0;

        border-radius: var(--border-radius);

        ::v-deep(.input-container) {
          input {
            &:focus {
              outline: none;
            }
          }

          &.filled {
            input {
              &:focus {
                outline: none;
                background-color: var(--filled-input-background-color);
              }
            }
          }
        }
      }

      .left {
        ::v-deep(input) {
          border-right: none;
          border-radius: var(--border-radius) 0 0 var(--border-radius);
        }
      }

      .right {
        ::v-deep(input) {
          border-left: none;
          border-radius: 0 var(--border-radius) var(--border-radius) 0;
        }
      }

      &.date-inputs--lg {
        .left {
          ::v-deep(input) {
            width: 153px;
            padding-right: 0;
          }
        }

        .right {
          ::v-deep(input) {
            width: 84px;
            padding-left: 30px;
            padding-right: 0;
          }

          ::v-deep(.bi.icon.icon--left) {
            left: 5px;
          }

          &.ampm {
            ::v-deep(input) {
              width: 104px;
            }
          }
        }
      }
      &.date-inputs--md {
        .left {
          ::v-deep(input) {
            width: 138px;
            padding-right: 0;
          }
        }

        .right {
          ::v-deep(input) {
            width: 76px;
            padding-left: 25px;
            padding-right: 0;
          }

          ::v-deep(.bi.icon.icon--left) {
            left: 5px;
          }

          &.ampm {
            ::v-deep(input) {
              width: 100px;
            }
          }
        }
      }
      &.date-inputs--sm {
        .left {
          ::v-deep(input) {
            width: 93px;
            padding-right: 0;
            padding-left: 23px;
          }

          ::v-deep(.bi.icon.icon--left) {
            left: 9px;
          }
        }

        .right {
          ::v-deep(input) {
            width: 56px;
            padding-left: 20px;
            padding-right: 0;
          }

          ::v-deep(.bi.icon.icon--left) {
            left: 5px;
          }

          &.ampm {
            ::v-deep(input) {
              width: 76px;
            }
          }
        }
      }
    }
  }

  .calendar {
    display: flex;
    flex-direction: row;
    width: fit-content;
    padding: 16px 18px 16px 18px;
    font-family: var(--font-family);
    box-shadow: $shadow-lg;
    border-radius: 8px;
    position: absolute;
    z-index: 2;
    background-color: white;

    .left,
    .right {
      display: flex;
      flex-direction: column;
      flex-grow: 0;
    }
    .left {
      ::v-deep(.calendar__controls-right.hidden) {
        visibility: hidden;
      }
    }
    .right {
      margin-left: 40px;
      ::v-deep(.calendar__controls-left) {
        visibility: hidden;
      }
    }
    ::v-deep(.calendar__controls) {
      display: flex;
      list-style: none;
      justify-content: space-between;
      align-items: center;
      font-size: $p5-font-size;
      padding: 0;
      margin: 0 auto 16px auto;
      width: 97%;

      .calendar__controls-left,
      .calendar__controls-right {
        display: flex;
        height: 17px;
        justify-content: center;
        align-items: center;
        .bi {
          color: $gray-800;
          transition: 0.3s ease color;
        }
        &:hover {
          cursor: pointer;
          .bi {
            color: $gray-800;
          }
        }
      }

      .calendar__controls-month {
        font-style: normal;
        font-weight: var(--font-weight);
        font-size: var(--font-size);
        line-height: 125%;
        color: $gray-800;
      }
    }
    ::v-deep(.calendar__weekdays) {
      font-size: calc(var(--font-size) - 2px);
      font-weight: 500;
      line-height: 120%;
      color: $gray-600;

      li {
        margin-bottom: 8px;
        margin-top: 0;
      }
    }
    ::v-deep(.calendar__weekdays),
    ::v-deep(.calendar__days) {
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
        width: 28px;

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
    ::v-deep(.calendar__days) {
      margin-bottom: auto;

      li {
        font-size: calc(var(--font-size) - 2px);
        border-radius: 4px;
        font-weight: var(--font-weight);
        line-height: 150%;
        box-sizing: border-box;
        height: 28px;
        margin-top: 2px;
        margin-bottom: 2px;

        &.--current {
          border: 1.5px solid var(--current-day-border-color);
          background-color: $base-white;
        }
        &:hover {
          cursor: pointer;
          background-color: #edf2f7;
        }
        &.--active {
          background-color: var(--active-color);
          color: white;
          z-index: 1;
        }
        &.--in-range {
          position: relative;
          border-radius: 0;
          background-color: #edf2f7;
          border: none;
          transition: 0s all;

          &::before,
          &::after {
            background-color: #edf2f7;
          }

          &-completed {
            background-color: var(--active-background-color);
            color: var(--active-color);

            &::before,
            &::after {
              background-color: var(--active-background-color);
            }
          }
          &.--current {
            border: 1.5px solid var(--current-day-border-color);
            border-radius: 4px;
            z-index: 2;

            &::before,
            &::after {
              width: 0;
            }
          }

          &:hover {
            cursor: default;
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
        }
        &.--not-cur-month,
        &.--not-cur-month.--in-range {
          color: $gray-300;
          background-color: white;

          &:hover {
            cursor: default;
            background-color: transparent;
          }
          &::before,
          &::after {
            background-color: transparent;
          }
        }
        &.--past {
          color: $gray-500;

          &.--active {
            color: white;
          }
        }
      }

      &.single {
        li.--in-range {
          &.--not-cur-month {
            color: $gray-400;
            background-color: #edf2f7;

            &:hover {
              cursor: pointer;
              color: white;
              background-color: var(--active-color);
            }
            &::before,
            &::after {
              background-color: #edf2f7;
            }
          }
        }

        li.--active {
          &.--not-cur-month {
            color: white;
            background-color: var(--active-color);
          }
        }
      }
    }

    ::v-deep(.footer > .label) {
      font-size: calc(var(--font-size) - 2px);
    }
  }
}
</style>
