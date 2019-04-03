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
