import axios from "@/utils/axios";

export const getSilmee = async (userId) => {
  const res = await axios.get(`/users/${userId}/silmee`);
  return res.data;
};

export const getSilmeeState = async (userId) => {
  const res = await axios.get(`/users/${userId}/silmee/state`);
  return res.data;
};

export const createSilmee = async (userId, data) => {
  const res = await axios.post(`/users/${userId}/silmee`, data);
  return res.data;
};
