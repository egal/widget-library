<template>
  <Calendar></Calendar>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Calendar from '@/components/calendar/Calendar.vue'

export default defineComponent({
  name: 'App',
  components: { Calendar },
  data() {
    return {}
  },
  methods: {},
})
</script>

<style lang="scss">
.a {
  display: grid;
  grid-row-gap: 30px;
}
</style>
