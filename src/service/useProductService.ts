import { useQuery } from '@tanstack/react-query';

import { getProductDetail, getProductList } from '@/api/product';
import { ProductDetailRequest, ProductListRequest } from '@/types';
import { UseQueryOptionsType } from '@/types/type';

const useProductService = () => {
  const useProductListQuery = (payload: ProductListRequest, options?: UseQueryOptionsType) => {
    return useQuery({
      queryKey: ['productList', payload.categoryId],
      queryFn: () => getProductList(payload),
      ...options,
    });
  };

  const useProductDetailQuery = (payload: ProductDetailRequest, options?: UseQueryOptionsType) => {
    return useQuery({
      queryKey: ['productList', payload.productId],
      queryFn: () => getProductDetail(payload),
      ...options,
    });
  };

  return { useProductListQuery, useProductDetailQuery };
};

export default useProductService;
