import { mount, shallowMount } from '@vue/test-utils'
import DataTable from '@/components/DataTable.vue'

describe('DataTable.vue', () => {

  it('component does render', () => {
    const wrapper = shallowMount(DataTable)
    expect(wrapper.attributes()['data-test-component']).toBe('DataTable')
    expect(wrapper.contains('[data-test-component="DataTable"]')).toBe(true)
    expect(wrapper.contains('[data-test-component="TableHeader"]')).toBe(true)
    expect(wrapper.contains('[data-test-TableBody]')).toBe(true)
    expect(wrapper.contains('[data-test-component="TableFooter"]')).toBe(true)
  })

  it('generates correct number of rows', () => {
    let items = []
    for (let i = 0; i < 100; i++) {
      items.push({ name: 'Kyra Lester'})
    }

    const wrapper = shallowMount(DataTable, {
      propsData:  { items }
    })

    expect(wrapper.vm.pages.length).toBe(5)
    expect(wrapper.vm.items.length).toBe(100)
    expect(
      wrapper.findAll('[data-test-component="TableRow"]').length
    ).toBe(wrapper.vm.perPage)
  })

  it('can sort table by search', () => {
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

    const wrapper = mount(DataTable, {
      propsData:  { items }
    })

    let rows = wrapper.findAll('[data-test-component="TableRow"]')
    let search = wrapper.find('[data-test-input="Search"]')
    expect(search.contains('[data-test-input="Search"]')).toBe(true)
    expect(rows.length).toBe(3)

    search.setValue('Buckminster')
    rows = wrapper.findAll('[data-test-component="TableRow"]')
    expect(rows.length).toBe(1)

    search.setValue('xxxxxxxxxxx')
    rows = wrapper.findAll('[data-test-component="TableRow"]')
    expect(rows.length).toBe(0)
  })

  it('can track selected items', () => {
    let items = [{
      "id": "3471DA17-401F-9633-BF81-4CADA6FD5C79",
      "name": "Kyra Lester",
      "description": "Curabitur dictum. Phasellus in",
      "date": "2017-07-23T04:24:49-07:00",
      "amount": 345.54
    }]

    const wrapper = shallowMount(DataTable, {
      propsData:  { items }
    })

    // none selected
    expect(wrapper.vm.selectedItems.length).toBe(0)

    // toggle select item method on component
    wrapper.vm.toggleSelect(items[0].id)

    // includes selection
    expect(wrapper.vm.selectedItems.length).toBe(1)

    expect(
      wrapper.vm.selectedItems[0]
    ).toBe("3471DA17-401F-9633-BF81-4CADA6FD5C79")
  })

  // if number or date field shot min max options sliders
  // hide or show data fields
})
