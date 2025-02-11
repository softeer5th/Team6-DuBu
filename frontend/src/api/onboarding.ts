import fetchClient from './fetchClient';

import { API_URL } from '@/constants/url';

interface OnboardingUserInfo extends Record<string, string | number | string[] | null> {
  categories: string[];
  homeAddress: string;
  homeAddressX: number;
  homeAddressY: number;
  schoolAddress: string;
  schoolAddressX: number;
  schoolAddressY: number;
  nickname: string;
}

export const postOnboarding = async (userInfo: OnboardingUserInfo) => {
  const result = await fetchClient.post<{ message: string }>(API_URL.onboarding, {
    body: userInfo,
  });

  return result;
};
