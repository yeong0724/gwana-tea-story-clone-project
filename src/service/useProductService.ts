import { useQuery } from '@tanstack/react-query';

import { getProductList } from '@/api/product';
import { UseQueryOptionsType } from '@/types/type';

const useProductService = () => {
  const useProductListQuery = <T extends { categoryId?: string }>(
    payload: T,
    options?: UseQueryOptionsType
  ) => {
    return useQuery({
      queryKey: ['productList', payload.categoryId],
      queryFn: () => getProductList<T>(payload),
      ...options,
    });
  };

  return { useProductListQuery };
};

export default useProductService;
