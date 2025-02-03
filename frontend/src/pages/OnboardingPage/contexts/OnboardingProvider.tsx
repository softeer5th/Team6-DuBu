import { useState } from 'react';

import { UserInfoType } from '../OnboardingPage.types';
import { OnboardingContext } from './OnboardingContext';

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [step, setStep] = useState<number>(1);
  const [userInfo, setUserInfo] = useState<UserInfoType>({
    categories: [],
    address: { home: '', school: '' },
    nickname: '',
  });
  const [stepValidity, setStepValidity] = useState<{ [key: number]: boolean }>({
    1: false,
    2: true,
    3: false,
  });

  return (
    <OnboardingContext.Provider
      value={{ step, setStep, userInfo, setUserInfo, stepValidity, setStepValidity }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
