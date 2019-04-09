import { shallowMount } from '@vue/test-utils'
import TableCell from '@/components/DataTable/TableRow/TableCell.vue'

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
    expect(
      wrapper.contains('[data-test-component="editPopoverTrigger"]')
    ).toBe(false)
  })

  it('component does render with editable field', () => {
    itemAttr = "Curabitur dictum. Phasellus in"
    const wrapper = shallowMount(TableCell, { propsData: { item, itemAttr } })
    expect(
      wrapper.contains('[data-test-component="editPopoverTrigger"]')
    ).toBe(true)
  })

})
