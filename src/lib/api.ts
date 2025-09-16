import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';

// API 인스턴스 생성
const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/${process.env.NEXT_PUBLIC_API_VERSION}`;

const axiosInstance: AxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 요청 인터셉터 - Bearer 토큰 자동 설정
axiosInstance.interceptors.request.use(
  (config) => {
    // 클라이언트 사이드에서만 localStorage 접근
    if (typeof window !== 'undefined') {
      const accessToken = tokenManager.getAccessToken();
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 에러 처리
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    /**
     * HttpStatus.OK (200)
     * HttpStatus.CREATED (201)
     */
    return response;
  },
  (error) => {
    // 401 에러 시 토큰 제거 및 로그인 페이지로 리다이렉트
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
      }
    }

    throw error;
  }
);

// HTTP 메소드 타입 정의
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

// API 요청 옵션 타입
interface ApiRequestOptions {
  method: HttpMethod;
  url: string;
  params?: unknown;
  headers?: Record<string, string>;
}

// 통합 API 통신 함수
export const apiClient = <T = unknown>({
  method,
  url,
  params: data,
  headers = {},
}: ApiRequestOptions): Promise<AxiosResponse<T>> => {
  const instance: AxiosRequestConfig = {
    method,
    url,
    headers,
  };

  try {
    switch (method) {
      case 'GET':
      case 'DELETE':
        return axiosInstance(instance);
      case 'POST':
      case 'PUT':
      case 'PATCH':
        return axiosInstance({
          ...instance,
          data,
        });
    }
  } catch (error) {
    throw error;
  }
};

// 토큰 관리 함수들
export const tokenManager = {
  // 토큰 저장
  setTokens: (accessToken: string, refreshToken?: string) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('accessToken', accessToken);
      if (refreshToken) {
        localStorage.setItem('refreshToken', refreshToken);
      }
    }
  },

  // 토큰 가져오기
  getAccessToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('accessToken');
    }
    return null;
  },

  getRefreshToken: (): string | null => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('refreshToken');
    }
    return null;
  },

  // 토큰 제거
  clearTokens: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    }
  },
};

export default axiosInstance;
