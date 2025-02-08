import { useQuery } from '@tanstack/react-query';
import { Fragment } from 'react';

import * as S from './PlanPage.styled';
import { getDateHeaderFormat } from '../MainPage/MainPage.utils';

import { getPathInfo } from '@/api/plan';
import Header from '@/components/Header';
import Icon from '@/components/Icon';
import { colors } from '@/styles/theme';

const TRAFFIC_TYPE = {
  SUBWAY: '지하철',
  BUS: '버스',
};

const TRAFFIC_ICON = {
  SUBWAY: 'Subway',
  BUS: 'Bus',
} as const;

const formatStartTime = (dateString: string) => {
  const date = new Date(dateString);

  const formattedDate = getDateHeaderFormat(date);

  const time = date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return { date: formattedDate, time };
};

const PlanPage = () => {
  const { data } = useQuery({
    queryKey: ['planInfo'],
    queryFn: getPathInfo,
  });

  const formattedTime = formatStartTime(data?.createdAt || new Date().toISOString());

  return (
    <S.PlanPageLayout>
      <Header>
        <Header.Left>
          <Header.HomeButton />
        </Header.Left>
        <Header.Right>
          <Header.MenuButton />
        </Header.Right>
      </Header>

      {/* 이동 정보 */}
      <S.PlanHeader>
        <S.TimeInfoHeader>
          <S.TimeWrapper>
            <Icon icon="Fire" width={32} height={32} color={colors.green500} />
            <S.TotalUsableTimeWrapper>
              <S.TotalUsableTime>{data?.totalSectionTime}</S.TotalUsableTime>
              <S.TotalUsableTimeText>분 활용 가능</S.TotalUsableTimeText>
            </S.TotalUsableTimeWrapper>
          </S.TimeWrapper>

          <S.DateHeader>
            <span>{formattedTime.date}</span>
            <S.VerticalLine />
            <span>{formattedTime.time}&nbsp;시작</span>
          </S.DateHeader>
        </S.TimeInfoHeader>

        <S.MapLink to="/map">
          <span>내 주변 통학생은 무엇을 하고 있을까요?</span>
          <Icon icon="Chevron" rotate={180} width={16} height={16} />
        </S.MapLink>
      </S.PlanHeader>

      <S.HorizontalLine />

      <S.PlanContent>
        {data?.paths.map((path) => (
          <S.RouteContentContainer key={path.pathId}>
            <S.TransportHeader>
              <S.TransportIconWrapper $trafficType={TRAFFIC_ICON[path.trafficType]}>
                <Icon icon={TRAFFIC_ICON[path.trafficType]} width={16} height={16} />
                {path.subwayCode && <S.SubwayNumber>7</S.SubwayNumber>}
              </S.TransportIconWrapper>
              <S.TransportType $trafficType={TRAFFIC_ICON[path.trafficType]}>
                {TRAFFIC_TYPE[path.trafficType]}
              </S.TransportType>
            </S.TransportHeader>

            <S.RouteTodoContentContainer>
              {/* 대중교통 막대바 */}
              <S.TransportBarWrapper>
                <S.TransportBar $trafficType={TRAFFIC_ICON[path.trafficType]} />
              </S.TransportBarWrapper>

              {/* 타임블럭 */}
              <S.TimeBlockContainer>
                <S.TimeBlockWrapper>
                  <S.TimeBlockHeader>
                    <S.SectionTime>{path.sectionTime}분</S.SectionTime>
                    <S.EditButton
                      icon={
                        <Icon
                          icon="Edit"
                          width={16}
                          height={16}
                          color={colors.gray600}
                          cursor="pointer"
                        />
                      }
                      text="수정하기"
                    />
                  </S.TimeBlockHeader>

                  {/* 첫번째 타임블럭 리스트 */}
                  <S.TimeBlockList>
                    {path.todos.map((todo, idx) => (
                      <Fragment key={idx}>
                        <S.TimeBlockItem>
                          <Icon icon="EmptyCheck" cursor="pointer" />
                          <S.TimeBlockContent>
                            <S.TodoTitle>{todo.title}</S.TodoTitle>
                            <S.TodoMemo>{todo.memo}</S.TodoMemo>
                          </S.TimeBlockContent>
                        </S.TimeBlockItem>
                      </Fragment>
                    ))}
                  </S.TimeBlockList>
                </S.TimeBlockWrapper>
              </S.TimeBlockContainer>
            </S.RouteTodoContentContainer>
          </S.RouteContentContainer>
        ))}
      </S.PlanContent>

      {/* 이동 완료 버튼 영역 */}
      <S.FinishButtonWrapper>
        <S.FinishButton>이동 완료</S.FinishButton>
      </S.FinishButtonWrapper>
    </S.PlanPageLayout>
  );
};

export default PlanPage;
