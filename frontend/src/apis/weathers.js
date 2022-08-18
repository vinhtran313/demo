import axios from "@/utils/axios";

export const getCurrentWeather = async (params) => {
  const res = await axios.get(`/weathers/current`, { params });
  return res.data;
};
