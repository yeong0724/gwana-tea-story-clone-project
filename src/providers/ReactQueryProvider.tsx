'use client';

import {
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { get } from 'lodash-es';
import { useShallow } from 'zustand/shallow';

import { useAlertStore } from '@/stores';

type Props = {
  children: Readonly<React.ReactNode>;
};
const ReactQueryProvider = ({ children }: Props) => {
  const { showAlert } = useAlertStore(
    useShallow((state) => ({
      showAlert: state.showAlert,
    }))
  );

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
    queryCache: new QueryCache({
      onError: (error: Error) => {
        const message = get(
          error,
          'response.data.error',
          error?.message ?? '알 수 없는 오류가 발생했습니다.'
        );

        showAlert({
          title: '에러',
          description: message,
          size: 'sm',
        });
      },
    }),
  });

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default ReactQueryProvider;
