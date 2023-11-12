import axiosInstance from '@/utils/axios';

const baseURL = "/services/";

export const provinceServices = {
  getProvince: (data: { slug: string }, accessToken?: string) => {
    const url = baseURL + "getProvince/" + data.slug;
    return axiosInstance.post(url, null, {
      headers: {
        Authorization: `JWT ${accessToken}`
      }
    });
  },
  getProvincesSlug: (accessToken?: string) => {
    const url = baseURL + "getProvinceSlug";
    return axiosInstance.post(url, null, {
      headers: {
        Authorization: `JWT ${accessToken}`
      }
    })
  },
};
