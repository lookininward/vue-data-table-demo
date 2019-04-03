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
