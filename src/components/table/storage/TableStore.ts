import {Store} from './Store'

interface Table extends Object {
    tableData: {
        tableTitle: string
        headers: Array<Record<string, unknown>>
        fields: Array<Record<string, unknown>>
        items: Array<Record<string, unknown>>
    }
    selectedItem: object
    url: string
    microserviceName: string
    selectedItems: Array<object>
}

class TableStore extends Store<Table> {
    public data(): Table {
        return {
            tableData: {
                tableTitle: '',
                headers: [],
                fields: [],
                items: [],
            },
            selectedItem: {},
            selectedItems: [],
            url: '',
            microserviceName: ''
        }
    }

    public setTableData(tableData: {
        tableTitle: string
        headers: Array<Record<string, unknown>>
        fields: Array<Record<string, unknown>>
        items: Array<Record<string, unknown>>
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

    public setSelectedValues(value: any) {
        this.state.selectedItems.push(value)

    }

    public removeSelectedValue() {
        this.state.selectedItems = []
    }
}

export const tableStore: TableStore = new TableStore()
