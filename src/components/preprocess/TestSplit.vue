<template>
    <div class="card-wrap">
        <div class="card-item" v-for="(item, index) in dataEntity">
            <div class="title">{{ item.name }}</div>
            <div class="explain">
                {{ item.explain }}
            </div>
            <div class="title" style="margin-top: 20px;">{{ '数值设置' }}</div>
            <div class="input">
                <el-input v-model="item.value" placeholder="请输入0~100间的数字，保证三部分数值之和为100"></el-input>
            </div>
        </div>
    </div>
    <div class="btn-wrap">
        <snake-btn @click="submitForm()" style="float: right">
            <span style="font-family: smileySans; ">确认</span>
        </snake-btn>
    </div>
</template>
<script setup>
import { ElNotification } from 'element-plus';
import SnakeBtn from '../basic/SnakeBtn.vue';
import { DataPreProcess } from '../../api/preprocess';
// 解释说明
const dataEntity = ref([
    {
        name: '训练集（Training Set）',
        explain: '训练集是用于深度学习模型训练的数据集。它包含了大量的样本数据和相应的标签或目标输出。深度学习模型通过在训练集上学习样本数据的特征和模式来调整模型的参数和权重。模型通过不断迭代和优化，试图最小化训练集上的损失函数，以实现对数据的良好拟合。',
        value: '70',
    },
    {
        name: '验证集（Validation Set）',
        explain: '验证集是用于在训练过程中评估模型性能和调整超参数的数据集。它与训练集是独立的，意味着验证集中的样本数据不用于训练模型。在每个训练周期（epoch）结束时，通过在验证集上计算模型的性能指标（如准确率、损失函数值等），可以了解模型在未见过的数据上的表现。通过观察验证集上的性能，可以选择合适的超参数、调整模型结构或进行早停（early stopping）等策略来改善模型的泛化能力。',
        value: '10',
    },
    {
        name: '测试集（Test Set）',
        explain: '测试集是用于评估模型最终性能的数据集。它也是与训练集和验证集相互独立的数据集。在模型训练完成后，使用测试集来评估模型对新样本的泛化能力。测试集的样本数据与模型在训练和验证过程中都没有接触过，因此可以提供一个更客观的性能评估指标。在测试集上计算的性能指标可以用于报告模型的准确率、精度、召回率等。',
        value: '20',
    },
])

// 传递给父组件
const emit = defineEmits(['startSplit', 'endSplit'])

// 查找名称对应的比例
const findValue = (name) => {
    var nameIndex = dataEntity.value.findIndex(value => value.name == name)
    return dataEntity.value[nameIndex].value
}

// 对象转换为表单
// 对象转换为表单
function paramsToFormData(obj) {
//    console.log(Object.keys(obj))
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



// 提交表单
const submitForm = () => {
    var sum = 0
    for (var i = 0; i < dataEntity.value.length; i++) {
        if (Number(dataEntity.value[i].value) && 0 <= Number(dataEntity.value[i].value) && Number(dataEntity.value[i].value) <= 100) {
            sum += Number(dataEntity.value[i].value)
        } else {
            ElNotification({
                title: "输入格式错误",
                message: "请输入0~100以内的数字",
                type: "warning",
                duration: 3000
            })
            return
        }
    }

    if (sum == 100) {
        emit('startSplit')
        // 发送请求
        var data = {
            job_name: localStorage.getItem("dataImportResult")||'test',
            train_size: findValue('训练集（Training Set）'),
            val_size: findValue('验证集（Validation Set）'),
            test_size: findValue('测试集（Test Set）')
        }
        let formdata = paramsToFormData(data)
        DataPreProcess.DataSplit(formdata).then((res) => {
            emit('endSplit')
            console.log(res)
            if (res.data.result == 0) {
                ElNotification({
                    title: "分割失败",
                    message: res.data.message,
                    type: "error",
                    duration: 3000
                });
            } else {
                ElNotification({
                    title: "分割成功",
                    message: res.data.message,
                    type: "success",
                    duration: 3000
                });
                console.log('数据集分割成功', res)
            }
        }).catch((err) => {
            emit('endSplit')
            ElNotification({
                title: "分割失败",
                message: err,
                type: "error",
                duration: 3000
            });
        })
    } else {
        // 加和不是100
        ElNotification({
            title: "输入格式错误",
            message: "请确保三部分比例加和为100",
            type: "warning",
            duration: 3000
        })
        return
    }
}
</script>

<style lang="scss" scoped>
.card-wrap {
    width: 100%;
    // height: 100%;
    display: flex;
    justify-content: space-between;
}

.card-item {
    height: 420px;
    width: 350px;
    background-color: white;
    padding: 20px;
    border-radius: 25px;
    border: 1px solid black;
    // width: 70%;
    // position: relative;

    // 标题
    .title {
        font-family: smileySans;
        font-size: 1.5rem;
        line-height: 1.5rem;
        // margin: 1rem;
        margin-bottom: 0.5rem;
        display: block;
        border-left: 4px solid #089bab;
        padding-left: 1rem;
    }

    .explain {
        border-radius: 5px;
        border: 1px solid #089bab;
        // width: 100%;
        height: 55%;
        margin-top: 20px;
        padding: 5px 20px 5px 20px;
        font-size: 1.2rem;
        font-family: smileySans;
    }
}

.btn-wrap {
    margin-top: 10px;
    width: 100%;
}
</style>