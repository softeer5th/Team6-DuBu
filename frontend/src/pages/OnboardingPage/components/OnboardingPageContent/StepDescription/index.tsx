import styled from 'styled-components';

import { useOnboarding } from '@/pages/OnboardingPage/hooks/useOnboarding';
import { ONBOARDING_DESCRIPTIONS } from '@/pages/OnboardingPage/OnboardingPage.constants';

const StepDescription = () => {
  const { onboardingStep } = useOnboarding();

  return (
    <DescriptionBox>
      {ONBOARDING_DESCRIPTIONS[onboardingStep].map((description, index) => (
        <span key={index}>{description}</span>
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
