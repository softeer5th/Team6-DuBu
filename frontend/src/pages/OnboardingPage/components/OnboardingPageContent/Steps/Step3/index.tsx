import { useState } from 'react';

import * as S from './Step3.styled';

import { useOnboarding } from '@/pages/OnboardingPage/hooks/useOnboarding';
import { ONBOARDING_NICKNAME_MESSAGES as MESSAGES } from '@/pages/OnboardingPage/OnboardingPage.constants';

const Step3 = () => {
  const {
    onboardingUserInfo: userInfo,
    setOnboardingUserInfo: setUserInfo,
    setOnboardingStepValidity: setStepValidity,
  } = useOnboarding();

  const isNicknameValid = (nickname: string) =>
    /^[a-zA-Z0-9가-힣]+$/.test(nickname) && nickname.length <= 8;

  const [nicknameStatus, setNicknameStatus] = useState<'DEFAULT' | 'ERROR' | 'VALID'>(
    userInfo.nickname ? (isNicknameValid(userInfo.nickname) ? 'VALID' : 'ERROR') : 'DEFAULT',
  );
  const [nicknameValidMsg, setNicknameValidMsg] = useState<string>(
    userInfo.nickname
      ? isNicknameValid(userInfo.nickname)
        ? MESSAGES.VALID
        : MESSAGES.ERROR
      : MESSAGES.DEFAULT,
  );

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nickname = e.target.value;

    if (!nickname) {
      setNicknameStatus('DEFAULT');
      setNicknameValidMsg(MESSAGES.DEFAULT);
      return;
    }

    const isValid = isNicknameValid(nickname);

    setUserInfo((prev) => ({ ...prev, nickname }));
    setNicknameStatus(isValid ? 'VALID' : 'ERROR');
    setNicknameValidMsg(isValid ? MESSAGES.VALID : MESSAGES.ERROR);
    setStepValidity((prev) => ({ ...prev, 3: isValid }));
  };

  return (
    <S.InputMessageContainer>
      <S.NicknameInput
        type="text"
        placeholder="닉네임을 입력해주세요."
        onChange={handleNicknameChange}
        value={userInfo.nickname || ''}
      />
      <S.WarningText $status={nicknameStatus}>{nicknameValidMsg}</S.WarningText>
    </S.InputMessageContainer>
  );
};

export default Step3;
