import axios from "axios";
import useTokenStore from '../store/tokenStore'

const api = axios.create({
    baseURL: 'http://localhost:8000'
})

api.interceptors.request.use((config) => {
    const token = useTokenStore.getState().accessToken;
    // 로그인 요청에는 토큰 제거
    if (!config.url.includes('/users/')) {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
  
    return config;
  });

export default api