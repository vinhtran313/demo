import axios from "@/utils/axios";

export const getNotices = async (params) => {
  const res = await axios.get("/admin/notices", { params });
  return res.data;
};

export const createNotice = async (data) => {
  const res = await axios.post("/admin/notices", data);
  return res.data;
};
