<!-- Template ---------------------------------------------------------------->
<template>
  <div
    data-test-component="rowPopover"
    class="table-cell table-cell--rowPopover"
  >
    <div
      data-test-popover="rowPopover"
      v-bind:id="`item-${item.id}`"
      class="row-popover"
      v-tippy-html
    >
      <div
        data-test-btn="deleteItem"
        class="row-popover-option"
        @click="deleteItem(item.id)"
      >
        Delete
      </div>
    </div>

    <i
      data-test-btn="popoverTrigger"
      class="fas fa-ellipsis-v"
      v-tippy="{
        reactive: true,
        interactive : true,
        trigger : 'click',
        placement: 'right',
        html: `#item-${item.id}`,
        theme : 'popover',
        duration: 100
      }"
    >
    </i>
  </div>
</template>

<!-- Script ------------------------------------------------------------------>
<script>
  import Vue from 'vue'
  import VueTippy from 'vue-tippy'
  import { mapActions } from 'vuex'

  export default {
    name: 'RowPopover',

    props: {
      item: { type: Object }
    },

    created() {
      Vue.use(VueTippy)
    },

    methods: {

      ...mapActions([
        'deleteItem'
      ])

    }

  }
</script>

<!-- Style ------------------------------------------------------------------->
<style scoped lang="scss">
  .table-cell.table-cell--rowPopover {
    @include flexCentered(column);
    padding: 0;
  }

  .table-cell.table-cell--rowPopover i {
    cursor: pointer;
  }
</style>
