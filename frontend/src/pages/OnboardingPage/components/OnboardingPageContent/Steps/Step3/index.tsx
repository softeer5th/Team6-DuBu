import { useState } from 'react';

import * as S from './Step3.styled';

import { useOnboarding } from '@/pages/OnboardingPage/hooks/useOnboarding';
import { ONBOARDING_NICKNAME_MESSAGES as MESSAGES } from '@/pages/OnboardingPage/OnboardingPage.constants';

const isNicknameValid = (nickname: string) =>
  /^[a-zA-Z0-9가-힣]+$/.test(nickname) && nickname.length <= 8;

const Step3 = () => {
  const {
    onboardingUserInfo: userInfo,
    setOnboardingUserInfo: setUserInfo,
    setOnboardingStepValidity: setStepValidity,
  } = useOnboarding();

  const initialStatus = userInfo.nickname
    ? isNicknameValid(userInfo.nickname)
      ? 'VALID'
      : 'ERROR'
    : 'FIRST';

  const initialMessage =
    userInfo.nickname && isNicknameValid(userInfo.nickname)
      ? MESSAGES.VALID
      : userInfo.nickname
        ? MESSAGES.ERROR
        : MESSAGES.DEFAULT;

  const [inputStatus, setInputStatus] = useState<'FIRST' | 'ERROR' | 'VALID'>(initialStatus);
  const [inputMessage, setInputMessage] = useState<string>(initialMessage);

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nickname = e.target.value;
    const isValid = isNicknameValid(nickname);

    setUserInfo((prev) => ({ ...prev, nickname }));
    setInputStatus(nickname.length === 0 ? 'FIRST' : isValid ? 'VALID' : 'ERROR');
    setInputMessage(
      nickname.length === 0 ? MESSAGES.DEFAULT : isValid ? MESSAGES.VALID : MESSAGES.ERROR,
    );
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
      <S.WarningText $status={inputStatus}>{inputMessage}</S.WarningText>
    </S.InputMessageContainer>
  );
};

export default Step3;
