<!-- Template ---------------------------------------------------------------->
<template>
  <div
    data-test-component="TableRowDropdown"
    class="table-cell table-cell--dropdownTrigger"
  >
    <div
      data-test-dropdown="itemRow"
      v-bind:id="`item-${item.id}`"
      class="row-dropdown"
      v-tippy-html
    >
      <div
        data-test-btn="deleteItem"
        class="row-dropdown-option"
        @click="deleteItem(item.id)"
      >
        Delete
      </div>
    </div>

    <i
      data-test-btn="dropdownTrigger"
      class="fas fa-ellipsis-v"
      v-tippy="{
        reactive: true,
        interactive : true,
        trigger : 'click',
        placement: 'right',
        html: `#item-${item.id}`,
        theme : 'row-dropdown',
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
    name: 'TableRow',

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
<style lang="scss">
  .table-cell.table-cell--dropdownTrigger i {
    color: $txt-color--light2;
    cursor: pointer;

    &:hover {
      color: $txt-color--dark;
    }
  }

  .row-dropdown-theme {
    padding: 0;
    background-color: $bg-color--light;
    box-shadow: 0 50px 100px rgba(50, 50, 93, .1),
                0 15px 35px rgba(50, 50, 93, .15),
                0 5px 15px rgba(0, 0, 0, .1);
  }

  .row-dropdown {
    @include flexCentered(column);
    @include fontStandard();
    min-width: 100px;
    max-width: 100px;
  }

  .row-dropdown-option {
    width: 100%;
    padding: 5px 10px;
    background-color: $bg-color--light;
    cursor: pointer;

     &:hover {
      background-color: $color-black-1;
      color: $txt-color--light;
    }
  }
</style>
