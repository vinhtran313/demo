import axios from "@/utils/axios";

export const getNotices = async (params) => {
  const res = await axios.get("/notices", { params });
  return res.data;
};

export const getNotice = async (id) => {
  const res = await axios.get(`/notices/${id}`);
  return res.data;
};

export const getUnreadNotice = async () => {
  const res = await axios.get(`/notices/unread`);
  return res.data;
};

export const markNoticeRead = async (id) => {
  const res = await axios.put(`/notices/${id}/read`);
  return res.data;
};
