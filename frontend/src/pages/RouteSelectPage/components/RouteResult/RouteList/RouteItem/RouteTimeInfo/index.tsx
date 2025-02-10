import * as S from './RouteTimeInfo.styled';

import Icon from '@/components/Icon';
import theme from '@/styles/theme';

const formatTime = (time: number) => {
  if (time < 60) {
    return `${time}분`;
  }
  const hour = Math.floor(time / 60);
  const minute = time % 60;
  return `${hour}시간 ${minute > 0 ? `${minute}분` : ''}`;
};

interface RouteTimeInfoProps {
  totalTime: number;
  totalSectionTime: number;
}

const RouteTimeInfo = ({ totalTime, totalSectionTime }: RouteTimeInfoProps) => {
  return (
    <S.TimeContainer>
      <S.TotalTime>{formatTime(totalTime)}</S.TotalTime>

      <S.TotalSectionTimeBox>
        <Icon icon="Fire" width={16} height={16} color={theme.colors.gray400} />
        <span>활용 가능 시간</span>
        <S.TotalSectionTime>{formatTime(totalSectionTime)}</S.TotalSectionTime>
      </S.TotalSectionTimeBox>
    </S.TimeContainer>
  );
};

export default RouteTimeInfo;
