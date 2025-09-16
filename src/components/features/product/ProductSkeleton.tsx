const ProductSkeleton = () => {
  return (
    <>
      {/* 상품 목록 스켈레톤 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-5 shadow-sm border border-gray-100 h-80 animate-pulse"
          >
            {/* 상품 이미지 스켈레톤 */}
            <div className="w-full h-48 bg-gray-200 rounded-lg mb-4 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            </div>

            {/* 상품 제목 스켈레톤 */}
            <div className="space-y-2 mb-3">
              <div className="h-4 bg-gray-200 rounded w-3/4 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </div>
              <div className="h-4 bg-gray-200 rounded w-1/2 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
              </div>
            </div>

            {/* 가격 스켈레톤 */}
            <div className="h-5 bg-gray-200 rounded w-1/3 relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
            </div>
          </div>
        ))}
      </div>

      {/* 추가 스크롤을 위한 더미 스켈레톤 */}
      <div className="mt-16 space-y-4">
        {Array.from({ length: 4 }, (_, index) => (
          <div
            key={index}
            className="h-25 bg-white rounded-lg border border-gray-100 animate-pulse"
          >
            <div className="p-4 space-y-3">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gray-200 rounded relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                </div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 rounded w-2/3 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                  </div>
                  <div className="h-3 bg-gray-200 rounded w-1/2 relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default ProductSkeleton;
