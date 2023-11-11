import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/v1/',
    withCredentials: true,
    headers: { 'X-Developer': 'XuanBachDotDev' }
});

axiosInstance.interceptors.response.use((res) => {
    if (res.status == 200) return res.data
    return res.data
})

export default axiosInstance