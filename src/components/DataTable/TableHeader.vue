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

      <!-- All Items Popover ------------------->
      <div
        data-test-TableHeaderCellPopoverTrigger
        class="table-header-cell table-header-cell--popoverTrigger"
      >
        <i class="fas fa-ellipsis-v"></i>
      </div>
    </div>

    <!-- Edit Mode (row orientation) ----------->
    <div
      v-if="listView"
      class="edit-mode"
    >
      Quick Edit Mode

      <i
        data-test-btn="popoverTrigger"
        class="fas fa-info-circle popover-trigger"
        v-tippy="{
          reactive: true,
          interactive : true,
          trigger : 'click',
          placement: 'bottom',
          html: '#info-popover',
          theme : 'info-popover',
          duration: 100
        }"
      >
      </i>

      <div
        id="info-popover"
        data-test-popover="info"
        class="info-popover"
        v-tippy-html
      >
        <template v-for="(header, idx) in headers">
          <div
            v-bind:key="idx"
          >
            {{ header.header }}
          </div>
        </template>
      </div>
    </div>

    <!-- Headers ------------------------------->
    <div class="table-header-attrs">
      <template v-for="(header, idx) in headers">


        <template
          v-if="!hiddenFields.includes(header.header)"
        >
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
      </template>
    </div>

  </div>
</template>

<!-- Script ------------------------------------------------------------------>
<script>
  export default {
    name: 'TableHeader',

    props: {
     headers: { type: Array },
     hiddenFields: { type: Array },
     sortKey: { type: String },
     reverse: { type: Boolean },
     listView: { type: Boolean }
    },

    methods: {

      sort(header, type) {
        this.$emit('sortColumns', header, type)
      }

    }
  }
</script>

<!-- Style ------------------------------------------------------------------->
<style lang="scss">

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
        display: none;

        @media screen and (min-width: $screen-width-sm) {
          display: flex;
          position: absolute;
          right: 20px;
        }
      }

      &.table-header-cell--active {
        font-weight: 600;
      }

      &.table-header-cell--checkbox,
      &.table-header-cell--popoverTrigger {
        display: grid;
        align-items: center;
        padding: 0px;
        cursor: auto;
      }

      &.table-header-cell--popoverTrigger i {
        cursor: pointer;
      }
    }

    .edit-mode {
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 0 10px;
      color: $txt-color--dark;
      font-weight: 600;
    }

    .popover-trigger {
      font-size: $font-lg;
      color: $txt-color--dark;
      margin-left: 8px;
    }

  }

  .info-popover-theme {
    @include tippyBaseTheme();
  }

  .info-popover {
    @include fontStandard();
    text-align: left;
    padding: 10px 15px;
    background-color: $bg-color--light;
    color: $txt-color--dark;
  }

  //-- List View --------------------------------
  .data-table.data-table--list .table-header {
    .table-header-attrs {
      display: none;
    }
  }
</style>
