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
    display: grid;
    grid-template-columns: 30px 5px 1fr;
    grid-template-rows: 1fr;
    background-color: $bg-color--light;
    border-bottom: 1px solid #000;

    &:hover {
      background-color: $bg-color--grey;
    }

    @media screen and (min-width: $screen-width-sm) {
      grid-template-columns: 50px 5px repeat(auto-fit, minmax(0px, 1fr));
      grid-template-rows: auto;

      border: none;
    }
  }

  .table-cell.table-cell--checkbox,
  .table-cell.table-cell--dropdownTrigger {
    @include flexCentered(column);
    padding: 0;
  }



  .table-cell.table-cell--checkbox {
    grid-area: table-cell-checkbox / 1 / 1;

    @media screen and (min-width: $screen-width-sm) {
      grid-area: table-cell-checkbox / 1 / 1;
    }
  }

  .table-attrs {
    grid-area: table-cell-checkbox / 3 / 1;

    padding: 0 10px;

    @media screen and (min-width: $screen-width-sm) {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;

      padding: 0;
    }
  }
</style>
