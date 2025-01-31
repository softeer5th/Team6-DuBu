import { PropsWithChildren, useState } from 'react';

import { TabListType } from './Tab.types';

import { TabContext } from '@/contexts/TabContext';

interface TabRootProps {
  tabList: TabListType;
  defaultValue?: string;
}

const TabRoot = ({ tabList, defaultValue, children }: PropsWithChildren<TabRootProps>) => {
  const [selectedTab, setSelectedTab] = useState(defaultValue || tabList[0].value);

  const selectedIdx = tabList.findIndex((tab) => tab.value === selectedTab);

  const handleClickTab = (e: React.MouseEvent<HTMLButtonElement>) => {
    setSelectedTab(e.currentTarget.value);
  };

  return (
    <TabContext.Provider value={{ selectedTab, selectedIdx, handleClickTab, tabList }}>
      {children}
    </TabContext.Provider>
  );
};

export default TabRoot;
