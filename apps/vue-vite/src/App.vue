<script setup>
import Survey from './components/Survey.vue';
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark">
      <div class="container-fluid">
        <a class="navbar-brand" href="#">DTNA</a>
        <picture>
          <img src="src/assets/sxsw-logo-black.svg" class="img-fluid sxsw-logo" alt="SXSW Logo">
        </picture>
      </div>
    </nav>
  </header>
  <div class="container">
    <Survey />
  </div>
  <footer class="fixed-bottom py-4 bg-dark text-white-50">
    <div class="container text-center">
      <small>Copyright &copy; Daimler Truck North America LLC. Privacy Statement, Legal Notices and Terms.</small>
      <small>All rights reserved. Daimler Truck North America LLC is a Daimler company.</small>
    </div>
  </footer>
</template>

<style lang="scss">
  .bg-black-transparent {
    background: rgb(0 0 0 / 50%);
  }

  .sxsw-logo {
    max-width: 190px;
    height: 50px;
  }
</style>
