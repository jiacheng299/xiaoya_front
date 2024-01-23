import service from "../http/request3";
const url = {
    statistics:"/new_statistics_data/",
}
export class Statistics {
    static async getData1(name) {
        return await service(url.statistics+name+"1.json", {
            method: "get",
            responseType: "json",
        });
    }
    static async getData2(name) {
        return await service(url.statistics+name+"2.json", {
            method: "get",
            responseType: "json",
        });
    }
}