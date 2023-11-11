import axiosInstance from '@/utils/axios';

const baseURL = "/roadmaps/";

export const provinceServices = {
  getProvince: (data: { slug: string }) => {
    const url = baseURL + data.slug;
    return axiosInstance.get(url);
  },
  getProvincesSlug: () => {
    const url = baseURL + "getProvinceSlug";
    return axiosInstance.post(url);
  },
};
