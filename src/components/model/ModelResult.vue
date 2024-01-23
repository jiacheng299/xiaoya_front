<template>
    <div class="model-result">
        <div class="model-result-wrap">
            <div class="comment">
                <div class="comment-title">
                    模型评估结果：
                </div>
                <button v-for="(item, index) in resultItems" class="btn-item" :key="index">
                    <span class="btn-item-name btn-text">{{ item.name }}</span>
                    <span class="btn-item-value btn-text">{{ item.value.toFixed(3) }}</span>
                </button>
            </div>
        </div>
    </div>
</template>
<script setup>
import SnakeBtn from '../basic/SnakeBtn.vue';
// 模型预测结果
const porps = defineProps({
    resultItems: {
        type: Array,
        default: [
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
        ]
    }
})

</script>
    
<style lang="scss" scoped>
.model-select {
    width: 100%;
    // background-color: white;

    .comment {
        // background-color: white;
        border-radius: 10px;
        height: 100%;
        width: 95%;

        &-title {
            font-family: smileySans;
            font-size: 1.5rem;
            margin: 1rem;
            border-left: 4px solid #089bab;
            padding-left: 1rem;
        }
    }

    .selector {
        margin-left: 1rem;
    }
}

.model-result {
    width: 100%;
    // height: 100%;
    // margin-left: 2%;

    display: flex;
    justify-content: center;
    // margin: auto;
    // padding-top: 20px;

    &-wrap {
        height: 100%;
        width: 100%;
        // margin-top: 3%;
        display: flex;
        justify-content: space-between;
        flex-direction: column;

        .comment {
            // background-color: white;
            border-radius: 10px;
            height: 100%;
            width: 95%;

            &-title {
                font-family: smileySans;
                font-size: 1.5rem;
                margin: 1rem;
                border-left: 4px solid #089bab;
                padding-left: 1rem;
            }

            .empty-explain {
                font-family: smileySans;
                font-size: 1.3rem;
                margin: 1rem;
                // border-left: 4px solid #089bab;
                padding-left: 1rem;
            }



            .btn-item {
                display: inline-block;
                margin-left: 1rem;
                margin-top: 0.5rem;
                min-width: 110px;
                border-radius: 0.5rem;
                padding: 1rem;
                font-family: smileySans;
                background-color: transparent;
                border-color: #089bab;

                .btn-text {
                    display: block;
                }

                &-name {
                    font-size: 1.2rem;
                }

                &-value {
                    font-size: 1.6rem;
                    margin-top: 10px;
                }
            }

            .btn-item:hover {
                background-color: #089bab;
                color: white;
            }
        }
    }
}
</style>