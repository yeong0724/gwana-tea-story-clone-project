import { useEffect, useState } from 'react';

import { filter, map } from 'lodash-es';

import { useProductService } from '@/service';
import { Product, ProductListRequest } from '@/types';

import ProductSkeleton from './ProductSkeleton';

const DUMMY_PRODUCT_LIST: Product[] = [
  {
    productId: '1',
    productName: '관아수제차 녹차 드립백',
    categoryId: 'greenTea',
  },
  {
    productId: '2',
    productName: '관아수제차 세작(녹차) 유기농 하동녹차(80g)',
    categoryId: 'greenTea',
  },
  {
    productId: '3',
    productName: '관아수제차 우전 유기농 하동녹차(80g)',
    categoryId: 'greenTea',
  },
  {
    productId: '4',
    productName: '관아수제차 발효차(홍차) 유기농 하동홍차(80g)',
    categoryId: 'blackTea',
  },
  {
    productId: '5',
    productName: '관아수제차 홍차 드립백',
    categoryId: 'blackTea',
  },
  {
    productId: '6',
    productName: '하동 가을무우차 무카페인 자연차 전통차 관아수제차',
    categoryId: 'substituteTea',
  },
  {
    productId: '7',
    productName: '하동 야생 쑥차 관아수제차 무카페인 건강차',
    categoryId: 'substituteTea',
  },
  {
    productId: '8',
    productName: '구기자차 무카페인 유기농 전통차 관아수제차',
    categoryId: 'substituteTea',
  },
  {
    productId: '9',
    productName: '하동 목련꽃차 무카페인 꽃차 관아수제차 지리산 전통차',
    categoryId: 'substituteTea',
  },
];

type Props = {
  categoryId: string;
};

const ProductList = ({ categoryId }: Props) => {
  const { useProductListQuery } = useProductService();
  const [productList, setProductList] = useState<Array<Product>>([]);

  const { data: productListData, isFetching } = useProductListQuery<ProductListRequest>(
    { categoryId },
    { enabled: true, staleTime: 0 }
  );

  useEffect(() => {
    if (productListData) {
      setProductList(
        categoryId !== 'all' ? filter(DUMMY_PRODUCT_LIST, { categoryId }) : DUMMY_PRODUCT_LIST
      );
    }
  }, [productListData]);

  return (
    <>
      {/* 상품 목록 플레이스홀더 */}

      {/* {map(productList, (product, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 h-80 flex items-center justify-center text-gray-400 text-base"
          >
            상품 {index + 1} 영역
          </div>
        ))} */}
      {isFetching ? (
        <ProductSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {map(productList, ({ productId, productName }) => (
            <div
              key={productId}
              className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 h-80 flex items-center justify-center text-gray-400 text-base"
            >
              {productName}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ProductList;
