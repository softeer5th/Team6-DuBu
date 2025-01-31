import { createContext } from 'react';

import { TabListType } from '@/components/Tab/Tab.types';

interface TabContextProps {
  selectedTab: string;
  handleClickTab: (e: React.MouseEvent<HTMLButtonElement>) => void;
  tabList: TabListType;
  selectedIdx: number;
}

export const TabContext = createContext<TabContextProps | null>(null);
