import { useState } from 'react';
import { useSearchParams } from 'react-router';

import RouteList from './RouteList';
import * as S from './RouteResult.styled';
import StartTime from './StartTime';

import useSearchRoutesQuery from '@/pages/RouteSelectPage/hooks/useSearchRoutesQuery';
import { RouteType } from '@/pages/RouteSelectPage/RouteSelectPage.types';

const RouteResult = () => {
  const { startX, startY, endX, endY } = Object.fromEntries(useSearchParams()[0]);
  const { data: routes = [] } = useSearchRoutesQuery(startX, startY, endX, endY);
  const [selectedRoute, setSelectedRoute] = useState<RouteType | null>(null);

  const handleRouteSelect = (route: RouteType) => {
    if (selectedRoute === route) {
      setSelectedRoute(null);
    } else {
      setSelectedRoute(route);
    }
  };

  return (
    <S.RouteResultContainer>
      <StartTime />
      <RouteList
        routes={routes}
        selectedRoute={selectedRoute}
        handleRouteSelect={handleRouteSelect}
      />
      {selectedRoute && <S.StartButton>이 경로로 출발할까요?</S.StartButton>}
    </S.RouteResultContainer>
  );
};

export default RouteResult;
