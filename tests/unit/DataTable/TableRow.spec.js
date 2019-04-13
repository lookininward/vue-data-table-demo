import TableRow from '@/components/DataTable/TableRow.vue'
import { mount, shallowMount } from '@vue/test-utils'

describe('TableRow.vue', () => {

  it('component does render', () => {
    let item = { "id": "3471DA17-401F-9633-BF81-4CADA6FD5C79" }
    let wrapper = shallowMount(TableRow, {
      propsData:  {
        item,
        selectedItemIDs: []
      }
    })
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

    let wrapper = mount(TableRow, {
      propsData: {
        item,
        selectedItemIDs: []
      }
    })

    let tableCells = wrapper.findAll('[data-test-component="TableCell"]')
    let itemKeys = Object.keys(item)

    expect(tableCells.length).toBe(itemKeys.length)

    for (var i = 0; i < itemKeys.length; i++) {
      let expectedText = item[itemKeys[i]].toString()
      let foundText = tableCells.at(i).text()
      expect(foundText).toContain(expectedText)
    }
  })

  it('displayItem() generates item object for display', () => {
    let item = {
      "id": "3471DA17-401F-9633-BF81-4CADA6FD5C79",
      "name": "Kyra Lester",
      "description": "Curabitur dictum. Phasellus in",
      "date": "2017-07-23T04:24:49-07:00",
      "amount": 345.54
    }

    let wrapper = mount(TableRow, {
      propsData: {
        item,
        selectedItemIDs: [],
        hiddenFields: []
      }
    })

    expect(wrapper.vm.hiddenFields.length).toBe(0)
    expect(wrapper.vm.displayItem).toEqual(item)

    // hide one field
    wrapper.setProps({ hiddenFields: ['description'] })
    expect(wrapper.vm.hiddenFields.length).toBe(1)
    expect(wrapper.vm.displayItem).toEqual(
      {
        "id": "3471DA17-401F-9633-BF81-4CADA6FD5C79",
        "name": "Kyra Lester",
        "date": "2017-07-23T04:24:49-07:00",
        "amount": 345.54
      }
    )

    // hide multiple fields
    wrapper.setProps({ hiddenFields: ['description', 'amount'] })
    expect(wrapper.vm.hiddenFields.length).toBe(2)
    expect(wrapper.vm.displayItem).toEqual(
      {
        "id": "3471DA17-401F-9633-BF81-4CADA6FD5C79",
        "name": "Kyra Lester",
        "date": "2017-07-23T04:24:49-07:00"
      }
    )
  })

  it('emits toggleSelect() ', () => {
    let item = {
      "id": "3471DA17-401F-9633-BF81-4CADA6FD5C79",
      "name": "Kyra Lester",
      "description": "Curabitur dictum. Phasellus in",
      "date": "2017-07-23T04:24:49-07:00",
      "amount": 345.54
    }

    let wrapper = mount(TableRow, {
      propsData: {
        item,
        selectedItemIDs: []
      }
    })

    wrapper.vm.toggleSelect('1234')
    expect(wrapper.emitted().toggleSelectItem[0]).toEqual(['1234'])
  })

})
