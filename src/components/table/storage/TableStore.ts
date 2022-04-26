import { Store } from './Store'
interface Table extends Object {
  tableData: {
    tableTitle: string
    headers: Array<Record<string, unknown>>
    fields: Array<Record<string, unknown>>
    items: Array<Record<string, unknown>>
  }
  selectedItem: Record<string, unknown>
  url: string
  microserviceName: string
}

class TableStore extends Store<Table> {
  protected data(): Table {
    return {
      tableData: {
        tableTitle: '',
        headers: [],
        fields: [],
        items: [],
      },
      selectedItem: {},
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
}

export const tableStore: TableStore = new TableStore()
