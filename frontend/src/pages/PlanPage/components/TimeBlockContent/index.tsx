import { useNavigate } from 'react-router';

import * as S from './TimeBlockContent.styled';
import TimeBlockList from './TimeBlockList';
import { TRAFFIC_ICON } from '../../PlanPage.constants';
import { TrafficType } from '../../PlanPage.types';

import { pathTodo } from '@/api/plan';
import Icon from '@/components/Icon';
import { colors } from '@/styles/theme';

interface TimeBlockProps {
  pathId: number;
  sectionTime: number;
  todos: pathTodo[];
  trafficType: TrafficType;
}

const TimeBlockContent = ({ pathId, sectionTime, todos, trafficType }: TimeBlockProps) => {
  const navigate = useNavigate();

  const goToRouteTodoEdit = () => {
    navigate(`/plan/${pathId}/todos/edit`);
  };

  return (
    <S.TimeBlockContentSection>
      {/* 대중교통 막대바 */}
      <S.TransportBarWrapper>
        <S.TransportBar $trafficType={TRAFFIC_ICON[trafficType]} />
      </S.TransportBarWrapper>

      {/* 타임블럭 */}
      <S.TimeBlockContainer>
        <S.TimeBlockWrapper>
          <S.TimeBlockHeader>
            <S.SectionTime>{sectionTime}분</S.SectionTime>
            <S.EditButton
              icon={
                <Icon icon="Edit" width={16} height={16} color={colors.gray600} cursor="pointer" />
              }
              text="수정하기"
              onClick={goToRouteTodoEdit}
            />
          </S.TimeBlockHeader>
          <TimeBlockList todos={todos} />
        </S.TimeBlockWrapper>
      </S.TimeBlockContainer>
    </S.TimeBlockContentSection>
  );
};

export default TimeBlockContent;
