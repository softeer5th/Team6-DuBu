import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import { kakaoLoginAuth } from '@/api/login';

const useKakaoLoginMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (code: string) => kakaoLoginAuth(code),
    onSuccess: (result) => {
      const accessToken = result?.data.accessToken;
      // FIXME: 일단 localStorage에 저장하는 방식으로 테스트

      if (accessToken) {
        localStorage.setItem('accessToken', accessToken);
      }
      navigate('/onboarding');
    },
    onError: () => {
      navigate('/landing');
    },
  });
};

export default useKakaoLoginMutation;
