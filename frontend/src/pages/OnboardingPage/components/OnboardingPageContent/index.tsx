import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import OnboardingHeader from './OnboardingHeader';
import * as S from './OnboardingPageContent.styled';
import OnboardingProgress from './OnboardingProgress';
import StepDescription from './StepDescription';
import StepGuide from './StepGuide';
import Step1 from './Steps/Step1';
import Step2 from './Steps/Step2';
import Step3 from './Steps/Step3';

import { useOnboarding } from '@/pages/OnboardingPage/hooks/useOnboarding';

const ONBOARDING_STEP_COMPONENTS = [Step1, Step2, Step3];
const ONBOARDING_LAST_STEP = 3;

const OnboardingPage = () => {
  const { onboardingStep } = useOnboarding();
  const navigate = useNavigate();

  const CurStepComponent = ONBOARDING_STEP_COMPONENTS[onboardingStep - 1];

  useEffect(() => {
    navigate('/onboarding');
  }, []);

  return (
    <>
      <OnboardingHeader />
      <S.OnboardingMainLayout>
        <OnboardingProgress />
        <S.TextContainer>
          <StepDescription />
          {onboardingStep !== ONBOARDING_LAST_STEP && <StepGuide />}
        </S.TextContainer>
        <CurStepComponent />
      </S.OnboardingMainLayout>
    </>
  );
};

export default OnboardingPage;
