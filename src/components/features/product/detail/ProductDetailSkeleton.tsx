const ProductDetailSkeleton = () => {
  return (
    <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
      {/* 좌측: 이미지 스켈레톤 */}
      <div className="flex-1 lg:flex-[0_0_50%]">
        <div className="w-full aspect-square bg-gray-200 rounded-lg relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      </div>

      {/* 우측: 상품 정보 스켈레톤 */}
      <div className="flex-1 lg:flex-[0_0_50%] flex flex-col">
        {/* 브레드크럼과 공유 아이콘 */}
        <div className="flex items-center justify-between mb-[24px]">
          <div className="h-5 bg-gray-200 rounded w-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </div>
          <div className="w-10 h-10 bg-gray-200 rounded-full relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </div>
        </div>

        {/* 상품명 */}
        <div className="mb-[30px] space-y-2">
          <div className="h-6 bg-gray-200 rounded w-3/4 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </div>
          <div className="h-6 bg-gray-200 rounded w-1/2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </div>
        </div>

        {/* 가격 */}
        <div className="h-7 bg-gray-200 rounded w-32 mb-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>

        {/* 배송비 정보 */}
        <div className="mb-6 pb-6">
          <div className="h-4 bg-gray-200 rounded w-48 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </div>
        </div>

        {/* 구매수량 */}
        <div className="flex items-center justify-between mb-6 bg-gray-100 p-5">
          <div className="h-4 bg-gray-200 rounded w-16 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </div>
          <div className="flex items-center">
            <div className="h-11 w-11 bg-gray-200 rounded-none relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            </div>
            <div className="w-24 h-11 bg-gray-200 rounded-none relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            </div>
            <div className="h-11 w-11 bg-gray-200 rounded-none relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            </div>
          </div>
        </div>

        {/* 상품금액 합계 */}
        <div className="flex items-center justify-between py-4 mb-6">
          <div className="h-5 bg-gray-200 rounded w-24 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </div>
          <div className="h-7 bg-gray-200 rounded w-32 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </div>
        </div>

        {/* 버튼 영역 */}
        <div className="flex">
          <div className="flex-[0_0_35%] h-12 bg-gray-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </div>
          <div className="flex-[0_0_65%] h-12 bg-gray-200 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
