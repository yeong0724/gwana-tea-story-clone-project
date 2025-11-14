import { useMutation } from '@tanstack/react-query';

import { getAccessTokenByKakaoCode } from '@/api/login';

const useLoginService = () => {
  const useGetAccessTokenByKakaoCode = <T>() =>
    useMutation({
      mutationFn: (param: T) => getAccessTokenByKakaoCode(param),
    });

  return { useGetAccessTokenByKakaoCode };
};

export default useLoginService;
