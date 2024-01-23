<template>
    <div class="observation" v-loading="loading">
        <div class="title">
            数据预处理 - {{ jobname }}
        </div>
        <div class="com-list">
            <div class="com-item" :class="{ active: activeName == '数据集划分' }"
                @click="avtiveComponent = OriginalData; activeName = '数据集划分'">
                数据集划分
            </div>
        </div>
        <component :is="avtiveComponent" @startSplit="startSplit" @endSplit="endSplit">
        </component>
    </div>
</template>
<script setup>
import TestSplit from '../components/preprocess/TestSplit.vue';
const avtiveComponent = TestSplit;
const activeName = ref("数据集划分");
const jobname = localStorage.getItem("dataImportResult") || 'test';
const loading = ref(false)
const startSplit = () => {
    loading.value = true
}

const endSplit = () => {
    loading.value = false
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
            cursor: pointer;

            &.active {
                border-bottom: 2px solid #089bab;
            }
        }
    }
}
</style>