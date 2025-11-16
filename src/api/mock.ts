import { Product } from '@/types';

const dummyProductList: Product[] = [
  // 녹차
  {
    productId: '1',
    productName: '관아수제차 세작(녹차) 유기농 하동녹차(80g)',
    categoryId: 'greenTea',
    images: [
      '/images/product/greenTea/greenTeaSejak/thumbnail/greenTeaSejak_1.webp',
      '/images/product/greenTea/greenTeaSejak/thumbnail/greenTeaSejak_2.webp',
    ],
    price: 70000,
  },
  {
    productId: '2',
    productName: '관아수제차 우전 유기농 하동녹차(80g)',
    categoryId: 'greenTea',
    images: [
      '/images/product/greenTea/greenTeaUjeon/thumbnail/greenTeaUjeon_1.webp',
      '/images/product/greenTea/greenTeaUjeon/thumbnail/greenTeaUjeon_2.webp',
      '/images/product/greenTea/greenTeaUjeon/thumbnail/greenTeaUjeon_3.webp',
    ],
    price: 110000,
  },
  {
    productId: '3',
    productName: '관아수제차 녹차 드립백',
    categoryId: 'greenTea',
    images: [
      '/images/product/greenTea/greenTeaDripBag/thumbnail/greenTeaDripBag_1.webp',
      '/images/product/greenTea/greenTeaDripBag/thumbnail/greenTeaDripBag_2.webp',
      '/images/product/greenTea/greenTeaDripBag/thumbnail/greenTeaDripBag_3.webp',
    ],
    price: 10000,
    shippingPrice: 4000,
  },
  // 발효차
  {
    productId: '4',
    productName: '관아수제차 발효차(홍차) 유기농 하동홍차(80g)',
    categoryId: 'blackTea',
    images: [
      '/images/product/blackTea/fermentedTea_1.webp',
      '/images/product/blackTea/fermentedTea_2.webp',
    ],
    price: 60000,
  },
  {
    productId: '5',
    productName: '관아수제차 홍차 드립백',
    categoryId: 'blackTea',
    images: [
      '/images/product/blackTea/fermentedTeaDripBag_1.webp',
      '/images/product/blackTea/fermentedTeaDripBag_2.webp',
      '/images/product/blackTea/fermentedTeaDripBag_3.webp',
    ],
    price: 10000,
    shippingPrice: 4000,
  },
  // 대용차
  {
    productId: '6',
    productName: '하동 가을무우차 무카페인 자연차 전통차 관아수제차',
    categoryId: 'substituteTea',
    images: [
      '/images/product/substituteTea/autumnRadishTea_1.webp',
      '/images/product/substituteTea/autumnRadishTea_2.webp',
    ],
    price: 25000,
    shippingPrice: 4000,
  },
  {
    productId: '7',
    productName: '하동 야생 쑥차 관아수제차 무카페인 건강차',
    categoryId: 'substituteTea',
    images: ['/images/product/substituteTea/wildMugwortTea_1.webp'],
    price: 30000,
    shippingPrice: 4000,
  },
  {
    productId: '8',
    productName: '구기자차 무카페인 유기농 전통차 관아수제차',
    categoryId: 'substituteTea',
    images: ['/images/product/substituteTea/gugijaTea_1.webp'],
    price: 70000,
  },
  {
    productId: '9',
    productName: '하동 목련꽃차 무카페인 꽃차 관아수제차 지리산 전통차',
    categoryId: 'substituteTea',
    images: [
      '/images/product/substituteTea/magnoliaFlowerTea_1.webp',
      '/images/product/substituteTea/magnoliaFlowerTea_2.webp',
    ],
    price: 30000,
    shippingPrice: 4000,
  },
];

export { dummyProductList };
