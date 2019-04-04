<!-- Template ---------------------------------------------------------------->
<template>
  <div
    data-test-component="TableRow"
    class="table-row"
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

    <!-- Row Dropdown -------------------------->
    <TableRowDropdown
      data-test-component="TableRowDropdown"
      :item="item"
    />

    <!-- Table Cells --------------------------->
    <TableCell
      data-test-component="TableCell"
      class="table-cell"
      v-for="(itemAttr, idx) in item"
      :item="item"
      :itemAttr="itemAttr"
      :key="idx + '--cell'"
    />
  </div>
</template>

<!-- Script ------------------------------------------------------------------>
<script>
  import TableRowDropdown from '@/components/DataTable/TableRow/TableRowDropdown.vue'
  import TableCell from '@/components/DataTable/TableRow/TableCell.vue'

  export default {
    name: 'TableRow',

    props: {
      item: { type: Object }
    },

    components: {
      TableRowDropdown,
      TableCell
    },

    methods: {

      toggle(itemID) {
        this.$emit('toggleSelect', itemID)
      }

    }

  }
</script>

<!-- Style ------------------------------------------------------------------->
<style scoped lang="scss">
  .table-row {
    display: grid;
    grid-template-columns: 50px 5px repeat(auto-fit, minmax(0px, 1fr));
    background-color: $bg-color--light;

    &:hover {
      background-color: $bg-color--grey;
    }
  }
</style>
