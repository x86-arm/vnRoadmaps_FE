import axiosInstance from '@/utils/axios';

const baseURL = "/auth";

export interface LoginData { username: string; password: string }

const authServices = {
  login: (data: LoginData) => {
    const url = baseURL + "/login";
    return axiosInstance.post(url, data);
  },
  signup: (data: { fullname: string; email: string; password: string }) => {
    const url = baseURL + "/signup";
    return axiosInstance.post(url, data);
  },
  refreshToken: (data?: { refreshToken: string }) => {
    const url = baseURL + "/refresh-token";
    return axiosInstance.post(url, data);
  },
  me: () => {
    const url = baseURL + "/me";
    return axiosInstance.post(url, {});
  },
  logout: () =>
  // data: { accessToken: string }
  {
    const url = baseURL + "/logout";
    return axiosInstance.post(
      url
      // data
    );
  },
};

export default authServices;
