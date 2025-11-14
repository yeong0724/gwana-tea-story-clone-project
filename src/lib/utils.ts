/* eslint-disable @typescript-eslint/no-explicit-any */
import { AxiosError } from 'axios';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { DecodedToken, FormatEnum } from '@/types/type';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const getRegexpByType = (type: FormatEnum = '') => {
  switch (type) {
    case 'number':
      return /[^0-9]/g;
    case 'text':
      return /[0-9]/g;
    default:
      return '';
  }
};

// 비밀번호에 특수문자가 최소 2개 포함되어 있는지 검증
const pwdSpecialCharValidate = (password: string) => {
  const specialChars = password.match(/[!@#$%^&*()_+\-=\[\]{}|;':",./<>?~`]/g);
  return specialChars && specialChars.length >= 2;
};

// 토큰 관리 함수들
const tokenManager = {
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
  getDecodeToken: (token: string): DecodedToken | null => {
    const base64Url = token.split('.')[1];
    if (!base64Url) return null;

    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(jsonPayload);
  },
};

const createAxiosError = () => {
  return new AxiosError(
    '리프레시 토큰이 만료되었습니다.',
    'REFRESH_TOKEN_EXPIRED',
    undefined,
    undefined,
    {
      status: 401,
      statusText: 'Unauthorized',
      data: {
        success: false,
        code: '4005',
        message: '로그인이 만료되었습니다. 다시 로그인해주세요.',
        data: null,
      },
      headers: {},
      config: {} as any,
    }
  );
};

export { getRegexpByType, pwdSpecialCharValidate, tokenManager, createAxiosError };
