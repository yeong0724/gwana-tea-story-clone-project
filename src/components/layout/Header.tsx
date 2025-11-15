'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { useQueryClient } from '@tanstack/react-query';
import { filter } from 'lodash-es';
import { Menu as MenuIcon, Search, ShoppingCart } from 'lucide-react';

import AsideMenuComponent from '@/components/layout/AsideMenuComponent';
import { useMenuStore } from '@/stores';
import type { BottomMenuType, Menu, MenuGroup } from '@/types';

type HeaderProps = {
  menuGroup: MenuGroup;
  bottomMenuItems: BottomMenuType[];
};

const Header = ({ menuGroup, bottomMenuItems }: HeaderProps) => {
  const { main, category } = menuGroup;
  const queryClient = useQueryClient();
  const router = useRouter();
  const { setMenu } = useMenuStore();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [isHeaderHovered, setIsHeaderHovered] = useState<boolean>(false);
  const [isMainHovered, setIsMainHovered] = useState<boolean>(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const moveToLoginPage = () => {
    router.push('/login');
  };

  const onClickMain = (menuId: string) => {
    setIsHeaderHovered(false);

    if (menuId === 'product') {
      moveToProductPage('all');
    }
  };

  const onClickCategory = (mainMenuId: string, categoryMenuId: string) => {
    setIsHeaderHovered(false);
    setIsMainHovered(false);

    if (mainMenuId === 'product') {
      moveToProductPage(categoryMenuId);
    }
  };

  const moveToProductPage = (categoryMenuId: string) => {
    router.push(`/product?category=${categoryMenuId}`);
    // productList로 시작하는 모든 쿼리 무효화 (특정 categoryId 포함)
    queryClient.invalidateQueries({
      queryKey: ['productList'],
      refetchType: 'active', // 활성화된 쿼리만 즉시 재호출
    });
  };

  /**
   * Menu 정보 Store 저장
   */
  useEffect(() => setMenu(menuGroup), [menuGroup]);

  return (
    <>
      {/* Main Bar Header */}
      <header
        className={`hidden lg:block sticky top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/5 backdrop-blur-sm hover:bg-white hover:shadow-lg`}
        onMouseEnter={() => setIsHeaderHovered(true)}
        onMouseLeave={() => {
          setIsHeaderHovered(false);
          setIsMainHovered(false);
        }}
      >
        {/* 카테고리 배경 영역 - 카테고리가 있는 메뉴에 마우스를 올렸을 때만 표시 */}
        <div
          className={`absolute left-0 right-0 top-full bg-white border-t border-gray-100 shadow-xl transition-all duration-500 ease-in-out origin-top z-10 ${
            isHeaderHovered && isMainHovered
              ? 'scale-y-100 opacity-100 visible'
              : 'scale-y-0 opacity-0 invisible'
          }`}
          style={{ height: '180px' }}
        />

        <div className="mx-auto px-6 relative z-20">
          <div className="flex items-center justify-between h-25">
            <div className="flex flex-1 min-w-0">
              <div className="flex items-center flex-shrink-0 cursor-pointer">
                <Image
                  src="/images/gwana_logo.png"
                  alt="gwana_logo"
                  width={180}
                  height={100}
                  onClick={() => router.push('/')}
                />
              </div>

              <div
                className="grid"
                style={{
                  gridTemplateColumns: `repeat(${menuGroup.main.length}, 1fr)`,
                  gap: 'clamp(1rem, 6vw, 16rem)',
                  marginLeft: 'calc(2rem + 100px)',
                }}
              >
                {main.map(({ menuName, menuId }) => {
                  const categories = filter(category, { upperMenuId: menuId }) as Menu[];

                  return (
                    <div
                      key={menuId}
                      className="relative group flex flex-col items-center justify-start"
                      onMouseEnter={() => setIsMainHovered(true)}
                    >
                      {/* 메인 메뉴 버튼 */}
                      <button
                        className="cursor-pointer flex items-center justify-center text-[24px] space-x-1 py-6 text-sm font-bold text-gray-800 hover:text-green-600 transition-colors duration-500 w-full"
                        onClick={() => onClickMain(menuId)}
                      >
                        <span>{menuName}</span>
                      </button>

                      {/* 카테고리 드롭다운 - 해당 메인 메뉴에 호버시에만 표시 */}
                      <div
                        className={`absolute top-full pt-8 flex flex-col items-center space-y-3 z-30 transition-all duration-500 ease-in-out origin-top ${
                          isHeaderHovered && isMainHovered
                            ? 'scale-y-100 opacity-100 visible'
                            : 'scale-y-0 opacity-0 invisible'
                        }`}
                        onMouseEnter={() => setIsMainHovered(true)}
                      >
                        {categories.map((category) => (
                          <button
                            key={category.menuId}
                            className="cursor-pointer mb-[20px] text-[18px] text-gray-600 hover:text-green-600 transition-colors whitespace-nowrap text-center"
                            onClick={() => onClickCategory(menuId, category.menuId)}
                          >
                            {category.menuName}
                          </button>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex items-center flex-shrink-0 space-x-1 lg:space-x-2">
              <button className="text-gray-800 cursor-pointer hover:text-green-600 transition-colors p-3 lg:p-4 xl:p-5 duration-500">
                <Search className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>
              <button className="text-gray-800 cursor-pointer hover:text-green-600 transition-colors p-3 lg:p-4 xl:p-5 duration-500">
                <ShoppingCart className="w-4 h-4 lg:w-5 lg:h-5" />
              </button>
              <button
                className="text-gray-800 cursor-pointer hover:bg-gray-100 p-2 lg:p-3 transition-colors duration-500 rounded-2xl whitespace-nowrap"
                onClick={moveToLoginPage}
              >
                <span className="font-bold text-sm lg:text-base">로그인</span>
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* Side - Header */}
      <header className="sticky lg:hidden top-0 bg-white border-b border-gray-200 z-40">
        <div className="flex items-center justify-between px-4 py-3">
          {/* 햄버거 메뉴 버튼 */}
          <button
            onClick={toggleMenu}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors z-50 relative"
            aria-label="메뉴 열기"
          >
            <MenuIcon size={24} className="text-gray-700" />
          </button>

          {/* 로고 */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Image
              src="/images/gwana_logo.png"
              alt="gwana_logo"
              width={100}
              height={100}
              onClick={() => router.push('/')}
            />
          </div>

          {/* 우측 아이콘들 */}
          <div className="flex items-center space-x-2">
            <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
              <Search size={22} className="text-gray-700" />
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
              <ShoppingCart size={22} className="text-gray-700" />
            </button>
          </div>
        </div>
      </header>
      {/* TODO: 사이드바는 추후 리팩토링 */}
      <AsideMenuComponent
        isMenuOpen={isMenuOpen}
        moveToLoginPage={moveToLoginPage}
        toggleMenu={toggleMenu}
        menuGroup={menuGroup}
        bottomMenuItems={bottomMenuItems}
      />
    </>
  );
};

export default Header;
