import axios from "axios";
import useTokenStore from '../store/tokenStore';

const api = axios.create({
  baseURL: 'http://54.180.123.50'
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
          const res = await axios.post(`http://localhost:8000/api/token/refresh/`, {
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