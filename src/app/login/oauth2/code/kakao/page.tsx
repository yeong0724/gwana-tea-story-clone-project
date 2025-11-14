import KakaoRedirectContainer from '@/components/features/login/KakaoRedirectContainer';

interface Props {
  searchParams: Promise<{ code: string }>;
}

const Page = async ({ searchParams }: Props) => {
  const { code } = await searchParams;

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="mb-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        </div>
        <KakaoRedirectContainer code={code} />
      </div>
    </div>
  );
};

export default Page;
