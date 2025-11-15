import { postAxios } from '@/lib/api';
import { ApiResponse, Product } from '@/types';

const getProductList = async <T>(params: T) => {
  await delayAsync();
  return {
    success: true,
    data: [],
  };
  // return postAxios<ApiResponse<Product[]>>({
  //   url: 'product/list/search',
  //   params,
  // });
};

const delayAsync = (delay: number = 1000): Promise<number> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(10);
    }, delay);
  });
};

export { getProductList };
