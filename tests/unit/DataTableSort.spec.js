import { mount } from '@vue/test-utils'
import DataTable from '@/components/DataTable.vue'
import TableRowDropdown from '@/components/DataTable/TableRow/TableRowDropdown.vue'

describe('DataTable.vue Integration', () => {
  let items = [
    {
      "ID": "3471DA17-401F-9633-BF81-4CADA6FD5C79",
      "Name": "Kyra Lester",
      "Description": "Curabitur dictum. Phasellus in",
      "Date": "2017-07-23T04:24:49-07:00",
      "Amount": 345.54
    },
    {
      "ID": "9F5C9912-936A-FB85-1EDB-9DA87BE7FF1E",
      "Name": "Buckminster Alvarado",
      "Description": "dui, in sodales elit erat vitae risus. Duis a mi",
      "Date": "2018-11-08T05:44:15-08:00",
      "Amount": 677.08
    },
    {
      "ID": "B743AC82-3613-13A2-2E42-E0C1F5CBF8A6",
      "Name": "Athena Smith",
      "Description": "massa lobortis ultrices. Vivamus rhoncus.",
      "Date": "2018-11-11T06:19:57-08:00",
      "Amount": 73.67
    }
  ]

  let item1 = items[0]
  let item2 = items[1]
  let item3 = items[2]

  const wrapperDataTable = mount(DataTable, {
    propsData: { items },
    stubs: { TableRowDropdown: true }
  })

  let rows = wrapperDataTable.findAll('[data-test-component="TableRow"]')
  let row1Cells = rows.at(0).findAll('[data-test-TableCell]')
  let row2Cells = rows.at(1).findAll('[data-test-TableCell]')
  let row3Cells = rows.at(2).findAll('[data-test-TableCell]')

  let headers = wrapperDataTable.findAll('[data-test-HeaderCell]')

  it('can sort table by Amount', () => {
    let amountColumn = headers.at(4)

    // initial
    amountColumn.trigger('click')

    expect(row1Cells.at(0).text()).toBe(item3['ID'])
    expect(row1Cells.at(1).text()).toBe(item3['Name'])
    expect(row1Cells.at(2).text()).toBe(item3['Description'])
    expect(row1Cells.at(3).text()).toBe(item3['Date'])
    expect(row1Cells.at(4).text()).toBe((item3['Amount']).toString())

    expect(row2Cells.at(0).text()).toBe(item1['ID'])
    expect(row2Cells.at(1).text()).toBe(item1['Name'])
    expect(row2Cells.at(2).text()).toBe(item1['Description'])
    expect(row2Cells.at(3).text()).toBe(item1['Date'])
    expect(row2Cells.at(4).text()).toBe((item1['Amount']).toString())

    expect(row3Cells.at(0).text()).toBe(item2['ID'])
    expect(row3Cells.at(1).text()).toBe(item2['Name'])
    expect(row3Cells.at(2).text()).toBe(item2['Description'])
    expect(row3Cells.at(3).text()).toBe(item2['Date'])
    expect(row3Cells.at(4).text()).toBe((item2['Amount']).toString())

    // reverse
    amountColumn.trigger('click')
    expect(row1Cells.at(0).text()).toBe(item2['ID'])
    expect(row1Cells.at(1).text()).toBe(item2['Name'])
    expect(row1Cells.at(2).text()).toBe(item2['Description'])
    expect(row1Cells.at(3).text()).toBe(item2['Date'])
    expect(row1Cells.at(4).text()).toBe((item2['Amount']).toString())

    expect(row2Cells.at(0).text()).toBe(item1['ID'])
    expect(row2Cells.at(1).text()).toBe(item1['Name'])
    expect(row2Cells.at(2).text()).toBe(item1['Description'])
    expect(row2Cells.at(3).text()).toBe(item1['Date'])
    expect(row2Cells.at(4).text()).toBe((item1['Amount']).toString())

    expect(row3Cells.at(0).text()).toBe(item3['ID'])
    expect(row3Cells.at(1).text()).toBe(item3['Name'])
    expect(row3Cells.at(2).text()).toBe(item3['Description'])
    expect(row3Cells.at(3).text()).toBe(item3['Date'])
    expect(row3Cells.at(4).text()).toBe((item3['Amount']).toString())
  })

  it('can sort table by ID', () => {
    let idColumn = headers.at(0)

    // initial
    idColumn.trigger('click')

    expect(row1Cells.at(0).text()).toBe(item1['ID'])
    expect(row1Cells.at(1).text()).toBe(item1['Name'])
    expect(row1Cells.at(2).text()).toBe(item1['Description'])
    expect(row1Cells.at(3).text()).toBe(item1['Date'])
    expect(row1Cells.at(4).text()).toBe((item1['Amount']).toString())

    expect(row2Cells.at(0).text()).toBe(item2['ID'])
    expect(row2Cells.at(1).text()).toBe(item2['Name'])
    expect(row2Cells.at(2).text()).toBe(item2['Description'])
    expect(row2Cells.at(3).text()).toBe(item2['Date'])
    expect(row2Cells.at(4).text()).toBe((item2['Amount']).toString())

    expect(row3Cells.at(0).text()).toBe(item3['ID'])
    expect(row3Cells.at(1).text()).toBe(item3['Name'])
    expect(row3Cells.at(2).text()).toBe(item3['Description'])
    expect(row3Cells.at(3).text()).toBe(item3['Date'])
    expect(row3Cells.at(4).text()).toBe((item3['Amount']).toString())

    // reverse
    idColumn.trigger('click')

    expect(row1Cells.at(0).text()).toBe(item3['ID'])
    expect(row1Cells.at(1).text()).toBe(item3['Name'])
    expect(row1Cells.at(2).text()).toBe(item3['Description'])
    expect(row1Cells.at(3).text()).toBe(item3['Date'])
    expect(row1Cells.at(4).text()).toBe((item3['Amount']).toString())

    expect(row2Cells.at(0).text()).toBe(item2['ID'])
    expect(row2Cells.at(1).text()).toBe(item2['Name'])
    expect(row2Cells.at(2).text()).toBe(item2['Description'])
    expect(row2Cells.at(3).text()).toBe(item2['Date'])
    expect(row2Cells.at(4).text()).toBe((item2['Amount']).toString())

    expect(row3Cells.at(0).text()).toBe(item1['ID'])
    expect(row3Cells.at(1).text()).toBe(item1['Name'])
    expect(row3Cells.at(2).text()).toBe(item1['Description'])
    expect(row3Cells.at(3).text()).toBe(item1['Date'])
    expect(row3Cells.at(4).text()).toBe((item1['Amount']).toString())
  })

  it('can sort table by Name', () => {
    let nameColumn = headers.at(1)

    // initial
    nameColumn.trigger('click')

    expect(row1Cells.at(0).text()).toBe(item3['ID'])
    expect(row1Cells.at(1).text()).toBe(item3['Name'])
    expect(row1Cells.at(2).text()).toBe(item3['Description'])
    expect(row1Cells.at(3).text()).toBe(item3['Date'])
    expect(row1Cells.at(4).text()).toBe((item3['Amount']).toString())

    expect(row2Cells.at(0).text()).toBe(item2['ID'])
    expect(row2Cells.at(1).text()).toBe(item2['Name'])
    expect(row2Cells.at(2).text()).toBe(item2['Description'])
    expect(row2Cells.at(3).text()).toBe(item2['Date'])
    expect(row2Cells.at(4).text()).toBe((item2['Amount']).toString())

    expect(row3Cells.at(0).text()).toBe(item1['ID'])
    expect(row3Cells.at(1).text()).toBe(item1['Name'])
    expect(row3Cells.at(2).text()).toBe(item1['Description'])
    expect(row3Cells.at(3).text()).toBe(item1['Date'])
    expect(row3Cells.at(4).text()).toBe((item1['Amount']).toString())

    // reverse
    nameColumn.trigger('click')

    expect(row1Cells.at(0).text()).toBe(item1['ID'])
    expect(row1Cells.at(1).text()).toBe(item1['Name'])
    expect(row1Cells.at(2).text()).toBe(item1['Description'])
    expect(row1Cells.at(3).text()).toBe(item1['Date'])
    expect(row1Cells.at(4).text()).toBe((item1['Amount']).toString())

    expect(row2Cells.at(0).text()).toBe(item2['ID'])
    expect(row2Cells.at(1).text()).toBe(item2['Name'])
    expect(row2Cells.at(2).text()).toBe(item2['Description'])
    expect(row2Cells.at(3).text()).toBe(item2['Date'])
    expect(row2Cells.at(4).text()).toBe((item2['Amount']).toString())

    expect(row3Cells.at(0).text()).toBe(item3['ID'])
    expect(row3Cells.at(1).text()).toBe(item3['Name'])
    expect(row3Cells.at(2).text()).toBe(item3['Description'])
    expect(row3Cells.at(3).text()).toBe(item3['Date'])
    expect(row3Cells.at(4).text()).toBe((item3['Amount']).toString())
  })

  it('can sort table by Description', () => {
    let descriptionColumn = headers.at(2)

    // initial
    descriptionColumn.trigger('click')

    expect(row1Cells.at(0).text()).toBe(item1['ID'])
    expect(row1Cells.at(1).text()).toBe(item1['Name'])
    expect(row1Cells.at(2).text()).toBe(item1['Description'])
    expect(row1Cells.at(3).text()).toBe(item1['Date'])
    expect(row1Cells.at(4).text()).toBe((item1['Amount']).toString())

    expect(row2Cells.at(0).text()).toBe(item2['ID'])
    expect(row2Cells.at(1).text()).toBe(item2['Name'])
    expect(row2Cells.at(2).text()).toBe(item2['Description'])
    expect(row2Cells.at(3).text()).toBe(item2['Date'])
    expect(row2Cells.at(4).text()).toBe((item2['Amount']).toString())

    expect(row3Cells.at(0).text()).toBe(item3['ID'])
    expect(row3Cells.at(1).text()).toBe(item3['Name'])
    expect(row3Cells.at(2).text()).toBe(item3['Description'])
    expect(row3Cells.at(3).text()).toBe(item3['Date'])
    expect(row3Cells.at(4).text()).toBe((item3['Amount']).toString())

    // reverse
    descriptionColumn.trigger('click')

    expect(row1Cells.at(0).text()).toBe(item3['ID'])
    expect(row1Cells.at(1).text()).toBe(item3['Name'])
    expect(row1Cells.at(2).text()).toBe(item3['Description'])
    expect(row1Cells.at(3).text()).toBe(item3['Date'])
    expect(row1Cells.at(4).text()).toBe((item3['Amount']).toString())

    expect(row2Cells.at(0).text()).toBe(item2['ID'])
    expect(row2Cells.at(1).text()).toBe(item2['Name'])
    expect(row2Cells.at(2).text()).toBe(item2['Description'])
    expect(row2Cells.at(3).text()).toBe(item2['Date'])
    expect(row2Cells.at(4).text()).toBe((item2['Amount']).toString())

    expect(row3Cells.at(0).text()).toBe(item1['ID'])
    expect(row3Cells.at(1).text()).toBe(item1['Name'])
    expect(row3Cells.at(2).text()).toBe(item1['Description'])
    expect(row3Cells.at(3).text()).toBe(item1['Date'])
    expect(row3Cells.at(4).text()).toBe((item1['Amount']).toString())
  })

  it('can sort table by Date', () => {
    let dateColumn = headers.at(3)

    // initial
    dateColumn.trigger('click')

    expect(row1Cells.at(0).text()).toBe(item1['ID'])
    expect(row1Cells.at(1).text()).toBe(item1['Name'])
    expect(row1Cells.at(2).text()).toBe(item1['Description'])
    expect(row1Cells.at(3).text()).toBe(item1['Date'])
    expect(row1Cells.at(4).text()).toBe((item1['Amount']).toString())

    expect(row2Cells.at(0).text()).toBe(item2['ID'])
    expect(row2Cells.at(1).text()).toBe(item2['Name'])
    expect(row2Cells.at(2).text()).toBe(item2['Description'])
    expect(row2Cells.at(3).text()).toBe(item2['Date'])
    expect(row2Cells.at(4).text()).toBe((item2['Amount']).toString())

    expect(row3Cells.at(0).text()).toBe(item3['ID'])
    expect(row3Cells.at(1).text()).toBe(item3['Name'])
    expect(row3Cells.at(2).text()).toBe(item3['Description'])
    expect(row3Cells.at(3).text()).toBe(item3['Date'])
    expect(row3Cells.at(4).text()).toBe((item3['Amount']).toString())

    // reverse
    dateColumn.trigger('click')

    expect(row1Cells.at(0).text()).toBe(item3['ID'])
    expect(row1Cells.at(1).text()).toBe(item3['Name'])
    expect(row1Cells.at(2).text()).toBe(item3['Description'])
    expect(row1Cells.at(3).text()).toBe(item3['Date'])
    expect(row1Cells.at(4).text()).toBe((item3['Amount']).toString())

    expect(row2Cells.at(0).text()).toBe(item2['ID'])
    expect(row2Cells.at(1).text()).toBe(item2['Name'])
    expect(row2Cells.at(2).text()).toBe(item2['Description'])
    expect(row2Cells.at(3).text()).toBe(item2['Date'])
    expect(row2Cells.at(4).text()).toBe((item2['Amount']).toString())

    expect(row3Cells.at(0).text()).toBe(item1['ID'])
    expect(row3Cells.at(1).text()).toBe(item1['Name'])
    expect(row3Cells.at(2).text()).toBe(item1['Description'])
    expect(row3Cells.at(3).text()).toBe(item1['Date'])
    expect(row3Cells.at(4).text()).toBe((item1['Amount']).toString())
  })
})
