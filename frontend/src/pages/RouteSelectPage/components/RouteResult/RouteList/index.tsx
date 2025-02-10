import RouteItem from './RouteItem';
import * as S from './RouteList.styled';

import { RouteType } from '@/pages/RouteSelectPage/RouteSelectPage.types';

interface RouteListProps {
  routes: RouteType[];
  selectedRoute: RouteType | null;
  handleRouteSelect: (route: RouteType) => void;
}

const RouteList = ({ routes, selectedRoute, handleRouteSelect }: RouteListProps) => {
  return (
    <S.RouteListLayout>
      {routes.map((route, index) => (
        <RouteItem
          key={index}
          route={route}
          isSelected={selectedRoute === route}
          onClick={() => handleRouteSelect(route)}
        />
      ))}
    </S.RouteListLayout>
  );
};

export default RouteList;
