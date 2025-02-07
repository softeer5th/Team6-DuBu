import styled from 'styled-components';

import { useOnboarding } from '@/pages/OnboardingPage/hooks/useOnboarding';
import { useStepValidity } from '@/pages/OnboardingPage/hooks/useStepValidity';
import {
  ONBOARDING_DESCRIPTIONS,
  ONBOARDING_LAST_STEP,
} from '@/pages/OnboardingPage/OnboardingPage.constants';

const StepDescription = () => {
  const { onboardingUserInfo, onboardingStep } = useOnboarding();
  const { StepValidityMapper } = useStepValidity();

  const isLastStepValid =
    onboardingStep === ONBOARDING_LAST_STEP && StepValidityMapper[onboardingStep]?.();

  if (isLastStepValid) {
    return (
      <DescriptionBox>
        <span>{onboardingUserInfo.nickname}님,</span>
        <span>두리번을 시작해볼까요?</span>
      </DescriptionBox>
    );
  }

  return (
    <DescriptionBox>
      {ONBOARDING_DESCRIPTIONS[onboardingStep]?.map((description, index) => (
        <span key={`desc-${onboardingStep}-${index}`}>{description}</span>
      ))}
    </DescriptionBox>
  );
};

const DescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${({ theme }) => theme.fonts.heading20}
  color: ${({ theme }) => theme.colors.gray950};
`;

export default StepDescription;
