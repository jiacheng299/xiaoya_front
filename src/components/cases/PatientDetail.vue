<template>
  <div
    class="card"
    :style="{ height: cardHeight }"
    style="width: 600px"
    title="卡片"
    @mouseleave="showMore = false"
    @mouseover="showMore = true"
  >
    <div class="card-content">
      <img
        src="https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg"
        style="
          margin-top: 20px;
          width: 100px;
          height: 100px;
          border-radius: 50%;
        "
      />
      <h3 style="padding: 10px">原发疾病</h3>
      <h4>-</h4>
      <ul class="ul1">
        <li class="li1">
          <span>编号</span>
          <span>{{ patientData.patient_id }}</span>
        </li>
        <li class="li1">
          <span>性别</span>
          <span>{{ patientData.sex == 1 ? "男" : "女" }}</span>
        </li>
        <li class="li1">
          <span>出生年份</span>
          <span>{{ patientData.birth_year }}</span>
        </li>
      </ul>
    </div>
    <!--    <a class="more-link" @click="toggleMore">-->
    <!--      {{ showMore ? "收起" : "更多" }}-->
    <!--    </a>-->
    <transition name="fade">
      <div class="more-info" v-if="showMore">
        <ul class="ul2">
          <li class="li2">
            <span>身高</span>
            <span>-</span>
          </li>
          <li class="li2">
            <span>体重</span>
            <span>-</span>
          </li>
          <li class="li2">
            <span>入院年龄</span>
            <span>-</span>
          </li>
          <li class="li2">
            <span>去世年份-月份</span>
            <span>{{
              patientData.dead_date ? patientData.dead_date : "-"
            }}</span>
          </li>
          <li class="li2">
            <span>基础病症</span>
            <span>-</span>
          </li>
          <li class="li2">
            <span>死因</span>
            <span>{{ patientData.outcome == 1 ? "死于..." : "-" }}</span>
          </li>
          <li class="li2">
            <span>聚簇类别</span>
            <span>{{ patientData.cluster_id }}</span>
          </li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";

const showMore = ref(false);
const cardHeight = ref("300px");
const data = {
  patient_id: 1,
  sex: 1,
  age: 73,
  birth_year: 1947,
  outcome: 0,
  dead_date: "",
  cluster_id: 7,
};
let patientData = ref(data);
function toggleMore() {
  showMore.value = !showMore.value;
  console.log(cardHeight.value);
}

watch(
  showMore,
  () => {
    cardHeight.value = showMore.value ? "800px" : "300px";
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
//.card {
//  width: 300px;
//}

.card-content {
  text-align: center;
}

.ul1 {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  list-style: none;
  padding: 20px;
  margin-left: -30px;
  text-align: center;
}

h3 {
  color: #53bca2;
  font-family: "Microsoft YaHei", sans-serif;
  font-weight: bold;
}

.li1 {
  margin-left: 25px;
}

.li1 span {
  //   font-weight: bold;
  display: block;
}

.li1 span:first-child {
  color: #53bca2;
  font-family: "Microsoft YaHei", sans-serif;
  font-weight: bold;
}

.li1:not(:last-child) {
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  padding-right: 25px;
}

.ul2 {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
}

.li2 {
  margin-left: 30px;
  padding: 10px;
}

.li2 span:first-child {
  display: block;
  font-size: 16px;
  font-weight: bold;
  color: gray;
}

.li2 span:nth-child(2) {
  display: block;
}

.more-info {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
}

.more-link {
  color: gray;
  cursor: pointer;
  margin-left: 130px;
  transition: all 0.3s;
}

.fade-enter-active,
.fade-leave-active {
  transition: height 1s;
}

.fade-enter,
.fade-leave-to {
  height: 0;
  overflow: hidden;
}
</style>
