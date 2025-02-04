import { useState } from 'react';

import { OnboardingUserInfoType } from '../OnboardingPage.types';
import { OnboardingContext } from './OnboardingContext';

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [onboardingStep, setOnboardingStep] = useState<number>(1);
  const [onboardingUserInfo, setOnboardingUserInfo] = useState<OnboardingUserInfoType>({
    categories: [],
    address: { home: '', school: '' },
    nickname: '',
  });
  const [onboardingStepValidity, setOnboardingStepValidity] = useState<{ [key: number]: boolean }>({
    1: false,
    2: true,
    3: false,
  });

  return (
    <OnboardingContext.Provider
      value={{
        onboardingStep,
        setOnboardingStep,
        onboardingUserInfo,
        setOnboardingUserInfo,
        onboardingStepValidity,
        setOnboardingStepValidity,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
