import axios from "@/utils/axios";

export const getFood = async (params) => {
  const res = await axios.get(`/foods`, { params });
  return res.data;
};
