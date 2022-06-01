<template>
  <div>
<!--    todo add indeterminate ? -->
    <ECheckbox :data='{size: "sm"}' /> /
    <ECheckbox :data='{ size: "md"}' /> / <ECheckbox :data='{size: "lg"}' />

    <br />
    <ERadio :data='{size: "sm"}' >Label</ERadio> / <ERadio :data='{size: "md"}'>Label</ERadio> /
    <ERadio :data='{size: "lg"}'>Label</ERadio>
    <br />
    <EToggle :data='{size: "sm"}'/> / <EToggle :data='{size: "md"}' /> / <EToggle :data='{size: "lg"}' />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ECheckbox from '@/components/togglers/ECheckbox.vue'
import ERadio from '@/components/togglers/ERadio.vue'
import EToggle from '@/components/togglers/EToggle.vue'
export default defineComponent({
  name: 'App',
  components: {ECheckbox, ERadio, EToggle},
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