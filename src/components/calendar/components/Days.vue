<template>
  <ul class="calendar__days" :class="{ single: !isDouble }">
    <li
      v-for="date in dates"
      :key="date"
      :class="{
        '--current': isDateInCurMonth(date, currentMonth) && currentDay && date === currentDay,
        '--active':
          (isDateSelected(date) && !isDouble) ||
          (isDateSelected(date) && isDouble && isDateInCurMonth(date, currentMonth)),
        '--beyond-active': isBeyondOrOnDateSelected(date, 'beyond'),
        '--on-active': isBeyondOrOnDateSelected(date, 'on'),
        '--in-range': isInDateRange(date) && !isDateSelected(date),
        '--in-range-completed':
          isInDateRange(date) && !isDateSelected(date) && isRangeFullyCompleted,
        '--not-cur-month': !isDateInCurMonth(date, currentMonth),

      }"
      @click="$emit('select-date', date)"
      @mouseenter="$emit('mouse-enter', date)"
    >
      {{ displayOnlyDay(date) }}
    </li>
  </ul>
</template>

<script>
import { defineComponent } from 'vue'
import { formatToISODate, isDateInCurMonth } from '@/assets/calendar/helpers'

export default defineComponent({
  name: 'Days',
  components: {},
  props: {
    dates: {
      type: Array,
      default: () => [],
    },
    currentMonth: {
      type: Object,
      default: null,
    },
    selectedDays: {
      type: Array,
      default: () => [],
    },
    locale: {
      type: String,
      default: 'en-US',
    },
    isRangeFullyCompleted: {
      type: Boolean,
      default: false,
    },
    isDouble: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isDateInCurMonth,
      formatToISODate,
      currentDay: '',
    }
  },
  computed: {
    computedSelectedDays() {
      return this.selectedDays
    },
  },
  mounted() {
    const today = new Date()

    this.currentDay = formatToISODate(today)
  },
  methods: {
    //Определяет, выбрана ли дата
    isDateSelected(day) {
      return this.computedSelectedDays.includes(day)
    },

    //Определяет, находится ли дата над или под выбранной датой, нужно для верстки
    isBeyondOrOnDateSelected(day, mode = 'beyond') {
      const [max, min] = this.computedSelectedDays
        .map((el) => new Date(el))
        .sort((a, b) => a.getTime() - b.getTime())

      if (
        !this.isInDateRange(day) ||
        day === formatToISODate(max) ||
        day === formatToISODate(min)
      ) {
        return false
      }

      return (mode === 'on' ? min : max).getDay() === new Date(day)?.getDay()
    },

    //Определяет, находится ли дата в диапазоне междувыбранных дат
    isInDateRange(day) {
      const [min, max] = this.computedSelectedDays.map((el) => new Date(el).getTime()).sort()
      const dayTime = new Date(day).getTime()
      return dayTime >= min && dayTime <= max
    },

    //Отобрадает только день, даты хранятся в ISODate
    displayOnlyDay(dateString) {
      return new Date(dateString).toLocaleString(this.locale, {
        day: 'numeric',
      })
    },
  },
  watch: {},
})
</script>

<style scoped lang="scss"></style>