<template>
    <div class="model-select">
        <div class="table">
            <el-form :inline="true" :model="modelparams" class="demo-form-inline">
                <el-form-item label="使用已经训练好的模型">
                    <el-select v-model="modelparams.use_pretrain_model" placeholder="是/否" class="common-width">
                        <el-option label="是" value="1" />
                        <el-option label="否" value="0" />
                    </el-select>
                </el-form-item>
                <el-form-item label="模型名称">
                    <el-select v-model="modelparams.model_name" placeholder="名称" class="common-width">
                        <el-option label="GRU" value="GRU" />
                        <el-option label="LSTM" value="LSTM" />
                        <el-option label="RNN" value="RNN" />
                        <el-option label="MLP" value="MLP" />
                        <el-option label="AdaCare" value="AdaCare" />
                    </el-select>
                </el-form-item>
                <el-form-item label="批量大小">
                    <el-input v-model="modelparams.batch_size" placeholder="16~1024" class="common-width" />
                </el-form-item>
                <el-form-item label="学习率">
                    <el-select v-model="modelparams.learning_rate" placeholder="1e-4~1e-1" class="common-width">
                        <el-option label="1e-1" value="1e-1" />
                        <el-option label="1e-2" value="1e-2" />
                        <el-option label="1e-3" value="1e-3" />
                        <el-option label="1e-4" value="1e-4" />
                    </el-select>
                </el-form-item>
                <el-form-item label="隐藏层维度">
                    <el-select v-model="modelparams.hidden_dim" placeholder="8/32/64/128" class="common-width">
                        <el-option label="8" value="8" />
                        <el-option label="32" value="32" />
                        <el-option label="64" value="64" />
                        <el-option label="128" value="128" />
                    </el-select>
                </el-form-item>
            </el-form>
        </div>
        <SnakeBtn @click="submitForm()" class="btn-wrap">
            <span style="font-family: smileySans; ">确认</span>
        </SnakeBtn>
    </div>
</template>
<script setup>
import SnakeBtn from '../basic/SnakeBtn.vue';
import { Model } from '../../api/model'
// 传参
const emit = defineEmits(["startUpload", "endUpload"])
//模型参数
const modelparams = ref({
    use_pretrain_model: '1',
    model_name: 'GRU',
    batch_size: 8,
    learning_rate: '1e-3',
    hidden_dim: 32,
    job_name: ''
})

// 科学计数法数字格式转换
const transNumber = {
    '1e-1': 0.1,
    '1e-2': 0.01,
    '1e-3': 0.001,
    '1e-4': 0.0001,
}

const preData = () => {
    modelparams.value.use_pretrain_model = Number(modelparams.value.use_pretrain_model)
    modelparams.value.batch_size = modelparams.value.batch_size ? Number(modelparams.value.batch_size) : 1024
    modelparams.value.learning_rate = transNumber[modelparams.value.learning_rate] ? transNumber[modelparams.value.learning_rate] : modelparams.value.learning_rate
    modelparams.value.job_name = localStorage.getItem("dataImportResult")||'test'
    // return handleFeatures() //参数有误前端只考虑特征部分是否有误
}

// 对象转换为表单
function paramsToFormData(obj) {
    console.log(Object.keys(obj))
    var formData = new FormData();
    Object.keys(obj).forEach((key) => {
        if (obj[key] instanceof Array) {
            obj[key].forEach((item) => {
                formData.append(key, item);
            });
            return;
        }
        formData.append(key, obj[key]);
    });
    return formData;
}

// 测试数据
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

// 处理特征 将对象转换为列表
const handleMetrics = (obj) => {
    resultItems.value = []
    Object.keys(obj).forEach((key) => {
        resultItems.value.push({
            name: key,
            value: obj[key]
        })
    });
}

// 提交表单
const submitForm = () => {
    preData()

    let formdata = paramsToFormData(modelparams.value)
    console.log('表单内容为', formdata)
    emit('startUpload')
    ElNotification({
        title: "正在上传，请耐心等候~",
        message: "正在上传，请耐心等候~",
        type: "warning",
        duration: 3000
    });

    Model.ModelTrain(formdata).then((res) => {
        if (res.data.result == 0) {
            // 训练失败 不传递列表
            emit("endUpload")
            ElNotification({
                title: "训练失败",
                message: res.data.message,
                type: "error",
                duration: 3000
            });
        } else {
            ElNotification({
                title: "训练成功",
                message: res.data.message,
                type: "success",
                duration: 3000
            });
            // 训练成功 则向父组件传递特征列表
            handleMetrics(res.data.metrics)
            console.log(resultItems.value)
            emit("endUpload", resultItems.value)
        }
    }).catch((err) => {
        // 训练失败 不传递列表
        emit("endUpload")
        ElNotification({
            title: "训练失败",
            message: err,
            type: "error",
            duration: 3000
        });
    })
}
</script>
    
<style lang="scss" scoped>
.table {
    margin: auto;
    background-color: white;
    padding-top: 20px;
    border-radius: 10px;
    width: 100%;
    margin-top: 10px;
    min-height: 300px;

    .demo-form-inline {
        width: 95%;
        margin: auto;
    }

    .common-width {
        max-width: 120px;
    }

}

.model-select {
    width: 100%;
    position: relative;
    // background-color: white;

    // 按钮
    .btn-wrap {
        position: absolute;
        right: 10px;
        bottom: 10px;
    }

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