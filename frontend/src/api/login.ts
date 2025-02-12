import fetchClient from './fetchClient';

import { API_URL } from '@/constants/url';

export const kakaoLogin = () => {
  window.location.href = API_URL.loginKakao;
};

export const kakaoLoginAuth = async (code: string) => {
  const result = await fetchClient.post(API_URL.loginKakaoAuth, {
    body: { code },
  });

  return result;
};
