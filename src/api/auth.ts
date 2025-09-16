import { apiClient } from '@/lib/api';
import {
  ApiResponse,
  LoginRequest,
  LoginResponse,
  SocialLoginRequest,
  UpdateProfileRequest,
  User,
} from '@/types/api';

// 인증 관련 API 함수들
export const authApi = {
  // 일반 로그인
  login: async (
    data: LoginRequest
  ): Promise<ApiResponse<LoginResponse>> => {
    return apiClient({
      method: 'POST',
      url: '/auth/login',
      data,
    });
  },

  // 소셜 로그인
  socialLogin: async (
    data: SocialLoginRequest
  ): Promise<ApiResponse<LoginResponse>> => {
    return apiClient({
      method: 'POST',
      url: '/auth/social-login',
      data,
    });
  },

  // 로그아웃
  logout: async (): Promise<ApiResponse> => {
    return apiClient({
      method: 'POST',
      url: '/auth/logout',
    });
  },

  // 토큰 갱신
  refreshToken: async (): Promise<
    ApiResponse<{ accessToken: string }>
  > => {
    return apiClient({
      method: 'POST',
      url: '/auth/refresh',
    });
  },

  // 현재 사용자 정보 조회
  getCurrentUser: async (): Promise<ApiResponse<User>> => {
    return apiClient({
      method: 'GET',
      url: '/auth/me',
    });
  },

  // 프로필 업데이트
  updateProfile: async (
    data: UpdateProfileRequest
  ): Promise<ApiResponse<User>> => {
    return apiClient({
      method: 'PATCH',
      url: '/auth/profile',
      data,
    });
  },

  // 회원가입
  register: async (data: {
    email: string;
    password: string;
    name: string;
  }): Promise<ApiResponse<User>> => {
    return apiClient({
      method: 'POST',
      url: '/auth/register',
      data,
    });
  },
};
