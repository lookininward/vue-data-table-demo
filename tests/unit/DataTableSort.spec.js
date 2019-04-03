import { mount } from '@vue/test-utils'
import DataTable from '@/components/DataTable.vue'
import TableRowDropdown from '@/components/DataTable/TableRow/TableRowDropdown.vue'

describe('DataTable.vue Integration', () => {
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

    expect(row1Cells.at(0).text()).toBe(item3['id'])
    expect(row1Cells.at(1).text()).toBe(item3['name'])
    expect(row1Cells.at(2).text()).toBe(item3['description'])
    expect(row1Cells.at(3).text()).toBe(item3['date'])
    expect(row1Cells.at(4).text()).toBe((item3['amount']).toString())

    expect(row2Cells.at(0).text()).toBe(item1['id'])
    expect(row2Cells.at(1).text()).toBe(item1['name'])
    expect(row2Cells.at(2).text()).toBe(item1['description'])
    expect(row2Cells.at(3).text()).toBe(item1['date'])
    expect(row2Cells.at(4).text()).toBe((item1['amount']).toString())

    expect(row3Cells.at(0).text()).toBe(item2['id'])
    expect(row3Cells.at(1).text()).toBe(item2['name'])
    expect(row3Cells.at(2).text()).toBe(item2['description'])
    expect(row3Cells.at(3).text()).toBe(item2['date'])
    expect(row3Cells.at(4).text()).toBe((item2['amount']).toString())

    // reverse
    amountColumn.trigger('click')
    expect(row1Cells.at(0).text()).toBe(item2['id'])
    expect(row1Cells.at(1).text()).toBe(item2['name'])
    expect(row1Cells.at(2).text()).toBe(item2['description'])
    expect(row1Cells.at(3).text()).toBe(item2['date'])
    expect(row1Cells.at(4).text()).toBe((item2['amount']).toString())

    expect(row2Cells.at(0).text()).toBe(item1['id'])
    expect(row2Cells.at(1).text()).toBe(item1['name'])
    expect(row2Cells.at(2).text()).toBe(item1['description'])
    expect(row2Cells.at(3).text()).toBe(item1['date'])
    expect(row2Cells.at(4).text()).toBe((item1['amount']).toString())

    expect(row3Cells.at(0).text()).toBe(item3['id'])
    expect(row3Cells.at(1).text()).toBe(item3['name'])
    expect(row3Cells.at(2).text()).toBe(item3['description'])
    expect(row3Cells.at(3).text()).toBe(item3['date'])
    expect(row3Cells.at(4).text()).toBe((item3['amount']).toString())
  })

  it('can sort table by id', () => {
    let idColumn = headers.at(0)

    // initial
    idColumn.trigger('click')

    expect(row1Cells.at(0).text()).toBe(item1['id'])
    expect(row1Cells.at(1).text()).toBe(item1['name'])
    expect(row1Cells.at(2).text()).toBe(item1['description'])
    expect(row1Cells.at(3).text()).toBe(item1['date'])
    expect(row1Cells.at(4).text()).toBe((item1['amount']).toString())

    expect(row2Cells.at(0).text()).toBe(item2['id'])
    expect(row2Cells.at(1).text()).toBe(item2['name'])
    expect(row2Cells.at(2).text()).toBe(item2['description'])
    expect(row2Cells.at(3).text()).toBe(item2['date'])
    expect(row2Cells.at(4).text()).toBe((item2['amount']).toString())

    expect(row3Cells.at(0).text()).toBe(item3['id'])
    expect(row3Cells.at(1).text()).toBe(item3['name'])
    expect(row3Cells.at(2).text()).toBe(item3['description'])
    expect(row3Cells.at(3).text()).toBe(item3['date'])
    expect(row3Cells.at(4).text()).toBe((item3['amount']).toString())

    // reverse
    idColumn.trigger('click')

    expect(row1Cells.at(0).text()).toBe(item3['id'])
    expect(row1Cells.at(1).text()).toBe(item3['name'])
    expect(row1Cells.at(2).text()).toBe(item3['description'])
    expect(row1Cells.at(3).text()).toBe(item3['date'])
    expect(row1Cells.at(4).text()).toBe((item3['amount']).toString())

    expect(row2Cells.at(0).text()).toBe(item2['id'])
    expect(row2Cells.at(1).text()).toBe(item2['name'])
    expect(row2Cells.at(2).text()).toBe(item2['description'])
    expect(row2Cells.at(3).text()).toBe(item2['date'])
    expect(row2Cells.at(4).text()).toBe((item2['amount']).toString())

    expect(row3Cells.at(0).text()).toBe(item1['id'])
    expect(row3Cells.at(1).text()).toBe(item1['name'])
    expect(row3Cells.at(2).text()).toBe(item1['description'])
    expect(row3Cells.at(3).text()).toBe(item1['date'])
    expect(row3Cells.at(4).text()).toBe((item1['amount']).toString())
  })

  it('can sort table by Name', () => {
    let nameColumn = headers.at(1)

    // initial
    nameColumn.trigger('click')

    expect(row1Cells.at(0).text()).toBe(item3['id'])
    expect(row1Cells.at(1).text()).toBe(item3['name'])
    expect(row1Cells.at(2).text()).toBe(item3['description'])
    expect(row1Cells.at(3).text()).toBe(item3['date'])
    expect(row1Cells.at(4).text()).toBe((item3['amount']).toString())

    expect(row2Cells.at(0).text()).toBe(item2['id'])
    expect(row2Cells.at(1).text()).toBe(item2['name'])
    expect(row2Cells.at(2).text()).toBe(item2['description'])
    expect(row2Cells.at(3).text()).toBe(item2['date'])
    expect(row2Cells.at(4).text()).toBe((item2['amount']).toString())

    expect(row3Cells.at(0).text()).toBe(item1['id'])
    expect(row3Cells.at(1).text()).toBe(item1['name'])
    expect(row3Cells.at(2).text()).toBe(item1['description'])
    expect(row3Cells.at(3).text()).toBe(item1['date'])
    expect(row3Cells.at(4).text()).toBe((item1['amount']).toString())

    // reverse
    nameColumn.trigger('click')

    expect(row1Cells.at(0).text()).toBe(item1['id'])
    expect(row1Cells.at(1).text()).toBe(item1['name'])
    expect(row1Cells.at(2).text()).toBe(item1['description'])
    expect(row1Cells.at(3).text()).toBe(item1['date'])
    expect(row1Cells.at(4).text()).toBe((item1['amount']).toString())

    expect(row2Cells.at(0).text()).toBe(item2['id'])
    expect(row2Cells.at(1).text()).toBe(item2['name'])
    expect(row2Cells.at(2).text()).toBe(item2['description'])
    expect(row2Cells.at(3).text()).toBe(item2['date'])
    expect(row2Cells.at(4).text()).toBe((item2['amount']).toString())

    expect(row3Cells.at(0).text()).toBe(item3['id'])
    expect(row3Cells.at(1).text()).toBe(item3['name'])
    expect(row3Cells.at(2).text()).toBe(item3['description'])
    expect(row3Cells.at(3).text()).toBe(item3['date'])
    expect(row3Cells.at(4).text()).toBe((item3['amount']).toString())
  })

  it('can sort table by Description', () => {
    let descriptionColumn = headers.at(2)

    // initial
    descriptionColumn.trigger('click')

    expect(row1Cells.at(0).text()).toBe(item1['id'])
    expect(row1Cells.at(1).text()).toBe(item1['name'])
    expect(row1Cells.at(2).text()).toBe(item1['description'])
    expect(row1Cells.at(3).text()).toBe(item1['date'])
    expect(row1Cells.at(4).text()).toBe((item1['amount']).toString())

    expect(row2Cells.at(0).text()).toBe(item2['id'])
    expect(row2Cells.at(1).text()).toBe(item2['name'])
    expect(row2Cells.at(2).text()).toBe(item2['description'])
    expect(row2Cells.at(3).text()).toBe(item2['date'])
    expect(row2Cells.at(4).text()).toBe((item2['amount']).toString())

    expect(row3Cells.at(0).text()).toBe(item3['id'])
    expect(row3Cells.at(1).text()).toBe(item3['name'])
    expect(row3Cells.at(2).text()).toBe(item3['description'])
    expect(row3Cells.at(3).text()).toBe(item3['date'])
    expect(row3Cells.at(4).text()).toBe((item3['amount']).toString())

    // reverse
    descriptionColumn.trigger('click')

    expect(row1Cells.at(0).text()).toBe(item3['id'])
    expect(row1Cells.at(1).text()).toBe(item3['name'])
    expect(row1Cells.at(2).text()).toBe(item3['description'])
    expect(row1Cells.at(3).text()).toBe(item3['date'])
    expect(row1Cells.at(4).text()).toBe((item3['amount']).toString())

    expect(row2Cells.at(0).text()).toBe(item2['id'])
    expect(row2Cells.at(1).text()).toBe(item2['name'])
    expect(row2Cells.at(2).text()).toBe(item2['description'])
    expect(row2Cells.at(3).text()).toBe(item2['date'])
    expect(row2Cells.at(4).text()).toBe((item2['amount']).toString())

    expect(row3Cells.at(0).text()).toBe(item1['id'])
    expect(row3Cells.at(1).text()).toBe(item1['name'])
    expect(row3Cells.at(2).text()).toBe(item1['description'])
    expect(row3Cells.at(3).text()).toBe(item1['date'])
    expect(row3Cells.at(4).text()).toBe((item1['amount']).toString())
  })

  it('can sort table by Date', () => {
    let dateColumn = headers.at(3)

    // initial
    dateColumn.trigger('click')

    expect(row1Cells.at(0).text()).toBe(item1['id'])
    expect(row1Cells.at(1).text()).toBe(item1['name'])
    expect(row1Cells.at(2).text()).toBe(item1['description'])
    expect(row1Cells.at(3).text()).toBe(item1['date'])
    expect(row1Cells.at(4).text()).toBe((item1['amount']).toString())

    expect(row2Cells.at(0).text()).toBe(item2['id'])
    expect(row2Cells.at(1).text()).toBe(item2['name'])
    expect(row2Cells.at(2).text()).toBe(item2['description'])
    expect(row2Cells.at(3).text()).toBe(item2['date'])
    expect(row2Cells.at(4).text()).toBe((item2['amount']).toString())

    expect(row3Cells.at(0).text()).toBe(item3['id'])
    expect(row3Cells.at(1).text()).toBe(item3['name'])
    expect(row3Cells.at(2).text()).toBe(item3['description'])
    expect(row3Cells.at(3).text()).toBe(item3['date'])
    expect(row3Cells.at(4).text()).toBe((item3['amount']).toString())

    // reverse
    dateColumn.trigger('click')

    expect(row1Cells.at(0).text()).toBe(item3['id'])
    expect(row1Cells.at(1).text()).toBe(item3['name'])
    expect(row1Cells.at(2).text()).toBe(item3['description'])
    expect(row1Cells.at(3).text()).toBe(item3['date'])
    expect(row1Cells.at(4).text()).toBe((item3['amount']).toString())

    expect(row2Cells.at(0).text()).toBe(item2['id'])
    expect(row2Cells.at(1).text()).toBe(item2['name'])
    expect(row2Cells.at(2).text()).toBe(item2['description'])
    expect(row2Cells.at(3).text()).toBe(item2['date'])
    expect(row2Cells.at(4).text()).toBe((item2['amount']).toString())

    expect(row3Cells.at(0).text()).toBe(item1['id'])
    expect(row3Cells.at(1).text()).toBe(item1['name'])
    expect(row3Cells.at(2).text()).toBe(item1['description'])
    expect(row3Cells.at(3).text()).toBe(item1['date'])
    expect(row3Cells.at(4).text()).toBe((item1['amount']).toString())
  })
})
