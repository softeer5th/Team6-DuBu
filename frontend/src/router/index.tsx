import { createBrowserRouter } from 'react-router';

import MainPage from '@/pages/MainPage';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
]);
