<template>
  <div style="width: 228px">
    <!--  todo naming  searchInput: true,-->
    <!--    todo pass props like requiring for input-->
    <ESelect
      :data="{
        searchable: true,
        searchInput: true,
        size: 'lg',
        options: [
          {
            name: 'Option one',
            key: 1,
          },
          {
            name: 'Option two',
            key: 2,
          },
          {
            name: 'Option three',
            key: 3,
          },
        ],
      }"
    />
  </div>
</template>

<script lang="ts">
import ESelect from '@/components/inputs/Select/ESelect.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'App',
  components: { ESelect },
  data() {
    return {}
  },
  mounted() {},
  methods: {},
})
</script>

<style lang="scss">
.a {
  display: grid;
  grid-row-gap: 30px;
}
</style>
