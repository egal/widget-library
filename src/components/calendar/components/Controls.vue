<template>
  <ul class="calendar__controls">
    <li class="calendar__controls-left" @click="$emit('change-month', data?.isDouble ? -2 : -1)">
      <BootstrapIcon icon="chevron-left" />
    </li>
    <li class="calendar__controls-month">
      <select v-model="monthValue">
        <option v-for="y in allMonths" :key="y.name" :value="y.name" :label="y.name"></option>
      </select>

      <!--      todo imported Ecounter from branch TO PR? not merged into master yet -->
      <!--      <ECounter-->

      <!--       todo с какого по какой год  -->

      <select v-model="yearValue">
        <option v-for="y in allYears" :key="y.name" :value="y.name" :label="y.name"></option>
      </select>
    </li>
    <li
      class="calendar__controls-right"
      :class="{ hidden: data?.isDouble }"
      @click="$emit('change-month', data?.isDouble ? 2 : 1)"
    >
      <BootstrapIcon icon="chevron-right" />
    </li>
  </ul>
</template>

<script>
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'
import { defineComponent } from 'vue'
import { capitalize } from '@/assets/calendar/helpers'

export default defineComponent({
  name: 'Controls',
  components: { BootstrapIcon },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    monthToDisplay: {
      type: Object,
      default: null,
    },
  },
  emits: ['update:moth', 'update:year'],
  data() {
    return {
      capitalize,
      monthValue: '',
      yearValue: '',
    }
  },
  computed: {
    allMonths() {
      const months = []
      for (let i = 0; i < 12; i++) {
        const newMonth = new Date(new Date(this.monthToDisplay).setMonth(i)).toLocaleString(
          this.data?.locale || 'en-US',
          {
            month: 'long',
          },
        )

        months.push({ name: newMonth, index: i })
      }

      return months
    },

    allYears() {
      const years = []
      //todo pass as props or calclulate somehow
      const min = 1940
      const max = 2040
      for (let i = min; i <= max; i++) {
        years.push({ name: i })
      }

      return years
    },

    currentMonth() {
      if (!this.allMonths.length) {
        return
      }
      const currMonthIndex = new Date(this.monthToDisplay).getMonth()
      return this.allMonths[currMonthIndex]
    },
  },
  mounted() {
    this.yearValue = new Date(this.monthToDisplay).getFullYear()
    this.monthValue = new Date(this.monthToDisplay).toLocaleString(this.data?.locale || 'en-US', {
      month: 'long',
    })
  },
  methods: {
    // //Отображает только месяц, даты хранятся в ISODate
    // displayOnlyMonth(dateString) {
    //   return new Date(dateString).toLocaleString(this.data?.locale || 'en-US', {
    //     month: 'long',
    //   })
    // },
  },
  watch: {
    monthValue(newValue, oldValue) {
      if (!!oldValue) {
        this.$emit(
          'update:month',
          this.allMonths.find((i) => i.name === newValue),
        )
      }
    },

    yearValue(newValue, oldValue) {
      if (!!oldValue) {
        this.$emit('update:year', newValue)
      }
    },
  },
})
</script>

<style scoped lang="scss">
//todo style selects
</style>
