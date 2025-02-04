import { useNavigate } from 'react-router';

import Header from '@/components/Header';
import { useOnboarding } from '@/pages/OnboardingPage/hooks/useOnboarding';

const ONBOARDING_FIRST_STEP = 1;
const ONBOARDING_LAST_STEP = 3;

const OnboardingHeader = () => {
  const { onboardingStep, onboardingStepValidity, setOnboardingStep } = useOnboarding();
  const navigate = useNavigate();

  const isButtonDisabled = !onboardingStepValidity[onboardingStep];

  const goToStep = (newStep: number) => {
    setOnboardingStep(newStep);
    navigate(`/onboarding?step=${newStep}`);
  };

  const goToBack = () => {
    if (onboardingStep === ONBOARDING_FIRST_STEP) {
      navigate('/landing');
    } else {
      goToStep(onboardingStep - 1);
    }
  };

  const goToNext = () => {
    if (onboardingStepValidity[onboardingStep]) {
      goToStep(onboardingStep + 1);
    }
  };

  const goToMain = () => {
    navigate('/');
  };

  return (
    <Header>
      <Header.Left>
        <Header.BackButton onClick={goToBack} />
      </Header.Left>
      <Header.Center>
        <Header.Title>회원가입</Header.Title>
      </Header.Center>
      <Header.Right>
        {onboardingStep !== ONBOARDING_LAST_STEP ? (
          <Header.NextButton disabled={isButtonDisabled} onClick={goToNext} />
        ) : (
          <Header.CompleteButton disabled={isButtonDisabled} onClick={goToMain} />
        )}
      </Header.Right>
    </Header>
  );
};

export default OnboardingHeader;
