import { mount, shallowMount } from '@vue/test-utils'
import DataTable from '@/components/DataTable.vue'
import TableRowDropdown from '@/components/DataTable/TableRow/TableRowDropdown.vue'

describe('DataTable.vue sort', () => {
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
    stubs: { TableRowDropdown: false }
  })

  let rows = wrapperDataTable.findAll('[data-test-component="TableRow"]')
  let row1Cells = rows.at(0).findAll('[data-test-TableCell]')
  let row2Cells = rows.at(1).findAll('[data-test-TableCell]')
  let row3Cells = rows.at(2).findAll('[data-test-TableCell]')

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
})
