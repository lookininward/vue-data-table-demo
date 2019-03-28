import { mount, shallowMount } from '@vue/test-utils'
import DataTable from '@/components/DataTable.vue'
// check for computed results
// check for key DOM elements

describe('DataTable.vue', () => {

  // Data Table component displays json data
  // takes in an array of json objects with at least one field
      //-- make id required

  // table headers are calculated based on the keys of the first object

  // items are sorted and displayed in rows
      //-- handles strings/dates, numbers
      //-- filters by search input
      //-- pages are calculated by total and per page input
      //-- a page is a subset of the array of pages

  // actions taken from DataTable
    //-- sort the table by selecting the current sortKey
        //-- ascending, descending
    //-- select an item row
    //-- set the current page

    //-- filters
    //-- on mobile -- can toggle the Quick Edit mode
        //-- a list view for better mobile display and editing
    //-- hide selected field based on key
    //-- set number of results to display per page
    //-- select all items in db
        //-- when some are selected, all are deselected

  it('component does render', () => {
    // check for key DOM elements
    const wrapper = shallowMount(DataTable)
    expect(wrapper.attributes()['data-test-component']).toBe('DataTable')
    expect(wrapper.contains('[data-test-component="DataTable"]')).toBe(true)
    expect(wrapper.contains('[data-test-component="TableHeader"]')).toBe(true)
    expect(wrapper.contains('[data-test-TableBody]')).toBe(true)
    expect(wrapper.contains('[data-test-component="TableFooter"]')).toBe(true)
  })

  // headers() computed correctly returns headers with data type
  // breakout sort code from sortedItems() and test independently
  // breakout search code from sortedItems() and test independently
  // calculatePages(items) breaks up data into correct page sets
  // paginatedItems() return subset of setPages based on current set page

  it('generates correct number of rows', () => {
    // check for computed results
    // check for key DOM elements
    let items = []
    for (let i = 0; i < 100; i++) { items.push({ name: 'Kyra Lester'}) }


    const wrapper = shallowMount(DataTable, { propsData:  { items }})
    expect(wrapper.vm.pages.length).toBe(5)
    expect(wrapper.vm.items.length).toBe(100)
    expect(wrapper.vm.perPage).toBe(20) // default
    expect(
      wrapper.findAll('[data-test-component="TableRow"]').length
    ).toBe(wrapper.vm.perPage)
  })

  it('can track selected items', () => {
    let items = [
      {
        "id": "3471DA17-401F-9633-BF81-4CADA6FD5C79",
        "name": "Kyra Lester",
        "description": "Curabitur dictum. Phasellus in",
        "date": "2017-07-23T04:24:49-07:00",
        "amount": 345.54
      },
      {
        "id": "9F5C9912-936A-FB85-1EDB-9DA87BE7FF1E",
        "name": "Buckminster Alvarado",
        "description": "dui, in sodales elit erat vitae risus. Duis a mi",
        "date": "2018-11-08T05:44:15-08:00",
        "amount": 677.08
      },
      {
        "id": "B743AC82-3613-13A2-2E42-E0C1F5CBF8A6",
        "name": "Athena Smith",
        "description": "massa lobortis ultrices. Vivamus rhoncus.",
        "date": "2018-11-11T06:19:57-08:00",
        "amount": 73.67
      }
    ]

    const wrapper = shallowMount(DataTable, { propsData: { items } })
    expect(wrapper.vm.selectedItemIDs.length).toBe(0)

    // select an item
    wrapper.vm.toggleSelect(items[0].id)
    expect(wrapper.vm.selectedItemIDs.length).toBe(1)
    expect(
      wrapper.vm.selectedItemIDs[0]
    ).toBe("3471DA17-401F-9633-BF81-4CADA6FD5C79")

    // select another
    wrapper.vm.toggleSelect(items[2].id)
    expect(wrapper.vm.selectedItemIDs.length).toBe(2)

    // unselect the first
    wrapper.vm.toggleSelect(items[0].id)

    // second still present
    expect(wrapper.vm.selectedItemIDs.length).toBe(1)
    expect(
      wrapper.vm.selectedItemIDs[0]
    ).toBe("B743AC82-3613-13A2-2E42-E0C1F5CBF8A6")
  })

  // toggleSelect(itemID)
  // selectAllItems()

  // can select all items in db
  // can delete individual item in db -- RowPopover delete -- Vuex
  // can delete all selected items RowPopover (HeaderRow?) delete -- Vuex
  // can set the current page
    // setCurrentPage(pageNum)
  // quick edit mode can be toggled
    //-- test that it sets class on data table for grid changes
    // toggleListView()

  // Filters ------------

  // search
  it('can filter table by search', () => {
    let items = [
      {
        "id": "3471DA17-401F-9633-BF81-4CADA6FD5C79",
        "name": "Kyra Lester",
        "description": "Curabitur dictum. Phasellus in",
        "date": "2017-07-23T04:24:49-07:00",
        "amount": 345.54
      },
      {
        "id": "9F5C9912-936A-FB85-1EDB-9DA87BE7FF1E",
        "name": "Buckminster Alvarado",
        "description": "dui, in sodales elit erat vitae risus. Duis a mi",
        "date": "2018-11-08T05:44:15-08:00",
        "amount": 677.08
      },
      {
        "id": "B743AC82-3613-13A2-2E42-E0C1F5CBF8A6",
        "name": "Athena Smith",
        "description": "massa lobortis ultrices. Vivamus rhoncus.",
        "date": "2018-11-11T06:19:57-08:00",
        "amount": 73.67
      }
    ]

    // return all results when no search input
    const wrapper = mount(DataTable, { propsData:  { items } })
    let rows = wrapper.findAll('[data-test-component="TableRow"]')
    let search = wrapper.find('[data-test-input="Search"]')
    expect(search.contains('[data-test-input="Search"]')).toBe(true)
    expect(rows.length).toBe(3)
    expect(wrapper.vm.sortedItems.length).toBe(3)

    // search and retrieve record
    search.setValue('Buckminster')
    rows = wrapper.findAll('[data-test-component="TableRow"]')
    expect(rows.length).toBe(1)
    expect(wrapper.vm.sortedItems.length).toBe(1)

    // find no records without matching input
    search.setValue('xxxxxxxxxxx')
    rows = wrapper.findAll('[data-test-component="TableRow"]')
    expect(rows.length).toBe(0)
    expect(wrapper.vm.sortedItems.length).toBe(0)
  })

  // can set number of results to return per page
  // setPerPage(value)

  // sort
  // row data can by sorted asc/desc by setting the sortKey, in reverse
  // sortTableBy(sortKey, sortType)
  let items = [
    {
      "id": "3471DA17-401F-9633-BF81-4CADA6FD5C79",
      "name": "Kyra Lester",
      "description": "Curabitur dictum. Phasellus in",
      "date": "2017-07-23T04:24:49-07:00",
      "amount": 345.54
    },
    {
      "id": "9F5C9912-936A-FB85-1EDB-9DA87BE7FF1E",
      "name": "Buckminster Alvarado",
      "description": "dui, in sodales elit erat vitae risus. Duis a mi",
      "date": "2018-11-08T05:44:15-08:00",
      "amount": 677.08
    },
    {
      "id": "B743AC82-3613-13A2-2E42-E0C1F5CBF8A6",
      "name": "Athena Smith",
      "description": "massa lobortis ultrices. Vivamus rhoncus.",
      "date": "2018-11-11T06:19:57-08:00",
      "amount": 73.67
    }
  ]

  let item1 = items[0]
  let item2 = items[1]
  let item3 = items[2]

  const wrapperDataTable = mount(DataTable, { propsData: { items }})
  let rows = wrapperDataTable.findAll('[data-test-component="TableRow"]')
  let row1Cells = rows.at(0).findAll('[data-test-component="TableCell"]')
  let row2Cells = rows.at(1).findAll('[data-test-component="TableCell"]')
  let row3Cells = rows.at(2).findAll('[data-test-component="TableCell"]')

  let headers = wrapperDataTable.findAll('[data-test-HeaderCell]')

  it('can sort table by amount', () => {
    wrapperDataTable.vm.sortTableBy('amount', 'number')
    expect(wrapperDataTable.vm.sortedItems[0]).toBe(item3)
    expect(wrapperDataTable.vm.sortedItems[1]).toBe(item1)
    expect(wrapperDataTable.vm.sortedItems[2]).toBe(item2)

    wrapperDataTable.vm.sortTableBy('amount', 'number')
    expect(wrapperDataTable.vm.sortedItems[0]).toBe(item2)
    expect(wrapperDataTable.vm.sortedItems[1]).toBe(item1)
    expect(wrapperDataTable.vm.sortedItems[2]).toBe(item3)
  })

  it('can sort table by id', () => {
    wrapperDataTable.vm.sortTableBy('id', 'string')
    expect(wrapperDataTable.vm.sortedItems[0]).toBe(item1)
    expect(wrapperDataTable.vm.sortedItems[1]).toBe(item2)
    expect(wrapperDataTable.vm.sortedItems[2]).toBe(item3)

    wrapperDataTable.vm.sortTableBy('id', 'string')
    expect(wrapperDataTable.vm.sortedItems[0]).toBe(item3)
    expect(wrapperDataTable.vm.sortedItems[1]).toBe(item2)
    expect(wrapperDataTable.vm.sortedItems[2]).toBe(item1)
  })

  it('can sort table by name', () => {
    wrapperDataTable.vm.sortTableBy('name', 'string')
    expect(wrapperDataTable.vm.sortedItems[0]).toBe(item3)
    expect(wrapperDataTable.vm.sortedItems[1]).toBe(item2)
    expect(wrapperDataTable.vm.sortedItems[2]).toBe(item1)

    wrapperDataTable.vm.sortTableBy('name', 'string')
    expect(wrapperDataTable.vm.sortedItems[0]).toBe(item1)
    expect(wrapperDataTable.vm.sortedItems[1]).toBe(item2)
    expect(wrapperDataTable.vm.sortedItems[2]).toBe(item3)

  })

  it('can sort table by description', () => {
    wrapperDataTable.vm.sortTableBy('description', 'string')
    expect(wrapperDataTable.vm.sortedItems[0]).toBe(item1)
    expect(wrapperDataTable.vm.sortedItems[1]).toBe(item2)
    expect(wrapperDataTable.vm.sortedItems[2]).toBe(item3)

    wrapperDataTable.vm.sortTableBy('description', 'string')
    expect(wrapperDataTable.vm.sortedItems[0]).toBe(item3)
    expect(wrapperDataTable.vm.sortedItems[1]).toBe(item2)
    expect(wrapperDataTable.vm.sortedItems[2]).toBe(item1)
  })

  it('can sort table by date', () => {
    wrapperDataTable.vm.sortTableBy('date', 'string')
    expect(wrapperDataTable.vm.sortedItems[0]).toBe(item1)
    expect(wrapperDataTable.vm.sortedItems[1]).toBe(item2)
    expect(wrapperDataTable.vm.sortedItems[2]).toBe(item3)

    wrapperDataTable.vm.sortTableBy('date', 'string')
    expect(wrapperDataTable.vm.sortedItems[0]).toBe(item3)
    expect(wrapperDataTable.vm.sortedItems[1]).toBe(item2)
    expect(wrapperDataTable.vm.sortedItems[2]).toBe(item1)
  })

  // hide/display fields
  //-- hide selected field based on key
  // toggleFields(field)
})
