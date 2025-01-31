import { HTMLAttributes, PropsWithChildren } from 'react';
import styled from 'styled-components';

import TabActiveIndicator from './TabActiveIndicator';

import useTabContext from '@/hooks/useTabContext';

const TabList = ({ children, ...props }: PropsWithChildren<HTMLAttributes<HTMLUListElement>>) => {
  const { tabList } = useTabContext();

  return (
    <TabListLayout {...props}>
      {children}
      <TabActiveIndicator tabLength={tabList.length} />
    </TabListLayout>
  );
};

export default TabList;

const TabListLayout = styled.ul`
  position: relative;
  border-bottom: 0.15rem solid ${({ theme }) => theme.colors.gray100};

  li {
    flex-grow: 1;
    height: 100%;
  }
`;
