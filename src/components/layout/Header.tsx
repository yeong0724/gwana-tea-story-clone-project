'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { isNil } from 'lodash-es';
import { Menu, Search, ShoppingCart } from 'lucide-react';
import { useShallow } from 'zustand/shallow';

import AsideMenuComponent from '@/components/layout/AsideMenuComponent';
import useProductMenuCodeStore from '@/stores/useProductMenuCodeStore';
import type { BottomMenuType, MenuType } from '@/types/type';

type HeaderProps = {
  menuItems: MenuType[];
  bottomMenuItems: BottomMenuType[];
};

const Header = ({ menuItems, bottomMenuItems }: HeaderProps) => {
  const router = useRouter();

  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState<number | null>(null);
  const [hoveredMenu, setHoveredMenu] = useState<number | null>(null);

  const { setProductMenu } = useProductMenuCodeStore(
    useShallow((state) => ({
      setProductMenu: state.setProductMenu,
    }))
  );

  const toggleSubmenu = (index: number) => {
    if (
      (!isNil(openSubMenuIndex) && openSubMenuIndex !== index) ||
      isNil(openSubMenuIndex)
    ) {
      setOpenSubMenuIndex(index);
      return;
    }

    setOpenSubMenuIndex(null);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const moveToLoginPage = () => {
    router.push('/login');
  };

  const onLinkHandler = (url: string) => {
    if (url === '/product') {
      setProductMenu({
        parentMenuCode: 'ALL',
        parentMenuName: '전체 상품 보기',
        childMenuCode: '',
        childMenuName: '',
      });
    }

    setHoveredMenu(null);
    router.push(url);
  };

  return (
    <>
      {/* Main Bar Header */}
      <header
        className={`hidden lg:block sticky top-0 left-0 right-0 z-50 transition-all duration-300 bg-white/5 backdrop-blur-sm hover:bg-white hover:shadow-lg`}
        onMouseLeave={() => {
          setHoveredMenu(null);
        }}
      >
        <div className="mx-auto px-6">
          <div className="flex items-center justify-between h-25">
            <div className="flex flex-1 min-w-0">
              <div className="flex items-center flex-shrink-0 cursor-pointer">
                <Image
                  src="/images/gwana_logo.png"
                  alt="gwana_logo"
                  width={180}
                  height={100}
                  onClick={() => onLinkHandler('/')}
                />
              </div>

              <div
                className="flex items-center ml-8 lg:ml-12 xl:ml-16 2xl:ml-20"
                style={{ gap: 'clamp(1rem, 6vw, 16rem)' }}
              >
                {menuItems.map(({ name, hasSubmenu, url = '' }, index) => (
                  <div
                    key={index}
                    className="relative group"
                    onMouseEnter={() => {
                      if (!hasSubmenu) {
                        setHoveredMenu(null);
                      } else {
                        setHoveredMenu(index);
                      }
                    }}
                  >
                    <button
                      className="cursor-pointer flex items-center text-[17px] space-x-1 py-6 text-sm font-bold text-gray-800 hover:text-green-600 transition-colors duration-500"
                      onClick={() => onLinkHandler(url)}
                    >
                      <span>{name}</span>
                    </button>
                  </div>
                ))}
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

        <div
          className={`absolute left-0 right-0 bg-white border-t border-gray-100 shadow-xl transition-all duration-500 ease-in-out overflow-hidden origin-top ${
            hoveredMenu !== null
              ? 'scale-y-100 opacity-100 visible'
              : 'scale-y-0 opacity-0 invisible'
          }`}
        >
          <div className="mx-auto pl-80 px-6 py-8">
            <div className="grid grid-cols-3 gap-12 w-[800px]">
              {hoveredMenu !== null &&
                menuItems[hoveredMenu].submenu.map(
                  ({ category, items }, idx) => (
                    <div key={idx}>
                      <h3 className="font-semibold text-[18px] text-gray-900 mb-4">
                        {category}
                      </h3>
                      <ul className="space-y-4 text-[15px]">
                        {items.map(({ submenuName }, itemIdx) => (
                          <li key={itemIdx}>
                            <span className="text-sm cursor-pointer text-gray-600 hover:text-green-600 transition-colors">
                              {submenuName}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )
                )}
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
            <Menu size={24} className="text-gray-700" />
          </button>

          {/* 로고 */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Image
              src="/images/gwana_logo.png"
              alt="gwana_logo"
              width={100}
              height={100}
              onClick={() => onLinkHandler('/')}
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
      <AsideMenuComponent
        isMenuOpen={isMenuOpen}
        moveToLoginPage={moveToLoginPage}
        toggleMenu={toggleMenu}
        toggleSubmenu={toggleSubmenu}
        menuItems={menuItems}
        bottomMenuItems={bottomMenuItems}
        openSubMenuIndex={openSubMenuIndex}
      />
    </>
  );
};

export default Header;
