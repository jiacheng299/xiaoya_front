<template>
    <div class="observation">
        <div class="title">
            数据观察 - {{ jobname }}
        </div>
        <div class="com-list">
            <div class="com-item" :class="{ active: activeName == '原始数据列表' }"
                @click="avtiveComponent = OriginalData; activeName = '原始数据列表'">
                原始数据列表
            </div>
            <div class="com-item" :class="{ active: activeName == '原始数据总览' }"
                @click="avtiveComponent = OriginalReview; activeName = '原始数据总览'">
                原始数据总览
            </div>
        </div>
        <component :is="avtiveComponent">
        </component>
    </div>
</template>
<script setup>
import OriginalData from "../components/observation/OriginalData.vue";
import OriginalReview from "../components/observation/OriginalReview.vue";
const avtiveComponent = OriginalData;
const activeName = ref("原始数据列表");
const jobname = localStorage.getItem("dataImportResult") || 'test';
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