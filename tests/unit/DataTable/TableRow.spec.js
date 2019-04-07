import TableRow from '@/components/DataTable/TableRow.vue'
import { mount, shallowMount } from '@vue/test-utils'

describe('TableRow.vue', () => {

  it('component does render', () => {
    let item = { "id": "3471DA17-401F-9633-BF81-4CADA6FD5C79" }
    let wrapper = shallowMount(TableRow, {propsData:  { item }})
    expect(wrapper.attributes()['data-test-component']).toBe('TableRow')
  })

  it('generates correct columns/cells in row', () => {
    let item = {
      "id": "3471DA17-401F-9633-BF81-4CADA6FD5C79",
      "name": "Kyra Lester",
      "description": "Curabitur dictum. Phasellus in",
      "date": "2017-07-23T04:24:49-07:00",
      "amount": 345.54
    }

    let wrapper = mount(TableRow, {propsData: { item }})
    let tableCells = wrapper.findAll('[data-test-component="TableCell"]')
    let itemKeys = Object.keys(item)

    expect(tableCells.length).toBe(itemKeys.length)

    for (var i = 0; i < itemKeys.length; i++) {
      let expectedText = item[itemKeys[i]].toString()
      let foundText = tableCells.at(i).text()
      expect(foundText).toContain(expectedText)
    }
  })

})
