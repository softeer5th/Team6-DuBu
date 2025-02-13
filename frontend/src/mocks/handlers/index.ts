import { handlers as mapHandlers } from './map';
import { handlers as memberHandlers } from './member';
import { handlers as onboardingHandlers } from './onboarding';
import { handlers as planHandlers } from './plan';
import { handlers as searchHandlers } from './search';
import { handlers as todoHandlers } from './todo';

export const handlers = [
  ...searchHandlers,
  ...todoHandlers,
  ...onboardingHandlers,
  ...planHandlers,
  ...memberHandlers,
  ...mapHandlers,
];
