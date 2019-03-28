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
    header: String
  }
}
</script>

<style scoped lang="scss">
</style>
