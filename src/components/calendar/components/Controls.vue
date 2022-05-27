<template>
  <ul class="calendar__controls">
    <li class="calendar__controls-left" @click="$emit('change-month', data?.isDouble ? -2 : -1)">
      <BootstrapIcon icon="chevron-left" />
    </li>
    <li class="calendar__controls-month">
      {{ capitalize(displayOnlyMonth(monthToDisplay)) }}
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
  data() {
    return {
      capitalize,
    }
  },
  computed: {},
  mounted() {},
  methods: {
    //Отображает только месяц и год, даты хранятся в ISODate
    displayOnlyMonth(dateString) {
      return new Date(dateString).toLocaleString(this.data?.locale || 'en-US', {
        month: 'long',
        year: 'numeric',
      })
    },
  },
  watch: {},
})
</script>

<style scoped lang="scss"></style>
