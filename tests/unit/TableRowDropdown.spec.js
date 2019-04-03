import { shallowMount, createLocalVue } from '@vue/test-utils'
import { randomInt } from '../helpers.js'
import TableRowDropdown from '@/components/DataTable/TableRow/TableRowDropdown.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('TableRowDropdown.vue', () => {
  let item = {
    "id": "3471DA17-401F-9633-BF81-4CADA6FD5C79",
    "name": "Kyra Lester",
    "description": "Curabitur dictum. Phasellus in",
    "date": "2017-07-23T04:24:49-07:00",
    "amount": 345.54
  }

  it('component does render', () => {
    const wrapper = shallowMount(TableRowDropdown, {
      propsData: { item }
    })

    expect(
      wrapper.attributes()['data-test-component']
    ).toBe('TableRowDropdown')

    expect(wrapper.contains('[data-test-btn="dropdownTrigger"]')).toBe(true)
    expect(wrapper.contains('[data-test-dropdown="itemRow"]')).toBe(true)
    expect(wrapper.contains('[data-test-btn="deleteItem"]')).toBe(true)
  })

  it('can delete item', () => {
    let actions = {
      deleteItem: jest.fn()
    }

    let store = new Vuex.Store({
      actions
    })

    const wrapper = shallowMount(TableRowDropdown, {
      store,
      localVue,
      propsData: { item }
    })

    const btn = wrapper.find('[data-test-btn="deleteItem"]')
    btn.trigger('click')
    expect(actions.deleteItem).toHaveBeenCalled()
  })

})
