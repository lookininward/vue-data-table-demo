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
    const wrapper = shallowMount(DataTable)
    expect(wrapper.attributes()['data-test-component']).toBe('DataTable')
    expect(wrapper.contains('[data-test-component="DataTable"]')).toBe(true)
    expect(wrapper.contains('[data-test-component="TableHeader"]')).toBe(true)
    expect(wrapper.contains('[data-test-TableBody]')).toBe(true)
    expect(wrapper.contains('[data-test-component="TableFooter"]')).toBe(true)
  })

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

  //-- Computed ---------------------------------------------------------------

  it('dataFields() returns data fields with type', () => {
    let items = [{
      "id": "3471DA17-401F-9633-BF81-4CADA6FD5C79",
      "name": "Kyra Lester",
      "description": "Curabitur dictum. Phasellus in",
      "date": "2017-07-23T04:24:49-07:00",
      "amount": 345.54
    }]

    let itemKeys = Object.keys(items[0])
    const wrapper = shallowMount(DataTable, { propsData:  { items }})
    expect(wrapper.vm.dataFields.length).toBe(5)

    expect(wrapper.vm.dataFields[0]).toEqual({
      "field": itemKeys[0],
      "type": "string"
    })

    expect(wrapper.vm.dataFields[1]).toEqual({
      "field": itemKeys[1],
      "type": "string"
    })

    expect(wrapper.vm.dataFields[2]).toEqual({
      "field": itemKeys[2],
      "type": "string"
    })

    expect(wrapper.vm.dataFields[3]).toEqual({
      "field": itemKeys[3],
      "type": "string"
    })

    expect(wrapper.vm.dataFields[4]).toEqual({
      "field": itemKeys[4],
      "type": "number"
    })
  })

  // sortedItems() computed -- rename
    //-- _filterItemsBySearch()
    //-- _sortItemsByField()
    //-- _paginateItems()

  it('sortedItems() returns subset of pages', () => {
    let items = []
    for (let i = 0; i < 300; i++) {
      items.push({ name: 'Kyra Lester'})
    }

    const wrapper = shallowMount(DataTable, { propsData:  { items }})
    expect(wrapper.vm.currentPage).toBe(0)
    expect(wrapper.vm.pages.length).toBe(15)

    expect(
      wrapper.vm.sortedItems
    ).toEqual(wrapper.vm.pages[0])

    wrapper.vm.currentPage = 5
    expect(
      wrapper.vm.sortedItems
    ).toEqual(wrapper.vm.pages[4])

  })

  //-- Internal Methods -------------------------------------------------------

  it('_filterItemsBySearch() filters data by search text', () => {
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

    const wrapper = shallowMount(DataTable, { propsData:  { items }})

    // verify current sort order and defaults
    expect(wrapper.vm.sortedItems.length).toBe(3)
    expect(wrapper.vm.sortedItems[0]).toEqual(items[0])
    expect(wrapper.vm.sortedItems[1]).toEqual(items[1])
    expect(wrapper.vm.sortedItems[2]).toEqual(items[2])
    expect(wrapper.vm.sortKey).toBe(null)
    expect(wrapper.vm.sortType).toBe(null)
    expect(wrapper.vm.reverse).toBe(false)

    // sort by id
    expect(
      wrapper.vm._filterItemsBySearch(
        items,
        '' //searchText
      ).length
    ).toBe(3)

    expect(
      wrapper.vm._filterItemsBySearch(
        items,
        'Athena'
      )
    ).toEqual([items[2]])
  })

  // issue with sorting by amount
  it('_sortItemsByField() internal method correctly sorts data', () => {
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

    const wrapper = shallowMount(DataTable, { propsData:  { items }})

    // verify current sort order and defaults
    expect(wrapper.vm.items.length).toBe(3)
    expect(wrapper.vm.sortedItems[0]).toEqual(items[0])
    expect(wrapper.vm.sortedItems[1]).toEqual(items[1])
    expect(wrapper.vm.sortedItems[2]).toEqual(items[2])
    expect(wrapper.vm.sortKey).toBe(null)
    expect(wrapper.vm.sortType).toBe(null)
    expect(wrapper.vm.reverse).toBe(false)

    // sort by id
    wrapper.vm._sortItemsByField(
      items,
      'id', // sortKey
      'string', // sortType
      false // reverse
    )

    expect(wrapper.vm.sortedItems[0]).toEqual(items[0])
    expect(wrapper.vm.sortedItems[1]).toEqual(items[1])
    expect(wrapper.vm.sortedItems[2]).toEqual(items[2])

    // reverse
    wrapper.vm._sortItemsByField(items, 'id', 'string', true)
    expect(wrapper.vm.sortedItems[0]).toEqual(items[2])
    expect(wrapper.vm.sortedItems[1]).toEqual(items[1])
    expect(wrapper.vm.sortedItems[2]).toEqual(items[0])

    // sort by name
    wrapper.vm._sortItemsByField(items, 'name', 'string', false)
    expect(wrapper.vm.sortedItems[0]).toEqual(items[2])
    expect(wrapper.vm.sortedItems[1]).toEqual(items[1])
    expect(wrapper.vm.sortedItems[2]).toEqual(items[0])

    // reverse
    wrapper.vm._sortItemsByField(items, 'name', 'string', true)
    expect(wrapper.vm.sortedItems[0]).toEqual(items[0])
    expect(wrapper.vm.sortedItems[1]).toEqual(items[1])
    expect(wrapper.vm.sortedItems[2]).toEqual(items[2])

    // sort by description
    wrapper.vm._sortItemsByField(items, 'description', 'string', false)
    expect(wrapper.vm.sortedItems[0]).toEqual(items[0])
    expect(wrapper.vm.sortedItems[1]).toEqual(items[1])
    expect(wrapper.vm.sortedItems[2]).toEqual(items[2])

    // reverse
    wrapper.vm._sortItemsByField(items, 'description', 'string', true)
    expect(wrapper.vm.sortedItems[0]).toEqual(items[2])
    expect(wrapper.vm.sortedItems[1]).toEqual(items[1])
    expect(wrapper.vm.sortedItems[2]).toEqual(items[0])

    // sort by date
    wrapper.vm._sortItemsByField(items, 'date', 'string', false)
    expect(wrapper.vm.sortedItems[0]).toEqual(items[0])
    expect(wrapper.vm.sortedItems[1]).toEqual(items[1])
    expect(wrapper.vm.sortedItems[2]).toEqual(items[2])

    // reverse
    wrapper.vm._sortItemsByField(items, 'date', 'string', true)
    expect(wrapper.vm.sortedItems[0]).toEqual(items[2])
    expect(wrapper.vm.sortedItems[1]).toEqual(items[1])
    expect(wrapper.vm.sortedItems[2]).toEqual(items[0])

    // sort by amount
    wrapper.vm._sortItemsByField(items, 'amount', 'number', false)
    // expect(wrapper.vm.sortedItems[0]).toEqual(items[2])
    // expect(wrapper.vm.sortedItems[1]).toEqual(items[0])
    // expect(wrapper.vm.sortedItems[2]).toEqual(items[1])

    // reverse
    // wrapper.vm._sortItemsByField(items, 'amount', 'number', true)
    // expect(wrapper.vm.sortedItems[0]).toEqual(items[2])
    // expect(wrapper.vm.sortedItems[1]).toEqual(items[0])
    // expect(wrapper.vm.sortedItems[2]).toEqual(items[1])
  })

  it('_paginateItems() paginates data into page sets', () => {

    let items = []
    for (let i = 0; i < 300; i++) {
      items.push({ name: 'Kyra Lester'})
    }

    const wrapper = shallowMount(DataTable, { propsData:  { items }})

    // verify current sort order and defaults
    expect(wrapper.vm.items.length).toBe(300)
    expect(wrapper.vm.sortedItems.length).toBe(20)
    expect(wrapper.vm.perPage).toBe(20)

    // by 20
    expect(
      wrapper.vm._paginateItems(
        items
      ).length
    ).toBe(15)

    // by 10
    wrapper.vm.perPage = 10

    expect(
      wrapper.vm._paginateItems(
        items
      ).length
    ).toBe(30)

    expect(wrapper.vm.items.length).toBe(300)
    expect(wrapper.vm.sortedItems.length).toBe(10)
    expect(wrapper.vm.perPage).toBe(10)

    // by 5
    wrapper.vm.perPage = 5

    expect(
      wrapper.vm._paginateItems(
        items
      ).length
    ).toBe(60)

    expect(wrapper.vm.items.length).toBe(300)
    expect(wrapper.vm.sortedItems.length).toBe(5)
    expect(wrapper.vm.perPage).toBe(5)

    // check DOM as well
  })

  //-- User Actions -----------------------------------------------------------

  // select item // toggleSelect(itemID)
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
    wrapper.vm.toggleSelectItem(items[0].id)
    expect(wrapper.vm.selectedItemIDs.length).toBe(1)
    expect(
      wrapper.vm.selectedItemIDs[0]
    ).toBe("3471DA17-401F-9633-BF81-4CADA6FD5C79")

    // select another
    wrapper.vm.toggleSelectItem(items[2].id)
    expect(wrapper.vm.selectedItemIDs.length).toBe(2)

    // unselect the first
    wrapper.vm.toggleSelectItem(items[0].id)

    // second still present
    expect(wrapper.vm.selectedItemIDs.length).toBe(1)
    expect(
      wrapper.vm.selectedItemIDs[0]
    ).toBe("B743AC82-3613-13A2-2E42-E0C1F5CBF8A6")
  })

  // select all items // selectAllItems()
  it('can toggle selection of all items', () => {
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
    wrapper.vm.selectAllItems()
    expect(wrapper.vm.selectedItemIDs.length).toBe(3)

    // unselect all
    wrapper.vm.selectAllItems()
    expect(wrapper.vm.selectedItemIDs.length).toBe(0)
  })

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
    let search = wrapper.find('[data-test-input="searchText"]')
    expect(search.contains('[data-test-input="searchText"]')).toBe(true)
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

  it('can hide selected fields', () => {
    let items = [{
      "id": "3471DA17-401F-9633-BF81-4CADA6FD5C79",
      "name": "Kyra Lester",
      "description": "Curabitur dictum. Phasellus in",
      "date": "2017-07-23T04:24:49-07:00",
      "amount": 345.54
    }]

    const wrapperDataTable = mount(DataTable, { propsData: { items }})

    expect(
      wrapperDataTable.findAll('[data-test-component="TableRow"]').length
    ).toBe(1)

    expect(
      wrapperDataTable.findAll('[data-test-component="TableCell"]').length
    ).toBe(5)

    expect(
      wrapperDataTable.findAll('[data-test-component="TableCell"]').at(0).text().includes('3471DA17-401F-9633-BF81-4CADA6FD5C79')
    ).toBe(true)

    wrapperDataTable.vm.toggleDisplayField('id') // check for each key

    expect(
      wrapperDataTable.findAll('[data-test-component="TableCell"]').length
    ).toBe(4)

    expect(
      wrapperDataTable.findAll('[data-test-component="TableCell"]').at(0).text().includes('3471DA17-401F-9633-BF81-4CADA6FD5C79')
    ).toBe(false)
  })

  it('can set number of results to return per page', () => {
    let items = []
    for (let i = 0; i < 100; i++) { items.push({ name: 'Kyra Lester'}) }

    const wrapper = shallowMount(DataTable, { propsData: { items }})

    expect(wrapper.vm.sortedItems.length).toBe(20)
    expect(wrapper.vm.pages.length).toBe(5)

    wrapper.vm.setItemsPerPage(5)
    expect(wrapper.vm.sortedItems.length).toBe(5)
    expect(wrapper.vm.pages.length).toBe(20)

    wrapper.vm.setItemsPerPage(10)
    expect(wrapper.vm.sortedItems.length).toBe(10)
    expect(wrapper.vm.pages.length).toBe(10)
  })

  it('can set currentpage', () => {
    let items = []
    for (let i = 0; i < 100; i++) { items.push({ name: 'Kyra Lester'}) }

    const wrapper = shallowMount(DataTable, { propsData: { items }})

    expect(wrapper.vm.currentPage).toBe(0)
    expect(wrapper.vm.sortedItems.length).toBe(20)
    expect(wrapper.vm.pages.length).toBe(5)
    expect(wrapper.vm.sortedItems).toEqual(wrapper.vm.pages[0])

    wrapper.vm.setCurrentPage(4)
    expect(wrapper.vm.sortedItems).toEqual(wrapper.vm.pages[4])
  })

  it('can toggle Quick Edit mode', () => {
    let items = [{ name: 'Kyra Lester'}]
    const wrapper = shallowMount(DataTable, { propsData: { items }})
    expect(wrapper.vm.inQuickEdit).toBe(false)
    expect(wrapper.attributes('class')).toBe('data-table')

    wrapper.vm.toggleQuickEditMode()
    expect(wrapper.vm.inQuickEdit).toBe(true)
    expect(wrapper.attributes('class')).toBe('data-table data-table--list')
  })
})
