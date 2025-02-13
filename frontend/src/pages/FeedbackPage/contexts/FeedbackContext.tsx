import { createContext } from 'react';

import { FeedbackContextType } from '../FeedbackPage.types';

export const FeedbackContext = createContext<FeedbackContextType | null>(null);
