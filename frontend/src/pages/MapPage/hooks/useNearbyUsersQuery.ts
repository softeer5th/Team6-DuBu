import { useQuery } from '@tanstack/react-query';

import { getNearbyUsers } from '@/api/map';
import { QUERY_KEY } from '@/constants/queryKey';

const AROUND_RADIUS = 3000;

interface useNearbyUsersQueryProps {
  lng: number;
  lat: number;
}

const useNearbyUsersQuery = ({ lng, lat }: useNearbyUsersQueryProps) => {
  return useQuery({
    queryKey: [QUERY_KEY.nearbyUsers, lng, lat],
    queryFn: () =>
      getNearbyUsers({
        radius: AROUND_RADIUS,
        x_coordinate: lng,
        y_coordinate: lat,
      }),
    enabled: !!lng && !!lat,
  });
};

export default useNearbyUsersQuery;
