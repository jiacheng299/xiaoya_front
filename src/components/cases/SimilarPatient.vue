<template>
  <div class="card" style="width: 900px">
    <h3>TOP6相似病人列表</h3>
    <el-table :data="similarPatients" style="width: 900px" height="320px">
      <el-table-column prop="gender" label="TOP6相似病人列表" />
      <el-table-column prop="disease" label="原发疾病" />
      <el-table-column prop="symptoms" label="基础病症" />
      <el-table-column prop="admissionAge" label="入院年龄" />
      <el-table-column prop="deathAge" label="死亡年龄" />
      <el-table-column prop="causeOfDeath" label="死因" />
      <el-table-column prop="similarVisitPeriod" label="相似就诊时间段" />
      <el-table-column prop="similarityIndex" label="相似度指数" />
    </el-table>
  </div>
</template>

<script setup>
import {} from "vue";
let similarPatients = [
  {
    gender: "男",
    disease: "高血压",
    symptoms: ["头痛", "眩晕"],
    admissionAge: 60,
    deathAge: 75,
    causeOfDeath: "心脏病",
    similarVisitPeriod: "2010-2015",
    similarityIndex: 0.8,
  },
  {
    gender: "女",
    disease: "糖尿病",
    symptoms: ["多饮", "多尿"],
    admissionAge: 45,
    deathAge: 65,
    causeOfDeath: "肾衰竭",
    similarVisitPeriod: "2005-2010",
    similarityIndex: 0.6,
  },
  {
    gender: "男",
    disease: "高血压",
    symptoms: ["头痛", "眩晕"],
    admissionAge: 60,
    deathAge: 75,
    causeOfDeath: "心脏病",
    similarVisitPeriod: "2010-2015",
    similarityIndex: 0.8,
  },
  {
    gender: "女",
    disease: "糖尿病",
    symptoms: ["多饮", "多尿"],
    admissionAge: 45,
    deathAge: 65,
    causeOfDeath: "肾衰竭",
    similarVisitPeriod: "2005-2010",
    similarityIndex: 0.6,
  },
  {
    gender: "男",
    disease: "高血压",
    symptoms: ["头痛", "眩晕"],
    admissionAge: 60,
    deathAge: 75,
    causeOfDeath: "心脏病",
    similarVisitPeriod: "2010-2015",
    similarityIndex: 0.8,
  },
  {
    gender: "女",
    disease: "糖尿病",
    symptoms: ["多饮", "多尿"],
    admissionAge: 45,
    deathAge: 65,
    causeOfDeath: "肾衰竭",
    similarVisitPeriod: "2005-2010",
    similarityIndex: 0.6,
  },
  // 其他病人的信息
];
</script>

<style lang="scss" scoped>
h3 {
  padding: 20px;
}
</style>
