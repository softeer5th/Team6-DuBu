import * as S from './KakaoLoginButton.styled';

import { kakaoLogin } from '@/api/login';
import Icon from '@/components/Icon';

const KakaoLoginButton = () => {
  const handleKakaoLogin = () => {
    kakaoLogin();
  };

  return (
    <S.ButtonLayout onClick={handleKakaoLogin}>
      <S.ButtonContent>
        <Icon icon="Kakao" />
        <span>카카오 로그인</span>
      </S.ButtonContent>
    </S.ButtonLayout>
  );
};

export default KakaoLoginButton;
