<!-- Template ---------------------------------------------------------------->
<template>
  <div
    data-test-component="DataTable"
    class="data-table"
  >

    <!-- Description --------------------------->
    <ProjectInfo
      data-test-component="ProjectInfo"
    />

    <!-- Table Filters ------------------------->
    <TableFilters
      data-test-component="TableFilters"
      v-model="searchText"
    />

    <!-- Table Header -------------------------->
    <TableHeader
      data-test-component="TableHeader"
      :headers="headers"
      :sortKey="sortKey"
      :reverse="reverse"
      @sortColumns="sortTableBy"
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
        v-bind:item="item"
        v-bind:key="item.id"
        @toggleSelect="toggleSelect"
      />
    </div>

    <!-- Table Footer -------------------------->
    <TableFooter
      data-test-component="TableFooter"
      :totalItems="items ? items.length : 0"
      :selectedItems="selectedItems ? selectedItems.length : 0"
      :totalPages="pages.length"
      @setCurrentPage="setCurrentPage"
      :currentPage="currentPage"
    />
  </div>
</template>

<!-- Script ------------------------------------------------------------------>
<script>
  import ProjectInfo from '@/components/DataTable/ProjectInfo.vue'
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
      ProjectInfo,
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
        selectedItems: [],
        currentPage: 0,
        perPage: 20,
        pages: []
      }
    },

    computed: {

      headers() {
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
        let items = this.items ? this.items : []
        const sortKey = this.sortKey
        const sortType = this.sortType
        const reverse = this.reverse
        let result = items

        if (sortType === 'number') {
          result = items.sort((a, b) => {
            return reverse ?  b[sortKey] - a[sortKey] : a[sortKey] - b[sortKey]
          })
        }

        if (sortType === 'string') {

          result = items.sort((a, b) => {
            var x = a ? a[sortKey].toLowerCase() : ''
            var y = b ? b[sortKey].toLowerCase() : ''

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

        let searchText = this.searchText.toLowerCase()

        let filteredResults = result.filter(item => {
          const itemValues = Object.values(item)
          itemValues.forEach(val => { val.toString().toLowerCase()})
          return itemValues.toString().toLowerCase().includes(searchText)
        })

        this.calculatePages(filteredResults)
        let paginatedItems = this.paginatedItems ? this.paginatedItems : []

        let newRes = paginatedItems.filter(item => {
          const itemValues = Object.values(item)
          itemValues.forEach(val => { val.toString().toLowerCase()})
          return itemValues.toString().toLowerCase().includes(searchText)
        })

        return newRes
      },

      paginatedItems() {
        return this.pages[this.currentPage]
      }

    },

    methods: {

      sortTableBy(sortKey, sortType) {
        this.currentPage = 0
        this.reverse = (this.sortKey == sortKey) ? ! this.reverse : false
        this.sortKey = sortKey
        this.sortType = sortType
      },

      toggleSelect(itemID) {
        const selectedItems = this.selectedItems

        if (selectedItems.includes(itemID)) {
          const idx = selectedItems.findIndex(x => x === itemID)
          selectedItems.splice(idx, 1)
        } else {
          selectedItems.push(itemID)
        }
      },

      calculatePages(items) {
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

      setCurrentPage(pageNum) {
        this.currentPage = pageNum
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

    &:hover {
      background-color: $color-black-1;
      color: $txt-color--light;
    }
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

    &.is-active {
      border: 1px solid $color-black-1;
    }
  }

  //-- Data Table ---------------------------------
  .data-table {
    width: 100vw;
    height: 100vh;
    display: grid;
    grid-template-rows: 50px 40px 60px auto 30px;

    @media screen and (min-width: $screen-width-sm) {
      grid-template-rows: 70px 40px 30px auto 30px;
    }
  }

  //-- Grid Row 1 -- Project Info ---------------
  //-- Grid Row 2 -- Table Filters --------------
  //-- Grid Row 3 -- Header ---------------------

  //-- Grid Rows Auto ---------------------------
  //-- Body -------------------------------------
  .table-body {
    display: grid;
    grid-auto-rows: 1fr;
    overflow-y: auto;
  }

  //-- Grid Row 5 -- Footer ---------------------
</style>
