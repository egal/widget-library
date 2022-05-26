<template>
  <div :style="{ width: '700px' }">
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
        isRange: false,
        showInput: true,

        locale: 'en-US',
        timePicker: {
          isAMPM: true,
        },
        inputData: {
          size: 'md',
          // showFilled: true,
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
      console.log(v)
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
