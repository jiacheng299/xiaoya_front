<template>
  <div class="clear">
    <div class="main">
      <Header />
      <!--      <div class="patientDetail">-->
      <!--        <PatientDetail />-->
      <!--      </div>-->
      <!--      <div class=""></div>-->
      <div class="contain">
        <container />
      </div>
      <Footer />
    </div>
  </div>
</template>

<script setup>
import {} from "vue";
import Header from '../components/layout/Header.vue';
import Footer from '../components/layout/Footer.vue';
import PatientDetail from "../components/cases/PatientDetail.vue";
import Container from "@/components/cases/Container.vue";
</script>

<style lang="scss" scoped>
.contain {
  padding: 30px;
}
.clear {
  height: 100%;
}

.main {
  // margin-top: 16px;
  background-color: #eff7f8;
  min-height: calc(100vh);
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
