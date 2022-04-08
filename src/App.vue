<template>
  <div :style="{ width: '300px' }">
    <EInput
      :data="{
        postfix: 'гр/л',
        // iconRight: 'trash',
        clearable: false,
      }"
      :style-config="{
        fontFamily: 'Raleway',
      }"
    ></EInput>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import EInput from '@/components/inputs/Input/EInput.vue'
export default defineComponent({
  name: 'App',
  components: { EInput },
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
