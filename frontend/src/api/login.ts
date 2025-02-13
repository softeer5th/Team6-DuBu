import fetchClient from './fetchClient';

import { API_URL } from '@/constants/url';
import { KakaoLogin } from '@/types/auth';

export const kakaoLogin = () => {
  window.location.href = API_URL.loginKakao;
};

export const kakaoLoginAuth = async (code: string): Promise<KakaoLogin> => {
  const result = await fetchClient.post<KakaoLogin>(API_URL.loginKakaoAuth, {
    body: { code },
  });

  return result;
};
