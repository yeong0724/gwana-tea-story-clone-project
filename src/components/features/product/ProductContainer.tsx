'use client';

import { Suspense, useEffect, useState } from 'react';

import { findIndex, first, isNil } from 'lodash-es';
import { useShallow } from 'zustand/shallow';

import ProductList from '@/components/features/product/ProductList';
import ProductSkeleton from '@/components/features/product/ProductSkeleton';
import { useDragScroll } from '@/hooks/useDragScroll';
import { useProductMenuCodeStore } from '@/stores';
import type { ProductMenuType } from '@/stores/useProductMenuCodeStore';
import type { ItemType, SubMenuType } from '@/types/type';

type Props = {
  teaProductMenu: Array<SubMenuType>;
};

const ProductContainer = ({ teaProductMenu }: Props) => {
  const [menuOpenIndex, setMenuOpenIndex] = useState<number | null>(null);

  const { productMenu, setProductMenu } = useProductMenuCodeStore(
    useShallow((state) => ({
      productMenu: state.productMenu,
      setProductMenu: state.setProductMenu,
    }))
  );

  // 드래그 스크롤 훅들
  const categoryTabScroll = useDragScroll();
  const submenuButtonScroll = useDragScroll();

  useEffect(() => {
    const { parentMenuCode } = productMenu;
    setMenuOpenIndex(findIndex(teaProductMenu, { categoryCode: parentMenuCode }));
  }, [teaProductMenu, productMenu]);

  const onUpperMenuHandler = (index: number, categoryCode: string, category: string) => {
    if (categoryCode === 'ALL') {
      setMenuOpenIndex(null);

      setProductMenu({
        parentMenuCode: categoryCode,
        parentMenuName: category,
        childMenuCode: '',
        childMenuName: '',
      });

      return;
    }

    if (isNil(menuOpenIndex) || menuOpenIndex !== index) {
      setMenuOpenIndex(index);
      return;
    }

    setMenuOpenIndex(null);
  };

  const onMobileUpperMenuHandler = (
    index: number,
    categoryCode: string,
    category: string,
    items: Array<ItemType>
  ) => {
    if (categoryCode === 'ALL') {
      setMenuOpenIndex(null);

      setProductMenu({
        parentMenuCode: categoryCode,
        parentMenuName: category,
        childMenuCode: '',
        childMenuName: '',
      });

      return;
    }

    if (isNil(menuOpenIndex) || menuOpenIndex !== index) {
      setMenuOpenIndex(index);
    } else {
      setMenuOpenIndex(null);
    }

    const { submenuCode = '', submenuName = '' } = first(items) || {};

    setProductMenu({
      parentMenuCode: categoryCode,
      parentMenuName: category,
      childMenuCode: submenuCode,
      childMenuName: submenuName,
    });
  };

  const onLowerMenuHandler = (param: ProductMenuType) => {
    setProductMenu(param);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* 사이드 네비게이션 - 데스크톱용 */}
      <nav
        className="w-80 bg-white fixed top-25 overflow-y-auto flex-shrink-0 hidden lg:block"
        style={{ height: 'calc(100vh - 80px)' }}
      >
        {/* 네비 헤더 - 스티키 */}
        <div className="bg-white z-10 px-5 py-7">
          <h2 className="text-[28px] font-bold text-gray-900">티 제품</h2>
          <div className="w-[98%] h-px bg-gray-800 mt-3" />
        </div>

        {/* 메뉴 리스트 */}
        <div className="py-[5px]">
          {teaProductMenu.map(({ category, categoryCode, items }, index) => (
            <div key={categoryCode} className="mb-1">
              {/* 2뎁스 메뉴 */}
              <button
                onClick={() => onUpperMenuHandler(index, categoryCode, category)}
                className={`w-full px-5 py-4 text-left text-[20px] transition-all duration-500 cursor-pointer flex items-center justify-between hover:bg-gray-50 hover:text-green-800 font-bold text-black`}
              >
                <span>{category}</span>
                {categoryCode !== 'ALL' && (
                  <svg
                    className={`w-3 h-3 text-gray-400 transition-transform duration-500 ${
                      menuOpenIndex === index ? 'rotate-0' : '-rotate-90'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </button>

              {/* 3뎁스 서브메뉴 */}
              <div
                className={`bg-gray-50 transition-all duration-500 overflow-hidden ${
                  menuOpenIndex === index ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                {items.map(({ submenuName, submenuCode }) => (
                  <button
                    key={submenuCode}
                    onClick={() =>
                      onLowerMenuHandler({
                        parentMenuCode: categoryCode,
                        parentMenuName: category,
                        childMenuCode: submenuCode,
                        childMenuName: submenuName,
                      })
                    }
                    className={`w-full px-10 py-3 text-left text-[15px] transition-all duration-500 hover:text-green-800 cursor-pointer ${
                      productMenu.childMenuCode === submenuCode
                        ? 'font-bold text-[16px] text-green-800'
                        : 'text-gray-600'
                    }`}
                  >
                    {submenuName}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>

      {/* 메인 컨텐츠 영역 - 나머지 공간 차지 */}
      <main className="flex-1 p-8 pt-0 overflow-y-auto min-w-0 lg:ml-80 bg-white">
        {/* 모바일/태블릿용 탭 네비게이션 */}
        <div className="lg:hidden mb-6 -mx-8">
          {/* 카테고리 탭들 */}
          <div className="border-b border-gray-200 mb-4">
            <nav
              ref={categoryTabScroll.scrollRef}
              className="flex space-x-8 overflow-x-auto scrollbar-hide px-8 cursor-grab active:cursor-grabbing"
              {...categoryTabScroll.dragHandlers}
            >
              {teaProductMenu.map(({ category, categoryCode, items }) => (
                <button
                  key={categoryCode}
                  onClick={() =>
                    onMobileUpperMenuHandler(
                      findIndex(teaProductMenu, { categoryCode }),
                      categoryCode,
                      category,
                      items
                    )
                  }
                  className={`py-4 px-1 text-lg min-w-[80px] font-medium transition-colors duration-200 relative flex-shrink-0 ${
                    productMenu.parentMenuCode === categoryCode
                      ? 'text-black'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {category}
                  {/* 선택된 탭의 밑줄 */}
                  {productMenu.parentMenuCode === categoryCode && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black" />
                  )}
                </button>
              ))}
            </nav>
          </div>

          {/* 서브메뉴 버튼들 */}
          {productMenu.parentMenuCode && productMenu.parentMenuCode !== 'ALL' && (
            <div
              ref={submenuButtonScroll.scrollRef}
              className="flex gap-2 overflow-x-auto scrollbar-hide cursor-grab active:cursor-grabbing px-4"
              {...submenuButtonScroll.dragHandlers}
            >
              {teaProductMenu
                .find(({ categoryCode }) => categoryCode === productMenu.parentMenuCode)
                ?.items.map(({ submenuName, submenuCode }) => (
                  <button
                    key={submenuCode}
                    onClick={() =>
                      onLowerMenuHandler({
                        parentMenuCode: productMenu.parentMenuCode,
                        parentMenuName: productMenu.parentMenuName,
                        childMenuCode: submenuCode,
                        childMenuName: submenuName,
                      })
                    }
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 flex-shrink-0 ${
                      productMenu.childMenuCode === submenuCode
                        ? 'bg-black text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {submenuName}
                  </button>
                ))}
            </div>
          )}
        </div>
        {/* 컨텐츠 헤더 */}
        <div className="mb-8">
          <div className="text-gray-700 mb-2 text-[16px]">
            <span className="mr-[10px]">티 제품</span>
            {`>`}
            <span
              className={`mx-[10px] ${!productMenu.childMenuName ? 'font-bold text-[18px]' : ''}`}
            >
              {productMenu.parentMenuName}
            </span>
            {productMenu.childMenuName && (
              <>
                {`>`}
                <span className="mx-[10px] font-bold text-[18px]">{productMenu.childMenuName}</span>
              </>
            )}
          </div>
        </div>
        <Suspense fallback={<ProductSkeleton />}>
          <ProductList />
        </Suspense>
      </main>
    </div>
  );
};

export default ProductContainer;
