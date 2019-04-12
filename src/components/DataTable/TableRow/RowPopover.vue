<!-- Template ---------------------------------------------------------------->
<template>
  <div
    data-test-component="rowPopover"
    class="table-cell"
  >
    <div
      data-test-popover="rowPopover"
      v-bind:id="`item-${item.id}`"
      class="popover"
      v-tippy-html
    >
      <div class="popover-options-list">
        <div class="popover-option is-disabled">Edit</div>
        <div
          data-test-btn="deleteItem"
          class="popover-option"
          @click="deleteItem(item.id)"
        >
          Delete
        </div>
        <hr class="popover-options-divider">
        <div class="popover-option is-disabled">Share</div>
      </div>
    </div>
    <i
      data-test-btn="popoverTrigger"
      class="fas fa-ellipsis-v popoverTrigger"
      v-tippy="{
        reactive: true,
        interactive : true,
        trigger : 'click',
        placement: 'right-end',
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
      item: Object
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
