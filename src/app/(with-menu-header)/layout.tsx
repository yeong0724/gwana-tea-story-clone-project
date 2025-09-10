import Header from '@/components/layout/Header';
import type { BottomMenuType, MenuType } from '@/types/type';

const menuItems: MenuType[] = [
  {
    name: '제품',
    hasSubmenu: true,
    subItems: ['Tea', 'Tea Food', 'Life Style'],
  },
  {
    name: '추석 선물대전',
    hasSubmenu: false,
  },
  {
    name: 'Gift',
    hasSubmenu: false,
  },
  {
    name: 'Tea Life',
    hasSubmenu: true,
    subItems: ['Tea Story', 'Tea Recipe', 'Tea Guide'],
  },
  {
    name: '단체 및 기업 구매',
    hasSubmenu: false,
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
