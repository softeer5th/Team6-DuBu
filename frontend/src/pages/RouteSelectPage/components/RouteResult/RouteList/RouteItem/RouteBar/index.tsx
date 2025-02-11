import { getPathBarWidth, getPathColor } from '../RouteItem.utils';
import * as S from './RouteBar.styled';

import Icon, { IconType } from '@/components/Icon';
import { RouteType } from '@/pages/RouteSelectPage/RouteSelectPage.types';

const ICON_MAPPER = {
  BUS: 'Bus' as const,
  SUBWAY: 'Subway' as const,
} satisfies Record<string, IconType>;

const RouteBar = ({ route }: { route: RouteType }) => {
  return (
    <S.RouteBarContainer>
      {route.paths.map((path, index) => {
        const barWidth = getPathBarWidth(path, route.totalTime);
        const pathColor = getPathColor(path);

        return (
          <S.RouteItem key={index} $barWidth={barWidth}>
            {path.trafficType !== 'WALK' && (
              <S.IconWrapper $color={pathColor}>
                <Icon
                  icon={ICON_MAPPER[path.trafficType as keyof typeof ICON_MAPPER]}
                  width={16}
                  height={16}
                />
              </S.IconWrapper>
            )}
            <S.RouteProgressBar
              $isTraffic={path.trafficType === 'BUS' || path.trafficType === 'SUBWAY'}
              $color={pathColor}
            />
          </S.RouteItem>
        );
      })}
    </S.RouteBarContainer>
  );
};

export default RouteBar;
