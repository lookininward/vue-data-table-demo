import { shallowMount } from '@vue/test-utils'
import DataTable from '@/components/DataTable.vue'

describe('DataTable.vue', () => {

  it('component does render', () => {
    const wrapper = shallowMount(DataTable)
    expect(wrapper.attributes()['data-test-component']).toBe('DataTable')
    expect(wrapper.contains('[data-test-component="DataTable"]')).toBe(true)
    expect(wrapper.contains('[data-test-TableHeader]')).toBe(true)
    expect(wrapper.contains('[data-test-TableBody]')).toBe(true)
    expect(wrapper.contains('[data-test-TableFooter]')).toBe(true)
  })

  function randomInt(max) {
    return Math.floor(Math.random() * Math.floor(max))
  }

  it('generates correct number of rows', () => {
    let items = []
    for (let i = 0; i < randomInt(1000); i++) {
      items.push({ name: 'Kyra Lester'})
    }

    const wrapper = shallowMount(DataTable, {
      propsData:  { items }
    })

    expect(wrapper.findAll('[data-test-TableRow]').length).toBe(items.length)
  })


  it('generates correct number of columns/cells in row', () => {
    const numItems = randomInt(1000);
    let items = [];

    for (let i = 0; i < numItems; i++) {
      items.push({
        id: '3471DA17-401F-9633-BF81-4CADA6FD5C79',
        name: 'Kyra Lester',
        description: 'Curabitur dictum. Phasellus in',
        date: '2017-07-23T04:24:49-07:00',
        amount: '345.54'
      });
    }

    const wrapper = shallowMount(DataTable, {
      propsData:  { items }
    })

    let rows = wrapper.findAll('[data-test-TableRow]');

    for (var i = 0; i < rows.length; i++) {
      expect(
        rows.at(i).findAll('[data-test-TableCell]').length
      ).toBe(Object.keys(items[0]).length);
    }

    expect(
      wrapper.findAll('[data-test-TableCell]').length
    ).toBe(numItems * Object.keys(items[0]).length)

  })

  it('generates correct table headers', () => {

    let items = [{
      id: '3471DA17-401F-9633-BF81-4CADA6FD5C79',
      name: 'Kyra Lester',
      description: 'Curabitur dictum. Phasellus in',
      date: '2017-07-23T04:24:49-07:00',
      amount: '345.54' // why can't I use the same value again?
    }]

    const wrapper = shallowMount(DataTable, {
      propsData:  { items }
    })

    let headers = wrapper.findAll('[data-test-HeaderCell]')
    let expectedHeaders = Object.keys(items[0]);


    for (var i = 0; i < headers.length; i++) {
      expect(
        headers.at(i).text()
      ).toBe((expectedHeaders[i]))
    }

  })

  // correctly populates row data

})
