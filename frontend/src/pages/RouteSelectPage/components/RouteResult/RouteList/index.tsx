import styled from 'styled-components';

import RouteItem from './RouteItem';

import { RouteType } from '@/pages/RouteSelectPage/RouteSelectPage.types';

interface RouteListProps {
  routes: RouteType[];
  selectedRoute: RouteType | null;
  handleRouteSelect: (route: RouteType) => void;
}

const RouteList = ({ routes, selectedRoute, handleRouteSelect }: RouteListProps) => {
  return (
    <RouteResultLayout>
      {routes.map((route, index) => (
        <RouteItem
          key={index}
          route={route}
          isSelected={selectedRoute === route}
          onClick={() => handleRouteSelect(route)}
        />
      ))}
    </RouteResultLayout>
  );
};

const RouteResultLayout = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;

export default RouteList;
