<script setup>
import Ratings from "@/components/cases/Ratings.vue";
import PatientDetail from "@/components/cases/PatientDetail.vue";
import AIAdvice from "@/components/cases/AIAdvice.vue";
import SimilarPatients from "@/components/cases/SimilarPatients.vue";
import Endings from "@/components/cases/TreatmentOutcomes.vue";
import Renkou from "@/components/cases/Renkou.vue";
</script>

<template>
  <!--每一行宽度和为1400-->
  <n-flex justify="center">
    <n-flex vertical>
      <patient-detail />
    </n-flex>
    <n-flex vertical>
      <a-i-advice />
    </n-flex>
  </n-flex>
  <n-divider dashed> </n-divider>
  <n-flex justify="center">
    <similar-patients />
    <endings />
  </n-flex>
  <div style="height: 20px"></div>
  <n-flex justify="center">
    <ratings />
    <renkou />
  </n-flex>
</template>

<style scoped lang="scss"></style>
