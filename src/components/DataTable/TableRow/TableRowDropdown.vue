<!-- Template ---------------------------------------------------------------->
<template>
  <div
    data-test-component="TableRowDropdown"
    class="table-cell table-cell--dropdownTrigger"
  >
    <div
      v-bind:id="`item-${item.ID}`"
      class="row-dropdown"
      style="display: none;"
      v-tippy-html
    >
      <div class="row-dropdown-header">
        {{ item.Name }}
      </div>
      <div class="row-dropdown-option">
        Edit
      </div>

      <div class="row-dropdown-option">
        Delete
      </div>
    </div>

    <i
      class="fas fa-ellipsis-v"
      v-tippy="{
        reactive: false,
        interactive : true,
        trigger : 'click',
        placement: 'right',
        html: `#item-${item.ID}`,
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

export default {
  name: 'TableRow',

  props: {
    item: { type: Object }
  },

  created() {
    Vue.use(VueTippy)
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
