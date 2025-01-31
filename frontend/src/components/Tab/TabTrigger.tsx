import { HTMLAttributes, PropsWithChildren } from 'react';

import useTabContext from '@/hooks/useTabContext';

interface TabTriggerProps extends HTMLAttributes<HTMLButtonElement> {
  value: string;
}

const TabTrigger = ({ value, children, ...props }: PropsWithChildren<TabTriggerProps>) => {
  const { selectedTab, handleClickTab } = useTabContext();

  const isSelected = value === selectedTab;

  return (
    <button
      style={{ width: '100%', height: '100%' }}
      value={value}
      onClick={handleClickTab}
      data-state={isSelected ? 'active' : 'inactive'}
      {...props}
    >
      {children}
    </button>
  );
};

export default TabTrigger;
