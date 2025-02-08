import { useOnboarding } from '@/pages/OnboardingPage/hooks/useOnboarding';

export const useStepValidity = () => {
  const { onboardingUserInfo } = useOnboarding();

  const checkStep1Validity = (): boolean => {
    return onboardingUserInfo.categories.length >= 1 && onboardingUserInfo.categories.length <= 3;
  };

  const checkStep2Validity = (): boolean => {
    return !!(onboardingUserInfo.homeAddress && onboardingUserInfo.schoolAddress);
  };

  const checkStep3Validity = (): boolean => {
    return (
      /^[a-zA-Z0-9가-힣]+$/.test(onboardingUserInfo.nickname) &&
      onboardingUserInfo.nickname.length <= 8
    );
  };

  return {
    StepValidityMapper: {
      1: checkStep1Validity,
      2: checkStep2Validity,
      3: checkStep3Validity,
    },
  };
};
