import { useQuery } from '@tanstack/react-query';
import api from '../Api/axiosInstance';
import { POST_API } from '../Api/PostApi';

const fetchPosts = async (type) => {
  const response = await api.get(POST_API.GET_POSTS_TYPE(type));
  return response.data;
};

export const usePosts = (type) => {
  return useQuery({
    queryKey: ['posts', type],       // type에 따라 자동 캐싱 및 분리됨
    queryFn: () => fetchPosts(type), // 위 axios 요청 함수 사용
  });
};