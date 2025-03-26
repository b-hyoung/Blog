import axios from "axios";
import useTokenStore from '../store/tokenStore'

const api = axios.create({
    baseURL: 'http://localhost:8000'
})

api.interceptors.request.use((config) => {
    const token = useTokenStore.getState().accessToken
    if(token) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
})

export default api