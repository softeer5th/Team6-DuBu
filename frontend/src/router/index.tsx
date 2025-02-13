import { createBrowserRouter } from 'react-router';

import FlexPageLayout from './layout/FlexPageLayout';

import EditPage from '@/pages/EditPage';
import FeedbackPage from '@/pages/FeedbackPage';
import KakaoLoginPage from '@/pages/KakaoLoginPage';
import LandingPage from '@/pages/LandingPage';
import MainPage from '@/pages/MainPage';
import MapPage from '@/pages/MapPage';
import OnboardingPage from '@/pages/OnboardingPage';
import PlanPage from '@/pages/PlanPage';
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
  {
    path: '/map',
    element: <MapPage />,
  },
  {
    path: '/feedback',
    element: <FeedbackPage />,
  },
  {
    path: '/login/kakao',
    element: <KakaoLoginPage />,
  },
]);
