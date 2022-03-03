<template>
  <div class="footer">
    <p class="label">{{ config?.label || "" }}</p>
    <div class="picker" :class="{ disabled: isDisabled }">
      <BootstrapIcon icon="clock" />
      <Select
        :clearable="false"
        :options="hoursOptions"
        :model-value="selectedHours"
        shown-key="name"
        placeholder="12"
        @update:modelValue="(value) => setTime(value, 'hour')"
      />
      <span style="margin: 0 5px">:</span>
      <Select
        :clearable="false"
        :options="minutesOptions"
        :model-value="selectedMinutes"
        shown-key="name"
        placeholder="30"
        @update:modelValue="(value) => setTime(value, 'minutes')"
      />

      <Select
        v-if="config?.isAMPM"
        class="ampm"
        :clearable="false"
        :options="[
          { name: 'AM' },
          {
            name: 'PM',
          },
        ]"
        shown-key="name"
        :model-value="selectedAmPm"
        @update:modelValue="(value) => setTime(value, 'ampm')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
import Select from "@/components/Select/Select.vue";
import { defineComponent } from "vue";
import { formatAMPM } from "@/assets/scripts/helpers";

export default defineComponent({
  name: "SelectTime",
  components: { Select, BootstrapIcon },
  props: {
    config: {
      type: Object,
      default: () => {},
    },
    type: {
      type: String,
      default: "from",
    },

    isDisabled: {
      type: Boolean,
      default: true,
    },

    hours: {
      type: [Number, String],
      default: "",
    },
    minutes: {
      type: [Number, String],
      default: "",
    },
    format: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      selectedHours: this.hours ? { name: this.hours } : {},
      selectedMinutes: this.minutes ? { name: this.minutes } : {},
      selectedAmPm: this.format ? { name: this.format } : {},

      selectedTime: [] as string[],
    };
  },
  computed: {
    hoursOptions() {
      const twelveHoursOptions = this.generateTimeOptions(1, 11);
      twelveHoursOptions.unshift({ name: "12" });

      return this.config?.isAMPM
        ? twelveHoursOptions
        : this.generateTimeOptions(0, 23);
    },

    minutesOptions() {
      return this.generateTimeOptions(0, 60);
    },
  },
  mounted() {},
  methods: {
    generateTimeOptions(min: number, max: number) {
      let arr: any[] = [];
      for (let i = min - 1; i++, i <= max; ) {
        let obj = {
          name: i < 10 ? `0${i}` : `${i}`,
        };

        arr.push(obj);
      }
      return arr;
    },

    setTime(val: any, type: string): void {
      if (this.isDisabled) {
        return;
      }

      switch (type) {
        case "hour":
          this.selectedHours = val;
          break;
        case "minutes":
          this.selectedMinutes = val;
          break;
        case "ampm":
          this.selectedAmPm = val;
          break;
        default:
          break;
      }

      let time = `${this.selectedHours?.name || "00"}:${
        this.selectedMinutes?.name || "00"
      }`;

      if (this.config?.isAMPM) {
        time += ` ${this.selectedAmPm?.name || "AM"}`;
        time = formatAMPM(time);
      }

      this.$emit("select", {
        type: this.type,
        time,
      });
    },
  },
  watch: {},
});
</script>

<style scoped lang="scss">
@import "../../../assets/scss/variables";

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

      :deep .select-container {
        background-color: $gray-100;
      }

      .bi {
        opacity: 0.5;
      }
    }
  }
}

:deep .input {
  width: 80px;

  &--minutes {
    width: 50px;
  }
}

.bi {
  margin-right: 10px;
  color: $gray-600;
}

// todo filled class
:deep .select {
  width: 70px;
  transition: 0.3s ease opacity;

  .select-container.filled {
    background-color: initial;
    color: initial;
  }
}

:deep .select.ampm {
  margin-left: 15px;
}

:deep .dropdown {
  max-height: 250px;
}
</style>
