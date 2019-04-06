<!-- Template ---------------------------------------------------------------->
<template>
  <div
    data-test-component="TableFilters"
    class="data-filters"
  >

    <div
      class="logoSearch"
    >
      <!-- Logo ---------------------------------->
      <a
        class="logo is-active"
        href="https://lookininward.github.io/"
        target="_blank"
      >
        M | X
      </a>

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
    </div>

    <!-- Filters ------------------------------->
    <div
      data-test-component="Filters"
      ref="Filters"
      class="filter-options"
    >
      <div
        data-test-btn=""
        class="filter filter--one"
      >
        <i class="fas fa-sliders-h"></i>
      </div>
      <div
        data-test-btn=""
        class="filter filter--"
      >
        <i class="fas fa-filter"></i>
      </div>
      <div
        data-test-btn="listView"
        class="filter filter--listView"
        :class="listView ? 'is-active' : ''"
        @click="toggleListView()"
      >
        <i class="fas fa-list"></i>
      </div>

      <a
        class="filter filter--"
        href="https://github.com/lookininward/data-table"
        target="_blank"
      >
        <i class="fas fa-code"></i>
      </a>
      <a
        class="filter filter--"
        href="mailto:vinoth.michaelxavier@gmail.com"
        target="_blank"
      >
        <i class="far fa-envelope"></i>
      </a>
    </div>
  </div>
</template>

<!-- Script ------------------------------------------------------------------>
<script>
  export default {
    name: 'TableFilters',

    props: {
     searchText: { type: String },
     listView: { type: Boolean }
   },

    mounted() {
      let refs = this.$refs
      refs.SearchComponent.focus()
    },

    methods: {

     updateValue: function (value) {
        this.$emit('input', value)
      },

      toggleListView() {
        this.$emit('toggleListView')
      }

    }

  }
</script>

<!-- Style ------------------------------------------------------------------->
<style scoped lang="scss">

  //-- Grid Row 2 -------------------------------
  .data-filters {
    display: grid;
    grid-template-rows: 1fr 1fr;
    border-top: 1px solid $bdr-color--light2;

    @media screen and (min-width: $screen-width-sm) {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr;
    }
  }

  .logoSearch {
    display: grid;
    grid-template-columns: 1fr 4fr;
    border-bottom: 1px solid $bdr-color--dark;

    @media screen and (min-width: $screen-width-sm) {
      grid-template-columns: .25fr 1fr;
      border-bottom: none;
    }
  }

  .logo {
    @include flexCentered(column);
    @include activeState();
    font-size: $font-lg;
    font-weight: 600;
    text-decoration: none;
  }

  .data-filters .input.input--search {
    display: grid;
    border: none;
    border-right: 1px solid $bdr-color--light2;
    background-color: $bg-color--light;
    font-size: $font-md;
    color: $txt-color--dark;
    padding: 0px 20px;
    outline: 0;

    @media screen and (min-width: $screen-width-sm) {
      font-size: $font-lg;
      padding: 0 28px;
    }
  }

  .data-filters .filter-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(0px, 1fr));
    align-items: center;
    padding: 0;


    @media screen and (min-width: $screen-width-sm) {
      grid-template-columns: repeat(auto-fit, minmax(0px, 50px));
    }
  }

  .filter {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    @include hoverState();
    font-size: $font-md;
    color: $txt-color--dark;
    text-decoration: none;
    transition: all .2s;
  }

  .filter.filter--listView {
    @include activeState();

    @media screen and (min-width: $screen-width-sm) {
      display: none;
    }
  }
</style>
