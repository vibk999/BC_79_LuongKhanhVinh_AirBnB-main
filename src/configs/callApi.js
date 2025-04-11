import axios from "axios";
import { BASE_URL, TOKEN_CYBERSOFT } from "../constants/api";
import { store } from "../main";

// Tạo instance axios với cấu hình cơ bản
const requestApi = axios.create({
  baseURL: BASE_URL,
  headers: {
    TokenCybersoft: TOKEN_CYBERSOFT, // header cố định
  },
});

requestApi.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.user.userInfo?.token;

    if (token) {
      config.headers.token = token;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { requestApi };
