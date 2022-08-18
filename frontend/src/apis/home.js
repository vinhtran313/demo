import axios from "@/utils/axios";

export const getOverall = async (params) => {
  const res = await axios.get(`/home`, { params });
  return res.data;
};
