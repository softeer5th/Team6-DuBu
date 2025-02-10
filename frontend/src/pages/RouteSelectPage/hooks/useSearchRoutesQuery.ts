import { useQuery, UseQueryResult } from '@tanstack/react-query';

import { RouteType } from '../RouteSelectPage.types';

import { getRoutes } from '@/api/search';
import { QUERY_KEY } from '@/constants/queryKey';

const useSearchRoutesQuery = (
  startX: string,
  startY: string,
  endX: string,
  endY: string,
): UseQueryResult<RouteType[], Error> => {
  const isCoordinateValid = !!startX && !!startY && !!endX && !!endY;

  return useQuery({
    queryKey: [QUERY_KEY.searchRoutes, startX, startY, endX, endY],
    queryFn: () => getRoutes({ startX, startY, endX, endY }),
    enabled: isCoordinateValid,
  });
};

export default useSearchRoutesQuery;
