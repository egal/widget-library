<template>
  <div>
    <Calendar
      :data="calendarData"
      :style-config="{
        fontFamily: 'Raleway',
        fontSize: '14px',
        fontWeight: 'regular',
        activeColor: '#0066FF',
        activeBackgroundColor: '#E5F0FF',
      }"
      @update:dateValue="(v) => check(v)"
      @onError:inputValue="(errorMsg) => handleError(errorMsg)"
    ></Calendar>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Calendar from '@/components/calendar/Calendar.vue'

export default defineComponent({
  name: 'App',
  components: { Calendar },
  data() {
    return {
      calendarData: {
        isDouble: false,
        isRangePicker: false,
        showInput: true,

        locale: 'ru-RU',
        timePicker: {
          isAMPM: true,
          label: 'Choose time',
        },

        inputData: {
          size: 'md',
          modelValue: new Date('05 May 2022 04:05 UTC').toISOString(),
          showFilled: false,
          validators: [this.required],
        },

        timeSelectData: {
          showFilled: false,
        },
      },
    }
  },
  methods: {
    required(value) {
      return !value ? 'Обязательное поле' : ''
    },
    handleError(error) {
      console.log(error)
    },
    check(v) {
      console.log('check', v)
    },
  },
})
</script>

<style lang="scss">
.a {
  display: grid;
  grid-row-gap: 30px;
}
</style>
