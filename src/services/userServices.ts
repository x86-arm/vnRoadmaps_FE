import axiosInstance from '@/utils/axios';

const baseURL = "/user";

const userServices = {
  updateUserData: (data: {
    email: string;
    fullname: string;
    password: string;
  }) => {
    const url = baseURL + "/update";
    return axiosInstance.post(url, data);
  },
};

export default userServices;
