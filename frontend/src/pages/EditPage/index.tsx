import styled from 'styled-components';

import Icon from '@/components/Icon';
import { Tab } from '@/components/Tab';

export const TABS = [
  {
    label: '할 일',
    value: 'todo',
  },
  {
    label: '즐겨찾기',
    value: 'favorite',
  },
  {
    label: '추천',
    value: 'recommend',
  },
] as const;

const EditPage = () => {
  return (
    <Tab.Root tabList={TABS}>
      <TabList>
        {TABS.map((tab) => (
          <li key={tab.value}>
            <Tab.Trigger value={tab.value}>{tab.label}</Tab.Trigger>
          </li>
        ))}
      </TabList>
      <Tab.Content>
        <Recommend />
        <Todo />
        <Favorite />
      </Tab.Content>
    </Tab.Root>
  );
};

const Todo = () => {
  return <Icon icon="AddressHome" />;
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
