<!-- Template ---------------------------------------------------------------->
<template>
  <div
    data-test-component="TableRowDropdown"
    class="table-cell table-cell--dropdownTrigger"
  >
    <div
      v-bind:id="`item-${item.id}`"
      class="row-dropdown"
      v-tippy-html
    >
      <div class="row-dropdown-header">
        {{ item.name }}
      </div>
      <div class="row-dropdown-option">
        Edit
      </div>

      <div
        class="row-dropdown-option"
        @click="deleteItem(item.id)"
      >
        Delete
      </div>
    </div>

    <i
      class="fas fa-ellipsis-v"
      v-tippy="{
        reactive: true,
        interactive : true,
        trigger : 'click',
        placement: 'right',
        html: `#item-${item.id}`,
        theme : 'row-dropdown'
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
}


.row-dropdown-header {
  padding: 5px 8px;
  background-color: #f6f9fc;
  color: #000;
}

.row-dropdown-option {
  padding: 5px 8px;
  background-color: #fff;
  color: #000;
  cursor: pointer;

  &:hover {
    background-color: #f6f9fc;
  }
}
</style>
