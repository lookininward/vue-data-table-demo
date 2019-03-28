<template>
  <div
    data-test-component="DataTable"
    class="dataTable"
  >
    {{ header }}
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
