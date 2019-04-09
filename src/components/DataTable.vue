<!-- Template ---------------------------------------------------------------->
<template>
  <div
    data-test-component="DataTable"
    class="data-table"
    :class="listView ? 'data-table--list' : '' "
  >

    <!-- Table Filters ------------------------->
    <TableFilters
      data-test-component="TableFilters"
      v-model="searchText"
      :headers="headers"
      :hiddenFields="hiddenFields"
      :listView="listView"
      :perPage="perPage"
      @toggleListView="toggleListView"
      @toggleFields="toggleFields"
      @setPerPage="setPerPage"
    />

    <!-- Table Header -------------------------->
    <TableHeader
      data-test-component="TableHeader"
      :headers="headers"
      :hiddenFields="hiddenFields"
      :sortKey="sortKey"
      :reverse="reverse"
      :listView="listView"
      :numItems="items ? items.length : 0"
      :numSelectedItemIDs="selectedItemIDs ? selectedItemIDs.length : 0"
      @sortColumns="sortTableBy"
      @selectAllItems="selectAllItems"
    />

    <!-- Table Body ---------------------------->
    <div
      data-test-TableBody
      class="table-body"
    >

      <!-- Table Rows -------------------------->
      <TableRow
        data-test-component="TableRow"
        v-for="item in sortedItems"
        v-bind:key="item.id"
        :item="item"
        :headers="headers"
        :hiddenFields="hiddenFields"
        :selectedItemIDs="selectedItemIDs"
        @toggleSelect="toggleSelect"
      />
    </div>

    <!-- Table Footer -------------------------->
    <TableFooter
      data-test-component="TableFooter"
      :totalItems="items ? items.length : 0"
      :numSelectedItemIDs="selectedItemIDs.length"
      :totalPages="pages.length"
      :currentPage="currentPage"
      @setCurrentPage="setCurrentPage"
    />
  </div>
</template>

<!-- Script ------------------------------------------------------------------>
<script>
  import TableFilters from '@/components/DataTable/TableFilters.vue'
  import TableHeader from '@/components/DataTable/TableHeader.vue'
  import TableRow from '@/components/DataTable/TableRow.vue'
  import TableFooter from '@/components/DataTable/TableFooter.vue'

  export default {
    name: 'DataTable',

    props: {
      items: Array
    },

    components: {
      TableFilters,
      TableHeader,
      TableRow,
      TableFooter
    },

    data() {
      return {
        sortKey: null,
        sortType: null,
        reverse: false,
        searchText: '',
        selectedItemIDs: [],
        currentPage: 0,
        perPage: 20,
        pages: [],
        listView: false,
        hiddenFields: []
      }
    },

    computed: {

      headers() { // fields
        let items = this.items ? this.items : []
        let headers = items.length ? Object.keys(items[0]) : []
        let result = []

        headers.forEach(header => {
          let data = items[0] ? items[0][header] : 'string'
          let type = typeof data

          result.push({
            header,
            type
          })
        })

        return result
      },

      sortedItems() {

        // Filter items by search
        let filteredItems = this._filterItemsBySearch(
          this.items ? this.items : [],
          this.searchText
        )

        // Sort items by field
        let sortedItems = this._sortItemsByField(
          filteredItems ? filteredItems : [],
          this.sortKey,
          this.sortType,
          this.reverse
        )

        // Paginate
        this._paginateItems(sortedItems)


        // Return results for current page
        let paginatedItems = this.paginatedItems ? this.paginatedItems : []
        return paginatedItems
      },

      paginatedItems() {
        return this.pages[this.currentPage]
      }

    },

    methods: {

      //-- internal -----------------------------
      _filterItemsBySearch(items, searchText) {
        let txt = searchText.toLowerCase()
        let filteredResults = items.filter(item => {
          const itemValues = Object.values(item)
          itemValues.forEach(val => { val.toString().toLowerCase()})
          return itemValues.toString().toLowerCase().includes(txt)
        })
        return filteredResults
      },

      _sortItemsByField(items, sortKey, sortType, reverse) {
        let result = items

        if (sortType == 'number') {
          result = items.sort((a, b) => {
            return reverse ? b[sortKey] - a[sortKey] : a[sortKey] - b[sortKey]
          })
        }

        if (sortType == 'string') {
          result = items.sort((a, b) => {
            let x = a ? a[sortKey].toLowerCase() : ''
            let y = b ? b[sortKey].toLowerCase() : ''

            if (reverse) {
              if (x > y) { return -1 }
              if (x < y) { return 1 }
            } else {
              if (x < y) { return -1 }
              if (x > y) { return 1 }
            }

            return 0
          })

        }

        return result
      },

      _paginateItems(items) {
        let numItems = items ? items.length : 0
        let numItemsPerPage = this.perPage
        let pages = []
        let pageSet = []

        for (var i = 0; i <= numItems; i++ ) {

          if (pageSet.length >= numItemsPerPage) {
            pages.push(pageSet)
            pageSet = []
          }

          if (pageSet.length < numItemsPerPage) {
            pageSet.push(items[i])
            pageSet = pageSet.filter(Boolean);
          }

        }

        if (pageSet.length) {
          pages.push(pageSet)
        }

        return this.pages = pages
      },


      //-- --------------------------------------
      sortTableBy(sortKey, sortType) {
        this.currentPage = 0
        this.reverse = (this.sortKey == sortKey) ? ! this.reverse : false
        this.sortKey = sortKey
        this.sortType = sortType
      },

      toggleSelect(itemID) {
        const selectedItemIDs = this.selectedItemIDs

        if (selectedItemIDs.includes(itemID)) {
          const idx = selectedItemIDs.findIndex(x => x === itemID)
          selectedItemIDs.splice(idx, 1)
        } else {
          selectedItemIDs.push(itemID)
        }
      },

      setCurrentPage(pageNum) {
        this.currentPage = pageNum
      },

      toggleListView() { // Quick Edit Mode
        return this.listView = !this.listView
      },

      toggleFields(field) {
        let hiddenFields = this.hiddenFields

        if (hiddenFields.includes(field)) {
          this.hiddenFields = hiddenFields.filter(hiddenField => {
            return hiddenField != field
          })
        } else {
          hiddenFields.push(field)
        }

      },

      setPerPage(value) {
        this.perPage = value
      },

      selectAllItems() {
        let items = this.items
        const selectedItemIDs = this.selectedItemIDs
        let result = []

        if (!selectedItemIDs.length) {
          items.forEach(item => {
            if (!selectedItemIDs.includes(item.id)) {
              result.push(item.id)
            }
          })
        }

        this.selectedItemIDs = result
      }

    }
  }
