import { shallowMount } from '@vue/test-utils'
import TableFilters from '@/components/DataTable/TableFilters.vue'

describe('TableFilters.vue', () => {

  it('component does render', () => {
    let wrapper = shallowMount(TableFilters, {
      propsData: {
        dataFields: [{ "field": 'id', "type": "string" }],
        hiddenFields: []
      }
    })

    expect(wrapper.attributes()['data-test-component']).toBe('TableFilters')
    expect(wrapper.contains('[data-test-logo]')).toBe(true)
    expect(wrapper.contains('[data-test-input="searchText"]')).toBe(true)

    expect(wrapper.contains(
      '[data-test-btn="dataFiltersPopoverTrigger"]'
      )).toBe(true)

    expect(wrapper.contains('[data-test-popover="filters"]')).toBe(true)

    expect(wrapper.contains(
      '[data-test-input="selectItemsPerPage"]'
    )).toBe(true)

  })

  it('generates correct display field inputs ', () => {
    let dataFields = [
      { "field": 'id', "type": "string" },
      { "field": 'name', "type": "string" },
      { "field": 'description', "type": "string" },
      { "field": 'date', "type": "string" },
      { "field": 'amount', "type": "number" }
    ]

    let wrapper = shallowMount(TableFilters, {
      propsData: {
        dataFields,
        hiddenFields: []
      }
    })

    expect(
      wrapper.findAll('[data-test-input="displayField"]').length
    ).toBe(5)

    let displayFields = wrapper.findAll('[data-test-label="displayField"]')
    expect(displayFields.at(0).text()).toBe('id')
    expect(displayFields.at(1).text()).toBe('name')
    expect(displayFields.at(2).text()).toBe('description')
    expect(displayFields.at(3).text()).toBe('date')
    expect(displayFields.at(4).text()).toBe('amount')
  })


  let dataFields = [
      { "field": 'id', "type": "string" },
      { "field": 'name', "type": "string" },
      { "field": 'description', "type": "string" },
      { "field": 'date', "type": "string" },
      { "field": 'amount', "type": "number" }
    ]

  it('emits updateSearchText method ', () => {
    let wrapper = shallowMount(TableFilters, {
      propsData: {
        dataFields,
        hiddenFields: []
      }
    })

    wrapper.vm.updateSearchText('kyr')
    expect(wrapper.emitted().input[0]).toEqual(['kyr'])
  })

  it('emits toggleField method ', () => {
    let wrapper = shallowMount(TableFilters, {
      propsData: {
        dataFields,
        hiddenFields: []
      }
    })

    wrapper.vm.toggleField('id')
    expect(wrapper.emitted().toggleDisplayField[0]).toEqual(['id'])
  })

  it('emits setPerPage method ', () => {
    let wrapper = shallowMount(TableFilters, {
      propsData: {
        dataFields,
        hiddenFields: []
      }
    })

    wrapper.vm.setPerPage(10)
    expect(wrapper.emitted().setItemsPerPage[0]).toEqual([10])
  })

  it('emits toggleQuickEdit method ', () => {
    let wrapper = shallowMount(TableFilters, {
      propsData: {
        dataFields,
        hiddenFields: []
      }
    })

    wrapper.vm.toggleQuickEdit()
    expect(wrapper.emitted().toggleQuickEditMode).toEqual([[]])
  })

})
