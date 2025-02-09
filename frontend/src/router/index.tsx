import { createBrowserRouter } from 'react-router';

import FlexPageLayout from './layout/FlexPageLayout';

import EditPage from '@/pages/EditPage';
import LandingPage from '@/pages/LandingPage';
import MainPage from '@/pages/MainPage';
import OnboardingPage from '@/pages/OnboardingPage';
import PlanPage from '@/pages/PlanPage';
import RecommendTodoPage from '@/pages/RecommendTodoPage';
import RouteTodoEditPage from '@/pages/RouteTodoEditPage';

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
    ],
  },
  {
    path: '/onboarding',
    element: <OnboardingPage />,
  },
  {
    path: '/plan',
    element: <FlexPageLayout />,
    children: [
      {
        index: true,
        element: <PlanPage />,
      },
    ],
  },
  {
    path: '/plan/:planId/todos/edit',
    element: <FlexPageLayout />,
    children: [
      {
        index: true,
        element: <RouteTodoEditPage />,
      },
    ],
  },
  {
    path: '/recommend/:planId?',
    element: <FlexPageLayout />,
    children: [
      {
        index: true,
        element: <RecommendTodoPage />,
      },
    ],
  },
]);
