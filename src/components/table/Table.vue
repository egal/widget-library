<template>
  <div class="table-container">
    <slot name="additionalHeaderContent"></slot>
    <div class="table-header">
<!--      <div class="table-filters" v-if="tableConstructor?.filterableFields.length">-->
<!--        <Filters :fields="tableConstructor?.filterableFields"></Filters>-->
<!--      </div>-->
      <div class="control-buttons">
        <div class="edit-mode-off-buttons" v-if="!editActive">
          <EButton
            class="edit-button"
            :data="{
              leftIcon: 'pencil-square',
              size: 'lg',
            }"
            @click="editRow()"
            >Edit
          </EButton>
          <EButton
            :data="{
              leftIcon: 'trash',
              softColors: true,
              size: 'lg',
            }"
            @click="deleteRow()"
            >Delete
          </EButton>
        </div>
        <div class="edit-mode-on-buttons" v-if="editActive">
          <EButton
            class="save-button"
            :data="{
              leftIcon: 'pencil-square',
              size: 'lg',
            }"
            @cilck="saveEdit()"
            >Save
          </EButton>
          <EButton
            :data="{
              leftIcon: 'trash',
              softColors: true,
              size: 'lg',
            }"
            @click="cancelEdit"
            >Cancel
          </EButton>
        </div>
      </div>
    </div>
    <div class="table">
      <TableHeader
        :header-content="tableConstructor?.tableData?.headers"
        :show-checkbox="showCheckbox"
        :grid="setGrid"
        :is-expandable="isRowExpandable"
      ></TableHeader>
      <div class="table-row-container">
        <div
          v-for="item in tableConstructor?.tableData?.items"
          class="table-row"
        >
          <TableRow
            :item="item"
            :fields="tableConstructor?.tableData?.headers"
            :show-checkbox="showCheckbox"
            :grid="setGrid"
            :is-expandable="isRowExpandable"
          >
            <template v-slot:expandedRow>
              <slot name="expandedRow"></slot>
            </template>
          </TableRow>
        </div>
      </div>
    </div>
    <div class="pagination">
      <EPagination
        class="table-pagination"
        minimalistic-version
        :data="{
          size: 'lg',
          weight: '500',
          perPage: tableConstructor.tableData?.perPage,
          modelValue: tableConstructor.tableData?.currentPage,
          numberOfPages: numberOfPages,
          dropdownPosition: 'top',
        }"
        :select-style-config="{
          filledBackgroundColor: '#fff',
          valueColor: '#CBD5E0',
          filledFontColor: '#CBD5E0',
          valueFontWeight: '400',
          fontFamily: 'Open Sans',
        }"
        @click.stop
        @update:modelValue="changePage"
        @update:perPageValue="changePerPageOption"
      ></EPagination>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Filters from '@/components/table/Filters/Filters.vue'
import TableRow from '@/components/table/TableRow.vue'
import TableHeader from '@/components/table/TableHeader.vue'
import TableModal from '@/components/table/TableModal.vue'
import EPagination from '@/components/navigation/EPagination.vue'
import EButton from '@/components/togglers/EButton.vue'
import Table from '@/helpers/Table'
import eventBus from '@/helpers/eventBus'

export default defineComponent({
  name: 'Table',
  components: {
    EPagination,
    Filters,
    TableRow,
    TableHeader,
    TableModal,
    EButton,
  },
  props: {
    showCheckbox: {
      type: Boolean,
      default: true,
    },
    table: {
      type: Object,
      default: {},
    },
    isRowExpandable: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      headerContent: {},
      tableConstructor: {} as Table,
      editActive: false,
      checkBox: {
        value: false,
        id: null,
      },
      selectedRows: [],
      activeRows: [],
    }
  },
  computed: {
    setGrid(): string {
      if (this.tableConstructor.tableData?.headers) {
        return `grid-template-columns: min-content repeat(${this.tableConstructor.tableData?.headers.length}, 1fr)`
      } else {
        return 'grid-template-columns: min-content repeat(5, 1fr)'
      }
    },
    numberOfPages(): number {
      const totalCount = this.tableConstructor.tableData?.totalCount
      const perPage = this.tableConstructor.tableData?.perPage

      if (totalCount) {
        return Math.ceil(totalCount / perPage)
      } else {
        return 1
      }
    },
    currentPage(): number {
      return this.tableConstructor.tableData.currentPage
    },
    perPage(): number {
      return this.tableConstructor.tableData.perPage
    },
  },
  mounted() {
    this.tableConstructor = new Table()
    this.tableConstructor.initTable(
      this.table.microserviceName,
      this.table.modelName,
      this.table.tableName,
      this.table.url,
    )
    eventBus.$on('sort-column', (order: Array<string>) => {
      this.tableConstructor.getTableItems(
        this.currentPage,
        this.perPage,
        undefined,
        order,
      )
    })
    eventBus.$on('check-all-boxes', (value: boolean) => {
      this.selectedRows = []
      for (let i in this.tableConstructor.tableData.items) {
        this.selectedRows.push(this.tableConstructor.tableData.items[i])
      }
      if(this.selectedRows.length === this.tableConstructor.tableData.items.length) {
        this.checkBox.value = value
      }
    })
    eventBus.$on('set-active-row', (item: object) => {
      this.activeRows.push(item)
      console.log(this.activeRows)
    })
    eventBus.$on('uncheck-row', (item: object) => {
      this.selectedRows = this.selectedRows.filter((row) => item.id !== row.id)
      if(this.tableConstructor.tableData.items.length !== this.selectedRows.length) {
        eventBus.$emit('uncheck-all', {value: false, item: item})
      }
    })
  },
  methods: {
    changePage(selectedPage: number): void {
      if (selectedPage !== this.currentPage) {
        this.tableConstructor.getTableItems(selectedPage, this.perPage)
      }
    },

    changePerPageOption(perPage: Record<string, number>): void {
      if (perPage.name !== this.perPage) {
        this.tableConstructor.getTableItems(this.currentPage, perPage.name)
      }
    },
    editRow() {
      this.editActive = !this.editActive
      eventBus.$emit('edit-row', this.editActive)
    },
    deleteRow() {},
    saveEdit() {},
    cancelEdit() {},
  },
})
</script>

<style scoped lang="scss">
@import './tableStyles';
</style>
