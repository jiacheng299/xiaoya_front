import service from "../http/request2";
const url = {
    modelTrain: '/data/model-pipeline'
}

export class Model {
    static async ModelTrain(data) {
        return await service(url.modelTrain, {
            method: "post",
            responseType: "json",
            data,
        });
    }
}