<template>
    <div class="indicator-wrap">

        <el-card>
            <template #header>
                <div class="card-title flex-wrap">
                    Indicators Analysis
                    <el-button text>Clear selected</el-button>
                </div>
            </template>
            <template v-show="patient_data_selector.current_important.length > 0">
                <div class="card-title-small">
                    Important Indicators
                </div>
                <div v-for="(item, index) in patient_data_selector.current_important " :key="index">
                    {{ item }}
                </div>
            </template>
            <template v-show="patient_data_selector.other.length">
                <div class="card-more">
                    <el-button text @click="displayMore = !displayMore">
                        <template v-if="!displayMore">
                            <span>more </span><el-icon>
                                <ArrowDown />
                            </el-icon>
                        </template>
                        <template v-else>
                            <span>hide </span><el-icon>
                                <ArrowUp />
                            </el-icon>
                        </template>
                    </el-button>
                </div>
            </template>

            <template v-if="displayMore">
                <div class="card-title-small" v-show="patient_data_selector.other.length">
                    Other Indicators
                </div>
                <div v-for="(item, index) in patient_data_selector.other" :key="index">
                    {{ item }}
                </div>
            </template>
        </el-card>
    </div>
</template>
<script setup>
import { useRoute, useRouter } from 'vue-router';
import { useStateStore } from "../../stores/state.js";
import { medicalUnit } from "../../utils/info.js";
const route = useRoute();
const state = useStateStore();
const patient_data_selector = reactive({
    current_important: [],
    history_important: [],
    other: [],
    item: [],
    part: [0.2, 0.5, 1],
    info: {}
});
const displayMore = ref(false);
const getAnalyzeDataTimer = ref(null);
// 监听数据变化
const analyzeData = computed(() => {
    return {
        patient: state.patient,
        modifiedLab: state.modifiedLab,
    }
})
watch(analyzeData, (val) => {
    getAnalyzeData();
})
// 获取关键的patient_data_selector
const getRank = () => {
    if (state.analyze.attention) {
        const lastAttention = [];
        Object.entries(state.analyze.attention).forEach(([key, value]) => {
            lastAttention[key] = value[value.length - 1]
        })
        patient_data_selector.item = Object.keys(lastAttention)
        patient_data_selector.item.splice(13, 1)
        let arr = []
        for (let [key, value] of Object.entries(lastAttention)) {
            if (value >= 0.22) {
                arr.push(key)
            }
        }
        // 进行排序
        let sortedLastAttention = Object.entries(lastAttention).sort((a, b) => {
            return b[1] - a[1]
        })// TODO: top2不知有何作用
        let temp = sortedLastAttention.slice(0, 2).map(e => e[0])
        temp.forEach(o => {
            if (arr.indexOf(o) === -1) {
                arr.push(o)
            }
        })
        let obj = {}
        let top1 = []
        let arr1 = []
        const length = Object.keys(state.analyze.attention).length;
        Object.keys(state.analyze.attention).forEach((item, i) => {
            let max = 0
            Object.entries(state.analyze.attention[item]).forEach(([key, value]) => {

                if (value > max) {
                    max = value
                    top1[i] = key
                }
            })
            Object.getOwnPropertyNames(state.analyze.attention[item]).forEach(key => {
                obj[key] ? (obj[key] += item[key]) : (obj[key] = item[key])
                if (item[key] >= 0.5 || key === top1[i]) {
                    if (i === 0 || key !== top1[i - 1]) {
                        patient_data_selector.info[key] +=
                            '<br/>' + state.modifiedLab[i].date
                    }
                } else {
                    if (i >= 1 && key === top1[i - 1]) {
                        if (i >= 2 && key === top1[i - 2]) {
                            patient_data_selector.info[key] +=
                                '~' + state.modifiedLab[i - 1].date
                        }
                    }
                }
            })
        })
        if (length >= 2) {
            patient_data_selector.item.forEach(key => {
                if (key === top1[length - 1]) {
                    if (key === top1[length - 2]) {
                        patient_data_selector.info[key] +=
                            '~' + sta.modifiedLab[length - 1].date
                    }
                }
            })
        }
        patient_data_selector.current_important = arr;
        patient_data_selector.other = patient_data_selector.item.filter(
            item => arr.indexOf(item) === -1
        );
        console.log("arr", arr);
        console.log("patient_data_selector", patient_data_selector);
    }
}
// 获取分析数据
const getAnalyzeData = () => {
    clearTimeout(getAnalyzeDataTimer.value);
    getAnalyzeDataTimer.value = setTimeout(() => {
        fetch("http://47.93.42.104:10407", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                patient: state.patient,
                lab: state.lab,
            })
        }).then(res => res.json()).then(res => {
            state.setAnalyze(res);
            state.setAnalyzeRisk(res);
            getRank();
        })
    }, 500)
}
// 通过id列表获取若干病人基本信息
const getPatientBasicDetailsById = async (id) => {
    const res = await fetch("http://47.93.42.104:10408/v1/app/patients/basics/" + id);
    const data = await res.json();
    return data.data;
}
// 通过id获取病人就诊信息
const getPatientsLabTestById = async (id) => {
    const res = await fetch('http://47.93.42.104:10408/v1/app/patients/labtest/' + id);
    const data = await res.json();
    return data.data;
}
// 获取风险建议
const getAdviceOnRisk = async (patient, riskThreshold) => {
    let res = (
        await fetch('http://47.93.42.104:10415/', {
            method: 'POST',
            body: JSON.stringify({
                patient,
                riskThreshold
            })
        })
    )
    res = await res.json()
    let valid = res.valid
    res = res.advice
    let idx = res.idx
    let advice = {}
    advice.idx = []
    advice.oriRisk = (parseFloat(res.oriRisk) * 100).toFixed(1)
    advice.curRisk = (parseFloat(res.curRisk) * 100).toFixed(1)
    advice.riskProp = Math.abs(
        ((advice.curRisk - advice.oriRisk) / advice.oriRisk) * 100
    ).toFixed(1)
    advice.riskDiff = (advice.oriRisk - advice.curRisk).toFixed(1)
    for (let key in idx) {
        let tmp = {}
        tmp.key = key
        tmp.oriValue = parseFloat(idx[key].oriContent).toFixed(1) + medicalUnit[key]
        tmp.curValue = parseFloat(idx[key].curContent).toFixed(1) + medicalUnit[key]
        tmp.valueDiff = Math.abs(parseFloat(idx[key].curContent) - parseFloat(idx[key].oriContent)).toFixed(1)
        tmp.direction = parseFloat(idx[key].curContent) > parseFloat(idx[key].oriContent) ? 1 : 0
        tmp.prop = Math.abs(((parseFloat(idx[key].curContent) - parseFloat(idx[key].oriContent)) / parseFloat(idx[key].oriContent)) * 100)
        advice.idx.push(tmp)
    }
    return {
        valid,
        advice
    }
};

