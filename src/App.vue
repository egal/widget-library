<template>
  <div :style="{ display: 'flex' }">
    <div :style="{ width: '280px', marginTop: '20px', marginRight: '60px' }">
      <ESelect
        :data="{ ...selectdata, size: 'lg' }"
        :style-config="{
          fontFamily: 'Inter',
        }"
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
    <div :style="{ width: '280px', marginTop: '20px', marginRight: '60px' }">
      <ESelect
        :data="{ ...selectdata, size: 'md' }"
        :style-config="{
          fontFamily: 'Inter',
        }"
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
    <div :style="{ width: '280px', marginTop: '20px', marginRight: '60px' }">
      <ESelect
        :data="{ ...selectdata, size: 'sm' }"
        :style-config="{
          fontFamily: 'Inter',
        }"
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
    <div :style="{ width: '280px', marginTop: '20px', marginRight: '60px' }">
      <ESelect
        :data="{ ...selectdata, size: 'xs' }"
        :style-config="{
          fontFamily: 'Inter',
        }"
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ESelect from '@/components/inputs/Select/ESelect.vue'
import EInput from '@/components/inputs/Input/EInput.vue'
export default defineComponent({
  name: 'App',
  components: { ESelect, EInput },
  data() {
    return {
      ttt: true,
      // styleC: {
      //   fontFamily: 'Roboto',
      // },
      selectdata: {
        multiple: true,

        modelValue: [],
        options: [
          {
            name: 'jg hj',
            amount: 22,
          },
          { name: 'iireg', amount: 2 },
          { name: 'd ghfah' },
          {
            name: 'jeg hj',
            amount: 22,
          },
          { name: 'iyhig', amount: 2 },
          { name: 'dygfhh' },
          {
            name: 'jtg hj',
            amount: 22,
          },
          { name: 'itig', amount: 2 },
          { name: 'dayth' },
          {
            name: 'jg hj',
            amount: 22,
          },
          { name: 'iifgh  g', amount: 2 },
          { name: 'dafgh h' },
        ],
        // isLocalOptions: false,
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
        // showSuccess: true,
        openDropdown: true,
        dropdownStyleConfig: {
          activeBackgroundColor: 'red',
        },
      },
    }
  },
  methods: {
    required(value) {
      // return value.name.length > 5 ? `Максимум  5 символов ` : ''
      return !Object.keys(value).length ? 'Обязательное поле' : ''
    },
    fff(error) {
      // console.log(error)
    },
    upd(v) {
      // console.log('on update ', v)
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
