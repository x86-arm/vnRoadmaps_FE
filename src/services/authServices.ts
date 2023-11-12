import axiosInstance from '@/utils/axios';

const baseURL = "/auth";

export interface LoginData { email: string; password: string }
export interface SignupData { email: string; fullname: string, password: string }
export interface ForgotPasswordData { email: string }
export interface RecoverPassword {
  reqID: string,
  newPassword: string
}

const authServices = {
  login: (data: LoginData) => {
    const url = baseURL + "/login";
    return axiosInstance.post(url, data);
  },
  signup: (data: SignupData) => {
    const url = baseURL + "/signup";
    return axiosInstance.post(url, data);
  },
  refreshToken: (data?: { refreshToken: string }) => {
    const url = baseURL + "/refresh-token";
    return axiosInstance.post(url, data);
  },
  forgotPassword: (data: ForgotPasswordData) => {
    const url = baseURL + "/forgotPassword";
    return axiosInstance.post(url, data);
  },
  recoverPassword: (data: RecoverPassword) => {
    const url = baseURL + "/recoverPassword";
    return axiosInstance.post(url, data);
  },
  info: (accessToken: string) => {
    const url = "users/info";
    return axiosInstance.post(url, null, {
      headers: {
        Authorization: `JWT ${accessToken}`
      }
    });
  },
  logout: (accessToken?: string
  ) => {
    const url = baseURL + "/logout";
    return axiosInstance.post(
      url, null, { headers: { 'Authorization': 'JWT ' + accessToken } }
    );
  },
};

export default authServices;
