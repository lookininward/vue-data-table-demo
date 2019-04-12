<!-- Template ---------------------------------------------------------------->
<template>
  <div
    data-test-component="TableFooter"
    class="table-footer"
  >

    <!-- Information --------------------------->
    <div class="table-footer-info">
      <div
        data-test-TotalRows
        style="margin-right: 10px;"
      >
        <template v-if="totalItems">
          Total Rows: {{ totalItems }}
        </template>
      </div>

      <div data-test-SelectedItems>
        <template v-if="numSelectedItemIDs">
          Selected Rows: {{ numSelectedItemIDs }}
        </template>
      </div>
    </div>

    <!-- Pagination ---------------------------->
    <div class="table-footer-pages">
      <button
        v-for="idx in totalPages"
        v-bind:key="idx"
        class="btn btn--pageNumber"
        :class="((idx -1) === currentPage ) ? 'is-active' : ''"
        @click="setPage(idx - 1)"
      >
        {{idx}}
      </button>
    </div>

  </div>
</template>

<!-- Script ------------------------------------------------------------------>
<script>
  export default {
    name: 'TableFooter',

    props: {
     totalItems: Number,
     numSelectedItemIDs: Number,
     totalPages: Number,
     currentPage: Number
   },

   methods: {

    setPage(pageNum) {
      this.$emit('setCurrentPage', pageNum)
    }

   }

  }
</script>

<!-- Style ------------------------------------------------------------------->
<style scoped lang="scss">

  //-- Grid Row 5 ---------------------------------
  .table-footer {
    display: grid;
    grid-template-columns: 1fr;
    align-items: center;
    background-color: $bg-color--grey;
    border-top: 1px solid $bdr-color--light2;
    padding: 0 15px;
    font-size: $font-sm;

    @media screen and (min-width: $screen-width-md) {
      grid-template-columns: 1fr 1fr;
    }
  }

  .table-footer-info {
    display: none;

    @media screen and (min-width: $screen-width-md) {
      display: flex;
    }
  }

  .table-footer-pages {
    display: flex;
    justify-content: flex-end;
  }
</style>
