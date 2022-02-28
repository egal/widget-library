<template>
  <div class="footer">
    <p class="label">{{ label }}</p>
    <div class="picker">
      <div style="display: flex; align-items: center">
        <BootstrapIcon icon="clock" />
        <Select
          :clearable="false"
          :options="hours"
          shown-key="name"
          placeholder="12"
          @update:modelValue="(value) => setTime(value, 'hour')"
        />
        <!--        <Input-->
        <!--          id="hours"-->
        <!--          icon-left="clock"-->
        <!--          :validators="[timeValidator, hoursValidator]"-->
        <!--          placeholder="10"-->
        <!--          :clearable="false"-->
        <!--        />-->
        <span style="margin: 0 5px">:</span>

        <Select
          :clearable="false"
          :options="minutes"
          shown-key="name"
          placeholder="30"
          @update:modelValue="(value) => setTime(value, 'minutes')"
        />
        <!--        <Input-->
        <!--          class="input&#45;&#45;minutes"-->
        <!--          id="minutes"-->
        <!--          :validators="[timeValidator, minsValidator]"-->
        <!--          placeholder="30"-->
        <!--          :clearable="false"-->
        <!--        />-->

        <Select
          v-if="isAmPm"
          class="ampm"
          :clearable="false"
          :options="[
            { value: 'am', name: 'AM' },
            {
              value: 'pm',
              name: 'PM',
            },
          ]"
          shown-key="name"
          :model-value="selectedAmPm"
          @update:modelValue="(value) => setTime(value, 'ampm')"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import BootstrapIcon from "@dvuckovic/vue3-bootstrap-icons";
// import Input from "@/components/Input/Input.vue";
import Select from "@/components/Select/Select.vue";

export default {
  name: "CalendarInput",
  components: { Select, BootstrapIcon },
  props: {
    label: {
      type: String,
      default: "Default label",
    },
    isAmPm: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      selectedHour: {},
      selectedMinutes: {},
      selectedAmPm: { value: "am", name: "AM" },
    };
  },
  computed: {
    hours() {
      if (this.isAmPm) {
        return [
          { name: "12", value: 12 },
          { name: "01", value: 1 },
          { name: "02", value: 2 },
          { name: "03", value: 3 },
          { name: "04", value: 4 },
          { name: "05", value: 5 },
          { name: "06", value: 6 },
          { name: "07", value: 7 },
          { name: "08", value: 8 },
          { name: "09", value: 9 },
          { name: "10", value: 10 },
          { name: "11", value: 11 },
        ];
      } else {
        return [
          { name: "1", value: 1 },
          { name: "2", value: 2 },
          { name: "3", value: 3 },
          { name: "4", value: 4 },
          { name: "5", value: 5 },
          { name: "6", value: 6 },
          { name: "7", value: 7 },
          { name: "8", value: 8 },
          { name: "9", value: 9 },
          { name: "10", value: 10 },
          { name: "11", value: 11 },
          { name: "12", value: 12 },
          { name: "13", value: 13 },
          { name: "14", value: 14 },
          { name: "15", value: 15 },
          { name: "16", value: 16 },
          { name: "17", value: 17 },
          { name: "18", value: 18 },
          { name: "19", value: 19 },
          { name: "20", value: 20 },
          { name: "21", value: 21 },
          { name: "22", value: 22 },
          { name: "23", value: 23 },
          { name: "00", value: 0 },
        ];
      }
    },
    minutes() {
      let arr: any[] = [];
      for (let i = 0; i++, i <= 60; ) {
        let obj = {
          name: i < 10 ? `0${i}` : i,
          value: i,
        };
        arr.push(obj);
      }
      return arr;
    },
  },
  // mounted() {},
  methods: {
    setTime(val: any, type: string) {
      switch (type) {
        case "hour":
          this.selectedHour = val;
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
      // todo val.value ? val.name?

      this.$emit("select", {
        hour: this.selectedHour.name,
        minutes: this.selectedMinutes.name,
        ampm: this.selectedAmPm.name,
      });
    },
  },
  watch: {},
};
</script>

<style scoped lang="scss">
@import "../../assets/scss/variables.scss";

.footer {
  border-top: 1px solid $gray-200;
  padding-top: 20px;
  margin-top: 14px;

  //todo vars
  .label {
    //font-family: Inter;
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 15px;
    /* identical to box height */

    display: flex;
    align-items: center;
    color: $gray-500;

    margin-top: 0;
    margin-bottom: 8px;
  }

  // todo Input
  .picker {
    //display: flex;
    //flex-direction: row;

    //display: grid;
    //grid-template-columns: 30px 0.5fr 25px 0.5fr 1fr 0.5fr;

    //position: static;
    //height: 36px;
    //left: 0;
    //right: 0;
    //top: calc(50% - 36px / 2 + 11.5px);
    //
    ///* Base/base1 */
    //
    //background: #ffffff;
    ///* Gray/Grey 200 */
    //
    //border: 1px solid #edf2f7;
    //box-sizing: border-box;
    //border-radius: 6px;
    //
    ///* Inside auto layout */
    //
    //flex: none;
    //order: 1;
    //align-self: stretch;
    //flex-grow: 0;
    //margin: 8px 0px;
  }
}

/deep/ .input {
  width: 80px;

  &--minutes {
    width: 50px;
  }
}

.bi {
  margin-right: 10px;
  color: $gray-600;
}
/deep/ .select {
  width: 70px;
}
/deep/ .select.ampm {
  margin-left: 15px;
}

/deep/ .dropdown {
  max-height: 250px;
}
</style>
