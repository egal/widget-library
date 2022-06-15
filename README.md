# Изменения
## Передаваемый объект `:data` - добавлены новые совйства
|    Параметр     |   Тип   | По умолчанию | Возможные значения                         | Описание                                                                                                                               |
|:---------------:|:-------:|:------------:|:-------------------------------------------|:---------------------------------------------------------------------------------------------------------------------------------------|
|  `helperText`   | String  |     `''`     | Любая строка                               | Мелкий текст под селектом/инпутом селекта                                                                                              |
| `shownBadgeKey` | String  |     `''`     | Любая строка                               | Ключ, по которому выводить значение (количество чего-либо) в бейджике для каждого элемента в дропдауне. Работает аналогично `shownKey` |
|  `showSuccess`  | Boolean |   `false`    | `true`, `false`                            | Показывать "успешное" состояние инпута                                                                                                 |
|  `inputConfig`  | Объект  |     `{}`     | Объект, передаваемый как `data` для EInput | Должен содержать в себе параметры из `data` объекта для EInput, передается в инпуты с поиском для кастомизации                         |
- showFilled: false (изменено дефолтное значение)
### styleConfig
- '--label-font-weight': this.styleConfig?.labelFontWeight - дефолтное значение теперь **400**
- Добавлены свойства, которые можно передавать в существующем объекте стилей `data.dropdownStyleConfig` (т.е. стили для дродауна):
    - `optionPressBackgroundColor`  - Цвет фона при нажатии на опцию
    - `activeHoverBackgroundColor` - Цвет фона при наведении на выбранную опцию
    - `activePressBackgroundColor` - Цвет фона при нажатии на выбранную опцию

# Пример использования
````vue
<template>
  <div :style="{ width: '280px', marginTop: '20px' }">
    <ESelect
      :data="{ ...selectdata }"
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
      selectdata: {
        multiple: true,
        modelValue: [],
        options: [
          {
            name: '1',
            amount: 22,
          },
          { name: '2', amount: 2 },
          { name: '3' },
          {
            name: '4',
            amount: 22,
          },
          { name: '5', amount: 2 },
          { name: '6' },
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
        label: 'Default label',
        helperText: 'helper',
        // error: true,
        // showSuccess: true,
        // openDropdown: true,
        dropdownStyleConfig: {
          activeBackgroundColor: 'red',
          activeHoverBackgroundColor: '#f55'
        },
      },
    }
  },
  methods: {
    required(value) {
      return !Object.keys(value).length ? 'Обязательное поле' : ''
    },
    
    upd(v) {
      this.selectdata.modelValue = v
      this.selectdata.closeDropdown = true
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
````
