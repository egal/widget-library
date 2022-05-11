<template>
  <div class="footer">
    <p class="label">{{ config?.label || '' }}</p>
    <div class="picker" :class="{ disabled: isDisabled }">
      <BootstrapIcon icon="clock" />
      <ESelect
        :data="{
          ...mergedSelectData,
          clearable: false,
          options: hoursOptions,
          modelValue: selectedHours,
          shownKey: selectedHours.name,
          placeholder: 12,
        }"
        :style-config="selectStyleConfig"
        @update:modelValue="(value) => setTime(value, 'hour')"
      />
      <span style="margin: 0 5px">:</span>
      <ESelect
        :data="{
          ...mergedSelectData,
          clearable: false,
          options: minutesOptions,
          modelValue: selectedMinutes,
          shownKey: selectedMinutes.name,
          placeholder: 30,
        }"
        :style-config="selectStyleConfig"
        @update:modelValue="(value) => setTime(value, 'minutes')"
      />
      <ESelect
        v-if="config?.isAMPM"
        class="ampm"
        :data="{
          ...mergedSelectData,
          clearable: false,
          options: [
            { name: 'AM' },
            {
              name: 'PM',
            },
          ],
          shownKey: selectedAmPm.name,
          modelValue: selectedAmPm,
        }"
        :style-config="selectStyleConfig"
        @update:modelValue="(value) => setTime(value, 'ampm')"
      />
    </div>
  </div>
</template>

<script>
import BootstrapIcon from '@dvuckovic/vue3-bootstrap-icons'
import ESelect from '@/components/inputs/Select/ESelect.vue'
import { defineComponent } from 'vue'
import { formatAMPM } from '@/assets/calendar/helpers'

export default defineComponent({
  name: 'SelectTime',
  components: { ESelect, BootstrapIcon },
  props: {
    config: {
      type: Object,
      default: () => {},
    },
    type: {
      type: String,
      default: 'from',
    },

    isDisabled: {
      type: Boolean,
      default: true,
    },

    hours: {
      type: [Number, String],
      default: '',
    },
    minutes: {
      type: [Number, String],
      default: '',
    },
    format: {
      type: String,
      default: '',
    },

    selectData: {
      type: Object,
      default: {},
    },

    selectStyleConfig: {
      type: Object,
      default: () => {},
    },

    minutesStep: {
      type: Number,
      default: 1,
    },

    clear: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectedHours: this.hours ? { name: this.hours } : {},
      selectedMinutes: this.minutes ? { name: this.minutes } : {},
      selectedAmPm: this.format ? { name: this.format } : { name: 'AM' },
      selectedTime: [],
    }
  },
  computed: {
    mergedSelectData() {
      return this.selectData
    },

    isClearValues() {
      return this.clear
    },

    hoursOptions() {
      if (this.config?.isAMPM) {
        const twelveHoursOptions = this.generateTimeOptions(1, 11)
        twelveHoursOptions.unshift({ name: '12' })
        return twelveHoursOptions
      } else {
        return this.generateTimeOptions(0, 23)
      }
    },

    minutesOptions() {
      return this.generateTimeOptions(0, 60, this.minutesStep)
    },
  },
  mounted() {},
  methods: {
    // Генерация опций для селектов
    generateTimeOptions(min, max, step = 1) {
      let arr = []
      for (let i = min - 1; i++, i <= max; ) {
        let obj = {
          name: i < 10 ? `0${i}` : `${i}`,
        }

        arr.push(obj)
      }
      return arr
    },

    setTime(val, type) {
      if (this.isDisabled) {
        return
      }

      switch (type) {
        case 'hour':
          this.selectedHours = val
          if (!this.selectedMinutes?.name) {
            this.selectedMinutes = { name: '00' }
          }
          break
        case 'minutes':
          this.selectedMinutes = val
          if (!this.selectedHours?.name) {
            this.selectedHours = { name: '00' }
          }

          break
        case 'ampm':
          this.selectedAmPm = val
          break
        default:
          break
      }

      let time = `${this.selectedHours?.name || '00'}:${this.selectedMinutes?.name || '00'}`

      if (this.config?.isAMPM) {
        time += ` ${this.selectedAmPm?.name || 'AM'}`
        time = formatAMPM(time)
      }

      this.$emit('select', {
        type: this.type,
        time,
      })
    },
  },
  watch: {
    isClearValues(value) {
      if (value) {
        this.selectedHours = {}
        this.selectedMinutes = {}
      }
    },

    hours(value) {
      this.selectedHours = { name: value }
    },

    minutes(value) {
      this.selectedMinutes = { name: value }
    },

    format(value) {
      this.selectedAmPm = { name: value }
    },
  },
})
</script>

<style scoped lang="scss">
@import '../../../assets/variables';

.footer {
  border-top: 1px solid $gray-200;
  padding-top: 20px;
  margin-top: 14px;
  .label {
    font-style: normal;
    font-weight: 500;
    display: flex;
    align-items: center;
    color: $gray-500;
    margin-top: 0;
    margin-bottom: 8px;
  }
  .picker {
    display: flex;
    align-items: center;
    &.disabled {
      opacity: 0.5;
      pointer-events: none;
      ::v-deep(.select-container) {
        background-color: $gray-100;
      }
      .bi {
        opacity: 0.5;
      }
    }
  }
}

.bi {
  margin-right: 10px;
  color: $gray-600;
}
::v-deep(.select) {
  width: 70px;
}
::v-deep(.select.ampm) {
  margin-left: 15px;
}
::v-deep(.dropdown) {
  max-height: 250px;
}
</style>
