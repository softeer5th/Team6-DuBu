import { useState } from 'react';

import { ONBOARDING_FIRST_STEP } from '../OnboardingPage.constants';
import { OnboardingUserInfoType } from '../OnboardingPage.types';
import { OnboardingContext } from './OnboardingContext';

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [onboardingStep, setOnboardingStep] = useState<number>(ONBOARDING_FIRST_STEP);

  const [onboardingUserInfo, setOnboardingUserInfo] = useState<OnboardingUserInfoType>({
    categories: [],
    homeAddress: '',
    homeAddressX: 0,
    homeAddressY: 0,
    schoolAddress: '',
    schoolAddressX: 0,
    schoolAddressY: 0,
    nickname: '',
  });

  return (
    <OnboardingContext.Provider
      value={{
        onboardingStep,
        setOnboardingStep,
        onboardingUserInfo,
        setOnboardingUserInfo,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};
