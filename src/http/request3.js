import axios from "axios";
const service = axios.create({
    baseURL:"http://v.ai-care.top",
    timeout:0,
})
export default service;