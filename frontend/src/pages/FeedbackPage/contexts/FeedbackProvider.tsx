import { useState } from 'react';

import { FeedbackData } from '../FeedbackPage.types';
import { FeedbackContext } from './FeedbackContext';

interface FeedbackProviderProps {
  children: React.ReactNode;
  initialStep?: number;
}

export const FeedbackProvider = ({ children, initialStep = 1 }: FeedbackProviderProps) => {
  const [feedbackStep, setFeedbackStep] = useState(initialStep);
  const [feedbackData, setFeedbackData] = useState<FeedbackData>({
    mood: 'MODERATE',
    memo: '',
  });

  return (
    <FeedbackContext.Provider
      value={{
        feedbackStep,
        setFeedbackStep,
        feedbackData,
        setFeedbackData: (data) => setFeedbackData(data || { mood: 'MODERATE', memo: '' }),
      }}
    >
      {children}
    </FeedbackContext.Provider>
  );
};
