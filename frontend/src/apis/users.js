import axios from "@/utils/axios";

export const createUser = async (data) => {
  const res = await axios.post("/users", data);
  return res.data;
};

export const getUser = async (userId) => {
  const res = await axios.get(`/users/${userId}`);
  return res.data;
};

export const updateUser = async (userId, data) => {
  const res = await axios.put(`/users/${userId}`, data);
  return res.data;
};
