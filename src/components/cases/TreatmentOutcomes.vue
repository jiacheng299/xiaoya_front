<template>
  <n-card title="治疗结局统计" style="width: 500px;  border-radius: 10px;" size="huge">
    <template #header-extra><h3>治疗结局统计</h3> </template>
    <n-list hoverable clickable style="max-height: 300px; overflow-y: auto">
      <n-list-item v-for="item in items">
        <span class="cause">{{ item.cause }}</span>
        <span class="odds">{{ item.odds }}</span
        ><br />
        <span class="number">{{ item.number }}</span>
      </n-list-item>
    </n-list>
  </n-card>
</template>
<script setup>
let items = [
  {
    cause: "多脏器功能衰竭",
    odds: "11.83%",
    number: "20人",
  },
  {
    cause: "多脏器功能衰竭",
    odds: "11.83%",
    number: "20人",
  },
  {
    cause: "多脏器功能衰竭",
    odds: "11.83%",
    number: "20人",
  },
  {
    cause: "多脏器功能衰竭",
    odds: "11.83%",
    number: "20人",
  },
  {
    cause: "多脏器功能衰竭",
    odds: "11.83%",
    number: "20人",
  },
  {
    cause: "多脏器功能衰竭",
    odds: "11.83%",
    number: "20人",
  },
  {
    cause: "多脏器功能衰竭",
    odds: "11.83%",
    number: "20人",
  },
  {
    cause: "多脏器功能衰竭",
    odds: "11.83%",
    number: "20人",
  },
];
</script>
<style scoped>
.cause {
  font-weight: bold;
}
.odds {
  color: rgb(227, 49, 49);
  margin-left: 300px;
}
.number {
  color: rgb(128, 128, 128);
}
</style>
