'use client';

import { useRouter } from 'next/navigation';

import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';

import { useAlertStore } from '@/stores';
import { ErrorResponse } from '@/types/api';

type Props = {
  children: Readonly<React.ReactNode>;
};
const ReactQueryProvider = ({ children }: Props) => {
  const router = useRouter();
  const { showConfirmAlert } = useAlertStore();

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
    queryCache: new QueryCache({
      onError: async (error) => {
        const axiosError = error as AxiosError;
        const { data, status } = axiosError.response as AxiosResponse<ErrorResponse>;

        if (status === 401) {
          await showConfirmAlert({
            title: '에러',
            description: data?.message ?? '에러가 발생했습니다.',
            size: 'sm',
          });
          router.push('/');
        }
      },
    }),
  });

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;
