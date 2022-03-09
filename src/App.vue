<template>
  jjkhkh
  <!--  <div v-for="(item, idx) in jsonData" :key="idx" style="margin-bottom: 40px">-->
  <Calendar :data="item" @update:dateValue="setDate" />
  <!--  </div>-->
</template>

<script lang="ts">
import Calendar from '@/components/Calendar/Calendar.vue'
// import jsonData from '@/data.json'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
  components: { Calendar },
  data() {
    return {
      item: {
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
          date_from: '2022-03-02T04:28:12.089Z',
          date_to: '2022-03-05',
        },
      },
      // jsonData,
    }
  },
  methods: {
    setDate(selectedDays: string[]) {
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
