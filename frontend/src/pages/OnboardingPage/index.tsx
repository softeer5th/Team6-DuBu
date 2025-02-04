import OnboardingPageContent from './components/OnboardingPageContent';
import { OnboardingProvider } from './contexts/OnboardingProvider';

const OnboardingPage = () => {
  return (
    <OnboardingProvider>
      <OnboardingPageContent />
    </OnboardingProvider>
  );
};

export default OnboardingPage;
