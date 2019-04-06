<!-- Template ---------------------------------------------------------------->
<template>
  <div
    data-test-component="TableHeader"
    class="table-header"
  >

    <!-- Row Actions --------------------------->
    <div class="table-header-actions">

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
    </div>

    <!-- Headers ------------------------------->
    <div class="table-header-attrs">
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
              <i
                data-test-sortIndicator
                class="fas fa-long-arrow-alt-up table-sort-indicator"
              >
              </i>
            </template>
            <template v-else>
              <i
                data-test-sortIndicator
                class="fas fa-long-arrow-alt-down table-sort-indicator"
              >
              </i>
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

    <!-- Scrollbar Spacer ---------------------->
    <div
      data-test-scrollbarSpacer
      class="table-header-scrollbarSpacer"
    >
    </div>
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

  //-- Grid Row 3 -------------------------------

  //-- Standard View ----------------------------
  .data-table .table-header {
    border-top: 1px solid $bdr-color--light2;
    border-bottom: 1px solid $bdr-color--light2;
    background-color: $bg-color--grey;
    color: $txt-color--light;

    .table-header-cell {
      position: relative;
      @include flexCentered(column);
      align-items: flex-start;
      padding: 0px 10px;
      font-size: 12px;
      font-weight: 500;
      color: $txt-color--dark;
      cursor: pointer;
      transition: all .2s;
      overflow-x: auto;

      @media screen and (min-width: $screen-width-sm) {
        padding: 0;
        align-items: center;
        font-size: inherit;
      }

      .table-sort-indicator {
        position: absolute;
        right: 20px;
      }

      &.table-header-cell--active {
        font-weight: 600;
      }

      &.table-header-cell--checkbox,
      &.table-header-cell--dropdown {
        display: grid;
        align-items: center;
        padding: 0px;
        cursor: auto;
      }

      &.table-header-cell--dropdown i {
        cursor: pointer;
      }
    }
  }

  //-- List View --------------------------------
  .data-table.data-table--list .table-header {

    .table-header-attrs {
      display: none;
    }
  }
</style>
