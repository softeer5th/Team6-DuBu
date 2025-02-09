import { useParams } from 'react-router';

import * as S from './RouteTodoEditPage.styled';
import FavoriteTab from '../EditPage/components/FavoriteTab';
import RecommendTab from '../EditPage/components/RecommendTab';
import TodoTab from '../EditPage/components/TodoTab';
import { TABS } from '../EditPage/EditPage.constants';

import Header from '@/components/Header';
import Icon from '@/components/Icon';
import { Tab } from '@/components/Tab';

const RouteTodoEditPage = () => {
  const { planId } = useParams();

  return (
    <S.RouteTodoEditLayout>
      <Header>
        <Header.Left>
          <Header.BackButton color="white" />
        </Header.Left>
        <Header.Title color="white">할 일 수정하기</Header.Title>
      </Header>

      <S.InfoSection>
        <S.InfoWrapper>
          <Icon icon="Bus" width={36} height={36} />
          <S.SectionTimeWrapper>
            <S.SectionTime>20</S.SectionTime>
            <S.UnitTimeText>분</S.UnitTimeText>
          </S.SectionTimeWrapper>
        </S.InfoWrapper>

        <S.DifficultyWrapper>
          <S.Badge>#쉬움</S.Badge>
          <S.Badge>#보통</S.Badge>
          <span>추천</span>
        </S.DifficultyWrapper>
      </S.InfoSection>

      <Tab.Root tabList={TABS}>
        <S.TabList>
          {TABS.map((tab) => (
            <li key={tab.value}>
              <Tab.Trigger value={tab.value}>{tab.label}</Tab.Trigger>
            </li>
          ))}
        </S.TabList>
        <S.TabContent>
          <TodoTab tabType="route" planId={Number(planId)} />
          <FavoriteTab />
          <RecommendTab />
        </S.TabContent>
      </Tab.Root>
    </S.RouteTodoEditLayout>
  );
};

export default RouteTodoEditPage;
