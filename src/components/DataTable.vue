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

      <template v-if="headers">
        <div
          data-test-HeaderCell
          class="HeaderCell"
          v-for="(header, idx) in headers"
          :key="idx + '--header'"
          @click="sortTableBy(header.header, header.type)"
        >
          {{ header.header }}

          <template
            v-if="header.header === sortKey"
          >
            ACTIVE
          </template>

        </div>
      </template>

    </div>

    <div
      data-test-TableBody
      class="TableBody"
    >

      <div
        data-test-TableRow
        class="TableRow"
        v-for="(item, idx) in sortedItems"
        v-bind:key="idx + '--item'"
      >

        <div
          data-test-TableCell
          class="TableCell"
          v-for="(itemAttr, idx) in item"
          :key="idx + '--cell'"
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
  },

  data() {
    return {
      sortKey: null,
      sortType: null,
      reverse: false
    }

  },

  created() {
    //
  },

  computed: {

    headers() {
      let items = this.items ? this.items : [];
      let headers = items.length ? Object.keys(items[0]) : [];
      let result = [];

      headers.forEach(header => {
        let data = items[0] ? items[0][header] : 'string'
        let type = typeof data

        result.push({
          header,
          type
        })
      })

      return result;
    },

    sortedItems() {
      let items = this.items ? this.items : []
      const sortKey = this.sortKey
      const sortType = this.sortType
      const reverse = this.reverse
      let result = items;

      if (sortType === 'number') {
        result = items.sort((a, b) => {
          return reverse ?  b[sortKey] - a[sortKey] : a[sortKey] - b[sortKey]
        })
      }

      if (sortType === 'string') {

        result = items.sort((a, b) => {
          var x = a ? a[sortKey].toLowerCase() : '';
          var y = b ? b[sortKey].toLowerCase() : '';

          if (reverse) {
            if (x > y) {return -1;}
            if (x < y) {return 1;}
          } else {
            if (x < y) {return -1;}
            if (x > y) {return 1;}
          }

          return 0;
        });

      }

      return result;
    }

  },

  methods: {

    sortTableBy(sortKey, sortType) {
      this.reverse = (this.sortKey == sortKey) ? ! this.reverse : false
      this.sortKey = sortKey
      this.sortType = sortType
    }

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
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  align-items: center;
  background-color: #6c7ae0;
  color: #fff;
}

.HeaderCell {
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
