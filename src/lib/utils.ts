import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import { FormatEnum } from '@/types/type';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const getRegexpByType = (type: FormatEnum = '') => {
  switch (type) {
    case 'number':
      return /[^0-9]/g;
    case 'text':
      return /[0-9]/g;
    default:
      return '';
  }
};

// 비밀번호에 특수문자가 최소 2개 포함되어 있는지 검증
const pwdSpecialCharValidate = (password: string) => {
  const specialChars = password.match(/[!@#$%^&*()_+\-=\[\]{}|;':",./<>?~`]/g);
  return specialChars && specialChars.length >= 2;
};

export { getRegexpByType, pwdSpecialCharValidate };
