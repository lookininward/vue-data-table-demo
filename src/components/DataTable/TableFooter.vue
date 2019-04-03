<!-- Template ---------------------------------------------------------------->
<template>
  <div
    data-test-component="TableFooter"
    class="table-footer"
  >
    <div
      data-test-TotalRows
      style="margin-right: 10px;"
    >
      <template v-if="totalItems">
        Rows: {{ totalItems }}
      </template>
    </div>

    <div data-test-SelectedItems>
      <template v-if="selectedItems">
        Selected Rows: {{ selectedItems }}
      </template>
    </div>
  </div>
</template>

<!-- Script ------------------------------------------------------------------>
<script>
  export default {
    name: 'TableFooter',

    props: {
     totalItems: { type: Number },
     selectedItems: { type: Number }
   }
  }
</script>
