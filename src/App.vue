<template>
  <div :style="{ width: '700px' }">
    <Calendar :data="calendarData"></Calendar>
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
        inputData: {
          size: 'md',
        },

        locale: 'en-US',
        timePicker: {
          isAMPM: true,
          label: 'dsfsd',
        },
      },
    }
  },
  methods: {},
})
</script>

<style lang="scss">
.a {
  display: grid;
  grid-row-gap: 30px;
}
</style>
