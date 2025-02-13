import { useEffect } from 'react';

import FeedbackPageContent from './components/FeedbackPageContent';
import { FeedbackProvider } from './contexts/FeedbackProvider';

const FeedbackPage = () => {
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
