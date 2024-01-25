<template>
  <n-card
    title="相似病人列表"
    style="width: 900px; border-radius: 10px"
    size="huge"
  >
    <template #header-extra><h3>TOP6相似病人列表</h3> </template>
    <n-data-table
      ref="table"
      :columns="columns"
      :data="formattedSimilarPatients"
    />
  </n-card>
</template>
<script setup>
let data = [
  {
    patient_id: 64,
    similarity: 99.99,
    age: 67,
    sex: 1,
    admission_date: "2020-02-05",
    discharge_date: "2020-02-18",
  },
  {
    patient_id: 217,
    similarity: 84.07,
    age: 51,
    sex: 1,
    admission_date: "2020-02-14",
    discharge_date: "2020-02-18",
  },
  {
    patient_id: 368,
    similarity: 79.54,
    age: 64,
    sex: 1,
    admission_date: "2020-02-10",
    discharge_date: "2020-02-18",
  },
  {
    patient_id: 245,
    similarity: 79.45,
    age: 61,
    sex: 1,
    admission_date: "2020-02-09",
    discharge_date: "2020-02-13",
  },
  {
    patient_id: 205,
    similarity: 75.23,
    age: 67,
    sex: 0,
    admission_date: "2020-02-10",
    discharge_date: "2020-02-18",
  },
  {
    patient_id: 116,
    similarity: 70.08,
    age: 69,
    sex: 0,
    admission_date: "2020-02-05",
    discharge_date: "2020-02-17",
  },
];
let similarPatients = ref(data);
const genderMap = {
  0: "男",
  1: "女",
};
let formattedSimilarPatients = computed(() => {
  return similarPatients.value.map((patient) => {
    const deathAge = patient.deathAge ? patient.deathAge : "-";
    const causeOfDeath = patient.causeOfDeath ? patient.causeOfDeath : "-";
    return {
      ...patient,
      sex: genderMap[patient.sex],
      similarVisitPeriod: `${patient.admission_date} - ${patient.discharge_date}`,
      deathAge: deathAge,
      causeOfDeath: causeOfDeath,
    };
  });
});
let columns = [
  {
    title: "性别",
    key: "sex",
    sorter(A, B) {
      const temp = { 男: 0, 女: 1 };
      return temp[A.sex] - temp[B.sex];
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
    key: "age",
    sorter(A, B) {
      return A.age - B.age;
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
      const dateA = new Date(rowA.admission_date);
      const dateB = new Date(rowB.admission_date);

      if (dateA < dateB) {
        return -1;
      } else if (dateA > dateB) {
        return 1;
      } else {
        return 0;
      }
    },
  },
  {
    title: "相似度指数",
    key: "similarity",
    sorter(A, B) {
      return A.similarity - B.similarity;
    },
  },
];
</script>
