<template>
  <div class="filter-container">
    <div class="filters">
      <div class="filter-inputs">
        <div v-for="(visibleFilter, index) in visibleFilters" :key="index">
          <FilterWidget :filter-data="visibleFilter"></FilterWidget>
        </div>
      </div>
      <div class="filter-controls">
        <EButton
            class="open-filter-btn"
            :data="{
          rightIcon: 'chevron-down',
          softColors: true,
          size: 'lg',
          disabled: allFilterableFields.length < 4,
          rotateRightIcon: filtersOpen
        }"
            @click="openFilters"
        >{{ allFiltersBtn }}
        </EButton>
        <button class="clear-filters-btn">
          {{ clearFiltersBtn }}
          <div>
            <span>{{ filterCounter }}</span>
          </div>
        </button>
      </div>
    </div>
    <div class="additional-filters" :class="{'filter-panel-open': filtersOpen}">
      <div v-show="filtersOpen">
        <div v-for="(cardFilter, index) in cardFilters" :key="index" class="filter-input">
          <FilterWidget :filter-data="cardFilter"></FilterWidget>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import FilterWidget from '@/components/table/Filters/FilterWidget.vue'
import EButton from '@/components/togglers/EButton.vue'
import {tableStore} from '@/components/table/storage/TableStore'
import ESelect from '@/components/inputs/Select/ESelect.vue'

export default defineComponent({
  name: 'Filters',
  components: {FilterWidget, EButton, ESelect},
  data() {
    return {
      allFilterableFields: tableStore.getState().filterableFields,
      predefinedFilters: tableStore.getState().tableData.filters,
      visibleFilters: [] as Array<object>,
      cardFilters: [] as Array<object>,
      filterCounter: tableStore.getState().tableData.filters.length,
      filtersOpen: false
    }
  },
  props: {
    fields: {
      type: Array,
      default: [],
    },
    allFiltersBtn: {
      type: String,
      default: 'All filters',
    },
    clearFiltersBtn: {
      type: String,
      default: 'Clear filters',
    },
  },
  mounted() {
    this.setVisibleFilters()
  },
  computed: {},
  methods: {
    openFilters() {
      this.filtersOpen = !this.filtersOpen
    },
    setVisibleFilters() {
      let temporaryPredefinedFilterArr: object[] = []
      let temporaryFilterArr: object[] = []
      let allFilters = []
      this.allFilterableFields.forEach((field) => {
        if (this.predefinedFilters.length) {
          this.predefinedFilters.forEach((filter) => {
            if (field.path === filter.field) {
              temporaryPredefinedFilterArr.push({field: field, filter: filter})
            }
          })
        }
        temporaryFilterArr.push({field: field, filter: {}})
      })
      // temporaryFilterArr = temporaryPredefinedFilterArr.filter(function(item) {
      //   return !temporaryFilterArr.includes(item.field);
      // })
      // console.log(temporaryFilterArr, 'temp arr')
      allFilters = [...new Set([...temporaryPredefinedFilterArr, ...temporaryFilterArr])]
      // allFilters = [...new Set([...temporaryPredefinedFilterArr, ...temporaryFilterArr])]
      if (allFilters.length < 4) {
        this.visibleFilters = [...allFilters]
      } else {
        this.visibleFilters = allFilters.slice(0, 3)
        this.cardFilters = allFilters.slice(3)
      }
      console.log(this.visibleFilters, 'visible')
      console.log(this.cardFilters, 'card')
    }
  }
})
</script>

<style scoped lang="scss">
@import '../tableStyles';
</style>
