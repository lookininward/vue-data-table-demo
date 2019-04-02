<!-- Template ---------------------------------------------------------------->
<template>
  <div
    data-test-component="DataTable"
    class="data-table"
  >

    <!-- Description --------------------------->
    <ProjectDescription />

    <!-- Data Filters -------------------------->
    <TableFilters
      data-test-component="TableHeader"
      v-model="searchText"
    />

    <!-- Table Header -------------------------->
    <TableHeader
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
      <template v-for="(item, idx) in sortedItems">
        <TableRow
          data-test-component="TableRow"
          class="table-row"
          :item="item"
          :idx="idx"
          @toggleSelect="toggleSelect"
          v-bind:key="idx + '--item'"
        />
      </template>
    </div>

    <!-- Table Footer -------------------------->
    <TableFooter
      data-test-component="TableFooter"
      :totalItems="items ? items.length : 0"
      :selectedItems="selectedItems ? selectedItems.length : 0"
    />

  </div>
</template>

<!-- Script ------------------------------------------------------------------>
<script>
import ProjectDescription from '@/components/DataTable/ProjectDescription.vue'
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
    ProjectDescription,
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
      selectedItems: []
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

      return filteredResults
    }

  },

  methods: {

    sortTableBy(sortKey, sortType) {
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
    }

  }
}
</script>

<!-- Style ------------------------------------------------------------------->
<style lang="scss">

//-- Variables ----------------------------------
$bg-color--light:   #fff;
$bg-color--grey:    #f6f9fc;
$txt-color--light:  #fff;
$txt-color--light2: rgba(0, 0, 0, 0.05);
$txt-color--dark:   #2c3e50;
$bdr-color--light:  #e9ecef;
$bdr-color--light2: rgba(0, 0, 0, 0.05);


//-- Mixins -------------------------------------
@mixin flexCentered($direction) {
  display: flex;
  flex-direction: $direction;
  justify-content: center;
  align-items: center;
}


//-- Data Table ---------------------------------
.data-table {
  width: 100vw;
  height: 100vh;
  display: grid;
  grid-template-rows: 70px 40px 30px auto 20px;
}


//-- Grid Row 1 ---------------------------------
.project-description {
  @include flexCentered(column);
  align-items: flex-start;
  padding: 0 20px;
}

.Links {
  display: flex;
}

.LinkItem {
  margin-right: 8px;
}


//-- Grid Row 2 ---------------------------------
.data-filters {
  display: flex;
  border-top: 1px solid $bdr-color--light2;
}

.data-filters .input.input--search {
  display: grid;
  border: none;
  border-right: 1px solid $bdr-color--light2;
  background-color: $bg-color--light;
  font-size: 16px;
  color: $txt-color--dark;
  padding: 5px 20px;
  outline: 0;
}

.data-filters .filter-options {
  display: flex;
  align-items: center;
  padding: 0 20px;

  i {
    margin-right: 15px;
    cursor: pointer;
  }

}


//-- Grid Row 3 ---------------------------------
//-- Header -------------------------------------
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


//-- Grid Rows Auto -----------------------------
//-- Body ---------------------------------------
.table-body {
  display: grid;
  grid-auto-rows: 1fr;
  overflow-y: auto;
}

.table-row {
  display: grid;
  grid-template-columns: 50px 5px repeat(auto-fit, minmax(0px, 1fr));
  background-color: $bg-color--light;

  &:hover {
    background-color: $bg-color--grey;
  }
}

.table-cell {
  display: grid;
  align-items: center;
  border-bottom: 1px solid $bdr-color--light;
  padding: 10px;
}

.table-cell.table-cell--checkbox,
.table-cell.table-cell--dropdownTrigger {
  @include flexCentered(column);
  padding: 0;
}

.table-cell.table-cell--dropdownTrigger i {
  color: $txt-color--light2;
  cursor: pointer;

  &:hover {
    color: $txt-color--dark;
  }
}


//-- Grid Row 5 ---------------------------------
//-- Footer -------------------------------------
.table-footer {
  display: flex;
  align-items: center;
  background-color: $bg-color--grey;
  border-top: 1px solid $bdr-color--light2;
  padding: 0 20px;
  font-size: 12px;
}
</style>
