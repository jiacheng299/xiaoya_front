<template>
  <n-card title="相似病人列表" style="width: 900px ;  border-radius: 10px;" size="huge">
    <template #header-extra><h3>TOP6相似病人列表</h3> </template>
    <n-data-table ref="table" :columns="columns" :data="similarPatients" />
  </n-card>
</template>
<script setup>
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
let columns = [
  {
    title: "性别",
    key: "gender",
    sorter(A, B) {
      const genderMap = { 男: 1, 女: 2 }; // 定义性别的顺序映射关系
      return genderMap[A.gender] - genderMap[B.gender];
    },
  },
  {
    title: "原发疾病",
    key: "disease",
  },
  {
    title: "基础病症",
    key: "symptoms",
  },
  {
    title: "入院年龄",
    key: "admissionAge",
    sorter(A, B) {
      return A.admissionAge - B.admissionAge;
    },
  },
  {
    title: "死亡年龄",
    key: "deathAge",
    sorter(A, B) {
      return A.deathAge - B.deathAge;
    },
  },
  {
    title: "死因",
    key: "causeOfDeath",
  },
  {
    title: "相似就诊时间段",
    key: "similarVisitPeriod",
    sorter(rowA, rowB) {
      const dateA = rowA.similarVisitPeriod.split("-"); // 将日期字符串分割为数组
      const dateB = rowB.similarVisitPeriod.split("-");

      if (dateA[0] != dateB[0]) {
        // 按照年份排序
        return parseInt(dateA[0]) - parseInt(dateB[0]);
      } else {
        // 年份相同，按照月份排序
        return parseInt(dateA[1]) - parseInt(dateB[1]);
      }
    },
  },
  {
    title: "相似度指数",
    key: "similarityIndex",
    sorter(A, B) {
      return A.similarityIndex - B.similarityIndex;
    },
  },
];
</script>