onMounted(() => {
    Promise.all([
        getPatientBasicDetailsById(route.params.id || 215),
        getPatientsLabTestById(route.params.id || 215)
    ]).then(([patient, lab]) => {
        state.setPatient(patient);
        state.setLab(lab);
        state.setModifiedLab(lab);
        Promise.all([
            getAdviceOnRisk({
                patient: state.patient,
                lab: state.modifiedLab,
            }, 40),
            getAdviceOnRisk({
                patient: state.patient,
                lab: state.modifiedLab,
            }, 0),
        ]).then(([adviceOnRiskThreshold, adviceOnRisk]) => {
            state.setAdviceOnRiskThreshold(adviceOnRiskThreshold);
            state.setAdviceOnRisk(adviceOnRisk);
            state.setComputingAdvice({ pending: false });
        })
    })
});

</script>
<style scoped>
.indicator-wrap {
    margin-top: 20px;
}

.card-title {
    font-family: smileySans;
    font-size: 1.5rem;
    margin: 1rem;
    border-left: 4px solid #089bab;
    padding-left: 1rem;
    position: relative;
}

.card-title-small {
    font-family: smileySans;
    font-size: 1rem;
    margin: 1rem;
    padding-left: 1rem;
    position: relative;
}

.card-more {
    display: flex;
    justify-content: center;
}

.flex-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
}</style>