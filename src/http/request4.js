import axios from "axios";
const service = axios.create({
    baseURL:"http://127.0.0.1:8080",
    timeout:0,
})
service.interceptors.request.use(
    (config)=>{
        const token = localStorage.getItem("token");
        if(token && token.length>0){
            config.headers.Authorization = token;
        }
        return config;
    }
)
export default service;