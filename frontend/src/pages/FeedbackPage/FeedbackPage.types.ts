export type FeedbackMood = 'DISSATISFIED' | 'MODERATE' | 'SATISFIED';

export interface FeedbackData {
  mood: FeedbackMood;
  memo: string;
}

export interface FeedbackContextType {
  feedbackStep: number;
  setFeedbackStep: React.Dispatch<React.SetStateAction<number>>;
  feedbackData: FeedbackData;
  setFeedbackData: React.Dispatch<React.SetStateAction<FeedbackData>>;
}
