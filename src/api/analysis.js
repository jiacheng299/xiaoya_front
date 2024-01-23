import service from '../http/request4';
const url = {
    featureImportance: '/analysis/feature-importance/',
    riskCurve: '/analysis/risk-curve/',
    datasetStatistics: '/analysis/dataset-statistics/',
};
export class Analysis {
    static async getFeatureImportance(data) {
        return await service(url.featureImportance, {
            method: 'post',
            responseType: 'json',
            data,
        });
    }
    static async getRiskCurve(data) {
        return await service(url.riskCurve, {
            method: 'post',
            responseType: 'json',
            data,
        });
    }
    static async getDatasetStatistics(data) {
        return await service(url.datasetStatistics, {
            method: 'post',
            responseType: 'json',
            data,
        });
    }
}