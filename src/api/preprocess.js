import service from "../http/request2";
const url = {
    dataSplit: '/data/datasets-split'
}

export class DataPreProcess {
    static async DataSplit(data) {
        return await service(url.dataSplit, {
            method: "post",
            responseType: "json",
            data,
        });
    }
}