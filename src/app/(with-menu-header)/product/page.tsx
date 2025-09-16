import { concat, first } from 'lodash-es';

import { menuItems } from '@/app/(with-menu-header)/layout';
import ProductContainer from '@/components/features/product/ProductContainer';
import type { SubMenuType } from '@/types/type';

const Page = () => {
  const allProductMenu: Array<SubMenuType> = [
    {
      category: '전체 상품 보기',
      categoryCode: 'ALL',
      items: [],
    },
  ];

  const teaProductMenu = concat(
    allProductMenu,
    first(menuItems)?.submenu ?? []
  );

  return <ProductContainer teaProductMenu={teaProductMenu} />;
};

export default Page;
