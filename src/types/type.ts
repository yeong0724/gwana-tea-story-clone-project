import { ChangeEvent } from 'react';

import {
  FieldPath,
  FieldPathValue,
  FieldValues,
} from 'react-hook-form';

export type HandleChange<T, V> = (
  event: ChangeEvent<T> | null,
  props: {
    name: string;
    value: V;
  }
) => void;

export type FormatEnum = 'number' | 'text' | 'all' | '';

export type ReactHookFormEventType<T extends FieldValues> =
  {
    name: FieldPath<T>;
    value: FieldPathValue<T, FieldPath<T>>;
  };

export type ItemType = {
  submenuName: string;
  submenuCode: string;
};

export type SubMenuType = {
  category: string;
  categoryCode: string;
  items: Array<ItemType>;
};

export type MenuType = {
  name: string;
  url?: string;
  hasSubmenu: boolean;
  submenu: Array<SubMenuType>;
};

export type BottomMenuType = {
  name: string;
};
