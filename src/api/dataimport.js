import service from "../http/request4";
const url = {
    fileUpload: '/data/feats-preview',
    getIdentifier: '/data/files-merge?job_name=test',
    getJobList: '/data/get-job-list',
    deleteJob: '/data/delete-job',
    dataAnalysis: '/data/data-analysis',
    dataChart:'/data/chart'
}
export class DataImport {
    static async FileUpload(data) {
        return await service(url.fileUpload, {
            method: "post",
            responseType: "json",
            data
        });
    }

    static async GetIdentifier(data) {
        return await service(url.getIdentifier, {
            method: "get",
            responseType: "json",
            params: data,
        });
    }

    static async GetJobList() {
        return await service(url.getJobList, {
            method: "get",
            responseType: "json",
        });
    }
    
    static async DeleteJob(data) {
        return await service(url.deleteJob, {
            method: "post",
            responseType: "json",
            data
        });
    }
    static async DataAnalysis(data) {
        let formData = new FormData();
        formData.append("job_name",data);
        return await service(url.dataAnalysis, {
            method: "post",
            responseType: "json",
            data:formData,
        });
    }
    static async DataChart(data) {
        let formData = new FormData();
        formData.append("job_name",data);
        return await service(url.dataChart, {
            method: "post",
            responseType: "json",
            data:formData,
        });
    }
}