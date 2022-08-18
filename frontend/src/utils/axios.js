import axios from "axios";
import store from "@/store";

const instance = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
});

instance.interceptors.request.use(
  (config) => {
    const userID = store.state.userID;
    const sessionKey = store.state.sessionKey;
    if (userID && sessionKey) {
      config.headers["userID"] = userID;
      config.headers["sessionKey"] = sessionKey;
    }
    return config;
  },
  (error) => error
);

export default instance;
