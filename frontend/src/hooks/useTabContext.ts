import { useContext } from 'react';

import { TabContext } from '../contexts/TabContext';

const useTabContext = () => {
  const context = useContext(TabContext);

  if (context === null) {
    throw new Error('tab context가 존재하지 않습니다.');
  }

  return context;
};

export default useTabContext;
