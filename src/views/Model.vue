<template>
    <div class="observation" v-loading="loading">
        <div class="title">
            模型部分 - {{ jobname }}
        </div>
        <div class="com-list">
            <div class="com-item" :class="{ active: activeName == '模型选择与参数设置' }"
                @click="avtiveComponent = ModelSelect; activeName = '模型选择与参数设置'">
                模型选择与参数设置
            </div>
            <div class="com-item" :class="{ active: activeName == '预测结果' }">
                预测结果
            </div>
        </div>
        <component :is="avtiveComponent" @startUpload="startUpload" @endUpload="endUpload" :resultItems="resultItems">
        </component>
    </div>
</template>
<script setup>
import ModelSelect from '../components/model/ModelSelect.vue';
import ModelResult from '../components/model/ModelResult.vue';
import { Loading } from 'element-plus/es/components/loading/src/service';
let avtiveComponent = ModelSelect;
const activeName = ref("模型选择与参数设置");
const jobname = localStorage.getItem("dataImportResult") || 'test';
// 记录是否处于处理状态
const loading = ref(false)

// 特征值
const resultItems = ref([
    {
        name: 'metric1名称',
        value: '0.848',
    },
    {
        name: 'metric2名称',
        value: '0.848',
    },
    {
        name: 'metric3名称长一点',
        value: '0.848',
    }
])

// 模型选择部分开始上传
const startUpload = () => {
    console.log('开始训练')
    loading.value = true
}
// 结束上传
const endUpload = (Items) => {
    loading.value = false
    console.log('结束训练', Items)
    if (Items) {
        resultItems.value = Items
        avtiveComponent = ModelResult
        activeName.value = '预测结果'
    }
}
</script>
<style scoped lang="scss">
.observation {
    width: 90%;
    height: 100%;
    display: flex;
    flex-direction: column;
    margin-left: auto;
    margin-right: auto;

    .title {
        font-family: smileySans;
        margin-top: 1rem;
        font-size: 3rem;
        border-left: 4px solid #089bab;
        padding-left: 1rem;
        padding-bottom: 0.5rem;
        border-bottom: 4px solid gray;
    }

    .com-list {
        display: flex;
        margin-top: 1rem;
        margin-bottom: 1rem;

        .com-item {
            font-size: 1.5rem;
            margin-right: 1rem;
            font-family: smileySans;
            cursor: pointer;

            &.active {
                border-bottom: 2px solid #089bab;
            }
        }
    }
}
</style>