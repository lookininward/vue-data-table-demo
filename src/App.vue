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
  }

  #app {
    @include fontStandard();
    user-select: none;
  }

  //-- Buttons ----------------------------------
  .btn {
    @include hoverState();
    @include activeState();
    min-width: 20px;
    background-color: $bg-color--light;
    border: 1px solid $bdr-color--light;
    border-radius: 10px;
    padding: 3px 5px;
    font-size: $font-sm;
    cursor: pointer;
    outline: 0;
    transition: all .2s;
  }

  .btn.btn--confirm {
    &:hover {
      background-color: $bg-color--green;
      color: $txt-color--light;
    }
  }

  //-- Inputs -----------------------------------
  i.input.input--checkbox {
    font-size: $font-lg;
    cursor: pointer;

    @media screen and (min-width: $screen-width-md) {
      margin: 2px;
    }
  }

  //-- Popovers ---------------------------------
  i.popoverTrigger {
    cursor: pointer;
  }

  .popover-theme {
    padding: 0;
    background-color: $bg-color--light;
    box-shadow: 0 50px 100px rgba(50, 50, 93, .1),
                0 15px 35px rgba(50, 50, 93, .15),
                0 5px 15px rgba(0, 0, 0, .1);
  }

  .popover {
    @include fontStandard();
    text-align: left;
    background-color: $bg-color--light;

    &.popover--standard {
      padding: 10px 15px;
    }
  }

  .popover-options-list {
    min-width: 100px;
  }

  .popover-option {
    @include activeState();
    @include hoverState();
    padding: 3px 8px;
    text-align: center;
    cursor: pointer;

    &.is-disabled {
      cursor: not-allowed;
    }
  }

  .popover-options-divider {
    margin: 0;
    border: 1px solid $bdr-color--light;
  }

</style>
