<template>
  <div class="footer">
    <p class="label">{{ config?.label || '' }}</p>
    <div class="picker" :class="{ disabled: isDisabled }">
      <BootstrapIcon icon="clock" />
      <ESelect
        :data="{
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

<script lang="ts">
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

    // проп со стилями для ESelect
    selectStyleConfig: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      selectedHours: this.hours ? { name: this.hours } : {},
      selectedMinutes: this.minutes ? { name: this.minutes } : {},
      selectedAmPm: this.format ? { name: this.format } : { name: 'AM' },
      selectedTime: [] as string[],
    }
  },
  computed: {
    hoursOptions() {
      const twelveHoursOptions = this.generateTimeOptions(1, 11)
      twelveHoursOptions.unshift({ name: '12' })

      return this.config?.isAMPM ? twelveHoursOptions : this.generateTimeOptions(0, 23)
    },

    minutesOptions() {
      return this.generateTimeOptions(0, 60)
    },
  },
  mounted() {},
  methods: {
    generateTimeOptions(min: number, max: number) {
      let arr: any[] = []
      for (let i = min - 1; i++, i <= max; ) {
        let obj = {
          name: i < 10 ? `0${i}` : `${i}`,
        }

        arr.push(obj)
      }
      return arr
    },

    setTime(val: any, type: string): void {
      if (this.isDisabled) {
        return
      }

      switch (type) {
        case 'hour':
          this.selectedHours = val
          break
        case 'minutes':
          this.selectedMinutes = val
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
  watch: {},
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
