import RouteBar from './RouteBar';
import RouteDetail from './RouteDetail';
import * as S from './RouteItem.styled';
import RouteTimeInfo from './RouteTimeInfo';

import { RouteType } from '@/pages/RouteSelectPage/RouteSelectPage.types';

interface RouteItemProps {
  route: RouteType;
  isSelected: boolean;
  onClick: () => void;
}

const RouteItem = ({ route, isSelected, onClick }: RouteItemProps) => {
  const { isRecentlyUsed, totalTime, totalSectionTime } = route;

  return (
    <S.RouteResultItem $isSelected={isSelected} onClick={onClick}>
      {isRecentlyUsed ? <S.RecentlyUsedBox>최근에 이용했어요</S.RecentlyUsedBox> : ''}
      <RouteTimeInfo totalTime={totalTime} totalSectionTime={totalSectionTime} />
      <RouteBar route={route} />
      <RouteDetail route={route} />
    </S.RouteResultItem>
  );
};

export default RouteItem;
