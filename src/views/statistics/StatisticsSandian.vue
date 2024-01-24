<template>
  <div ref="chartContainer" style="width: 600px; height: 400px"></div>
</template>

<script>
import * as echarts from "echarts";
import { onMounted } from "vue";
import datalist from "../../assets/dataset-statistics.json";
export default {
  setup() {
    const chartContainer = ref(null);
    const healthList = [
      "Very Very Healthy",
      "Very Healthy",
      "High",
      "Midlle",
      "Low",
      "Very Low",
    ];
    onMounted(() => {
      // 基于准备好的dom，初始化echarts实例
      const myChart = echarts.init(chartContainer.value);

      // 定义数据
      // const data = [
      //   [],
      //   [],
      //   [
      //     [10, 20],
      //     [30, 50],
      //     [40, 80],
      //   ],
      //   [
      //     [60, 40],
      //     [90, 70],
      //   ],
      //   [
      //     [65, 30],
      //     [95, 50],
      //   ],

      // ];
      const data = datalist.data_var.data;
      // 配置项
      const option = {
        xAxis: {
          name: "temp",
          nameTextStyle: {
            color: "red", // x轴名称颜色为红色
          },
          axisLine: {
            lineStyle: {
              color: "green", // x轴轴线颜色为绿色
            },
          },
        },
        yAxis: {
          name: "temp",
          nameTextStyle: {
            color: "red", // y轴名称颜色为红色
          },
          axisLine: {
            lineStyle: {
              color: "green", // y轴轴线颜色为绿色
            },
          },
          axisLabel: {
            formatter: "{value} %", // 将刻度值乘以100并添加 % 符号
          },
        },
        series: data.map((colorPoints, index) => ({
          symbolSize: 4,
          data: colorPoints,
          type: "scatter",
          name: `${healthList[index]}`,
        })),
        legend: {
          type: "scroll",
          orient: "vertical",
          right: 10,
          top: 10,
          bottom: 10,
          data: data.map((_, index) => `${healthList[index]}`),
        },
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    });

    return {
      chartContainer,
    };
  },
};
</script>
