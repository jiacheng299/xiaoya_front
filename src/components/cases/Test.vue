<template>
  <v-chart class="chart" :option="option" autoresize />
</template>

<script setup>
import { use } from "echarts/core";
import { CanvasRenderer } from "echarts/renderers";
import { PieChart } from "echarts/charts";
import {
  TitleComponent,
  TooltipComponent,
  LegendComponent,
} from "echarts/components";
import VChart, { THEME_KEY } from "vue-echarts";
import { ref, provide } from "vue";

use([
  CanvasRenderer,
  PieChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
]);

// provide(THEME_KEY, "dark");

const option = ref({
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c} ({d}%)",
  },
  legend: {
    orient: "horizontal", // 图例的排列方向为水平
    left: "center", // 图例相对于容器左侧的位置为居中
    top: "bottom", // 图例相对于容器上方的位置为底部
    data: ["Direct", "Email", "Ad Networks", "Video Ads", "Search Engines"], // 图例的数据项数组
  },
  series: [
    {
      name: "Traffic Sources", // 系列名称
      type: "pie", // 图表类型为饼图
      radius: "55%", // 饼图的半径，支持百分比和像素值
      center: ["50%", "60%"], // 饼图的中心坐标，支持百分比和像素值
      data: [
        // 数据项数组
        { value: 335, name: "Direct" }, // 第一组数据项
        { value: 310, name: "Email" }, // 第二组数据项
        { value: 234, name: "Ad Networks" }, // 第三组数据项
        { value: 135, name: "Video Ads" }, // 第四组数据项
        { value: 1548, name: "Search Engines" }, // 第五组数据项
      ],
      emphasis: {
        // 高亮（强调）样式
        itemStyle: {
          // 图形样式
          shadowBlur: 10, // 阴影的模糊程度
          shadowOffsetX: 0, // 阴影在水平方向上的偏移量
          shadowColor: "rgba(0, 0, 0, 0.5)", // 阴影的颜色
        },
      },
    },
  ],
});
</script>

<style scoped>
.chart {
  height: 300px;
}
</style>
