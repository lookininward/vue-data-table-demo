<!-- Template ---------------------------------------------------------------->
<template>
  <DataTable
    v-bind:items=items
  />
</template>

<!-- Script ------------------------------------------------------------------>
<script>
import DataTable from '@/components/DataTable.vue'
import { mapState } from 'vuex'

export default {
  name: 'home',

  components: {
    DataTable
  },

  data() {
    return {
    }
  },

  mounted() {
    this.$store.dispatch('fetchData')
  },

  computed: {

    ...mapState([
      'items'
    ])

  }

}
</script>
