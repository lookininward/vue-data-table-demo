<template>
  <div class="home">
    <DataTable
      header="Data Table"
    />
  </div>
</template>

<script>
import DataTable from '@/components/DataTable.vue'

export default {
  name: 'home',
  components: {
    DataTable
  }
}
</script>
