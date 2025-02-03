import { useNavigate } from 'react-router';

import Header from '@/components/Header';
import { useOnboarding } from '@/pages/OnboardingPage/hooks/useOnboarding';

const OnboardingHeader = () => {
  const { step, stepValidity, setStep } = useOnboarding();
  const navigate = useNavigate();

  const isButtonDisabled = !stepValidity[step];

  const goToStep = (newStep: number) => {
    setStep(newStep);
    navigate(`/onboarding?step=${newStep}`);
  };

  const goToBack = () => {
    if (step === 1) {
      navigate('/landing');
    } else {
      goToStep(step - 1);
    }
  };

  const goToNext = () => {
    if (stepValidity[step]) {
      goToStep(step + 1);
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
        {step !== 3 ? (
          <Header.NextButton disabled={isButtonDisabled} onClick={goToNext} />
        ) : (
          <Header.CompleteButton disabled={isButtonDisabled} onClick={goToMain} />
        )}
      </Header.Right>
    </Header>
  );
};

export default OnboardingHeader;
