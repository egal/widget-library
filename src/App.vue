<template>
  <div :style="{ width: '350px' }">
    <ESelect
      :data="selectdata"
      @update:modelValue="upd"
      @show-more="addMore"
      @input="
        ($event) => {
          searchOptions($event.target.value)
        }
      "
      @error="fff"
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
        options: [{ name: 'jki' }, { name: 'ii' }],
        isLocalOptions: false,
        nonLocalOptionsTotalCount: 20,
        showMoreButtonDisplay: true,
        showMoreButtonText: 'Показать больше...',
        validators: [this.required],
      },
    }
  },
  methods: {
    required(value) {
      return !value ? 'Обязательное поле' : ''
    },
    fff(error) {
      console.log(error)
    },
    upd(v) {
      console.log('on update ', v)
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
