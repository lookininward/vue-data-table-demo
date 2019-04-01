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
        @click="toggle(item.ID)"
      >
    </div>

    <!-- Item Drop ----------------------------->
    <div
      data-test-TableCellDropDown
      class="table-cell table-cell--dropdown"
    >
      <i class="fas fa-ellipsis-v"></i>
    </div>

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
export default {
  name: 'TableRow',

  props: {
   item: { type: Object }
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
</style>
