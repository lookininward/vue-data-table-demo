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
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: .85rem;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

h3 {
  margin: 0;
}

input[type='checkbox'] {
  cursor: pointer;
}
</style>
