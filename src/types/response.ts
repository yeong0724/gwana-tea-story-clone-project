export interface UserResponse {
  userId: string;
  username: string;
  email: string;
  phone: string;
  role: 'ADMIN' | 'GENERAL';
}

export type Menu = {
  menuName: string;
  menuId: string;
  upperMenuId: string | null;
};

export type MenuGroup = {
  main: Menu[];
  category: Menu[];
};

export type Product = {
  productId: string;
  productName: string;
  categoryId: string;
};
