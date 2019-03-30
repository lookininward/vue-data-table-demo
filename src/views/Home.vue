<!-- Template ---------------------------------------------------------------->
<template>
  <DataTable
    v-bind:items=items
  />
</template>

<!-- Script ------------------------------------------------------------------>
<script>
import DataTable from '@/components/DataTable.vue'

export default {
  name: 'home',

  components: {
    DataTable
  },

  data() {
    return {
      items: null
    }
  },

  created() {
    this.fetchData()
  },

  methods: {

    fetchData() {
      fetch('http://localhost:3000/items')
      .then(res => { return res.text() })
      .then(data => { this.items = JSON.parse(data) })
    }

  }

}
</script>
