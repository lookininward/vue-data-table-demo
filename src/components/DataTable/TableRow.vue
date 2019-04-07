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

      <!-- Row Popover ------------------------->
      <RowPopover
        data-test-component="RowPopover"
        :item="item"
      />

    </div>

    <!-- Table Cells --------------------------->
    <div class="table-attrs">
      <TableCell
        data-test-component="TableCell"
        class="table-cell"
        v-for="(itemAttr, idx) in displayItem"
        :item="item"
        :itemAttr="itemAttr"
        :key="idx + '--cell'"
      />
    </div>
  </div>
</template>

<!-- Script ------------------------------------------------------------------>
<script>
  import RowPopover from '@/components/DataTable/TableRow/RowPopover.vue'
  import TableCell from '@/components/DataTable/TableRow/TableCell.vue'

  export default {
    name: 'TableRow',

    props: {
      item: { type: Object },
      hiddenFields: { type: Array }
    },

    components: {
      RowPopover,
      TableCell
    },

    computed: {

      displayItem() {
        let item = this.item
        let displayItem = Object.assign({}, item)
        let hiddenFields = this.hiddenFields ? this.hiddenFields : []

        hiddenFields.forEach(field => {
          delete displayItem[field]
        })

        return displayItem
      }
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

  //-- Standard View ----------------------------
  .data-table {

    .table-row {
      background-color: $bg-color--light;

      &:hover {
        background-color: $bg-color--grey;
      }

      @media screen and (min-width: $screen-width-sm) {
        border: none;
      }
    }
  }

  //-- List View --------------------------------
  .data-table.data-table--list {
    .table-row {
      border-bottom: 1px solid $bdr-color--dark;
    }
  }
</style>
