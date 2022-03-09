<script setup>
import Survey from './components/Survey.vue';
</script>

<template>
  <header>
    <nav class="navbar navbar-dark bg-dark">
      <div class="container">
        <a class="navbar-brand" href="https://daimler-trucksnorthamerica.com">
          <img src="/DTNA_Daimler_Truck_white.svg" class="img-fluid dt-logo" alt="Daimler Trucks Logo">
        </a>
        <div class="sxsw-container">
          <div class="wrapper">
            <img src="/sxsw-logo-black.svg" class="img-fluid sxsw-logo" alt="SXSW Logo">
            <small class="sxsw-text">2022</small>
          </div>
        </div>
      </div>
    </nav>
  </header>
  <div class="container pt-5">
    <h1 class="survey-cta">COME WORK WITH US!</h1>
    <Survey />
  </div>
  <footer id="footer" class="mt-auto py-4 bg-dark text-white-75">
    <div class="container text-center">
      <small class="small">Copyright &copy; Daimler Truck North America LLC. Privacy Statement, Legal Notices and Terms.</small>
      <small class="small">All rights reserved. Daimler Truck North America LLC is a Daimler company.</small>
    </div>
  </footer>
</template>

<style lang="scss">
.bg-black-transparent {
  background: rgb(0 0 0 / 50%);
}

h1.survey-cta {
  font-size: 1.3em;
  font-weight: 600;
  padding-left: 10px;
}

.dt-logo {
  width: 175px;
  max-height: 50px;
  margin-left: 5px;
}

.wrapper {
  position: relative;
  top: 15px;
}

.sxsw-logo {
  min-width: 193px;
  height: 50px;
  position: absolute;
  right: 0;
  display: block;
}

.sxsw-text {
  position: relative;
  top: 49px;
  left: -15px;
}

.navbar.bg-dark {
  background: #000 !important;
  height: 80px;
}

footer.bg-dark {
  background: #000 !important;
}

#footer .small {
  font-size: 0.75em;
}
</style>
