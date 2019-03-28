<!-- Template ---------------------------------------------------------------->
<template>
  <div class="DataTable">

    <!-- Header -------------------------------->
    <div class="TableHeader">
    </div>

    <!--Body ----------------------------------->
    <div class="TableBody">

      <div class="TableRow" v-for="item in items">

        <div class="TableCell">
          {{ item.id }}
        </div>

        <div class="TableCell">
          {{ item.name }}
        </div>

        <div class="TableCell">
          {{ item.description }}
        </div>

        <div class="TableCell">
          {{ item.date }}
        </div>

          <div class="TableCell">
            {{ item.amount }}
          </div>

      </div>

    </div>

    <!-- Footer -------------------------------->
    <div class="TableFooter">
    </div>

  </div>
</template>





<!-- Script ------------------------------------------------------------------>
<script>
export default {
  name: 'DataTable',
  props: {
    msg: String // data passed into this component
  },

  data() { // data originating from this component

    let items = [];

    for (let i = 0; i < 100; i++) {
      items.push({
        id: '3471DA17-401F-9633-BF81-4CADA6FD5C79',
        name: 'Kyra Lester',
        description: 'Curabitur dictum. Phasellus in',
        date: '2017-07-23T04:24:49-07:00',
        amount: '345.54'
      });

      items.push({
        id: '9F5C9912-936A-FB85-1EDB-9DA87BE7FF1E',
        name: 'Buckminster Alvarado',
        description: 'dui, in sodales elit erat vitae risus. Duis a mi',
        date: '2018-11-08T05:44:15-08:00',
        amount: '677.08'
      });

      items.push({
        id: 'B743AC82-3613-13A2-2E42-E0C1F5CBF8A6',
        name: 'Athena Smith',
        description: 'massa lobortis ultrices. Vivamus rhoncus.',
        date: '2018-11-11T06:19:57-08:00',
        amount: '73.67'
      });
    }

    return {
      items
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
  background-color: #6c7ae0;
}


//-- Body ---------------------------------------
.TableBody {
  display: grid;
  grid-template-rows: auto;
  overflow-y: auto;
}

.TableRow {
  display: grid;
  grid-template-columns: 20vw 20vw 20vw 20vw 20vw;
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
