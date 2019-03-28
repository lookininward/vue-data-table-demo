<!-- Template ---------------------------------------------------------------->
<template>
  <div class="home">
    <DataTable
      v-bind:items=items
    />
  </div>
</template>

<!-- Script ------------------------------------------------------------------>
<script>
import DataTable from '@/components/DataTable.vue'

export default {
  name: 'home',
  components: {
    DataTable
  },

  // data to be fetched in the Home route and passed to DataTable
  data() {
     let items = [];
     for (let i = 0; i < 100; i++) {
      items.push({
        id: '3471DA17-401F-9633-BF81-4CADA6FD5C79',
        name: 'Kyra Lester',
        description: 'Curabitur dictum. Phasellus in',
        date: '2017-07-23T04:24:49-07:00',
        amount: '345.54',
        secret: 'Monkey!!!'
      });
       items.push({
        id: '9F5C9912-936A-FB85-1EDB-9DA87BE7FF1E',
        name: 'Buckminster Alvarado',
        description: 'dui, in sodales elit erat vitae risus. Duis a mi',
        date: '2018-11-08T05:44:15-08:00',
        amount: '677.08',
        secret: 'Monkey!!!'
      });
       items.push({
        id: 'B743AC82-3613-13A2-2E42-E0C1F5CBF8A6',
        name: 'Athena Smith',
        description: 'massa lobortis ultrices. Vivamus rhoncus.',
        date: '2018-11-11T06:19:57-08:00',
        amount: '73.67',
        secret: 'Monkey!!!'
      });
    }

    return {
      items
    }
  }

}
</script>
