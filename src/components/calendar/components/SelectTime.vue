<template>
  <div class="footer">
    <p class="label">{{ config?.label || '' }}</p>
    <div class="picker" :class="{ disabled: isDisabled }">
      <ESelect
        :data="{
          ...mergedSelectData,
          clearable: false,
          options: hoursOptions,
          modelValue: selectedHours,
          shownKey: selectedHours.name,
          placeholder: 12,
          size: 'sm',
        }"
        class="select--hours"
        :style-config="mergedStyleConfig"
        @update:modelValue="(value) => setTime(value, 'hour')"
      />
      <span class="colon" style="margin: 0 5px">:</span>
      <ESelect
        :data="{
          ...mergedSelectData,
          clearable: false,
          options: minutesOptions,
          modelValue: selectedMinutes,

          placeholder: 30,
          size: 'sm',
        }"
        class="select--minutes"
        :style-config="mergedStyleConfig"
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

          modelValue: selectedAmPm,
          size: 'sm',
        }"
        :style-config="mergedStyleConfig"
        @update:modelValue="(value) => setTime(value, 'ampm')"
      />
    </div>
  </div>
</template>

<script>
import ESelect from '@/components/inputs/Select/ESelect.vue'
import { defineComponent } from 'vue'
import { formatAMPM } from '@/assets/calendar/helpers'

export default defineComponent({
  name: 'SelectTime',
  components: { ESelect },
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

    mergedStyleConfig() {
      return Object.assign(
        {
          valueColor: '#718096',
        },
        this.selectStyleConfig,
      )
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
      return this.generateTimeOptions(0, 59, this.minutesStep)
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
  padding-top: 15px;
  margin-top: 16px;
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
    :deep(.select-label) {
      display: none;
    }
    :deep(.select-container) {
      height: 32px;
    }
    &.disabled {
      opacity: 0.5;
      pointer-events: none;
      :deep(.select-container) {
        background-color: $gray-100;
      }
      .bi {
        opacity: 0.5;
      }
    }
  }

  .colon {
    font-style: normal;
    font-weight: 400;
    font-size: 10px;
    line-height: 12px;
    color: #718096;
  }
}

.bi {
  margin-right: 10px;
  color: $gray-600;
}
:deep(.select) {
  width: 65px;
}
:deep(.select.ampm) {
  margin-left: 15px;
}
:deep(.dropdown) {
  max-height: 250px;
}
</style>
