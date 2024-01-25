<template>
  <div class="analyse">
    <div class="feature">
      <div class="feature-title">
        当前重要指标：
      </div>
      <template v-for="(item) in currentKeyFeature">
        <button :class="{ 'btn-item': true, 'active': item.active }" @click="Select(item)">
          {{ item.name }}
        </button>
      </template>
      <div class="feature-title">
        其他指标：
      </div>
      <template v-for="(item) in otherKeyFeature">
        <button :class="{ 'btn-item': true, 'active': item.active }" @click="Select(item)">
          {{ item.name }}
        </button>
      </template>
    </div>
    <div class="curve">
      <div class="curve-header">
        <div class="curve-header-title">
          风险曲线
        </div>
        <div class="curve-header-btns">
          <button class="btn-item" @click="showRiskCurve = !showRiskCurve">
            {{ showRiskCurve ? '隐藏' : '显示' }}风险曲线
          </button>
          <button class="btn-item" @click="resetSelect">
            重置
          </button>
        </div>
      </div>
      <div class="curve-chart" id="riskCurveChart"></div>
    </div>
  </div>
</template>
<script setup>
import * as echarts from 'echarts';
import moment from 'moment';
import {onMounted, ref, watch} from 'vue';
import {Analysis} from '../api/analysis';
import featureImportance from '../assets/featureImportance.json';
import riskCurve from '../assets/riskCurve.json';
// 风险曲线
let riskCurveChart = null;
let riskCurveOption = null;
const riskCurveData = ref({});
// 当前重要指标
const currentKeyFeature = ref([]);
// 其他指标
const otherKeyFeature = ref([]);
// 选中指标
const selectedKeyFeature = ref([]);
const resetSelect = () => {
  currentKeyFeature.value.forEach((item) => {
    item.active = false;
  });
  otherKeyFeature.value.forEach((item) => {
    item.active = false;
  });
  selectedKeyFeature.value = [];
};
// 更改选中指标列表
const Select = (item) => {
  item.active = !item.active;
  if (item.active) {
    selectedKeyFeature.value.push(item);
  } else {
    selectedKeyFeature.value.splice(selectedKeyFeature.value.indexOf(item), 1);
  }
  console.log("selected", selectedKeyFeature.value);
};

// 获取特征重要性
const getFeatureImportance = (data) => {
  console.log("getFeatureImportance", featureImportance.data);
  const temp = featureImportance.data;
  // 对temp数组按照value排序
  temp.sort((a, b) => a.value - b.value);
  // 取前三个
  currentKeyFeature.value = temp.slice(0, 3);
  currentKeyFeature.value.forEach((item) => {
    item.active = false;
  });
  // 取后面所有
  otherKeyFeature.value = temp.slice(3, 16);
  otherKeyFeature.value.forEach((item) => {
    item.active = false;
  });
};

