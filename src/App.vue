<template>
  <div :style="{ width: '300px', marginTop: '20px' }">
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
      ttt: true,
      selectdata: {
        size: 'lg',
        // multiple: true,
        searchable: false,
        modelValue: [],
        options: [
          { name: 'jghjghji', amount: 22 },
          { name: 'iighjcghjcg', amount: 2 },
          { name: 'dah' },
        ],
        isLocalOptions: false,
        nonLocalOptionsTotalCount: 20,
        showMoreButtonDisplay: true,
        showMoreButtonText: 'Показать больше',
        validators: [this.required],
        closeDropdownAfterSelection: false,
        closeDropdown: false,
        // dropdownPosition: 'top',
        iconLeft: 'archive',
        iconRight: 'archive',
        shownBadgeKey: 'amount',
        // disabled: true,
        label: 'Lfslgkdlfgk',
        helperText: 'helper',
        showSuccess: true, // todo add success text ?
      },
    }
  },
  methods: {
    required(value) {
      console.log('value: ', value)
      console.log(value.name.length, value.name, value.name.lentgh < 5)

      return value.name.length > 5 ? `Максимум  5 символов ` : ''

      // return !Object.keys(value).length ? 'Обязательное поле' : ''
    },
    fff(error) {
      console.log(error)
    },
    upd(v) {
      console.log('on update ', v)
      this.selectdata.modelValue = v
      this.selectdata.closeDropdown = true
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
