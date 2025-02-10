import { getPathColor } from '../RouteItem.utils';
import * as S from './RouteDetail.styled';

import Icon, { IconType } from '@/components/Icon';
import { SUBWAY_LINES } from '@/constants/subwayLines';
import { PathType, RouteType } from '@/pages/RouteSelectPage/RouteSelectPage.types';
import theme from '@/styles/theme';

const ICON_MAPPER: Record<string, IconType> = {
  BUS: 'Bus',
  SUBWAY: 'Subway',
};

const renderRouteItem = (path: PathType, index: number) => {
  if (path.trafficType === 'WALK') return null;

  const pathColor = getPathColor(path);
  const isSubway = path.trafficType === 'SUBWAY';
  const pathName = isSubway
    ? SUBWAY_LINES[path.subwayCode as keyof typeof SUBWAY_LINES]?.name
    : path.busNumber;

  return (
    <S.RouteDetailItem key={index}>
      <S.DetailItemLabel>
        <Icon
          icon={ICON_MAPPER[path.trafficType as keyof typeof ICON_MAPPER]}
          width={16}
          height={16}
          color={pathColor}
        />
        <S.DetailItemType $color={pathColor}>{pathName}</S.DetailItemType>
        <S.DetailItemPath>
          {path.startName}
          <Icon icon="Chevron" width={12} height={12} rotate={180} color={theme.colors.gray500} />
          {path.endName}
        </S.DetailItemPath>
      </S.DetailItemLabel>
    </S.RouteDetailItem>
  );
};

const RouteDetail = ({ route }: { route: RouteType }) => {
  return <S.RouteDetailList>{route.paths.map(renderRouteItem)}</S.RouteDetailList>;
};

export default RouteDetail;
