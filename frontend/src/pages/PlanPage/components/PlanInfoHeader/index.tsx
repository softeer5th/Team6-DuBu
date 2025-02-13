import * as S from './PlanInfoHeader.styled';
import { formatStartTime } from '../../PlanPage.utils';

import Icon from '@/components/Icon';
import { colors } from '@/styles/theme';

interface PlanInfoHeaderProps {
  createdAt?: string;
  totalSectionTime?: number;
}

const PlanInfoHeader = ({ createdAt, totalSectionTime }: PlanInfoHeaderProps) => {
  const formattedTime = formatStartTime(createdAt || new Date().toISOString());

  return (
    <S.PlanHeader>
      <S.TimeInfoHeader>
        <S.TimeWrapper>
          <Icon icon="Fire" width={32} height={32} color={colors.green500} />
          <S.TotalUsableTimeWrapper>
            <S.TotalUsableTime>{totalSectionTime}</S.TotalUsableTime>
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
  );
};

export default PlanInfoHeader;
