import axios from "@/utils/axios";

export const getKneePain = async (params) => {
  const res = await axios.get(`/knee_pains`, { params });
  return res.data;
};

export const updateKneePain = async (data) => {
  const res = await axios.post(`/knee_pains`, data);
  return res.data;
};

export const getKneePainStatistics = async (params) => {
  const res = await axios.get(`/knee_pains/statistics`, { params });
  return res.data;
};
