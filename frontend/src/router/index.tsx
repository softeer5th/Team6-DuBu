import { createBrowserRouter } from 'react-router';

import EditPage from '@/pages/EditPage';
import LandingPage from '@/pages/LandingPage';
import MainPage from '@/pages/MainPage';
import OnboardingPage from '@/pages/OnboardingPage';
import { OnboardingProvider } from '@/pages/OnboardingPage/contexts/OnboardingProvider';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/landing',
    element: <LandingPage />,
  },
  {
    path: '/edit',
    element: <EditPage />,
  },
  {
    path: '/onboarding',
    element: (
      <OnboardingProvider>
        <OnboardingPage />
      </OnboardingProvider>
    ),
  },
]);
