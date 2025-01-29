import * as S from './KakaoLoginButton.styled';

import Icon from '@/components/Icon';

const KakaoLoginButton = () => {
  return (
    <S.ButtonLayout>
      <S.ButtonContent>
        <Icon icon="Kakao" />
        <span>카카오 로그인</span>
      </S.ButtonContent>
    </S.ButtonLayout>
  );
};

export default KakaoLoginButton;
