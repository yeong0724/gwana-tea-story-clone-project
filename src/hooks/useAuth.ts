import { useEffect, useState } from 'react';

import { authApi } from '@/api/auth';
import { tokenManager } from '@/lib/api';
import {
  LoginRequest,
  SocialLoginRequest,
  User,
} from '@/types/api';

interface UseAuthReturn {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (data: LoginRequest) => Promise<void>;
  socialLogin: (data: SocialLoginRequest) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (data: {
    name?: string;
    profileImage?: string;
  }) => Promise<void>;
}

export const useAuth = (): UseAuthReturn => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // 현재 사용자 정보 조회
  const fetchCurrentUser = async () => {
    try {
      const response = await authApi.getCurrentUser();
      if (response.success) {
        setUser(response.data);
      }
    } catch (error) {
      console.error('사용자 정보 조회 실패:', error);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // 로그인
  const login = async (data: LoginRequest) => {
    try {
      const response = await authApi.login(data);
      if (response.success) {
        tokenManager.setTokens(
          response.data.accessToken,
          response.data.refreshToken
        );
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('로그인 실패:', error);
      throw error;
    }
  };

  // 소셜 로그인
  const socialLogin = async (data: SocialLoginRequest) => {
    try {
      const response = await authApi.socialLogin(data);
      if (response.success) {
        tokenManager.setTokens(
          response.data.accessToken,
          response.data.refreshToken
        );
        setUser(response.data.user);
      }
    } catch (error) {
      console.error('소셜 로그인 실패:', error);
      throw error;
    }
  };

  // 로그아웃
  const logout = async () => {
    try {
      await authApi.logout();
    } catch (error) {
      console.error('로그아웃 API 호출 실패:', error);
    } finally {
      tokenManager.clearTokens();
      setUser(null);
    }
  };

  // 프로필 업데이트
  const updateProfile = async (data: {
    name?: string;
    profileImage?: string;
  }) => {
    try {
      const response = await authApi.updateProfile(data);
      if (response.success) {
        setUser(response.data);
      }
    } catch (error) {
      console.error('프로필 업데이트 실패:', error);
      throw error;
    }
  };

  // 컴포넌트 마운트 시 사용자 정보 조회
  useEffect(() => {
    const token = tokenManager.getAccessToken();
    if (token) {
      fetchCurrentUser();
    } else {
      setIsLoading(false);
    }
  }, []);

  return {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    socialLogin,
    logout,
    updateProfile,
  };
};
