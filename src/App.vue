<template>
  <div :style="{ width: '300px' }">
    <Calendar
      :data="calendarData"
      @toggle="foo"
      @update:inputModelValue="(value) => (calendarData.inputData.modelValue = value)"
    ></Calendar>

    <button @click="calendarData.isOpen = !calendarData.isOpen">Toggle Calendar</button>
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
        isOpen: true,
        isDouble: true,
        showInput: true, // handle double + input
        inputData: {
          modelValue: '',
        },
      },
    }
  },
  methods: {
    foo() {},
  },
})
</script>

<style lang="scss">
.a {
  display: grid;
  grid-row-gap: 30px;
}
</style>
