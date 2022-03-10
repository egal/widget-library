<template>
  <div v-for="(item, idx) in data" :key="idx" style="margin-bottom: 40px">
    <Calendar :data="item" @update:dateValue="setDate" />
  </div>
</template>

<script lang="ts">
import Calendar from '@/components/calendar/Calendar.vue'
// import jsonData from '@/data.json'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
  components: { Calendar },
  data() {
    return {
      data: [
        {
          fontFamily: 'Raleway',
          fontSize: '14px',
          fontWeight: 'regular',
          activeColor: '#0066FF',
          activeBackgroundColor: '#E5F0FF',
          isAdaptiveSize: false,
          isDouble: true,
          locale: 'ru-RU',
          timePicker: {
            isAMPM: true,
            label: 'time 1',
          },
          data: {
            // date_from: '2022-03-02T04:28:12.089Z',
            // date_to: '2022-03-05',
          },
        },
        {
          fontFamily: 'Raleway',
          fontSize: '14px',
          fontWeight: 500,
          activeColor: '#51e',
          activeBackgroundColor: '#E5F0FF',
          isAdaptiveSize: false,
          isDouble: false,
          locale: 'en-US',
          timePicker: {
            isAMPM: false,
            label: 'time 2',
          },
          data: {
            // date_from: '2022-03-02',
          },
        },
        {
          fontFamily: 'Open Sans',
          fontSize: '18px',
          activeColor: 'red',
          activeBackgroundColor: '#ffF0FF',
          isAdaptiveSize: false,
          data: {},
        },
      ],
      // jsonData,
    }
  },
  methods: {
    setDate(selectedDays: string[]) {
      console.log(selectedDays)
      // do something
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