// 获取风险值
const getRiskCurveData = (data) => {
  console.log("getRiskCurveData", riskCurve);
  riskCurveData.value = riskCurve;
};
// 显示风险曲线
const showRiskCurve = ref(true);
// 监听是否显示风险曲线
watch(showRiskCurve, (newVal, oldVal) => {
  setRiskCurve();
});
// 监听选中指标列表
watch(selectedKeyFeature, (newVal, oldVal) => {
  setRiskCurve();
}, {
  deep: true
});
// 获取数据的value和adaptive
const getValueAndAdaptive = (data) => {
  console.log("getValueAndAdaptive", data);
  const temp = [];
  data.value.forEach((item, i) => {
    temp.push({
      value: item,
      symbolSize: (1.0 / data.adaptive[0]) * data.adaptive[i] * 8,
    });
  });
  return temp;
};
// 设置风险曲线
const setRiskCurve = () => {
  riskCurveOption = {
    grid: {
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      //
      boundaryGap: false,
      // 将传入的时间戳转化为时间
      data: riskCurveData.value.time.map((item) => {
        return moment(item).format('YYYY-MM-DD');
      }),
      show: true,
      shadowColor: 'rgba(0, 0, 0, 0.3)',
      shadowBlur: 2
    },
    yAxis: [
      {
        name: '风险值',
        type: 'value',
        show: showRiskCurve.value,
        offset: 0,
        position: 'left',
        axisLine: {
          show: true
        },
        min: 0,
        max: 1,
      },
      ...selectedKeyFeature.value.map((item, i) => {
        return {
          name: item.name.length > 5 ? item.name.slice(0, 5) + '...' : item.name,
          type: 'value',
          show: true,
          offset: showRiskCurve.value ? i * 48 : i <= 0 ? 0 : i * 48 - 48,
          position: showRiskCurve.value ? 'right' : i <= 0 ? 'left' : 'right',
          axisLine: {
            show: true
          },
          nameTextStyle: {
            fontSize: 10,
            width: 30,
            height: 20,
            overflow: 'truncate',
            ellipsis: '...',
          },
        };
      })
    ],
    series: [
      showRiskCurve.value && {
        name: '风险值',
        data: riskCurveData.value.time_risk,
        symbol: 'none',
        type: 'line',
        lineStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 1,
            x2: 0,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: '#ffdfe4'
              },
              {
                offset: 1,
                color: '#ffdfe4'
              }
            ],
            global: false
          },
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 1,
            x2: 0,
            y2: 0,
            colorStops: [
              {
                offset: 0,
                color: '#fee8ed'
              },
              {
                offset: 1,
                color: '#ffedf2'
              },
            ],
            global: false
          }
        },
        markLine: {
          data: [
            {
              lineStyle: {
                // 警戒线的样式  ，虚实  颜色
                type: 'dashed',
                color: '#FFB199',
                width: 2
              },
              label: {
                show: false
              },
              yAxis: 0.50,

            }
          ],
          symbol: ['none', 0, '', ''],
        }
      },
      ...selectedKeyFeature.value.map((item, i) => {
        return {
          name: item.name,
          type: 'line',
          data: getValueAndAdaptive(riskCurveData.value.data.filter((dataItem) => {
            return dataItem.name === item.name;
          })[0]),
          symbol: 'emptyCircle',
          yAxisIndex: i + 1,
        };
      })
    ],
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        console.log("params", params);
        let str = "";
        params.forEach(param => {
          str += '<li>' + param.seriesName + ' : ' + param.value.toFixed(2) + '</li>';
        })
        return str;
      }
    },
  };
  console.log(riskCurveOption);
  riskCurveChart.setOption(riskCurveOption, true);
  riskCurveChart.resize();
}

// 数据初始化
onMounted(() => {
  // FIXME: 从后端获取数据
  const temp = {
    job_name: 'test',
    patient_id: 1,
  };
  getFeatureImportance(temp);
  getRiskCurveData(temp);
  riskCurveChart = echarts.init(document.getElementById('riskCurveChart'));
  setRiskCurve();
  window.addEventListener('resize', () => {
    riskCurveChart.resize();
  });
});
</script>
<style scoped lang="scss">
.analyse {
  width: 90%;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  padding-top: 20px;
}

.feature {
  background-color: white;
  border-radius: 25px;
  height: 45%;
  overflow-y: auto;

  &-title {
    font-family: smileySans;
    font-size: 1.5rem;
    margin: 1rem;
    border-left: 4px solid #089bab;
    padding-left: 1rem;
  }

  .btn-item {
    display: inline-block;
    margin-left: 1rem;
    margin-top: 0.5rem;
    border-radius: 0.5rem;
    padding: 0.5rem;
    font-family: smileySans;
    font-size: 1rem;
    background-color: transparent;
    border-color: #089bab;
  }

  .btn-item:hover {
    background-color: #089bab;
    color: white;
  }

  .btn-item.active {
    background-color: #089bab;
    color: white;
  }
}

.curve {
  background-color: white;
  border-radius: 25px;
  height: 45%;
  margin-top: 20px;

  &-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-title {
      font-family: smileySans;
      font-size: 1.5rem;
      margin: 1rem;
      border-left: 4px solid #089bab;
      padding-left: 1rem;
    }

    &-btns {
      .btn-item {
        display: inline-block;
        margin-right: 0.5rem;
        border: none;
        padding: 0.5rem;
        font-family: smileySans;
        font-size: 1rem;
        background-color: transparent;
      }
    }
  }

  &-chart {
    width: 100%;
    height: 100%;
  }
}
</style>