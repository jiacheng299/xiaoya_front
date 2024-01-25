<script setup>
import Ratings from "@/components/cases/Ratings.vue";
import PatientDetail from "@/components/cases/PatientDetail.vue";
import AIAdvice from "@/components/cases/AIAdvice.vue";
import SimilarPatients from "@/components/cases/SimilarPatients.vue";
import Endings from "@/components/cases/TreatmentOutcomes.vue";
import Renkou from "@/components/cases/Renkou.vue";
import CaseDataAnalyse from "@/components/cases/CaseDataAnalyse.vue";
import DataAnalyse from "@/views/DataAnalyse.vue";
</script>

<template>
  <!--每一行宽度和为1400-->
  <n-flex justify="center">
    <n-flex vertical>
      <patient-detail />
      <a-i-advice />
    </n-flex>

      <case-data-analyse/>

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

<!--  <data-analyse/>-->
</template>

<style scoped lang="scss"></style>
