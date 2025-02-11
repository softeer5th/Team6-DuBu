import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import FeedbackPageContent from './components/FeedbackPageContent';
import { FeedbackProvider } from './contexts/FeedbackProvider';

const FeedbackPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/feedback`);
  }, []);

  return (
    <FeedbackProvider>
      <FeedbackPageContent />
    </FeedbackProvider>
  );
};

export default FeedbackPage;
