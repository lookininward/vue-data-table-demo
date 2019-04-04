<!-- Template ---------------------------------------------------------------->
<template>
  <div
    data-test-component="TableHeader"
    class="table-header"
  >

    <!-- Select All checkbox ----------------->
    <div
      data-test-TableCellCheckbox
      class="table-header-cell table-header-cell--checkbox"
    >
      <input type="checkbox">
    </div>

    <!-- All Items Dropdown ------------------>
    <div
      data-test-TableHeaderCellDropDown
      class="table-header-cell table-header-cell--dropdown"
    >
      <i class="fas fa-ellipsis-v"></i>
    </div>

    <!-- Headers ----------------------------->
    <template v-for="(header, idx) in headers">
      <template v-if="header.header === sortKey">
        <div
          data-test-HeaderCell
          class="table-header-cell table-header-cell--active"
          :key="idx + '--header'"
          @click="sort(header.header, header.type)"
        >
          {{ header.header }}
          <template v-if="reverse">
            <i class="fas fa-long-arrow-alt-up"></i>
          </template>
          <template v-else>
            <i class="fas fa-long-arrow-alt-down"></i>
          </template>
        </div>
      </template>

      <template v-else>
        <div
          data-test-HeaderCell
          class="table-header-cell"
          :key="idx + '--header'"
          @click="sort(header.header, header.type)"
        >
          {{ header.header }}
        </div>
      </template>
    </template>
  </div>
</template>

<!-- Script ------------------------------------------------------------------>
<script>
  export default {
    name: 'TableHeader',

    props: {
     headers: { type: Array },
     sortKey: { type: String },
     reverse: { type: Boolean }
    },

    methods: {

      sort(header, type) {
        this.$emit('sortColumns', header, type)
      }

    }
  }
</script>

<!-- Style ------------------------------------------------------------------->
<style scoped lang="scss">

  //-- Grid Row 3 ---------------------------------
  .table-header {
    display: grid;
    grid-template-columns: 50px 5px repeat(auto-fit, minmax(0px, 1fr));
    align-items: center;
    border-top: 1px solid $bdr-color--light2;
    border-bottom: 1px solid $bdr-color--light2;
    background-color: $bg-color--grey;
    color: $txt-color--light;
  }

  .table-header-cell {
    @include flexCentered(column);
    position: relative;
    font-weight: 500;
    color: $txt-color--dark;
    transition: all .3s;
    cursor: pointer;

    i {
      position: absolute;
      right: 20px;
    }

    &.table-header-cell--dropdown i {
      position: unset;
      cursor: pointer;
    }
  }

  .table-header-cell.table-header-cell--Active {
    font-weight: 600;
  }
</style>
