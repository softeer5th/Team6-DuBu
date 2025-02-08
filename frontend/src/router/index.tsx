import { createBrowserRouter } from 'react-router';

import FlexPageLayout from './layout/FlexPageLayout';

import EditPage from '@/pages/EditPage';
import LandingPage from '@/pages/LandingPage';
import MainPage from '@/pages/MainPage';
import OnboardingPage from '@/pages/OnboardingPage';
import RecommendTodoPage from '@/pages/RecommendTodoPage';
import RouteSelectPage from '@/pages/RouteSelectPage';

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
    element: <FlexPageLayout />,
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
  {
    path: '/route-select',
    element: <RouteSelectPage />,
  },
]);
