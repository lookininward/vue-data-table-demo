<!-- Template ---------------------------------------------------------------->
<template>
  <div
    data-test-component="ProjectInfo"
    class="project-info"
  >
    <h3>Data Component Challenge</h3>
    <div class="project-links">
      <div class="project-link-item">
      Vinoth Michael Xavier
      </div>
      <a
        class="project-link-item"
        href="https://github.com/lookininward/data-table"
        target="_blank"
      >
        <i class="fab fa-github"></i>
      </a>
      <a
        class="project-link-item"
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
    name: 'ProjectInfo'
  }
</script>

<!-- Style ------------------------------------------------------------------->
<style scoped lang="scss">

  //-- Grid Row 1 -------------------------------
  .project-info {
    @include flexCentered(column);
    align-items: flex-start;
    padding: 0 20px;
  }

  .project-links {
    display: flex;
  }

  .project-link-item {
    margin-right: 8px;
  }
</style>
