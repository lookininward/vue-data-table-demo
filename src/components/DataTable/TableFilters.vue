<!-- Template ---------------------------------------------------------------->
<template>
  <div
    data-test-component="TableFilters"
    class="data-filters"
  >

    <!-- Search -------------------------------->
    <input
      data-test-input="Search"
      ref="SearchComponent"
      type="text"
      v-bind:value="searchText"
      v-on:input="updateValue($event.target.value)"
      class="input input--search"
      placeholder="Search"
    >

    <!-- Filters ------------------------------->
    <div
      data-test-component="Filters"
      ref="Filters"
      class="filter-options"
    >
      <i class="fas fa-sliders-h"></i>
      <i class="fas fa-filter"></i>
    </div>
  </div>
</template>

<!-- Script ------------------------------------------------------------------>
<script>
  export default {
    name: 'TableFilters',

    props: {
     searchText: { type: String }
   },

    mounted() {
      let refs = this.$refs
      refs.SearchComponent.focus()
    },

    methods: {

     updateValue: function (value) {
        this.$emit('input', value)
      }

    }

  }
</script>

<!-- Style ------------------------------------------------------------------->
<style scoped lang="scss">

  //-- Grid Row 2 -------------------------------
  .data-filters {
    display: flex;
    border-top: 1px solid $bdr-color--light2;
  }

  .data-filters .input.input--search {
    display: grid;
    border: none;
    border-right: 1px solid $bdr-color--light2;
    background-color: $bg-color--light;
    font-size: $font-lg;
    color: $txt-color--dark;
    padding: 5px 20px;
    outline: 0;
  }

  .data-filters .filter-options {
    display: flex;
    align-items: center;
    padding: 0 20px;

    i {
      margin-right: 15px;
      cursor: pointer;
    }

  }
</style>
