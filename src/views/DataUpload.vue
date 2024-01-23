<template>
    <div class="job-wrap" v-if="jobListPage" v-loading="mainLoading">
        <div class="job-list">
            <snake-btn @click="dialogVisible = true" class="job-list-btn">
                <span style="font-family: smileySans; ">新建</span>
            </snake-btn>
            <el-table :data="jobList" style="width: 100%" class="job-table" v-if="jobList.length != 0">
                <el-table-column prop="job_name" label="名称" width="420" />
                <el-table-column prop="created_time" label="创建日期" width="320" />
                <el-table-column fixed="right" label="操作" width="220">
                    <template #default="scope">
                        <el-button link type="warning" size="small" @click="JobAnalyse(scope.row)">查看</el-button>
                        <el-button link type="danger" size="small" @click="JobDeleteConfirm(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="empty-box" v-else>
                <el-empty description="您还未创建job，请创建一个吧~" style="width: 100%" />
            </div>

            <!-- 创建job弹出框 -->
            <el-dialog v-model="dialogVisible" title="创建任务" width="50%">
                <el-input maxlength="20" show-word-limit v-model="newJob"></el-input>
                <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="dialogVisible = false">取消</el-button>
                        <el-button type="primary" @click="JobCreate()">
                            创建
                        </el-button>
                    </span>
                </template>
            </el-dialog>

            <!-- 删除弹出框 -->
            <el-dialog v-model="deleteDialogVisible" title="确定删除吗？" width="50%">
                <div style="display: flex; flex-direction: row-reverse;">
                    <el-button @click="deleteDialogVisible = false">取消</el-button>
                    <el-button type="danger" @click="JobDelete()" style="margin-right: 20px;">
                        删除
                    </el-button>
                </div>
                <!-- <template #footer>
                    <span class="dialog-footer">
                        <el-button @click="deleteDialogVisible = false">取消</el-button>
                        <el-button type="danger" @click="JobDelete()">
                            删除
                        </el-button>
                    </span>
                </template> -->
            </el-dialog>
        </div>
    </div>
    <div class="main-wrap" v-else>
        <snake-btn @click="backToJobList()" class="main-wrap-btn">
            <span style="font-family: smileySans; ">回到任务列表</span>
        </snake-btn>
        <Uploader refName="first" type="1" :jobName="newJob" @uploadSuccess="uploadSuccess" />
        <Uploader refName="second" type="2" :jobName="newJob" @uploadSuccess="uploadSuccess" />
        <Uploader refName="third" type="3" :jobName="newJob" @uploadSuccess="uploadSuccess" />
    </div>
</template>
<script setup>
import { onMounted } from 'vue';
import SnakeBtn from '../components/basic/SnakeBtn.vue';
import Uploader from '../components/basic/Uploader.vue';
import { DataImport } from '../api/dataimport';
import { useDataStore } from "../stores/data.js";
import { useRouter } from 'vue-router';
const dataStore = useDataStore();
const router = useRouter()
//主页加载符号
const mainLoading = ref(true)
// 是否是新建job
const jobListPage = ref(true)
// 新job的各种属性
const newJob = ref('')
// 弹出框
const dialogVisible = ref(false)
const deleteDialogVisible = ref(false)
// 任务列表
const jobList = ref([
    {
        job_name: '第一次job',
        created_time: '2022-07-31',
        id: ''
    },
    {
        job_name: '第二次job',
        created_time: '2022-07-31',
        id: ''
    },
    {
        job_name: '第三次job',
        created_time: '2022-07-31',
        id: ''
    },
])

// 时间戳转换为正常时间格式
const transTime = (timeStamp) => {
    var date = new Date();
    date.setTime(timeStamp * 1000);
    var y = date.getFullYear();
    var m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    var d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    var h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    var minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    var second = date.getSeconds();
    second = second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}

