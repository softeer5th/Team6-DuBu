import { useNavigate } from 'react-router';

import { PATHS } from '@/components/Header/Header.constants';

export const useNavigation = () => {
  const navigate = useNavigate();

  return {
    goToBack: () => navigate(-1),
    goToHome: () => navigate(PATHS.HOME),
  };
};
