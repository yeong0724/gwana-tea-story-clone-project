// API 응답 타입 정의
export interface ApiResponse<T = unknown> {
  success: boolean;
  data: T;
  message?: string;
  error?: string;
}

// 사용자 정보 타입
export interface User {
  id: string;
  email: string;
  name: string;
  profileImage?: string;
}

// 로그인 요청 타입
export interface LoginRequest {
  email: string;
  password: string;
}

// 로그인 응답 타입
export interface LoginResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

// 소셜 로그인 요청 타입
export interface SocialLoginRequest {
  provider: 'google' | 'kakao' | 'naver';
  code: string;
  state?: string;
}

// 프로필 업데이트 요청 타입
export interface UpdateProfileRequest {
  name?: string;
  profileImage?: string;
}
