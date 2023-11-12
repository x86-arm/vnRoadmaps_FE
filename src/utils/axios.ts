import authServices from "@/services/authServices";
import { store } from "@/store";
import axios from "axios";

const axiosInstance = axios.create({
    baseURL: 'http://localhost:8000/v1/',
    withCredentials: true,
    headers: {
        'X-Developer': 'XuanBachDotDev',
    }
});
axiosInstance.interceptors.response.use((res) => {
    return res.data
}, async (err) => {
    const { response, config } = err;

    const status = response?.status;
    if (status == 401 || status == 403) {
        const res = await authServices.refreshToken({
            refreshToken: document.cookie.replace(
                /(?:(?:^|.*;\s*)refreshToken\s*=\s*([^;]*).*$)|^.*$/,
                '$1'
            )
        })
        return new Promise((resolve, reject) => {
            if (res.status == 200) {
                config.headers.Authorization = `JWT ` + document.cookie.replace(
                    /(?:(?:^|.*;\s*)refreshToken\s*=\s*([^;]*).*$)|^.*$/,
                    '$1'
                );
                resolve(axiosInstance(config));
            }
            reject(err)
        })

    }
    return Promise.reject(err);
})

export default axiosInstance