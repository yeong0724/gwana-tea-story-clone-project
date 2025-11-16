'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';

import ProductDetailSkeleton from '@components/features/product/detail/ProductDetailSkeleton';
import { find } from 'lodash-es';
import { Share2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from '@/components/ui/carousel';
import { useProductService } from '@/service';
import { useMenuStore } from '@/stores';
import { Product } from '@/types';

const initial: Product = {
  productId: '',
  productName: '',
  categoryId: '',
  images: [],
  price: 0,
  shippingPrice: 0,
};

type Props = {
  productId: string;
};

const ProductDetailContainer = ({ productId }: Props) => {
  const { useProductDetailQuery } = useProductService();
  const {
    menu: { category },
  } = useMenuStore();

  const [product, setProduct] = useState<Product>({ ...initial });
  const [quantity, setQuantity] = useState<number>(1);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const { data: productDetailData, isFetching } = useProductDetailQuery(
    { productId },
    { enabled: !!productId }
  );

  useEffect(() => {
    if (productDetailData) {
      const { data } = productDetailData;
      setProduct(data);
    }
  }, [productDetailData]);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    api.on('select', () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  const categoryName = useMemo(() => {
    if (!product.categoryId) return '';
    const found = find(category, { menuId: product.categoryId });
    return found?.menuName || '';
  }, [category, product.categoryId]);

  const totalPrice = useMemo(() => {
    return (product.price || 0) * quantity;
  }, [product.price, quantity]);

  const handleQuantityChange = (value: number) => {
    if (value < 1) return;
    setQuantity(value);
  };

  const handlePurchase = () => {
    // TODO: 구매하기 로직 구현
    console.log('구매하기', { productId, quantity });
  };

  const handleAddToCart = () => {
    // TODO: 장바구니 추가 로직 구현
    console.log('장바구니 추가', { productId, quantity });
  };

  const handleShare = () => {
    // TODO: 공유하기 로직 구현
    console.log('공유하기', { productId });
  };

  const handleDotClick = (index: number) => {
    api?.scrollTo(index);
  };

  const shippingPrice = product.shippingPrice || 0;
  const freeShippingThreshold = 30000;
  const isFreeShipping = totalPrice >= freeShippingThreshold;

  return (
    <div className="max-w-[1000px] mx-auto px-4 py-8">
      {isFetching ? (
        <ProductDetailSkeleton />
      ) : (
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* 좌측: 이미지 캐러셀 */}
          <div className="flex-1 lg:flex-[0_0_50%]">
            {product?.images && product.images.length > 0 ? (
              <div className="w-full group">
                <Carousel className="w-full" setApi={setApi}>
                  <CarouselContent>
                    {product.images.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="relative w-full aspect-square">
                          <Image
                            src={image}
                            alt={`${product.productName} ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  {product.images.length > 1 && (
                    <>
                      <CarouselPrevious className="left-4 opacity-0 group-hover:opacity-100 disabled:opacity-0 transition-opacity" />
                      <CarouselNext className="right-4 opacity-0 group-hover:opacity-100 disabled:opacity-0 transition-opacity" />
                    </>
                  )}
                </Carousel>
                {/* 도트 네비게이션 */}
                {product.images.length > 1 && (
                  <div className="flex justify-center gap-2 mt-4">
                    {product.images.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => handleDotClick(index)}
                        className={`
                          w-2 h-2 rounded-full transition-all duration-300
                          ${current === index ? 'bg-black w-6' : 'bg-gray-300'}
                        `}
                        aria-label={`이미지 ${index + 1}로 이동`}
                      />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full aspect-square bg-gray-200 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </div>
            )}
          </div>

          {/* 우측: 상품 정보 */}
          <div className="flex-1 lg:flex-[0_0_50%] flex flex-col">
            {/* 브레드크럼과 공유 아이콘 */}
            <div className="flex items-center justify-between text-[18px] font-medium text-gray-400 mb-[24px]">
              <div>
                <span>티 제품</span>
                {categoryName && (
                  <>
                    <span className="mx-2">{'>'}</span>
                    <span>{categoryName}</span>
                  </>
                )}
              </div>
              <button
                onClick={handleShare}
                className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                aria-label="공유하기"
              >
                <Share2 size={18} className="text-gray-400" />
              </button>
            </div>

            {/* 상품명 */}
            <h1 className="text-xl lg:text-[20px] font-bold mb-[30px]">{product.productName}</h1>

            {/* 가격 */}
            <div className="text-[30px] mb-6">{product.price?.toLocaleString('ko-KR')}원</div>

            {/* 배송비 정보 */}
            <div className="mb-6 pb-6">
              <div className="text-[14px] text-gray-400">
                <span>배송비</span>
                <span className="ml-2">
                  {isFreeShipping ? (
                    <span className="font-medium">무료배송</span>
                  ) : (
                    <>
                      <span className="text-gray-900">
                        {shippingPrice.toLocaleString('ko-KR')}원
                      </span>
                    </>
                  )}
                </span>
              </div>
            </div>

            {/* 구매수량 */}
            <div className="flex items-center mt-[48px] justify-between mb-6 bg-gray-100 p-5">
              <label className="text-sm font-medium text-gray-700">구매수량</label>
              <div className="flex items-center">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                  className="h-11 w-11 rounded-none border-r-0 cursor-pointer text-lg bg-white"
                >
                  -
                </Button>
                <div className="w-24 text-center h-11 rounded-none border-x border-y border-gray-300 text-base bg-white flex items-center justify-center select-none">
                  {quantity}
                </div>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="h-11 w-11 rounded-none border-l-0 cursor-pointer text-lg"
                >
                  +
                </Button>
              </div>
            </div>

            {/* 상품금액 합계 */}
            <div className="flex items-center justify-between py-4 mb-6">
              <span className="text-base font-medium text-gray-700">상품금액 합계</span>
              <span className="text-2xl font-bold">{totalPrice.toLocaleString('ko-KR')}원</span>
            </div>

            {/* 버튼 영역 */}
            <div className="flex">
              <Button
                onClick={handleAddToCart}
                className="flex-[0_0_35%] h-12 text-base bg-black text-white hover:bg-gray-800 rounded-none rounded-l-none cursor-pointer"
              >
                장바구니
              </Button>
              <Button
                onClick={handlePurchase}
                className="flex-[0_0_65%] h-12 text-base bg-teal-600 text-white hover:bg-teal-700 rounded-none rounded-r-none cursor-pointer"
              >
                구매하기
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetailContainer;
