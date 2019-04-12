import { shallowMount, createLocalVue } from '@vue/test-utils'
import { randomInt } from '../../helpers.js'
import TableHeader from '@/components/DataTable/TableHeader.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('TableHeader.vue', () => {

  it('component does render', () => {
    let wrapper = shallowMount(TableHeader)
    expect(wrapper.attributes()['data-test-component']).toBe('TableHeader')
  })

  it('generates correct table headers', () => {
    let items = [{
      "id": "3471DA17-401F-9633-BF81-4CADA6FD5C79",
      "name": "Kyra Lester",
      "description": "Curabitur dictum. Phasellus in",
      "date": "2017-07-23T04:24:49-07:00",
      "amount": 345.54
    }]

    let wrapper = shallowMount(TableHeader, {propsData:  { items }})
    let headers = wrapper.findAll('[data-test-HeaderCell]')
    let expectedHeaders = Object.keys(items[0])

    expect(expectedHeaders.length).toBe(5)

    for (var i = 0; i < headers.length; i++) {
      expect(
        headers.at(i).text()
      ).toBe((expectedHeaders[i]))
    }
  })

  it('can delete all selected items', () => {
    let items = [{
      "id": "3471DA17-401F-9633-BF81-4CADA6FD5C79",
      "name": "Kyra Lester",
      "description": "Curabitur dictum. Phasellus in",
      "date": "2017-07-23T04:24:49-07:00",
      "amount": 345.54
    }]

    let actions = {
      deleteSelectedItems: jest.fn()
    }

    let store = new Vuex.Store({
      actions
    })

    const wrapper = shallowMount(TableHeader, {
      store,
      localVue,
      propsData: {
        items,
        selectedItemIDs: [items[0].id]
      }
    })

    const btn = wrapper.find('[data-test-btn="deleteSelectedItems"]')
    btn.trigger('click')
    expect(actions.deleteSelectedItems).toHaveBeenCalled()
  })

  it('detects that all items are selected', () => {
    let items = []
    for (var i = 0; i < 100; i++) { items.push({ 'id' : '12453'}) }
    let selectedItemIDs = items.map(id => id)

    const wrapper = shallowMount(TableHeader, {
      propsData: {
        items,
        numItems: items.length,
        selectedItemIDs
      }
    })

    // start all checked
    let checkbox = wrapper.find('[data-test-input="selectAllCheckbox"]')
    expect(wrapper.vm.selectedItemIDs.length).toBe(100)
    expect(wrapper.vm.allItemsSelected).toBe(true)
    expect(
      checkbox.attributes('class')
    ).toBe('input input--checkbox fas fa-check-square is-active')

    // less than all checked
    let newSelectedIDs = []
    let numSelected = randomInt(0,99)

    for (var i = 0; i < numSelected; i++) {
      newSelectedIDs.push({ 'id' : '12453'})
    }

    wrapper.setProps({ selectedItemIDs: newSelectedIDs })
    expect(wrapper.vm.selectedItemIDs.length).toBe(numSelected)
    expect(wrapper.vm.allItemsSelected).toBe(false)
    expect(
      checkbox.attributes('class')
    ).toBe('input input--checkbox far fa-square')
  })

  it('emits sortData method ', () => {
    let items = [{
      "id": "3471DA17-401F-9633-BF81-4CADA6FD5C79",
      "name": "Kyra Lester",
      "description": "Curabitur dictum. Phasellus in",
      "date": "2017-07-23T04:24:49-07:00",
      "amount": 345.54
    }]

    let wrapper = shallowMount(TableHeader, {propsData:  { items }})
    wrapper.vm.sortData('id', 'string')
    expect(wrapper.emitted().sortTableBy[0]).toEqual([ 'id', 'string' ])
  })

  it('emits selectAll method ', () => {
    let items = [{
      "id": "3471DA17-401F-9633-BF81-4CADA6FD5C79",
      "name": "Kyra Lester",
      "description": "Curabitur dictum. Phasellus in",
      "date": "2017-07-23T04:24:49-07:00",
      "amount": 345.54
    }]

    let wrapper = shallowMount(TableHeader, {propsData:  { items }})
    wrapper.vm.selectAll()
    expect(wrapper.emitted().selectAllItems).toEqual([[]])
  })

})
