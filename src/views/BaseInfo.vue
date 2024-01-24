<template>
  <div class="clear">
    <div class="main">
      <Header />
      <div class="patientDetail">
        <PatientDetail />
      </div>
      <div class=""></div>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import {} from "vue";
import PatientDetail from "../components/cases/PatientDetail.vue";
</script>

<style lang="scss" scoped>
.clear {
  height: 100%;
}

.main {
  // margin-top: 16px;
  display: flex;
  justify-content: space-around;
  overflow: hidden;
  background-color: #eff7f8;
  height: calc(100vh);
}
.patientDetail {
  display: flex;
  margin-top: 100px;
  margin-right: 1000px;
  height: auto;
}
</style>
