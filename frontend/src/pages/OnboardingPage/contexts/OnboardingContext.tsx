import { createContext } from 'react';

import { OnboardingContextType } from '../OnboardingPage.types';

export const OnboardingContext = createContext<OnboardingContextType | null>(null);
