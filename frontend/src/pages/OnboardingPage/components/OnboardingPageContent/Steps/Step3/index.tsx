import { useState } from 'react';

import * as S from './Step3.styled';

import { useOnboarding } from '@/pages/OnboardingPage/hooks/useOnboarding';

const MESSAGES = {
  DEFAULT: '공백없이 한글, 숫자, 영문자 8자 이내로 입력해주세요',
  ERROR: '공백없이 한글, 숫자, 영문자 8자 이내로만 가능해요',
  VALID: '닉네임 사용이 가능해요',
};

const Step3 = () => {
  const {
    onboardingUserInfo: userInfo,
    setOnboardingUserInfo: setUserInfo,
    setOnboardingStepValidity: setStepValidity,
  } = useOnboarding();

  const [inputMessage, setInputMessage] = useState<string>(MESSAGES.DEFAULT);
  const [inputStatus, setInputStatus] = useState<string>('FIRST');

  const handleNicknameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nickname = e.target.value;

    if (nickname.length <= 8) {
      setUserInfo((prev) => ({ ...prev, nickname }));
    }

    if (nickname.length === 0) {
      setInputMessage(MESSAGES.DEFAULT);
      setInputStatus('FIRST');
      setStepValidity((prev) => ({ ...prev, 3: false }));
    } else if (!/^[a-zA-Z0-9가-힣]+$/.test(nickname)) {
      setInputMessage(MESSAGES.ERROR);
      setInputStatus('ERROR');
      setStepValidity((prev) => ({ ...prev, 3: false }));
    } else {
      setInputMessage(MESSAGES.VALID);
      setInputStatus('VALID');
      setStepValidity((prev) => ({ ...prev, 3: true }));
    }
  };

  return (
    <S.InputMessageContainer>
      <S.NicknameInput
        type="text"
        autoFocus
        placeholder="닉네임을 입력해주세요."
        onChange={handleNicknameChange}
        value={userInfo.nickname || ''}
      />
      <S.WarningText $status={inputStatus}>{inputMessage}</S.WarningText>
    </S.InputMessageContainer>
  );
};

export default Step3;
