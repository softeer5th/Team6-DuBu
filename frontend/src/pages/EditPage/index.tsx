import styled from 'styled-components';

import TodoTab from './components/TodoTab';
import { TABS } from './EditPage.constants';

import Header from '@/components/Header';
import Icon from '@/components/Icon';
import { Tab } from '@/components/Tab';
import useQueryParamsDate from '@/hooks/useQueryParamsDate';

const EditPage = () => {
  const { isToday } = useQueryParamsDate();

  return (
    <>
      <Header>
        <Header.BackButton />
        <Header.Title>{isToday ? '오늘' : '내일'} 할 일 수정하기</Header.Title>
      </Header>
      <Tab.Root tabList={TABS}>
        <TabList>
          {TABS.map((tab) => (
            <li key={tab.value}>
              <Tab.Trigger value={tab.value}>{tab.label}</Tab.Trigger>
            </li>
          ))}
        </TabList>
        <Tab.Content>
          <TodoTab />
          <Favorite />
          <Recommend />
        </Tab.Content>
      </Tab.Root>
    </>
  );
};

const Favorite = () => {
  return <Icon icon="AddressUniv" />;
};

const Recommend = () => {
  return <Icon icon="CheckCircle" />;
};

export default EditPage;

export const TabList = styled(Tab.List)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 4.8rem;

  button {
    ${({ theme }) => theme.fonts.body15};

    color: ${({ theme }) => theme.colors.gray400};

    &[data-state='active'] {
      color: ${({ theme }) => theme.colors.green700};
    }
  }
`;
