import { useEffect, useState } from 'react';

import { filter, map } from 'lodash-es';

import { useProductService } from '@/service';
import { Product, ProductListRequest } from '@/types';

import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';

const DUMMY_PRODUCT_LIST: Product[] = [
  {
    productId: '1',
    productName: '관아수제차 녹차 드립백',
    categoryId: 'greenTea',
    images: [
      '/images/product/greenTea/greenTeaDripBag_1.png',
      '/images/product/greenTea/greenTeaDripBag_2.png',
    ],
    price: 10000,
    shippingPrice: 4000,
    isLiked: false,
  },
  {
    productId: '2',
    productName: '관아수제차 세작(녹차) 유기농 하동녹차(80g)',
    categoryId: 'greenTea',
    images: [
      '/images/product/greenTea/greenTeaSejak_1.png',
      '/images/product/greenTea/greenTeaSejak_2.png',
    ],
    price: 70000,
    isLiked: false,
  },
  {
    productId: '3',
    productName: '관아수제차 우전 유기농 하동녹차(80g)',
    categoryId: 'greenTea',
    images: [
      '/images/product/greenTea/greenTeaUjeon_1.png',
      '/images/product/greenTea/greenTeaUjeon_2.png',
      '/images/product/greenTea/greenTeaUjeon_3.png',
    ],
    price: 110000,
    isLiked: false,
  },
  {
    productId: '4',
    productName: '관아수제차 발효차(홍차) 유기농 하동홍차(80g)',
    categoryId: 'blackTea',
    images: ['https://placehold.co/600x400', 'https://placehold.co/600x400'],
    price: 38000,
    shippingPrice: 4000,
    isLiked: false,
  },
  {
    productId: '5',
    productName: '관아수제차 홍차 드립백',
    categoryId: 'blackTea',
    images: ['https://placehold.co/600x400', 'https://placehold.co/600x400'],
    price: 20000,
    shippingPrice: 4000,
    isLiked: false,
  },
  {
    productId: '6',
    productName: '하동 가을무우차 무카페인 자연차 전통차 관아수제차',
    categoryId: 'substituteTea',
    images: [
      '/images/product/substituteTea/autumnRadishTea_1.png',
      '/images/product/substituteTea/autumnRadishTea_2.png',
    ],
    price: 25000,
    shippingPrice: 4000,
    isLiked: false,
  },
  {
    productId: '7',
    productName: '하동 야생 쑥차 관아수제차 무카페인 건강차',
    categoryId: 'substituteTea',
    images: ['https://placehold.co/600x400', 'https://placehold.co/600x400'],
    price: 30000,
    shippingPrice: 4000,
    isLiked: false,
  },
  {
    productId: '8',
    productName: '구기자차 무카페인 유기농 전통차 관아수제차',
    categoryId: 'substituteTea',
    images: ['https://placehold.co/600x400', 'https://placehold.co/600x400'],
    price: 70000,
    isLiked: false,
  },
  {
    productId: '9',
    productName: '하동 목련꽃차 무카페인 꽃차 관아수제차 지리산 전통차',
    categoryId: 'substituteTea',
    images: ['https://placehold.co/600x400', 'https://placehold.co/600x400'],
    price: 30000,
    shippingPrice: 4000,
    isLiked: false,
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
  }, [productListData, categoryId]);

  return (
    <>
      {isFetching ? (
        <ProductSkeleton />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6">
          {map(productList, (product) => (
            <ProductCard key={product.productId} product={product} />
          ))}
        </div>
      )}
    </>
  );
};

export default ProductList;
