import { shallowMount, createLocalVue } from '@vue/test-utils'
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

})
