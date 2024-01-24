<template>
  <div class="clear">
    <div class="main">
      <Header />
      <div class="patientDetail">
        <PatientDetail />
      </div>
      <div class="similarPatient">
        <SimilarPatient />
      </div>
      <div class=""></div>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import {} from "vue";
import PatientDetail from "../components/cases/PatientDetail.vue";
import SimilarPatient from "../components/cases/SimilarPatient.vue";
</script>

<style lang="scss" scoped>
.clear {
  height: 100%;
}

.main {
  // margin-top: 16px;
  display: flex;
  justify-content: space-around;
  flex-direction: column;

  overflow: hidden;
  background-color: #eff7f8;
  height: calc(100vh);
}
.patientDetail {
  display: flex;

  margin-left: 200px;
  height: auto;
}
.similarPatient {
  margin-top: 50px;
  margin-left: 200px;
}
</style>
