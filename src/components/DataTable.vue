<!-- Template ---------------------------------------------------------------->
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

    <div
      data-test-TableBody
      class="TableBody"
    >

      <div
        data-test-TableRow
        class="TableRow"
        v-for="item in items"
        :key="item.id"
      >

        <div
          data-test-TableCell
          class="TableCell"
          v-for="itemAttr in item"
          :itemAttr="itemAttr"
        >
          {{ itemAttr }}
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

<!-- Script ------------------------------------------------------------------>
<script>
export default {
  name: 'DataTable',
  props: {
    items: Array
  }
}
</script>

<!-- Style ------------------------------------------------------------------->
<style scoped lang="scss">

.DataTable {
  margin: 0;
  padding: 0;
  width: 100vw;
  height: 100vh;
  background: lightgrey;
  display: grid;
  grid-template-rows: 50px auto 50px;
}

//-- Header -------------------------------------
.TableHeader {
  background-color: #6c7ae0;
}

//-- Body ---------------------------------------
.TableBody {
  display: grid;
  grid-auto-rows: 1fr;
  overflow-y: auto;
}

.TableRow {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  background-color: #F2F2F2;
}

.TableCell {
  display: grid;
  align-items: center;
  border: 1px solid lightgrey;
}

//-- Footer -------------------------------------
.TableFooter {
  background-color: #6c7ae0;
}
</style>
