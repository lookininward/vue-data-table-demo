<!-- Template ---------------------------------------------------------------->
<template>
  <div
    data-test-component="TableCell"
    class="table-cell"
  >
    {{ itemAttr}}

    <EditPopover
      v-if="isEditable"
      data-test-component="editPopoverTrigger"
      :item="item"
      :itemAttr="itemAttr"
    />
  </div>
</template>

<!-- Script ------------------------------------------------------------------>
<script>
  import EditPopover from '@/components/DataTable/TableRow/EditPopover.vue'

  export default {
    name: 'TableCell',

    components: {
      EditPopover
    },

    props: {
      item: Object,
      itemAttr: { type: [String, Number] }
    },

    computed: {

      isEditable() {
        return this.item['description'] == this.itemAttr
      }

    }

  }
</script>

<!-- Style ------------------------------------------------------------------->
<style lang="scss">

  //-- Standard View ----------------------------
  .data-table .table-cell {
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    border-bottom: 1px solid $bdr-color--light;
    padding: 5px 10px;
    font-size: $font-sm;
    text-align: left;
    overflow-x: auto;
    overflow-y: hidden;

    @media screen and (min-width: $screen-width-md) {
      align-items: center;
      padding: 10px;
      font-size: $font-md;
      text-align: center;
    }

    //-- Edit Field --
    .btn.btn--edit {
      display: none;
      position: absolute;
      top: 5px;
      right: 5px;

      &.is-active {
        display: flex;
      }
    }

    &:hover {
      .btn.btn--edit {
        display: flex;
      }
    }

  }

  //-- List View --------------------------------
  .data-table.data-table--list .table-cell {
    @media screen and (min-width: $screen-width-md) {
      padding: 3px 10px;
    }
  }
</style>
