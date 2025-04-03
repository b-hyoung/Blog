import axios from "axios";
import useTokenStore from '../store/tokenStore';
import { USER_API } from "./LoginAPi";
// REACT_APP_API_URL=http://localhost:8000
const api = axios.create({
  baseURL: process.env.REACT_APP_API_BASE
});

api.interceptors.request.use((config) => {
  const token = useTokenStore.getState().accessToken;
  if (!config.url.includes('/users/')) {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

let isRefreshing = false;

api.interceptors.response.use(
  response => response,
  async (error) => {
    const originalRequest = error.config;
    const tokenStore = useTokenStore.getState();

    if (error.response?.status === 401 && !originalRequest._retry && tokenStore.refreshToken) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const res = await api.post(USER_API.GET_REFRESHTOKEN, {
            refresh: tokenStore.refreshToken,
          });

          const { access } = res.data;
          useTokenStore.getState().setTokens({
            accessToken: access,
            refreshToken: tokenStore.refreshToken,
          });

          originalRequest.headers.Authorization = `Bearer ${access}`;
          return api(originalRequest);
        } catch (err) {
          useTokenStore.getState().clearTokens();
          alert('세션이 만료되어 자동 로그아웃되었습니다.');
          window.location.href = '/login';
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }
    }

    return Promise.reject(error);
  }
);

export default api;