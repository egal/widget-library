import {Store} from './Store'

interface Table extends Object {
    tableData: {
        tableTitle: string
        fields: Array<object>
        items: Array<object>
        filters: Array<object>
    }
    selectedItem: object
    url: string
    microserviceName: string
    modelName: string,
    selectedItems: Array<object>
    filterableFields: Array<object>
}

class TableStore extends Store<Table> {
    public data(): Table {
        return {
            tableData: {
                tableTitle: '',
                fields: [],
                items: [],
                filters: [],
            },
            selectedItem: {},
            selectedItems: [],
            url: '',
            microserviceName: '',
            modelName: '',
            filterableFields: []
        }
    }

    public setTableData(tableData: {
        tableTitle: string
        fields: Array<object>
        items: Array<object>
        filters: Array<object>
    }) {
        this.state.tableData = tableData
    }

    public setSelectedItem(item: Record<string, unknown>) {
        this.state.selectedItem = item
    }

    public setUrl(url: string) {
        this.state.url = url
    }

    public setMicroserviceName(name: string) {
        this.state.microserviceName = name
    }

    public setModelName(name: string) {
        this.state.modelName = name
    }

    public setSelectedValues(value: any) {
        this.state.selectedItems.push(value)
    }

    public removeSelectedValue() {
        this.state.selectedItems = []
    }

    public setFilterableFields(fields: any) {
        this.state.filterableFields = fields
    }
}

export const tableStore: TableStore = new TableStore()
