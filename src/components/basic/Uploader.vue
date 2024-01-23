<template>
    <div class="uploader-wrap" v-loading="loading">
        <div class="uploader">
            <div class="title">
                {{ titles[type - 1] }}
                <el-popover placement="right" :width="450" trigger="hover">
                    <template #reference>
                        <el-icon class="question-icon">
                            <QuestionFilled />
                        </el-icon>
                    </template>
                    <el-table :data="tableData" v-if="type == 1">
                        <el-table-column width="90" property="PatientID" label="PatientID" />
                        <el-table-column width="120" property="RecordTime" label="RecordTime" />
                        <el-table-column width="120" property="Name" label="Name" />
                        <el-table-column width="70" property="Value" label="Value" />
                    </el-table>

                    <el-table :data="tableData" v-if="type == 2">
                        <el-table-column width="90" property="PatientID" label="PatientID" />
                        <el-table-column width="120" property="RecordTime" label="RecordTime" />
                        <el-table-column width="120" property="Name" label="Name" />
                        <el-table-column width="70" property="Type" label="Type" />
                    </el-table>

                    <el-table :data="tableData" v-if="type == 3">
                        <el-table-column width="90" property="PatientID" label="PatientID" />
                        <el-table-column width="120" property="RecordTime" label="RecordTime" />
                        <el-table-column width="120" property="Outcome" label="Outcome" />
                        <el-table-column width="70" property="LOS" label="LOS" />
                    </el-table>
                </el-popover>
            </div>
            <div class="explain-uploader">
                <div class="explain">
                    {{ explains[type - 1] }}
                </div>
                <el-upload :ref="refName" drag :auto-upload="false" :on-exceed="handleExceed" accept=".xls, .xlsx, .csv"
                    v-model:file-list="fileList" :on-change="handleChange" class="uploader-entity">
                    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                    <div class="el-upload__text">
                        Drop file here or <em>click to upload</em>
                    </div>
                    <template #tip>
                        <div class="el-upload__tip">
                            csv/xls/xlsx files, limit 1 file, new file will cover the old file
                        </div>
                    </template>
                </el-upload>
            </div>
            <div class="upload-btn">
                <snake-btn @click="submitForm()">
                    <span style="font-family: smileySans; ">提交</span>
                </snake-btn>
            </div>
        </div>
        <div class="features">
            <div class="features-wrap">
                <div class="comment">
                    <div class="comment-title">
                        预览指标：
                    </div>
                    <div class="empty-explain explain-title" v-if="beforeUpload">
                        请先上传文件
                    </div>
                    <button v-for="(item, index) in handleFeatures" class="btn-item" v-if="!beforeUpload" :key="index">
                        {{ item }}
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup>
import { UploadFilled, QuestionFilled } from '@element-plus/icons-vue'
import SnakeBtn from './SnakeBtn.vue';
import { DataImport } from '../../api/dataimport'
import uploaderbck1 from '../../assets/image/uploader-bck1.jpg'
import { onMounted } from 'vue';
// 传输过程加载符号
const loading = ref(false)
// 记录是不是上传之前
const beforeUpload = ref(true)
// 背景图片
const images = [uploaderbck1, uploaderbck1, uploaderbck1]
// 解释说明
const explains = [
    '这个csv文件需要记录患者的生理指标信息，包括年龄、血糖、白蛋白等。这些指标通常由医生通过化验和检查来确定。在文件中，每一行代表一个患者的生理指标信息。第一列是患者的ID号，后面的列是患者的年龄、血糖、白蛋白等指标，查看具体格式将鼠标移至上方问号处。',
    '这个csv文件需要记录患者的用药情况等。在文件中，每一行代表一个患者的用药和合并症信息。第一列是患者的ID号，后面的列是患者用药和合并症的描述。查看具体格式将鼠标移至上方问号处。',
    '这个csv文件需要记录各项预测目标，如患者的终态结局、还有多少天会出院等。在文件中，每一行代表一个患者的用药和合并症信息。第一列是患者的ID号，后面的列是各项预测目标。查看具体格式将鼠标移至上方问号处。',

]
// 上传类型
const titles = [
    '患者生理指标文件',
    '患者用药及并发症文件',
    '患者终态预测文件'
]
// 三种表格值
const tableDataFirst = [
    {
        PatientID: 1,
        Name: 'Patient Name',
        RecordTime: '2022-6-26',
        Value: 1,
    },
    {
        PatientID: 2,
        Name: 'Patient Name',
        RecordTime: '2022-6-26',
        Value: 2,
    },
    {
        PatientID: 3,
        Name: 'Patient Name',
        RecordTime: '2022-6-26',
        Value: 3,
    },
]
const tableDataSecond = [
    {
        PatientID: 1,
        Name: 'Patient Name',
        RecordTime: '2022-6-26',
        Type: 'Sex',
    },
    {
        PatientID: 2,
        Name: 'Patient Name',
        RecordTime: '2022-6-26',
        Type: 'Sex',
    },
    {
        PatientID: 3,
        Name: 'Patient Name',
        RecordTime: '2022-6-26',
        Type: 'Sex',
    },
]
const tableDataThird = [
    {
        PatientID: 1,
        LOS: '27',
        RecordTime: '2022-6-26',
        Outcome: 'TRUE'
    },
    {
        PatientID: 2,
        LOS: '21',
        RecordTime: '2022-6-26',
        Outcome: 'TRUE'
    },
    {
        PatientID: 3,
        LOS: '13',
        RecordTime: '2022-6-26',
        Outcome: 'FALSE'
    },
]
const tableData = ref([])
// const tableLabels = ref(['PatientID', 'RecordTime'])
// 处理表格数据
const handleTableData = () => {
    tableData.value = []
    switch (props.type) {
        case '1':
            tableData.value = tableDataFirst
            // tableLabels.value.push('Name')
            // tableLabels.value.push('Value')
            break
        case '2':
            tableData.value = tableDataSecond
            // tableLabels.value.push('Name')
            // tableLabels.value.push('Type')
            break
        case '3':
            tableData.value = tableDataThird
            // tableLabels.value.push('Outcome')
            // tableLabels.value.push('LOS')
            break
        default:
            break
    }
}


