<template>
  <ul class="calendar__controls">
    <li class="calendar__controls-left" @click="$emit('change-month', data?.isDouble ? -2 : -1)">
      <b-icon icon="chevron-left" />
    </li>
    <li class="calendar__controls-month">
      <SelectControls
        class="select--month"
        @select-control="selectMonth"
        :value="monthValue"
        :options="allMonths"
      />
      <SelectControls
        class="select--year"
        @select-control="selectYear"
        :value="yearValue"
        :options="allYears"
      />
    </li>
    <li
      class="calendar__controls-right"
      :class="{ hidden: data?.isDouble }"
      @click="$emit('change-month', data?.isDouble ? 2 : 1)"
    >
      <b-icon icon="chevron-right" />
    </li>
  </ul>
</template>

<script>
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'
import { defineComponent } from 'vue'
import { capitalize } from '@/assets/calendar/helpers'
import EDropdown from '@/components/inputs/Dropdown/EDropdown'
import vClickOutside from 'click-outside-vue3'
import SelectControls from '@/components/calendar/components/SelectControls'

export default defineComponent({
  name: 'Controls',
  components: { SelectControls, EDropdown, BIcon: BootstrapIcon },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
    monthToDisplay: {
      type: Object,
      default: null,
    },

    yearSelectRange: {
      type: Object,
      default: () => {},
    },
  },
  emits: ['update:month', 'update:year'],
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

      const currMonthIndex = new Date(this.monthToDisplay).getMonth()
      for (let i = currMonthIndex; i < 12; i++) {
        const newMonth = new Date(new Date(this.monthToDisplay).setMonth(i)).toLocaleString(
          this.data?.locale || 'en-US',
          {
            month: 'long',
          },
        )
        months.push({ name: newMonth, index: i })
      }
      for (let i = 0; i < currMonthIndex; i++) {
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

      const min = this.yearSelectRange.min ?? new Date(this.monthToDisplay).getFullYear()
      const max = this.yearSelectRange.max

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
    selectYear(option) {
      this.yearValue = option.name
      this.$emit('update:year', option)
    },

    selectMonth(option) {
      this.monthValue = option.name
      this.$emit('update:month', option)
    },
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
.select--year {
  ::v-deep(.select-container) {
    padding-left: 0;
  }
}

.select--month {
  ::v-deep(.selected) {
    margin-left: auto;
  }
}
</style>
