<template>
   <el-table :data="filterTableData" stripe style="width: 100%">
    <el-table-column prop="name" label="name" width="180" />
    <el-table-column prop="count" label="count"/>
    <el-table-column prop="missing" label="missing" />
    <el-table-column prop="mean" label="mean" />
    <el-table-column prop="max" label="max" />
    <el-table-column prop="min" label="min" />
    <el-table-column prop="median" label="median" />
    <el-table-column prop="std" label="std" />
  </el-table>
  <el-pagination class="pagination"
  layout="prev, pager, next" 
  :total="tableData.length"
  :page-size="20"
  @current-change="changeCurrentPage"
  />
</template>
<script setup>
import { DataImport } from '../../api/dataimport.js';
const tableData = ref([
  {
    id:0,
    name:"",
    count:0,
    missing:0,
    mean:0,
    max:0,
    min:0,
    median:0,
    std:0,
  }
])
const currentPage = ref(1);
onMounted(() => {
  let importResult = localStorage.getItem("dataImportResult")||'test';
  DataImport.DataAnalysis(importResult).then(res => {
    console.log(res.data.content);
    tableData.value = res.data.content;
  })
})
const changeCurrentPage = (val) => {
  currentPage.value = val;
}
const filterTableData = computed(() => {
  return tableData.value.slice((currentPage.value - 1) * 20, currentPage.value * 20);
})
</script>
<style scoped>
.pagination{
  margin:auto;
}
</style>