'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

import { useLoginService } from '@/service';
import { useAlertStore } from '@/stores';
import type { GetAccessTokenByKakaoCodeRequest } from '@/types';

interface Props {
  code: string;
}

const KakaoRedirectContainer = ({ code }: Props) => {
  const { showConfirmAlert } = useAlertStore();
  const { useGetAccessTokenByKakaoCode } = useLoginService();
  const router = useRouter();

  const { mutateAsync } = useGetAccessTokenByKakaoCode<GetAccessTokenByKakaoCodeRequest>();

  const callbackKakaoLogin = () => {
    mutateAsync(
      { code },
      {
        onSuccess: ({ success, data }) => {
          if (success) {
            localStorage.setItem('accessToken', data);
            router.push('/');
          }
        },
        onError: async () => {
          const confirm = await showConfirmAlert({
            title: '에러',
            description: '카카오 로그인을 실패하였습니다.',
            size: 'sm',
          });

          if (confirm) router.push('/login');
        },
      }
    );
  };

  useEffect(() => callbackKakaoLogin(), [callbackKakaoLogin]);

  return <p className="text-lg">{status}</p>;
};

export default KakaoRedirectContainer;
