'use client';

import React, { useState } from 'react';
import { Dancing_Script } from 'next/font/google';
import { useRouter } from 'next/navigation';

import { isNil } from 'lodash-es';
import { ChevronDown, Menu, Search, ShoppingCart, X } from 'lucide-react';

import type { BottomMenuType, MenuType } from '@/types/type';

const dancingScript = Dancing_Script({
  subsets: ['latin'],
  display: 'swap',
  // weight은 자동으로 variable font로 로드됨 (400-700)
});
type HeaderProps = {
  menuItems: MenuType[];
  bottomMenuItems: BottomMenuType[];
};

const Header = ({ menuItems, bottomMenuItems }: HeaderProps) => {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [openSubMenuIndex, setOpenSubMenuIndex] = useState<number | null>(null);

  const toggleSubmenu = (index: number) => {
    if ((!isNil(openSubMenuIndex) && openSubMenuIndex !== index) || isNil(openSubMenuIndex)) {
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

  return (
    <>
      {/* Header */}
      <header className="relative bg-white border-b border-gray-200 z-40">
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
            <h1
              className={`text-2xl font-bold text-gray-900 font-kalam tracking-[5px] ${dancingScript.className}`}
            >
              Gwana
            </h1>
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

      {/* 오버레이 */}
      <div
        className={`fixed inset-0 bg-gray-800 bg-opacity-5 z-45 transition-opacity duration-600 ${
          isMenuOpen ? 'opacity-30 visible' : 'opacity-0 invisible'
        }`}
      />

      {/* 사이드바 메뉴 */}
      <div
        className={`fixed top-0 left-0 h-full w-[90%] bg-white z-50 transform transition-transform duration-600 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } shadow-2xl flex flex-col`}
      >
        {/* 사이드바 헤더 */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 flex-shrink-0">
          <button
            className="flex items-center text-lg font-medium text-gray-900 hover:text-gray-600 transition-colors"
            onClick={() => moveToLoginPage()}
          >
            <span>로그인</span>
            <ChevronDown size={20} className="text-gray-400 ml-2 rotate-[-90deg]" />
          </button>

          <button
            onClick={toggleMenu}
            className="p-2 hover:bg-gray-100 rounded-md transition-colors"
            aria-label="메뉴 닫기"
          >
            <X size={24} className="text-gray-700" />
          </button>
        </div>

        {/* 메뉴 아이템들 */}
        <div className="flex-1 overflow-y-auto sidebar-scroll min-h-0">
          <div className="flex flex-col min-h-full">
            <div className="py-2 flex-shrink-0">
              {menuItems.map((item, index) => (
                <div key={index} className="border-b border-gray-100 last:border-b-0">
                  <button
                    className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-gray-50 transition-colors"
                    onClick={() => (item.hasSubmenu ? toggleSubmenu(index) : null)}
                  >
                    <span className="text-base font-medium text-gray-900">{item.name}</span>
                    {item.hasSubmenu && (
                      <ChevronDown
                        size={20}
                        className={`text-gray-400 transition-transform duration-600 ${
                          openSubMenuIndex === index ? 'rotate-180' : ''
                        }`}
                      />
                    )}
                  </button>

                  {/* 서브메뉴 */}
                  {item.hasSubmenu && (
                    <div
                      className={`bg-gray-50 overflow-hidden transition-all duration-600 ease-in-out ${
                        openSubMenuIndex === index ? 'max-h-48' : 'max-h-0'
                      }`}
                    >
                      {item.subItems &&
                        item.subItems.map((subItem, subIndex) => (
                          <button
                            key={subIndex}
                            className="w-full text-left px-8 py-3 text-gray-700 hover:bg-gray-100 transition-colors"
                          >
                            {subItem}
                          </button>
                        ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* 하단 메뉴 - 플렉스로 바닥에 배치 */}
            <div className="flex-1"></div>
            <div className="bg-gray-50 p-4 mx-4 rounded-lg mb-6 flex-shrink-0">
              <div className="grid grid-cols-2 gap-3">
                {bottomMenuItems.map((item, index) => (
                  <button
                    key={index}
                    className="flex items-center justify-between p-3 bg-white rounded-lg border border-gray-200 hover:border-gray-300 transition-colors"
                  >
                    <span className="text-sm text-gray-700">{item.name}</span>
                    <ChevronDown size={16} className="text-gray-400 rotate-[-90deg]" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
