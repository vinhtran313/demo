import axios from "@/utils/axios";

export const updateMood = async (data) => {
  const res = await axios.post(`/moods`, data);
  return res.data;
};

export const getMood = async (params) => {
  const res = await axios.get(`/moods`, { params });
  return res.data;
};

export const getMoodStatistics = async (params) => {
  const res = await axios.get(`/moods/statistics`, { params });
  return res.data;
};
