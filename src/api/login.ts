import { postAxios } from '@/lib/api';
import type { ApiResponse } from '@/types';

const getAccessTokenByKakaoCode = async <T>(params: T) => {
  return postAxios<ApiResponse<string>>({
    url: '/user/callback',
    params,
  });
};

const fetchLogin = async <T, V>(params: V) => {
  return postAxios<T>({
    url: '/user/signin',
    params,
  });
};

export { getAccessTokenByKakaoCode, fetchLogin };
