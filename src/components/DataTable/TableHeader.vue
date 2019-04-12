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
        <i
          data-test-input="selectAllCheckbox"
          class="input input--checkbox"
          :class="allItemsSelected ?
                  'fas fa-check-square is-active' :
                  'far fa-square'"
          @click="selectAll()"
        >
        </i>
      </div>

      <!-- All Items Popover ------------------->
      <div
        data-test-TableHeaderCellPopoverTrigger
        class="table-header-cell"
      >
        <div
          id="headerPopover"
          data-test-popover="headerPopover"
          class="popover"
          v-tippy-html
        >
          <div class="popover-options-list">
            <div
              data-test-btn="deleteSelectedItems"
              class="popover-option"
              @click="deleteSelectedItems(selectedItemIDs)"
            >
              Delete All
            </div>
          </div>
        </div>

        <i
          class="fas fa-ellipsis-v popoverTrigger"
          v-tippy="{
            reactive: true,
            interactive : true,
            trigger : 'click',
            placement: 'right-end',
            html: `#headerPopover`,
            theme : 'popover',
            duration: 100
          }"
        >
        </i>

      </div>
    </div>

    <!-- Edit Mode (row orientation) ----------->
    <div
      v-if="inQuickEdit"
      class="edit-mode"
    >
      Quick Edit Mode

      <i
        data-test-btn="popoverTrigger"
        class="fas fa-sort popoverTrigger"
        v-tippy="{
          reactive: true,
          interactive : true,
          trigger : 'click',
          placement: 'bottom',
          html: '#info-popover',
          theme : 'popover',
          duration: 100
        }"
      >
      </i>

      <div
        id="info-popover"
        data-test-popover="info"
        class="popover"
        v-tippy-html
      >
        <div class="popover-options-list">
          <div
            v-for="(dataField, idx) in dataFields"
            v-bind:key="idx"
            class="popover-option"
            :class="dataField.field === sortKey ? 'is-active' : ''"
            @click="sortData(dataField.field, dataField.type)"
          >
            {{ dataField.field }}
          </div>
        </div>
      </div>
    </div>

    <!-- Headers ------------------------------->
    <div class="table-header-attrs">
      <template v-for="(dataField, idx) in dataFields">
        <div
          data-test-HeaderCell
          v-if="!hiddenFields.includes(dataField.field)"
          class="table-header-cell"
          :class="dataField.field === sortKey ? 'is-active' : ''"
          :key="idx + '--header'"
          @click="sortData(dataField.field, dataField.type)"
        >
          {{ dataField.field }}

          <i
            v-if="dataField.field === sortKey"
            data-test-sortIndicator
            class="fas fa-sort table-sort-indicator"
          >
          </i>
        </div>
      </template>
    </div>
  </div>
</template>

<!-- Script ------------------------------------------------------------------>
<script>
  import Vue from 'vue'
  import VueTippy from 'vue-tippy'
  import { mapActions } from 'vuex'

  export default {
    name: 'TableHeader',

    props: {
      dataFields: Array,
      hiddenFields: Array,
      sortKey: String,
      reverse: Boolean,
      numItems: Number,
      selectedItemIDs: Array,
      inQuickEdit: Boolean
    },

    created() {
      Vue.use(VueTippy)
    },

    computed: {

      allItemsSelected() {
        return this.numItems === (this.selectedItemIDs ?
                                  this.selectedItemIDs.length :
                                  0)
      }

    },

    methods: {

      sortData(field, type) {
        this.$emit('sortTableBy', field, type)
      },

      selectAll() {
        this.$emit('selectAllItems')
      },

      ...mapActions([
        'deleteSelectedItems'
      ])

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

      @media screen and (min-width: $screen-width-md) {
        padding: 0;
        align-items: center;
        font-size: inherit;
      }

      .table-sort-indicator {
        display: none;

        @media screen and (min-width: $screen-width-md) {
          display: flex;
          position: absolute;
          right: 20px;
        }
      }
    }

    .edit-mode {
      @include flexCentered(row);
      padding: 0 10px;
      color: $txt-color--dark;
      font-weight: 600;

      .popoverTrigger {
        margin-left: 5px;
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
