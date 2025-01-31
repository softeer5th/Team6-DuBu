import { PropsWithChildren, useState } from 'react';

import { TabListType } from '@/components/Tab/Tab.types';
import { TabContext } from '@/contexts/TabContext';

interface TabProviderProps {
  tabList: TabListType;
  defaultValue?: string;
}

const TabProvider = ({ defaultValue, tabList, children }: PropsWithChildren<TabProviderProps>) => {
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

export default TabProvider;
