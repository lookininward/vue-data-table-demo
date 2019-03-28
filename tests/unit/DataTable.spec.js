import { shallowMount } from '@vue/test-utils'
import DataTable from '@/components/DataTable.vue'

// describe('HelloWorld.vue', () => {
//   it('renders props.msg when passed', () => {
//     const msg = 'new message'
//     const wrapper = shallowMount(HelloWorld, {
//       propsData: { msg }
//     })
//     expect(wrapper.text()).toMatch(msg)
//   })
// })

describe('DataTable.vue', () => {

  it('DataTable component does render', () => {
    const wrapper = shallowMount(DataTable);

    expect(
      wrapper.attributes()['data-test-component']
    ).toBe('DataTable');

    expect(
      wrapper.contains('[data-test-component="DataTable"]')
    ).toBe(true);

  })

})