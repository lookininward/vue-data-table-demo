import { shallowMount } from '@vue/test-utils'
import { randomInt } from '../../helpers.js'
import TableFooter from '@/components/DataTable/TableFooter.vue'

describe('TableFooter.vue', () => {

  it('component does render', () => {
    const wrapper = shallowMount(TableFooter)
    expect(wrapper.attributes()['data-test-component']).toBe('TableFooter')
  })

  it('footer displays total number of item rows', () => {
    let items = []
    for (let i = 0; i < randomInt(300); i++) {
      items.push({ name: 'Kyra Lester'})
    }

    const wrapper = shallowMount(TableFooter, {
      propsData: {
        totalItems: items.length
      }
    })

    const totalRows = wrapper.find('[data-test-TotalRows]')
    expect(totalRows.text()).toBe(`Total Rows: ${items.length}`)
  })

})
