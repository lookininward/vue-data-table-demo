<!-- Template ---------------------------------------------------------------->
<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<!-- Style ------------------------------------------------------------------->
<style lang="scss">

  body {
    margin: 0;
    padding: 0;
    overflow: hidden;
  }

  #app {
    @include fontStandard();
    user-select: none;
  }

  h3 {
    margin: 0;
  }

  input[type='checkbox'] {
    cursor: pointer;
  }

  // Breakout UI components
  //-- Buttons ----------------------------------
  .btn {
    min-width: 20px;
    background-color: $bg-color--light;
    border: 1px solid $bdr-color--light;
    border-radius: 10px;
    padding: 3px 5px;
    font-size: $font-sm;
    cursor: pointer;
    outline: 0;
    transition: all .2s;
    @include hoverState();
    @include activeState();
  }

  .btn.btn--confirm {
    &:hover {
      background-color: $bg-color--green;
      color: $txt-color--light;
    }
  }

  .btn.btn--pageNumber {
    margin: 0 2px;
    padding: 2px 10px;

    &:last-child {
      margin: 0 0 0 2px;
    }
  }

  //-- Inputs -----------------------------------
  i.input.input--checkbox {
    font-size: $font-lg;
    cursor: pointer;

    @media screen and (min-width: $screen-width-sm) {
      margin: 2px;
    }
  }

  //-- Popovers ---------------------------------
  .popover-theme {
    @include tippyBaseTheme();
  }

  .popover {
    @include fontStandard();
    text-align: left;
    background-color: $bg-color--light;
    color: $txt-color--dark;
  }

  .popover.popover--standard {
    @include fontStandard();
    text-align: left;
    padding: 10px 15px;
    background-color: $bg-color--light;
    color: $txt-color--dark;
  }

  .popover-options-list {
    .popover-option {
      width: 100%;
      padding: 3px 8px;
      @include activeState();
      @include hoverState();
      cursor: pointer;
    }
  }
</style>
