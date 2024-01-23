<template>
   <div class="chart-list">
      <div v-for="index in 16" :id="'chart-'+index" class="chart">
      </div>
   </div>
</template>
<script setup>
import * as echarts from 'echarts';
import { DataImport } from '../../api/dataimport.js';
import { ECHART_COMMON_COLOR } from "../../assets/common.js";
let chartData = [];
onMounted(()=>{
   const jobname = localStorage.getItem("dataImportResult")||'test';
   DataImport.DataChart(jobname).then(res=>{
      console.log(res.data.content);
      chartData = res.data.content;
      for(let i=0;i<chartData.length;i++){
         initChart(chartData[i],i+1);
      }
   })
})
const initChart = (data,index)=>{
   let chart = echarts.init(document.getElementById('chart-'+index));
   let rectOption = {
      title: {
         text: data.name,
         left: 'center',
      },
      color: ECHART_COMMON_COLOR,
      xAxis: {
         name: '数据',
         scale: true,
      },
      yAxis: {
         name:"频次",
         max: 100,
         min: 0,
      },
      toolbox: {
         feature: {
            dataZoom: {
               yAxisIndex: 'none'
            },
            dataView: {},
            saveAsImage: {
               type: "png",
               title: "Save as PNG",
            },
         }
      },
      series: [
         {
            data: data.f_list,
            type: 'custom',
            color: ECHART_COMMON_COLOR[index%6],
            renderItem: (params, api) => {
               let yVlaue = api.value(2);
               let start = api.coord([api.value(0), yVlaue]);
               let size = api.size([api.value(1) - api.value(0), yVlaue]);
               let style = api.style();
               return {
                  type: 'rect',
                  shape: {
                     x: start[0],
                     y: start[1],
                     width: size[0],
                     height: size[1],
                  },
                  style,
               }
            },
            label: {
               show: true,
               position: 'top',
            },
            dimensions: ['from', 'to', 'data'],
            encode: {
               x: [0, 1],
               y: 2,
               tooltip: [0, 1, 2],
            },
         }
      ],
      tooltip: {
         formatter: function (params) {
            return (
               '<li>from: ' +
               params.data[0].toFixed() + '</li>' +
               '<li>to: ' +
               params.data[1].toFixed() + '</li>'
            );
         }
      }
   };
   chart.setOption(rectOption);
}
</script>
<style lang="scss" scoped>
.chart-list{
   display: flex;
   flex-wrap: wrap;
   justify-content: space-around;
   width: 100%;
   overflow: auto;
   .chart{
      width: 400px;
      height: 300px;
      border: 1px solid #ccc;
      margin-top: 8px;
   }
}

</style>