'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { zodResolver } from '@hookform/resolvers/zod';
import { Check, ChevronDown, X } from 'lucide-react';
import {
  Form,
  FormProvider,
  useForm,
} from 'react-hook-form';

import ControllerInput from '@/components/common/ControllerInput';
import {
  userAccountSchema,
  type UserAccountInfo,
} from '@/types/form-type';

const LoginContainer = () => {
  const router = useRouter();

  const [saveId, setSaveId] = useState(false);

  const form = useForm<UserAccountInfo>({
    resolver: zodResolver(userAccountSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
  });

  const {} = useMemo(() => form, [form]);

  const onLoginHandler = () => {
    console.log('onLoginHandler');
  };

  const moveToBackpage = () => {
    router.back();
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      {/* 헤더 */}
      <header className="flex items-center justify-between p-4 border-b border-gray-200 w-full">
        <h1 className="text-lg font-medium text-gray-900">
          로그인
        </h1>
        <button className="p-2 hover:bg-gray-100 rounded-md transition-colors">
          <X
            size={24}
            className="text-gray-700"
            onClick={() => moveToBackpage()}
          />
        </button>
      </header>

      {/* 메인 컨텐츠 */}
      <div className="px-4 py-8 w-[100%] max-w-[600px]">
        {/* 타이틀 */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-medium text-gray-900 mb-2">
            관아수제차
          </h2>
          <p className="text-xl font-medium text-gray-900">
            아이디로 로그인해주세요.
          </p>
        </div>

        <FormProvider {...form}>
          <Form onSubmit={onLoginHandler} className="px-6">
            {/* 입력 폼 */}
            <div className="space-y-4 mb-6">
              <div>
                <ControllerInput
                  name="email"
                  placeholder="Email을 입력하세요."
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <ControllerInput
                  name="password"
                  placeholder="비밀번호 입력 (영문, 숫자, 특수문자 조합)"
                  className="w-full px-4 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* 체크박스 */}
            <div className="flex items-center space-x-6 mb-8">
              <button
                className="flex items-center space-x-2 cursor-pointer"
                onClick={() => setSaveId(!saveId)}
                type="button"
              >
                <div
                  className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                    saveId
                      ? 'bg-blue-500 border-blue-500'
                      : 'border-gray-300'
                  }`}
                >
                  {saveId && (
                    <Check
                      size={14}
                      className="text-white"
                    />
                  )}
                </div>
                <span className="text-gray-700">
                  아이디 저장
                </span>
              </button>
            </div>

            {/* 로그인 버튼 */}
            <button
              className={`w-full py-4 rounded-lg font-medium text-lg transition-colors bg-green-500 text-white hover:bg-green-600`}
              type="submit"
            >
              로그인
            </button>
          </Form>
        </FormProvider>
        {/* 소셜 로그인 */}
        <div className="mt-12 flex justify-center">
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center cursor-pointer  hover:bg-gray-100 p-4 rounded-3xl">
              <Image
                src="/images/kakao_logo.webp"
                width={60}
                height={60}
                alt="카카오"
              />
              <span className="text-sm text-gray-600 my-2 font-bold">
                카카오
              </span>
            </div>
            <div className="flex flex-col items-center cursor-pointer hover:bg-gray-100 p-4 rounded-3xl">
              <Image
                src="/images/naver_logo.png"
                width={60}
                height={60}
                alt="네이버"
              />
              <span className="text-sm text-gray-600 my-2 font-bold">
                네이버
              </span>
            </div>
            <div className="flex flex-col items-center cursor-pointer hover:bg-gray-100 p-4 rounded-3xl">
              <Image
                src="/images/chrome_logo.svg"
                width={60}
                height={60}
                alt="Google"
              />
              <span className="text-sm text-gray-600 my-2 font-bold">
                Google
              </span>
            </div>
          </div>
        </div>

        {/* 하단 링크 */}
        <div className="mt-8 text-center">
          <div className="flex items-center justify-center space-x-2 text-sm text-gray-500 mb-8">
            <button className="cursor-pointer text-black hover:text-gray-500">
              아이디 찾기
            </button>
            <span>|</span>
            <button className="cursor-pointer text-black hover:text-gray-500">
              비밀번호 찾기
            </button>
          </div>

          {/* 회원가입 */}
          <div className="border border-gray-300 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="text-gray-700">
                아직 회원이 아니세요?
              </span>
              <button className="flex items-center text-gray-700 hover:text-gray-900 cursor-pointer">
                <span className="font-medium">
                  회원가입
                </span>
                <ChevronDown
                  size={16}
                  className="ml-1 rotate-[-90deg]"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginContainer;
