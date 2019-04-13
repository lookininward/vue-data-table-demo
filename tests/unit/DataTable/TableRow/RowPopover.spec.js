import { shallowMount, createLocalVue } from '@vue/test-utils'
import RowPopover from '@/components/DataTable/TableRow/RowPopover.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('RowPopover.vue', () => {
  let item = { "id": "3471DA17-401F-9633-BF81-4CADA6FD5C79" }

  it('component does render', () => {
    const wrapper = shallowMount(RowPopover, { propsData: { item } })
    expect(
      wrapper.attributes()['data-test-component']
    ).toBe('rowPopover')
    expect(wrapper.contains('[data-test-btn="popoverTrigger"]')).toBe(true)
    expect(wrapper.contains('[data-test-popover="rowPopover"]')).toBe(true)
    expect(wrapper.contains('[data-test-btn="deleteItem"]')).toBe(true)
  })

  it('can delete item', () => {
    let actions = {
      deleteItem: jest.fn()
    }

    let store = new Vuex.Store({
      actions
    })

    const wrapper = shallowMount(RowPopover, {
      store,
      localVue,
      propsData: { item }
    })

    const btn = wrapper.find('[data-test-btn="deleteItem"]')
    btn.trigger('click')
    expect(actions.deleteItem).toHaveBeenCalled()
  })

})
