import { useParams } from 'react-router';

import * as S from './RouteTodoEditPage.styled';
import { getPathDifficulty } from './RouteTodoEditPage.utils';
import FavoriteTab from '../EditPage/components/FavoriteTab';
import RecommendTab from '../EditPage/components/RecommendTab';
import TodoTab from '../EditPage/components/TodoTab';
import { TABS } from '../EditPage/EditPage.constants';
import usePlanInfoQuery from '../PlanPage/hooks/usePlanInfoQuery';
import { TRAFFIC_ICON } from '../PlanPage/PlanPage.constants';

import Header from '@/components/Header';
import Icon from '@/components/Icon';
import { Tab } from '@/components/Tab';
import { TODO_TYPE } from '@/constants/config';

const RouteTodoEditPage = () => {
  const { planId } = useParams();
  const { data: planInfo } = usePlanInfoQuery();

  const plan = planInfo?.paths.find((path) => path.pathId === Number(planId));

  const difficultyList = getPathDifficulty(plan?.sectionTime);

  if (!plan) return null;

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
          <Icon icon={TRAFFIC_ICON[plan.trafficType]} width={36} height={36} />
          <S.SectionTimeWrapper>
            <S.SectionTime>{plan?.sectionTime}</S.SectionTime>
            <S.UnitTimeText>분</S.UnitTimeText>
          </S.SectionTimeWrapper>
        </S.InfoWrapper>

        <S.DifficultyWrapper>
          {difficultyList.map((difficulty) => (
            <S.Badge key={difficulty}>#{difficulty}</S.Badge>
          ))}
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
          <TodoTab todoType={TODO_TYPE.PATH} planId={Number(planId)} />
          <FavoriteTab todoType={TODO_TYPE.PATH} planId={Number(planId)} />
          <RecommendTab todoType={TODO_TYPE.PATH} planId={Number(planId)} />
        </S.TabContent>
      </Tab.Root>
    </S.RouteTodoEditLayout>
  );
};

export default RouteTodoEditPage;
