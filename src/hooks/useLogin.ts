import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';

import { apiClient } from '@/lib/api';
import { UserAccountInfo } from '@/types/form-type';

// 로그인 API 함수
const loginApi = async (formData: UserAccountInfo) => {
  const response = await apiClient({
    method: 'POST',
    url: '/todo',
    params: formData,
  });
  return response.data;
};

// React Query 훅
export const useLogin = () => {
  return useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      console.log('로그인 성공:', data);
      // 성공 시 처리 (예: 토큰 저장, 페이지 이동 등)
    },
    onError: (error: AxiosError) => {
      alert(error?.message ?? '');
    },
  });
};
