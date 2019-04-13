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
        data-test-logo
        class="logo is-active"
        href="https://lookininward.github.io/"
        target="_blank"
      >
        M | X
      </a>

      <!-- Search -------------------------------->
      <input
        data-test-input="searchText"
        ref="SearchComponent"
        type="text"
        v-bind:value="searchText"
        v-on:input="updateSearchText($event.target.value)"
        class="input input--search"
        placeholder="Search"
      >
    </div>

    <!-- Filters ------------------------------->
    <div
      data-test-filters
      class="filter-options"
    >

      <!-- Data Filters  -->
      <div
        data-test-btn="dataFiltersPopoverTrigger"
        class="filter filter--dataFilters"
        v-tippy="{
          reactive: true,
          interactive : true,
          trigger : 'click',
          placement: 'bottom',
          html: '#filters-popover',
          theme : 'popover',
          duration: 100
        }"
      >
        <i class="fas fa-filter"></i>
      </div>

      <div
        id="filters-popover"
        data-test-popover="filters"
        class="popover popover--standard"
        v-tippy-html
      >

        <!-- Items Per Page -->
        <div class="filter-section filter-section--perPage">
          <div class="filter-section-header">
            Items Per Page
          </div>
          <div>
            <select
              data-test-input="selectItemsPerPage"
              v-model="perPage"
              v-on:input="setPerPage($event.target.value)"
              class="input input--select"
            >
              <option
                v-bind:value="5"
              >
                5
              </option>
              <option
                v-bind:value="10"
              >
                10
              </option>
              <option
                v-bind:value="20"
              >
                20
              </option>
            </select>
          </div>
        </div>

        <!-- Filter Columns -->
        <div class="filter-section filter-section--dataColumns">
          <div class="filter-section-header">
            Data Columns
          </div>
          <label
            data-test-label="displayField"
            v-for="(dataField, idx) in dataFields"
            v-bind:key="idx"
            class="label label--dataColumnOption"
          >
            <input
              data-test-input="displayField"
              type="checkbox"
              :checked="!hiddenFields.includes(dataField)"
              @click="toggleField(dataField.field)"
            >
            {{ dataField.field }}
          </label>
        </div>
      </div>

      <!-- Quick Edit Mode  -->
      <div
        data-test-btn="toggleQuickEditMode"
        class="filter filter--quickEdit"
        :class="inQuickEdit ? 'is-active' : ''"
        @click="toggleQuickEdit()"
      >
        <i class="fas fa-list"></i>
      </div>

      <!-- Github Project Repo  -->
      <a
        class="filter"
        href="https://github.com/lookininward/data-table"
        target="_blank"
      >
        <i class="fas fa-code"></i>
      </a>

      <!-- Contact Vinoth Michael Xavier -->
      <a
        class="filter"
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
  import Vue from 'vue'
  import VueTippy from 'vue-tippy'

  export default {
    name: 'TableFilters',

    props: {
      searchText: String,
      dataFields: Array,
      hiddenFields: Array,
      perPage: Number,
      inQuickEdit: Boolean
    },

    created() {
      Vue.use(VueTippy)
    },

    mounted() {
      this.$refs.SearchComponent.focus()
    },

    methods: {

      updateSearchText: function (searchText) {
        this.$emit('input', searchText)
      },

      toggleField(field) {
        this.$emit('toggleDisplayField', field)
      },

      setPerPage: function (numItemsPerPage) {
        this.$emit('setItemsPerPage', parseInt(numItemsPerPage))
      },

      toggleQuickEdit() {
        this.$emit('toggleQuickEditMode')
      }

    }

  }
</script>

<!-- Style ------------------------------------------------------------------->
<style lang="scss">

  //-- Grid Row 2 -------------------------------
  .data-filters {
    display: grid;
    grid-template-rows: 1fr 1fr;
    border-top: 1px solid $bdr-color--light2;

    @media screen and (min-width: $screen-width-md) {
      grid-template-columns: 1fr 1fr;
      grid-template-rows: 1fr;
    }
  }


  //-- Logo + Search ----------------------------
  .logoSearch {
    display: grid;
    grid-template-columns: 1fr 4fr;
    border-bottom: 1px solid $bdr-color--dark;

    @media screen and (min-width: $screen-width-md) {
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

  .input.input--search {
    display: grid;
    border: none;
    border-right: 1px solid $bdr-color--light2;
    background-color: $bg-color--light;
    font-size: $font-md;
    color: $txt-color--dark;
    padding: 0px 20px;
    outline: 0;

    @media screen and (min-width: $screen-width-md) {
      font-size: $font-lg;
      padding: 0 15px 3px 15px;
    }
  }

  //-- Filter Options ---------------------------
  .filter-options {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(0px, 1fr));
    align-items: center;

    @media screen and (min-width: $screen-width-md) {
      grid-template-columns: repeat(auto-fit, minmax(0px, 50px));
    }
  }

  .filter {
    @include flexCentered(row);
    @include hoverState();
    width: 100%;
    height: 100%;
    cursor: pointer;
    font-size: $font-md;
    color: $txt-color--dark;
    text-decoration: none;
    transition: all .2s;
  }

  .filter-section {
    margin-bottom: 5px;
  }

  .filter-section-header {
    margin-bottom: 8px;
    font-weight: 600;
    cursor: default;
  }

  .filter-section.filter-section--dataColumns {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: repeat(auto-fit, minmax(0px, 1fr));

    .label.label--dataColumnOption {
      cursor: pointer;
    }
  }

  .filter-section.filter-section--perPage {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;

    .input.input--select {
      width: 100%;
      cursor: pointer;
      outline: 0;
    }
  }

  //-- List View --------------------------------
  .filter.filter--quickEdit {
    @include activeState();

    @media screen and (min-width: $screen-width-md) {
      display: none;
    }
  }
</style>
