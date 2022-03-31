<template>
  <div :style="{ width: '600px' }">

    <ESelect
      :data="selectdata"
      @update:modelValue="upd"
      @show-more="addMore"
      @input="
        ($event) => {
          searchOptions($event.target.value)
        }
      "
    ></ESelect>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ESelect from '@/components/inputs/Select/ESelect.vue'
export default defineComponent({
  name: 'App',
  components: { ESelect },
  data() {
    return {
      selectdata: {
        size: 'lg',
        multiple: true,
        searchableInput: true,
        modelValue: [{ name: 'gggggggg' }],
        options: [{ name: 'jki' }, { name: 'ii' }, { name: 'gggggggg' }, { name: 'ggggdsdsgggg' }, { name: 'ggggggggsdf' }],
        isLocalOptions: true,
        nonLocalOptionsTotalCount: 20,
        showMoreButtonDisplay: true,
        showMoreButtonText: 'Показать больше...',
        validators: [this.required],
        iconRight: 'search'
      },

    }
  },
  methods: {
    upd(v) {
      console.log(v)
      this.selectdata.modelValue = v
    },
    addMore() {
      this.selectdata.options.push({
        name: '3333',
      })
      this.selectdata.options.push({
        name: '33433',
      })
      this.selectdata.options.push({
        name: '366',
      })
      this.selectdata.options.push({
        name: '356',
      })
      this.selectdata.options.push({
        name: '44',
      })
    },
    searchOptions(v) {
      if (!v) {
        this.selectdata.options = [{ name: 'jki' }, { name: 'ii' }, { name: 'gggggggg' }, { name: 'ggggdsdsgggg' }, { name: 'ggggggggsdf' }]
      }
      this.selectdata.options = this.selectdata.options.filter((i) => i.name.includes(v))
    },
  },
})
</script>

<style lang="scss">
.a {
  display: grid;
  grid-row-gap: 30px;
}
</style>