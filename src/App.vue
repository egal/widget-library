<template>
  <div :style="{ width: '700px' }">
    <Calendar
      :data="calendarData"
      @update:dateValue="(v) => check(v)"
      :style-config="{ activeBackgroundColor: 'grey' }"
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
        showInput: false, // handle double + input

        localeOptions: {
          year: '2-digit',
          month: 'numeric',
          day: 'numeric',
          hour: 'numeric',
          minute: 'numeric',
        },
        locale: 'en-US',
        timePicker: {
          isAMPM: false,
          label: 'Choose time',
        },
        date: {
          date_from: '2022-05-07',
        },
        inputData: {
          showFilled: false,
        },
        rightInputData: {
          showFilled: false,
        },
        timeSelectData: {
          showFilled: false,
        },
      },
    }
  },
  methods: {
    check(v) {
      // console.log(v)
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
