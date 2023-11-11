import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/v1/',
    timeout: 1000,
    withCredentials: true,
    headers: { 'X-Developer': 'XuanBachDotDev' }
});

axiosInstance.interceptors.response.use((res) => res.data)

export default axiosInstance