// import { useEffect } from 'react';
// import { useNavigate } from 'react-router';

import OnboardingPageContent from './components/OnboardingPageContent';
import { OnboardingProvider } from './contexts/OnboardingProvider';

// import OnboardingHeader from './components/OnboardingPageContent/OnboardingHeader';
// import OnboardingProgress from './components/OnboardingPageContent/OnboardingProgress';
// import StepDescription from './components/OnboardingPageContent/StepDescription';
// import StepGuide from './components/OnboardingPageContent/StepGuide';
// import Step1 from './components/OnboardingPageContent/Steps/Step1';
// import Step2 from './components/OnboardingPageContent/Steps/Step2';
// import Step3 from './components/OnboardingPageContent/Steps/Step3';
// import { useOnboarding } from './hooks/useOnboarding';
// import * as S from './OnboardingPage.styled';

// const OnboardingPage = () => {
//   const { step } = useOnboarding();
//   const navigate = useNavigate();

//   const steps = [Step1, Step2, Step3];
//   const CurrentStepComponent = steps[step - 1];

//   useEffect(() => {
//     navigate('/onboarding');
//   }, []);

//   return (
//     <>
//       <OnboardingHeader />
//       <S.OnboardingMainLayout>
//         <OnboardingProgress />
//         <S.TextContainer>
//           <StepDescription />
//           {step !== 3 && <StepGuide />}
//         </S.TextContainer>
//         <CurrentStepComponent />
//       </S.OnboardingMainLayout>
//     </>
//   );
// };

// export default OnboardingPage;

const OnboardingPage = () => {
  return (
    <OnboardingProvider>
      <OnboardingPageContent />
    </OnboardingProvider>
  );
};

export default OnboardingPage;