// 特征值
const features = ref(['特征1', '长一点的特征2', '特征1', '长一点的特征2', '特征1', '长一点的特征2', '长一点的特征2', '特征1', '长一点的特征2', '特征1', '长一点的特征2'])
const handleFeatures = ref([])

// 文件列表 换文件时候替换
const fileList = ref()

// 父传子
const props = defineProps({
    refName: {
        type: String,
        default: 'refname',
    },
    type: {
        type: String,
        default: "1",
    },
    jobName: {
        type: String,
        default: '默认名称'
    }
})

// uploader实例 目前没有用到
const uploadRef = ref(props.refName)

// 子传父
const emit = defineEmits('uploadSuccess')

// 提交表单
const submitForm = () => {
    if (!fileList.value || fileList.value.length != 1) {
        ElNotification({
            title: "上传失败",
            message: "请上传文件",
            type: "warning",
            duration: 3000
        });
        return
    }

    console.log('上传之前数据检查', fileList.value)
    // console.log('props.refName', props.refName, 'uploadRef', uploadRef.value)


    var formdata = new FormData()
    formdata.append('file', fileList.value[0].raw)
    formdata.append('type', props.type)
    formdata.append('job_name', props.jobName)

    // loading 和 beforeUpload 数值变化 传输数据 图片改变
    loading.value = true
    DataImport.FileUpload(formdata).then((res) => {
        loading.value = false
        if (res.data.result == 0) {
            ElNotification({
                title: "上传失败",
                message: res.data.message,
                type: "error",
                duration: 3000
            });
        } else {
            ElNotification({
                title: "上传成功",
                message: res.data.message,
                type: "success",
                duration: 3000
            });
            beforeUpload.value = false
            emit('uploadSuccess', props.type) // 将type的成功上传信息告诉父组件
            features.value = res.data.features
            handleFeatures.value = features.value.slice(0, 9)
        }
    }).catch((err) => {
        loading.value = false
        ElNotification({
            title: "上传失败",
            message: err,
            type: "error",
            duration: 3000
        });
    })
}

// 上传的文件发生转变
const handleChange = (file, filelist) => {
    fileList.value = [filelist[filelist.length - 1]]
}

const handleExceed = () => {
}

// 渲染 处理表单数据
onMounted(() => {
    handleTableData()
})


</script>
<style scoped lang="scss">
// upload样式
:deep(.el-upload-dragger) {
    padding: 10px;
}

// upload图标
:deep(.el-upload-dragger .el-icon--upload) {
    margin-bottom: 5px;
}

.el-upload__tip {
    margin-top: 0;
}


.uploader-wrap {
    // width: 100%;
    // height: 100%;

    display: flex;
    // justify-content: space-between;
    padding: 10px;

    .uploader {
        width: 60%;
        height: 100%;
        margin: auto;
        // margin-top: 10vh;
        background-color: white;
        padding: 20px;
        border-radius: 25px;
        border: 1px solid black;
        // width: 70%;
        position: relative;

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

            .question-icon {
                margin: auto;
            }
        }

        //解释与上传
        .explain-uploader {
            display: flex;


            //解释说明
            .explain {
                width: 50%;
                padding: 1rem;
                font-family: smileySans;
            }

            // 上传
            .uploader-entity {
                width: 44%;
                margin-left: 4%;
            }
        }

        // 图片 panel
        .image-block {
            // background-color: ;
            height: 70%;
            width: 100%;

            // 上传之前图片样式
            .data-image {
                width: 100%;
                height: 100%;
            }

            // 上传之后后端返回数据
            .data-panel {
                width: 100%;
                height: 100%;
                border-radius: 10px;
                background-color: red;
            }
        }

        // 上传按钮
        .upload-btn {
            float: right;
            display: flex;
            justify-content: center;
            position: absolute;
            right: 25px;
            top: 10px;
        }
    }

    .features {
        width: 38%;
        // height: 100%;
        margin-left: 2%;

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
                background-color: white;
                border-radius: 25px;
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
                    padding: 0.5rem;
                    font-family: smileySans;
                    font-size: 1rem;
                    background-color: transparent;
                    border-color: #089bab;
                }

                .btn-item:hover {
                    background-color: #089bab;
                    color: white;
                }
            }

            .unfair-chart-3 {
                background-color: white;
                border-radius: 25px;
            }
        }
    }
}
</style>