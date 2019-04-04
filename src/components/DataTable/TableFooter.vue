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
        @click="setPage(idx - 1)"
      >
        {{idx}}

        <template v-if="(idx -1) === currentPage">
          Current
        </template>
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
