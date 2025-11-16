import { dummyProductList } from '@/api/mock';
import { Product, ProductDetailRequest, ProductListRequest } from '@/types';

const getProductList = async (params: ProductListRequest) => {
  await delayAsync();

  const { categoryId } = params;

  return {
    success: true,
    data:
      categoryId === 'all'
        ? dummyProductList
        : dummyProductList.filter((product) => product.categoryId === categoryId),
  };
  // return postAxios<ApiResponse<Product[]>>({
  //   url: 'product/list/search',
  //   params,
  // });
};

const getProductDetail = async (params: ProductDetailRequest) => {
  await delayAsync();

  const { productId } = params;

  return {
    success: true,
    data: dummyProductList.find((product) => product.productId === productId) as Product,
  };
};

const delayAsync = (delay: number = 1000): Promise<number> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(10);
    }, delay);
  });
};

export { getProductList, getProductDetail };
