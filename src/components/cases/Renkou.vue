<template>
  <n-card title="人口统计学信息统计" style="width: 700px" size="huge">
    <template #header-extra>
    </template>
    <n-space vertical>
      <n-space justify="space-evenly">
        <n-statistic label="男性患者">
          47.9%
        </n-statistic>
        <n-statistic label="女性患者">
          52.1%
        </n-statistic>
      </n-space>
      <n-space justify="space-evenly">
        <n-statistic label="平均入院年龄">
          65.82 岁
        </n-statistic>
        <n-statistic label="平均死亡年龄">
          72.85 岁
        </n-statistic>
      </n-space>
    </n-space>
  </n-card>
</template>
<script setup>
</script>