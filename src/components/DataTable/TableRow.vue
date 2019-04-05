<!-- Template ---------------------------------------------------------------->
<template>
  <div
    data-test-component="TableRow"
    class="table-row"
  >

    <!-- Row Actions --------------------------->
    <div class="table-row-actions">

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

    </div>

    <!-- Table Cells --------------------------->
    <div class="table-attrs">
      <TableCell
        data-test-component="TableCell"
        class="table-cell"
        v-for="(itemAttr, idx) in item"
        :item="item"
        :itemAttr="itemAttr"
        :key="idx + '--cell'"
      />
    </div>
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
    background-color: $bg-color--light;
    border-bottom: 1px solid #000;

    &:hover {
      background-color: $bg-color--grey;
    }

    @media screen and (min-width: $screen-width-sm) {
      border: none;
    }
  }

  .table-cell.table-cell--checkbox,
  .table-cell.table-cell--dropdownTrigger {
    @include flexCentered(column);
    padding: 0;
  }
</style>
