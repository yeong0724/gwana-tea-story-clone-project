import { z } from 'zod';

import { pwdSpecialCharValidate } from '@/lib/utils';

export const userAccountSchema = z.object({
  email: z.email({
    pattern: z.regexes.html5Email,
    error: '올바르지 않은 이메일 형식입니다',
  }),
  password: z
    .string()
    .min(8, '비밀번호는 최소 8자 이상이어야 합니다')
    .regex(/[A-Za-z]/, '비밀번호에는 문자가 포함되어야 합니다')
    .regex(/[0-9]/, '비밀번호에는 숫자가 포함되어야 합니다')
    .regex(
      /[!@#$%^&*()_+\-=\[\]{}|;':",./<>?~`]/,
      '비밀번호에는 특수문자가 포함되어야 합니다'
    )
    .refine((password) => pwdSpecialCharValidate(password), {
      error: '비밀번호에는 특수문자가 최소 2개 이상 포함되어야 합니다',
    }),
});

export type UserAccountInfo = z.infer<typeof userAccountSchema>;
