import Header from '@/components/layout/Header';
import type { BottomMenuType, MenuType } from '@/types/type';

export const menuItems: MenuType[] = [
  {
    name: '티 제품',
    url: '/product',
    hasSubmenu: true,
    submenu: [
      {
        category: '녹차',
        categoryCode: 'GREEN',
        items: [
          {
            submenuName: '우전',
            submenuCode: 'A',
          },
          {
            submenuName: '세작',
            submenuCode: 'B',
          },
          {
            submenuName: '중작',
            submenuCode: 'C',
          },
          {
            submenuName: '대작',
            submenuCode: 'D',
          },
        ],
      },
      {
        category: '발효차',
        categoryCode: 'RED',
        items: [
          {
            submenuName: '스트레이트 티',
            submenuCode: 'AA',
          },
          {
            submenuName: '블렌디드 티',
            submenuCode: 'BB',
          },
          {
            submenuName: '플레이버리 티',
            submenuCode: 'CC',
          },
        ],
      },
      {
        category: '보이차',
        categoryCode: 'PUER',
        items: [
          {
            submenuName: '생차',
            submenuCode: 'AAA',
          },
          {
            submenuName: '숙차',
            submenuCode: 'BBB',
          },
        ],
      },
    ],
  },
  {
    name: 'Pension',
    hasSubmenu: true,
    submenu: [
      {
        category: '우티',
        categoryCode: 'WOTEA',
        items: [],
      },
      {
        category: '아티',
        categoryCode: 'ITEA',
        items: [],
      },
    ],
  },
  {
    name: '추석 선물대전',
    hasSubmenu: false,
    submenu: [],
  },
  {
    name: 'Gift',
    hasSubmenu: false,
    submenu: [],
  },
];

const bottomMenuItems: BottomMenuType[] = [
  { name: '매장찾기' },
  { name: '공지사항' },
  { name: '고객센터' },
  { name: '포인트 적립' },
];

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

const Layout = ({ children }: RootLayoutProps) => {
  return (
    <>
      <Header menuItems={menuItems} bottomMenuItems={bottomMenuItems} />
      {children}
    </>
  );
};

export default Layout;
