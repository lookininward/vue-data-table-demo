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
        data-test-btn="editItem"
        class="row-dropdown-option"
      >
        Edit
      </div>

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

div.tippy-tooltip.row-dropdown-theme {
  padding: 0;
  background-color: #fff;
  border: 0 solid rgba(0, 0, 0, .15);
  box-shadow: 0 50px 100px rgba(50, 50, 93, .1),
              0 15px 35px rgba(50, 50, 93, .15),
              0 5px 15px rgba(0, 0, 0, .1);
}

.row-dropdown {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  background-color: #fff;
  min-width: 100px;
  max-width: 100px;
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: .85rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.row-dropdown-option {
  width: 100%;
  padding: 5px 10px;
  background-color: #fff;
  color: #000;
  cursor: pointer;

   &:hover {
    background-color: #f6f9fc;
  }
}
</style>
