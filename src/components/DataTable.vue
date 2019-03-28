<template>
  <div
    data-test-component="DataTable"
    class="DataTable"
  >

    <div
      data-test-TableHeader
      class="TableHeader"
    >
    </div>

    {{ header }}

    <div
      data-test-TableBody
      class="TableBody"
    >

      <div
        data-test-TableRow
        class="TableRow"
        v-for="item in items"
      >

        <div
          data-test-TableCell
          class="TableCell"
          v-for="key in item"
        >
        </div>

      </div>

    </div>

    <div
      data-test-TableFooter
      class="TableFooter"
    >
    </div>
  </div>
</template>

<script>
export default {
  name: 'DataTable',
  props: {
    header: String,
    items: Array
  }
}
</script>

<style scoped lang="scss">
</style>
