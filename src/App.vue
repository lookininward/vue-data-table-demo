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
</style>
