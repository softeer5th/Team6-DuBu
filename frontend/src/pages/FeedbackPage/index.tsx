import { useEffect } from 'react';

import FeedbackPageContent from './components/FeedbackPageContent';
import { FeedbackProvider } from './contexts/FeedbackProvider';

import useRedirectByMemberStatus from '@/hooks/useRedirectByMemberStatus';

const FeedbackPage = () => {
  useRedirectByMemberStatus();

  useEffect(() => {
    window.history.pushState({}, '', '/feedback');
  }, []);

  return (
    <FeedbackProvider>
      <FeedbackPageContent />
    </FeedbackProvider>
  );
};

export default FeedbackPage;
