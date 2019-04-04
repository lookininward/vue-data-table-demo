<!-- Template ---------------------------------------------------------------->
<template>
  <div
    data-test-component="TableCell"
  >
    <template v-if="isEditing">
      <textarea
        data-test-textarea
        class="cell-textarea"
        v-model="newValue"
      >
      </textarea>

      <div class="edit-actions">
        <button
          data-test-btn="cancelUpdateField"
          @click="isEditing=false"
        >
          Cancel
        </button>
        <button
          data-test-btn="updateField"
          @click="submit()"
        >
          Save
        </button>
      </div>

    </template>

    <template v-else>
      <div data-test-itemField>
        {{ itemAttr}}
      </div>
      <div
        data-test-btn="editField"
        v-if="isEditable"
        class="edit-field"
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
    display: grid;
    align-items: center;
    border-bottom: 1px solid $bdr-color--light;
    padding: 10px;
    position: relative;

    .edit-field {
      display: none;
      position: absolute;
      top: 5px;
      right: 5px;

      background-color: #fff;
      border: 1px solid $bdr-color--light;
      border-radius: 10px;
      padding: 3px 5px;
      font-size: $font-md;

      cursor: pointer !important;
    }

    &:hover {
      .edit-field {
        display: flex;
      }
    }

    .cell-textarea {
      border: none;
      outline: 0;
      padding: 10px;
      margin-bottom: 10px;
      @include fontStandard();
    }

    .edit-actions {
      display: flex;
      justify-content: center;

      button {
        margin: 0 5px;
      }
    }

  }

  .table-cell.table-cell--checkbox,
  .table-cell.table-cell--dropdownTrigger {
    @include flexCentered(column);
    padding: 0;
  }

  .table-cell.table-cell--dropdownTrigger i {
    color: $txt-color--light2;
    cursor: pointer;

    &:hover {
      color: $txt-color--dark;
    }
  }
</style>
