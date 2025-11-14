import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

import { tokenManager } from '@/lib/utils';
import { HttpMethod } from '@/types/api';

// API 인스턴스 생성
const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VERSION}`;

const noInterceptorAxios: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 - Bearer 토큰 자동 설정
axiosInstance.interceptors.request.use(
  async (config) => {
    const accessToken = tokenManager.getAccessToken();
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 에러 처리
axiosInstance.interceptors.response.use(
  async (response: AxiosResponse) => {
    const { data } = response;
    if (data.code === '4005' && !data.success) {
      const accessToken = tokenManager.getAccessToken();
      try {
        const result = await noInterceptorAxios.post('/user/refresh/token', { accessToken });

        if (result.data.success) {
          // tokenManager.setAccessToken(result.data.accessToken);
          // return axiosInstance(response.config);
        }
      } catch (error) {
        throw error;
      }
    }

    /**
     * HttpStatus.OK (200)
     * HttpStatus.CREATED (201)
     */
    return response.data;
  },
  async (error) => {
    throw error;
  }
);

// API 요청 옵션 타입
interface ApiRequestOptions {
  method: HttpMethod;
  url: string;
  params?: unknown;
  headers?: Record<string, string>;
}

// 통합 API 통신 함수
export const apiClient = <T>({
  method,
  url,
  params: data,
  headers = {},
}: ApiRequestOptions): Promise<T> => {
  const instance: AxiosRequestConfig = {
    method,
    url,
    headers,
  };

  try {
    switch (method) {
      case HttpMethod.GET:
      case HttpMethod.DELETE:
        return axiosInstance(instance);
      case HttpMethod.POST:
      case HttpMethod.PUT:
      case HttpMethod.PATCH:
        return axiosInstance({
          ...instance,
          data,
        });
    }
  } catch (error) {
    throw error;
  }
};

type AxiosOptions = {
  url: string;
  params: unknown;
};

export const postAxios = <T>({ url, params }: AxiosOptions): Promise<T> => {
  return apiClient<T>({
    method: HttpMethod.POST,
    url,
    params,
  });
};

export const getAxios = <T>({ url }: Omit<AxiosOptions, 'params'>): Promise<T> => {
  return apiClient<T>({
    method: HttpMethod.GET,
    url,
  });
};

export default axiosInstance;
