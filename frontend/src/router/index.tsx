import { createBrowserRouter } from 'react-router';

import LandingPage from '@/pages/LandingPage';
import MainPage from '@/pages/MainPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/landing',
    element: <LandingPage />,
  },
]);
