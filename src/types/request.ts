export interface GetAccessTokenByKakaoCodeRequest {
  code: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export type Non = object;

export interface ProductListRequest {
  categoryId: string;
}

export interface ProductDetailRequest {
  productId: string;
}
