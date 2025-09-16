import { useMemo } from 'react';

import { useSuspenseQuery } from '@tanstack/react-query';

import { useProductMenuCodeStore } from '@/stores';

const ProductList = () => {
  const getProductMenu = () => useProductMenuCodeStore.getState().productMenu;

  const getProductList = (delay: number = 3000): Promise<number> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(10);
      }, delay);
    });
  };

  /* eslint-disable react-hooks/exhaustive-deps */
  const { parentMenuCode, childMenuCode } = useMemo(() => getProductMenu(), [getProductMenu()]);

  const { data } = useSuspenseQuery({
    queryKey: ['suspense', 'product', parentMenuCode, childMenuCode],
    queryFn: () => getProductList(2000),
    staleTime: 0,
    gcTime: 0,
  });

  return (
    <>
      {/* 상품 목록 플레이스홀더 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Array.from({ length: data }, (_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 h-80 flex items-center justify-center text-gray-400 text-base"
          >
            상품 {index + 1} 영역
          </div>
        ))}
      </div>

      {/* 추가 스크롤을 위한 더미 콘텐츠 */}
      <div className="mt-16 space-y-4">
        {Array.from({ length: data }, (_, index) => (
          <div key={index} className="h-25 bg-white rounded-lg border border-gray-100"></div>
        ))}
      </div>
    </>
  );
};

export default ProductList;
