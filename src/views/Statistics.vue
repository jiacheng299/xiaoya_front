<template>
  <div class="sta-wrapper">
    <el-card class="card-wrap">
      <template #header>
        <div class="card-title">Select Indicators</div>
      </template>
      <button
        v-for="(item, index) in medicalChar"
        :key="index"
        :class="{ active: activeIndex === index }"
        class="btn-item"
        @click="setActive(index)"
        @mouseover="setHover(index)"
        @mouseout="setHover(null)"
      >
        {{ item }}
      </button>
    </el-card>
    <div v-if="isLoad" class="sta-charts-wrap">
      <div class="sta-charts">
        <div class="card-title">Indicators Analysis 2D</div>
        <statisticsChart2D
          :data="tempdata2D"
          :show_standard="showStandard"
          :selected="select"
        />
      </div>
    </div>
    <div v-if="isLoad" class="sta-charts-wrap flex-wrap">
      <div class="sta-charts">
        <div class="card-title">Indicators Analysis 3D</div>
        <statisticsChart3D :data="tempdata3D" />
      </div>

      <div class="sta-charts margin-wrap">
        <div class="card-title">
          Feature Importance Variation Learned by AICare
        </div>
        <statisticsSandian></statisticsSandian>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { Analysis } from "../api/analysis.js";
import statisticsChart2D from "./statistics/StatisticsChart2D.vue";
import statisticsChart3D from "./statistics/StatisticsChart3D.vue";
import statisticsSandian from "./statistics/StatisticsSandian.vue";
import datalist from "../assets/dataset-statistics.json";
import { ElImage } from "element-plus";
const select = ref("hemoglobin");
let data2D = ref(datalist.data2D);
let tempdata2D = ref(datalist.data2D);
let data3D = ref(datalist.data3D);
let tempdata3D = ref(datalist.data3D);
const showStandard = ref(true);
const pic_src = ref("");
const medicalChar = ref({
  cl: "Chlorine",
  co2: "CO2CP",
  wbc: "WBC",
  hgb: "HGB",
  urea: "Urea",
  ca: "Calcium",
  k: "Potassium",
  na: "Sodium",
  cre: "SCR",
  p: "PHOS",
  alb: "Albumin",
  crp: "hs-CRP",
  glu: "Glucose",
  weight: "Weight",
  sys: "Systolic\npressure",
  dia: "Diastolic\npressure",
  hemoglobin: "hemoglobin",
});
const isLoad = ref(false);
const activeIndex = ref(null);
const hoverIndex = ref(null);
const setActive = (index) => {
  activeIndex.value = index;
  select.value = index;
  console.log("SELECT", select.value);
};
const setHover = (index) => {
  hoverIndex.value = index;
};
const getData = () => {
  isLoad.value = true;
  var data = new FormData();
  data.append("job_name", "test");
  data.append("feature", select.value);
  Analysis.getDatasetStatistics(data).then((res) => {
    data2D.value = res.data.data2D;
    data3D.value = res.data.data3D;
    isLoad.value = true;
    console.log("data2D", data2D.value);
    console.log("data3D", data3D.value);
  });
  pic_src.value =
    "http://v.ai-care.top/statistics_pic/" + select.value + ".png";
};
onMounted(() => {
  getData();
  setActive("hemoglobin");
});
watch(select, () => {
  getData();
});
</script>

<style lang="scss" scoped>
.sta-wrapper {
  margin-top: 20px;
  overflow: auto;
  -ms-overflow-style: none;
  /* IE和Edge浏览器需要禁用默认滚动条 */
  scrollbar-width: none;
  /* Firefox浏览器需要禁用默认滚动条 */
}

.card-wrap {
  border-radius: 25px;
}

.sta-wrapper::-webkit-scrollbar {
  display: none;
  /* Chrome, Safari, Opera*/
}

.sta-wrapper::-moz-scrollbar {
  display: none;
  /* Firefox */
}

.card-title {
  font-family: smileySans;
  font-size: 1.5rem;
  margin: 1rem;
  border-left: 4px solid #089bab;
  padding-left: 1rem;
  position: relative;
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

.btn-item:hover,
.btn-item.active {
  background-color: #089bab;
  color: white;
}

.sta-charts-wrap {
  margin-top: 20px;
}

.sta-charts {
  background-color: white;
  margin-top: 20px;
  padding: 20px;
  border-radius: 25px;
  width: 100%;
}

.flex-wrap {
  display: flex;
  justify-content: space-between;
}

.margin-wrap {
  margin-left: 20px;
}
</style>
