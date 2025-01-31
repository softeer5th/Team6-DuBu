import { PropsWithChildren } from 'react';

import { TabListType } from './Tab.types';

import TabProvider from '@/providers/TabProvider';

interface TabRootProps {
  tabList: TabListType;
  defaultValue?: string;
}

const TabRoot = ({ tabList, defaultValue, children }: PropsWithChildren<TabRootProps>) => {
  return (
    <TabProvider tabList={tabList} defaultValue={defaultValue}>
      {children}
    </TabProvider>
  );
};

export default TabRoot;
