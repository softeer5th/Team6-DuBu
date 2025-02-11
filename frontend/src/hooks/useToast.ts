import { useContext } from 'react';

import ToastContext from '@/contexts/ToastContext';

const useToast = () => {
  const context = useContext(ToastContext);

  if (context === null) {
    throw new Error('toast context가 존재하지 않습니다.');
  }

  return context;
};

export default useToast;
