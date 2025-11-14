import { create } from 'zustand';
import { useShallow } from 'zustand/shallow';

import { MenuGroup } from '@/types';

type StoreType = {
  menu: MenuGroup;
  setMenu: (menu: MenuGroup) => void;
};

const initialState: MenuGroup = {
  main: [],
  category: [],
};

const menuStore = create<StoreType>((set) => ({
  menu: initialState,
  setMenu: (menu) => set({ menu }),
}));

const useMenuStore = () =>
  menuStore(
    useShallow((state) => ({
      menu: state.menu,
      setMenu: state.setMenu,
    }))
  );

export default useMenuStore;
