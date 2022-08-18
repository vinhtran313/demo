import axios from "@/utils/axios";

export const getUsers = async (params) => {
  const res = await axios.get("/admin/users", { params });
  return res.data;
};
