import { shallowMount, createLocalVue } from '@vue/test-utils'
import TableCell from '@/components/DataTable/TableRow/TableCell.vue'
import Vuex from 'vuex'

const localVue = createLocalVue()
localVue.use(Vuex)

describe('TableCell.vue', () => {
  let item = {
    "id": "3471DA17-401F-9633-BF81-4CADA6FD5C79",
    "name": "Kyra Lester",
    "description": "Curabitur dictum. Phasellus in",
    "date": "2017-07-23T04:24:49-07:00",
    "amount": 345.54
  }

  let itemAttr = "This is a something something"

  it('component does render without editable field', () => {
    const wrapper = shallowMount(TableCell, { propsData: { item, itemAttr }})
    expect(wrapper.attributes()['data-test-component']).toBe('TableCell')
    expect(wrapper.contains('[data-test-btn="editField"]')).toBe(false)
  })

  it('component does render with editable field', () => {
    itemAttr = "Curabitur dictum. Phasellus in"
    const wrapper = shallowMount(TableCell, { propsData: { item, itemAttr } })
    expect(wrapper.contains('[data-test-btn="editField"]')).toBe(true)
  })

  it('can edit item', () => {
    let actions = {
      editItem: jest.fn()
    }

    let store = new Vuex.Store({
      actions
    })

    const wrapper = shallowMount(TableCell, {
      store,
      localVue,
      propsData: { item, itemAttr }
    })

    wrapper.setData({ isEditing: true})

    expect(wrapper.contains('[data-test-btn="updateField"]')).toBe(true)
    expect(wrapper.contains('[data-test-btn="cancelUpdateField"]')).toBe(true)

    const btn = wrapper.find('[data-test-btn="updateField"]')
    btn.trigger('click')
    expect(actions.editItem).toHaveBeenCalled()
  })

})
