<!-- Template ---------------------------------------------------------------->
<template>
  <div
    data-test-component="TableCell"
    class="table-cell"
  >
    <template v-if="isEditing">
      <textarea
        data-test-input="textarea"
        class="table-cell-textarea"
        v-model="newValue"
      >
      </textarea>

      <div class="table-cell-actions">
        <button
          data-test-btn="cancelUpdateField"
          class="btn"
          @click="isEditing=false"
        >
          Cancel
        </button>
        <button
          data-test-btn="updateField"
          class="btn btn--confirm"
          @click="submit()"
        >
          Save
        </button>
      </div>
    </template>

    <template v-else>
      {{ itemAttr}}
      <div
        data-test-btn="editField"
        v-if="isEditable"
        class="btn btn--edit"
        @click="isEditing=true"
      >
        Edit
      </div>
    </template>

  </div>
</template>

<!-- Script ------------------------------------------------------------------>
<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'TableCell',

    props: {
      item: { type: Object },
      itemAttr: { type: [String, Number] }
    },

    data() {
      return {
        isEditing: false,
        newValue: this.itemAttr
      }
    },

    computed: {

      isEditable() {
        return this.item['description'] == this.itemAttr
      }

    },

    methods: {
      ...mapActions([
        'editItem'
      ]),

      submit() {
        this.editItem({item : this.item, newValue: this.newValue})
        this.isEditing = false
      }
    }

  }
</script>

<!-- Style ------------------------------------------------------------------->
<style lang="scss">
  .table-cell {
    position: relative;
    display: grid;
    grid-template-columns: 1fr;
    border-bottom: 1px solid $bdr-color--light;
    padding: 5px 10px;
    font-size: 0.7rem;
    text-align: left;

    @media screen and (min-width: $screen-width-sm) {
      align-items: center;
      padding: 10px;
      font-size: inherit;
      text-align: center;
    }

    .table-cell-actions {
      display: grid;
      grid-template-columns: 1fr 1fr;
      align-items: center;

      .btn {
        margin: 0 5px;
      }
    }

    .btn.btn--edit {
      display: none;
      position: absolute;
      top: 5px;
      right: 5px;
    }

    &:hover {
      .btn.btn--edit {
        display: flex;
      }
    }

    .table-cell-textarea {
      @include fontStandard();
      background-color: $bg-color--light;
      border: 1px solid $bdr-color--light;
      border-radius: 5px;
      padding: 10px;
      margin-bottom: 10px;
      outline: 0;
    }
  }
</style>
