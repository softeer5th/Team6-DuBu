import { createBrowserRouter } from 'react-router';

import EditPage from '@/pages/EditPage';
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
  {
    path: '/edit',
    element: <EditPage />,
  },
]);
