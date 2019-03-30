<!-- Template ---------------------------------------------------------------->
<template>
  <div
    data-test-component="TableFooter"
    class="table-footer"
  >
    <div data-test-TotalRows>
      <template v-if="totalItems">
        Rows: {{ totalItems }}
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

<!-- Style ------------------------------------------------------------------->
<style scoped lang="scss">
</style>
