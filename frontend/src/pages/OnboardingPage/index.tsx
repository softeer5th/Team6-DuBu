import OnboardingPageContent from './components/OnboardingPageContent';
import { OnboardingProvider } from './contexts/OnboardingProvider';

import useRedirectByMemberStatus from '@/hooks/useRedirectByMemberStatus';

const OnboardingPage = () => {
  useRedirectByMemberStatus();

  return (
    <OnboardingProvider>
      <OnboardingPageContent />
    </OnboardingProvider>
  );
};

export default OnboardingPage;
