import { createBrowserRouter } from 'react-router';

import FlexPageLayout from './layout/FlexPageLayout';

import EditPage from '@/pages/EditPage';
import FeedbackPage from '@/pages/FeedbackPage';
import LandingPage from '@/pages/LandingPage';
import MainPage from '@/pages/MainPage';
import OnboardingPage from '@/pages/OnboardingPage';
import RecommendTodoPage from '@/pages/RecommendTodoPage';
import RouteSelectPage from '@/pages/RouteSelectPage';
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
    path: '/route-select',
    element: <RouteSelectPage />,
  },
  {
    path: '/routes/:routeId/todos/edit',
    element: <FlexPageLayout />,
    children: [
      {
        index: true,
        element: <RouteTodoEditPage />,
      },
    ],
  },
  {
    path: '/recommend/:routeId?',
    element: <FlexPageLayout />,
    children: [
      {
        index: true,
        element: <RecommendTodoPage />,
      },
    ],
  },
  {
    path: '/feedback',
    element: <FeedbackPage />,
  },
]);
