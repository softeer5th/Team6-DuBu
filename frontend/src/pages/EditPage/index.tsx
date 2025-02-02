import FavoriteTab from './components/FavoriteTab';
import RecommendTab from './components/RecommendTab';
import TodoTab from './components/TodoTab';
import { TABS } from './EditPage.constants';
import { TabList } from './EditPage.styled';

import Header from '@/components/Header';
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
          <FavoriteTab />
          <RecommendTab />
        </Tab.Content>
      </Tab.Root>
    </>
  );
};

export default EditPage;
