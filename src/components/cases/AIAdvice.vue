<template>
  <n-card title="AI观察与建议" style=" width: 600px;border-radius: 10px;" >

    <n-timeline>

      <n-timeline-item
          type="warning"
          title="警告"

          time="2018-04-03 20:46"
      >
        患者当前
        <n-tooltip placement="top-start" trigger="hover">
          <template #trigger>
            <i>死亡风险指数</i>
          </template>
          <div style="word-wrap:break-word;
word-break:normal;
width: 300px">
            死亡风险指数 是AI用来评估病人未来一年内死亡风险的指标（范围0 - 100），大于 50 表示该病人病情比较严重
          </div>
        </n-tooltip>
        为{{ data.risk.ori_value }} ，判断依据的主关键指标为
        <span style="color: #a8362e">{{ data.risk.main_key.name }}</span> ({{ data.risk.main_key.value }}) ，
        次关键指标
        <span style="color:#e3b75e">{{ data.risk.sub_key.name }}</span> ({{ data.risk.sub_key.value }})
        <p/>
        <b>AI建议 （如预期最大程度降低死亡风险指数）可考虑将：</b>
        <n-list>

          <n-list-item v-for="(ad,index) in data.features" :key="index">

            {{ index + 1 }}. <i>{{ ad.name }} </i> 从 {{ ad.ori_value }} {{ ad.direction === 1 ? '升高' : "减少" }}到
            {{ ad.cur_value }} (
            <span
                :style="{color:(ad.direction === 1 ? '#9326ec' : '#0f9449')}">{{ ad.prop }}{{
                ad.direction === 1 ? '↑' : '↓'
              }}</span>)
          </n-list-item>
        </n-list>
        <p/>
        ⇨死亡风险指数可从 {{ data.risk.ori_value }} {{ data.risk.direction === 1 ? '升高' : "减少" }}到
        {{ data.risk.cur_value }} (
        <span
            :style="{color:(data.risk.direction === 1 ? '#9326ec' : '#0f9449')}">{{ data.risk.prop }}{{
            data.risk.direction === 1 ? '↑' : '↓'
          }}</span>)

      </n-timeline-item>


    </n-timeline>
  </n-card>
</template>
<script setup>
import {color} from "echarts";

let data = {
  "risk": {
    "ori_value": 44.4,
    "main_key": {
      "name": "mean corpuscular hemoglobin",
      "value": 32.4
    },
    "sub_key": {
      "name": "hemoglobin",
      "value": 31.4
    },
    "cur_value": 41.3,
    "direction": 0,
    "value_diff": 3.1,
    "prop": "7.5%"
  },
  "features": [
    {
      "name": "mean corpuscular hemoglobin",
      "ori_value": 32.4,
      "cur_value": 32.5,
      "direction": 1,
      "value_diff": 0.1,
      "prop": "0.4%"
    },
    {
      "name": "Albumin",
      "ori_value": 4.3,
      "cur_value": 2.4,
      "direction": 0,
      "value_diff": 1.9,
      "prop": "41.1%"
    },
    {
      "name": "HGB",
      "ori_value": 62.0,
      "cur_value": 85.8,
      "direction": 1,
      "value_diff": 23.8,
      "prop": "38.4%"
    }
  ]
}
</script>