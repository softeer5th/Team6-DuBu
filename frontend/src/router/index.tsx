import { createBrowserRouter } from 'react-router';

import EditPage from '@/pages/EditPage';
import LandingPage from '@/pages/LandingPage';
import MainPage from '@/pages/MainPage';
import OnboardingPage from '@/pages/OnboardingPage';
import RecommendTodoPage from '@/pages/RecommendTodoPage';

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
    children: [
      {
        index: true,
        element: <EditPage />,
      },
      {
        path: 'recommend',
        element: <RecommendTodoPage />,
      },
    ],
  },
  {
    path: '/onboarding',
    element: <OnboardingPage />,
  },
]);
