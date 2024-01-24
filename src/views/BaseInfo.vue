<template>
  <div class="clear">
    <div class="main">
      <Header/>
      <!--      <div class="patientDetail">-->
      <!--        <PatientDetail />-->
      <!--      </div>-->
      <!--      <div class=""></div>-->
      <div class="contain">
        <container/>
      </div>
      <Footer/>
    </div>
  </div>
</template>

<script setup>
import {} from "vue";
import PatientDetail from "../components/cases/PatientDetail.vue";
import Container from "@/components/cases/Container.vue";
</script>

<style lang="scss" scoped>
.contain{
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
  margin-top: 100px;
  margin-right: 1000px;
  height: auto;
}
</style>