</script>

<!-- Style ------------------------------------------------------------------->
<style lang="scss">

  //-- Buttons ----------------------------------
  .btn {
    min-width: 20px;
    background-color: $bg-color--light;
    border: 1px solid $bdr-color--light;
    border-radius: 10px;
    padding: 3px 5px;
    font-size: $font-sm;
    cursor: pointer;
    outline: 0;
    transition: all .2s;
    @include hoverState();
    @include activeState();
  }

  .btn.btn--confirm {
    &:hover {
      background-color: $bg-color--green;
      color: $txt-color--light;
    }
  }

  .btn.btn--pageNumber {
    margin: 0 2px;
    padding: 2px 10px;

    &:last-child {
      margin: 0 0 0 2px;
    }
  }

  //-- Inputs -----------------------------------

  i.input.input--checkbox {
    font-size: $font-lg;
    cursor: pointer;

    @media screen and (min-width: $screen-width-sm) {
      margin: 2px;
    }
  }

  //-- Popovers ---------------------------------
  .popover-theme {
    @include tippyBaseTheme();
  }

  .popover {
    @include fontStandard();
    text-align: left;
    background-color: $bg-color--light;
    color: $txt-color--dark;
  }

  .popover.popover--standard {
    @include fontStandard();
    text-align: left;
    padding: 10px 15px;
    background-color: $bg-color--light;
    color: $txt-color--dark;
  }

  .popover-options-list {
    .popover-option {
      width: 100%;
      padding: 3px 8px;
      @include activeState();
      @include hoverState();
      cursor: pointer;
    }
  }

  //-- Data Table ---------------------------------
  //-- Standard View ----------------------------
  .data-table {
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-rows: 80px 50px auto 30px;

    @media screen and (min-width: $screen-width-sm) {
      grid-template-rows: 40px 30px auto 30px;
    }

    //-- maintain alignment of header, row columns --
    .table-header,
    .table-row {
      display: grid;
      grid-template-columns: 30px 1fr;
      grid-template-rows: 1fr;

      @media screen and (min-width: $screen-width-sm) {
        grid-template-columns: 55px 1fr;
      }
    }

    .table-header-actions,
    .table-row-actions {
      display: grid;
      grid-template-rows: 1fr 1fr;
      grid-template-columns: 1fr;
      border-right: 1px solid $bdr-color--light;

      @media screen and (min-width: $screen-width-sm) {
        grid-template-rows: 1fr;
        grid-template-columns: 30px 25px;
        border: none;
      }
    }

    .table-header-cell.table-header-cell--checkbox,
    .table-cell.table-cell--checkbox {
      @include flexCentered(column);
      padding: 0;

      @media screen and (min-width: $screen-width-sm) {
        align-items: flex-end;
      }
    }

    .table-header-attrs,
    .table-attrs {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(0px, 1fr));
    }
  }

  //-- List View --------------------------------
  .data-table.data-table--list {
    .table-header-attrs,
    .table-attrs {
      grid-template-columns: 1fr;
      grid-template-rows: repeat(auto-fit, minmax(0px, 1fr));
    }
  }

  //-- Grid Row 1 -- Project Info ---------------
  //-- Grid Row 2 -- Table Filters --------------
  //-- Grid Row 3 -- Header ---------------------

  //-- Grid Rows Auto ---------------------------
  //-- Body -------------------------------------
  .table-body {
    display: grid;
    grid-auto-rows: minmax(min-content, max-content);
    overflow-y: auto;
  }

  //-- Grid Row 5 -- Footer ---------------------
</style>
