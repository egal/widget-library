import {ActionConstructor} from '@egalteam/framework'
import {tableStore} from "@/components/table/storage/TableStore";

type TableData = {
    currentPage: number
    perPage: number
    totalCount: number
    headers: Array<object>
    items: Array<{ [key: string]: any }>
    fields: Array<object>
    filters: Array<object>
    orders: Array<object>
    search: Array<string>
}

type TableMetadata = {
    filter: string[]
    order: string[][]
    search: string
    fields: object[]
    label: string
    relations: string[]
    role_access: string[]
}

export default class Table {
    microserviceName: string = ''
    modelName: string = ''
    metadataName: string = ''
    metadata: TableMetadata = {
        filter: [],
        order: [],
        search: [],
        fields: [],
        label: '',
        relations: [],
        role_access: [],
    }
    userFilter: any
    url: string = ''
    egalConstructor: any = undefined
    tableItems: Array<object> = []
    filterableFields: Array<object> = []
    tableData: TableData = {
        currentPage: 1,
        perPage: 10,
        totalCount: 0,
        headers: [],
        items: [],
        fields: [],
        filters: [],
        orders: [],
        search: ''
    }

    initTable(
        microserviceName: string,
        modelName: string,
        metadataName: string,
        url: string,
        userFilter?: any,
    ) {
        this.microserviceName = microserviceName
        this.modelName = modelName
        this.metadataName = metadataName
        this.userFilter = userFilter
        this.url = url
        this.egalConstructor = new ActionConstructor(this.url)
        this.getTableMetadata()
            .then(() => {
                this.getTableItems()
            })
            .catch((error) => {
                return error
            })
        tableStore.setUrl(this.url)
        tableStore.setMicroserviceName(this.microserviceName)
        tableStore.setModelName(this.modelName)
    }

    getTableMetadata(): Promise<any> {
        return new Promise((resolve, reject) => {
            this.egalConstructor
                .custom(this.microserviceName, this.modelName, 'getTablesMetadata', {})
                .call()
                .then((response: any) => {
                    this.tableData.headers = response[this.metadataName].fields
                    this.metadata = response[this.metadataName]
                    this.tableData.orders = response[this.metadataName].order
                    this.tableData.filters = response[this.metadataName].filter
                    this.tableData.search = response[this.metadataName].search
                    resolve(response)
                })
                .catch((error: any) => {
                    reject(error)
                    console.log(error)
                })
        })
    }

    getTableItems(page = 1,
                  perPage = 10,
                  filter?: any,
                  orders?: string[][] | string[]): void {
        const filterArr: any[] = []
        const relations = this.metadata.relations
        this.tableData.items = []
        this.tableData.currentPage = page
        this.tableData.perPage = perPage
        // if (this.metadata.filter?.length) {
        //     filterArr.push(this.metadata.filter)
        // }
        // if (filter !== undefined) {
        //     this.tableData.filters[filter.name] = filter.filter
        // }
        // if (Object.keys(this.tableData.filters).length) {
        //     Object.keys(this.tableData.filters).forEach((filterKey) => {
        //         if (this.tableData.filters[filterKey].length) {
        //             filterArr.push(this.tableData.filters[filterKey][0])
        //         }
        //     })
        // }
        let ordersArr: Array<any> = []
        if (orders) {
            ordersArr = orders
        } else if (Object.keys(this.tableData.orders).length) {
            Object.keys(this.tableData.orders).forEach((orderName) => {
                ordersArr.push(this.tableData.orders[orderName])
            })
        }
        this.egalConstructor
            .getItems(this.microserviceName, this.modelName)
            .filter(filterArr)
            .withs(relations)
            .setPagination(this.tableData.perPage, this.tableData.currentPage)
            .order([ordersArr])
            .call()
            .then((response: any) => {
                this.tableData.currentPage = response.current_page
                this.tableData.perPage = response.per_page
                this.tableData.totalCount = response.total_count
                this.tableItems = response.items
                tableStore.setTableData({
                    tableTitle: response[this.metadataName],
                    fields: this.tableData.headers,
                    items: this.tableItems,
                    filters: this.tableData.filters
                })
                if (this.metadata && !this.tableData.headers.length) {
                    this.setTable()
                } else if (this.metadata && this.tableData.items) {
                    this.setTable()
                }
            })
            .catch((error: any) => {
                console.log(error)
            })
    }

    setTable() {
        this.tableData.items = []
        let tableFieldArray: Array<object> = []
        let item = {}
        let path: string
        this.tableItems.forEach((rowData: { [key: string]: any }, rowIndex) => {
            this.tableData.items.push({id: rowData.id, values: {}})
            this.metadata.fields.forEach((field: { [key: string]: any }) => {
                path = field.path.includes('[]') ? field.path.split('[')[0] : field.path
                const asArray = Object.entries(rowData);
                const filtered = asArray.filter(([key, value]) => path === key);
                const justStrings = Object.fromEntries(filtered);
                tableFieldArray.push(justStrings)
            })
            item = Object.assign({}, ...tableFieldArray)
            this.tableData.items[rowIndex].values = item
        })
        this.setTableFilters()
    }

    setTableFilters() {
        this.metadata.fields.forEach((field: { [key: string]: any }) => {
            if (field.filterable) {
                this.filterableFields.push(field)
                tableStore.setFilterableFields(this.filterableFields)
            }
        })
        console.log(this.filterableFields)
    }

    searchTable(value: any) {
        let timeoutID: number
            const filter = value
                ? [
                    {
                        field: this.tableData.search,
                        operator: 'swi',
                        value: value,
                    },
                ]
                : []
            clearTimeout(timeoutID)

            timeoutID = setTimeout(() => {
                this.egalConstructor.getItems(this.microserviceName, this.modelName)
                    .filter(filter)
                    .call()
                    .then((response: any) => {
                        this.tableItems = response.items
                        this.setTable()
                        clearTimeout(timeoutID)
                    })
            }, 300)
    }

    deleteSelectedValues() {
        let valuesForDeletion: { [key: string]: any } = tableStore.getState().selectedItems
        let ids = []
        let deleteParams = {}
        if (valuesForDeletion.length === 1) {
            deleteParams = {
                id: valuesForDeletion[0].id
            }
            this.egalConstructor.delete(this.microserviceName, this.modelName, deleteParams).call().then((response: any) => {

            }).catch((error: any) => {

            })
        } else {
            for (let i in valuesForDeletion) {
                ids.push(valuesForDeletion[i].id)
            }
            deleteParams = {
                ids: ids
            }
            this.egalConstructor.deleteMany(this.microserviceName, this.modelName, deleteParams).call().then((response: any) => {

            }).catch((error: any) => {

            })
        }

    }

    updateSelectedValues() {
    }
}
