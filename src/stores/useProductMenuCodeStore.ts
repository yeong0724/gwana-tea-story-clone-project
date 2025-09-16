import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const initialState = {
  parentMenuCode: '',
  parentMenuName: '',
  childMenuCode: '',
  childMenuName: '',
};

export type ProductMenuType = {
  parentMenuCode: string;
  parentMenuName: string;
  childMenuCode: string;
  childMenuName: string;
};

type StoreType = {
  productMenu: ProductMenuType;
  setProductMenu: (value: ProductMenuType) => void;
  clearProductMenu: () => void;
};

const useProductMenuCodeStore = create<StoreType>()(
  persist(
    (set) => ({
      productMenu: initialState,
      setProductMenu: (value) => {
        set({ productMenu: value });
      },
      clearProductMenu: () => {
        set({ productMenu: initialState });
      },
    }),
    {
      name: 'product-menu-storage', // localStorage key
    }
  )
);

export default useProductMenuCodeStore;
