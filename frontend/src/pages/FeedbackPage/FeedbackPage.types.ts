export type FeedbackMood = 'DISSATISFIED' | 'MODERATE' | 'SATISFIED';

export interface FeedbackData {
  mood: FeedbackMood;
  memo: string;
}

export interface FeedbackContextType {
  feedbackStep: number;
  setFeedbackStep: (step: number) => void;
  feedbackData: FeedbackData | null;
  setFeedbackData: (data: FeedbackData | null) => void;
}
