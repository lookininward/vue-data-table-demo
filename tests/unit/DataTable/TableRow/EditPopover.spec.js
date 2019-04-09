import { shallowMount, createLocalVue } from '@vue/test-utils'
import EditPopover from '@/components/DataTable/TableRow/EditPopover.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('EditPopover.vue', () => {
  let item = {
    "id": "3471DA17-401F-9633-BF81-4CADA6FD5C79",
    "description": "Curabitur dictum. Phasellus in",
  }

  let itemAttr = item['description']

  it('component does render', () => {
    const wrapper = shallowMount(EditPopover, { propsData: { item, itemAttr }})

    expect(
      wrapper.attributes()['data-test-component']
    ).toBe('editPopoverTrigger')

    expect(wrapper.contains('[data-test-popover="editField"]')).toBe(true)
    expect(wrapper.contains('[data-test-input="textarea"]')).toBe(true)
    expect(wrapper.contains('[data-test-btn="stopEditingField"]')).toBe(true)
    expect(wrapper.contains('[data-test-btn="updateField"]')).toBe(true)
  })

  it('can edit item', () => {
    let actions = {
      editItem: jest.fn()
    }

    let store = new Vuex.Store({
      actions
    })

    const wrapper = shallowMount(EditPopover, {
      store,
      localVue,
      propsData: { item, itemAttr }
    })

    wrapper.setData({ isEditing: true})

    expect(wrapper.contains('[data-test-btn="updateField"]')).toBe(true)
    expect(wrapper.contains('[data-test-btn="stopEditingField"]')).toBe(true)

    const btn = wrapper.find('[data-test-btn="updateField"]')
    btn.trigger('click')
    expect(actions.editItem).toHaveBeenCalled()
  })

})