// 获取任务列表
const getJobList = () => {
    mainLoading.value = true
    DataImport.GetJobList().then((res) => {
        mainLoading.value = false
        if (res.data.result == 0) {
            ElNotification({
                title: "获取失败",
                message: res.data.message,
                type: "error",
                duration: 3000
            });
        } else {
            jobList.value = res.data.job_list
            jobList.value.forEach((item) => {
                item.created_time = transTime(item.created_time)
            })
        }
    }).catch((err) => {
        mainLoading.value = false
        // loading.value = false
        ElNotification({
            title: "获取失败",
            message: err,
            type: "error",
            duration: 3000
        });
    })
}

onMounted(() => {
    // 向后端查询joblist 包括名称 创建时间 点击按钮
    getJobList()
})

// 创建job 
const JobCreate = () => {
    if (newJob.value == '') {
        ElNotification({
            title: "请填写名称",
            message: "请填写名称",
            type: "warning",
            duration: 3000
        });
        return
    }

    var job_name_list = jobList.value.map((item) => {
        return item.job_name
    })

    if (job_name_list.indexOf(newJob.value) >= 0) {
        ElNotification({
            title: "名称不可重复",
            message: "名称不可重复",
            type: "warning",
            duration: 3000
        });
        return
    }

    dialogVisible.value = false
    jobListPage.value = false
}

//  查看job
const JobAnalyse = (item) => {
    // 跳转到job的name所对应的界面

    dataStore.setDataImportResult(item.job_name)
    router.push({ name: '数据观察' })

    // console.log(dataStore)
}

// 删除job
const JobDelete = () => {
    // 删除job 调接口
    var data = new FormData()
    data.append('job_id', chosenJob.value.job_id)
    DataImport.DeleteJob(data).then((res) => {
        deleteDialogVisible.value = false
        if (res.data.result == 0) {
            ElNotification({
                title: "删除失败",
                message: res.data.message,
                type: "error",
                duration: 3000
            });
        } else {
            getJobList()
        }
    }).catch((err) => {
        ElNotification({
            title: "删除失败",
            message: err,
            type: "error",
            duration: 3000
        });
    })
}

// 要删除的job
const chosenJob = ref({
    job_name: '第三次job',
    created_time: '2022-07-31',
    id: -1
})

const JobDeleteConfirm = (item) => {
    console.log(item)
    chosenJob.value = item
    deleteDialogVisible.value = true
    // 确定要删除的是哪个
}

// 记录有几个文件上传成功
const uploadSuccessFileSet = ref(new Set())
const uploadSuccess = (type) => {
    uploadSuccessFileSet.value.add(type)
    console.log('已经上传完毕的文件类型构成的set为', uploadSuccessFileSet.value)
    if (uploadSuccessFileSet.value.size == 3) {
        // 跳转 调接口获得最新一次的jobname
        DataImport.GetIdentifier({
            job_name: newJob.value
        }).then((res) => {
            // console.log(res) // 获取加存储
            if (res.data.result == 0) {
                ElNotification({
                    title: "合并失败",
                    message: res.data.message,
                    type: "error",
                    duration: 3000
                });
            } else {
                dataStore.setDataImportResult(newJob.value)
                router.push({ name: '数据观察' })
            }
        }).catch((err) => {
            ElNotification({
                title: "获取唯一特征码失败",
                message: err,
                type: "error",
                duration: 3000
            });
        })
    }
}

//返回到任务列表
const backToJobList = () => {
    newJob.value = ''
    jobListPage.value = true
}

</script>
<style scoped lang='scss'>
.job-wrap {
    width: 100%;
    height: 100%;
    overflow: auto;

    .job-list {
        margin: auto;
        width: 70%;

        .job-list-btn {
            float: right;
            display: block;
            margin: 10px 0;
        }
    }
}

.main-wrap {
    width: 100%;
    height: 100%;
    overflow: auto;

    .main-wrap-btn {
        margin: 10px 0 0 10px;
    }

    .Uploader {
        width: 100%;
        height: 24vh;
    }
}
</style>