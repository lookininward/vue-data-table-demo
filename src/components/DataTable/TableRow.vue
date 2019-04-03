<!-- Template ---------------------------------------------------------------->
<template>
  <div
    data-test-component="TableRow"
  >
    <!-- Select Item checkbox ------------------>
    <div
      data-test-TableCellCheckbox
      class="table-cell table-cell--checkbox"
    >
      <input
        data-test-checkbox
        type="checkbox"
        @click="toggle(item.id)"
      >
    </div>

    <!-- Item Dropdown ------------------------->
    <TableRowDropdown
      data-test-component="TableRowDropdown"
      :item="item"
    />

    <!-- Table Cells --------------------------->
    <div
      data-test-TableCell
      class="table-cell"
      v-for="(itemAttr, idx) in item"
      :key="idx + '--cell'"
    >
      {{ itemAttr }}
    </div>
  </div>

</template>

<!-- Script ------------------------------------------------------------------>
<script>

import TableRowDropdown from '@/components/DataTable/TableRow/TableRowDropdown.vue'

export default {
  name: 'TableRow',

  props: {
    item: { type: Object }
  },

  components: {
    TableRowDropdown
  },

  methods: {

    toggle(itemID) {
      this.$emit('toggleSelect', itemID)
    }

  }

}
</script>

<!-- Style ------------------------------------------------------------------->
<style lang="scss">
</style>
