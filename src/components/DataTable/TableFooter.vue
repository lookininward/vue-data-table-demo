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
        <template v-if="selectedItems">
          Selected Rows: {{ selectedItems }}
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
     totalItems: { type: Number },
     selectedItems: { type: Number },
     totalPages: { type: Number },
     currentPage: { type: Number }
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
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: $bg-color--grey;
    border-top: 1px solid $bdr-color--light2;
    padding: 0 20px;
    font-size: $font-sm;
  }

  .table-footer-info {
    display: flex;
  }
</style>
