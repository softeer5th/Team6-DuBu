import { useQuery } from '@tanstack/react-query';

import { getPlanInfo } from '@/api/plan';
import { QUERY_KEY } from '@/constants/queryKey';

const usePlanInfoQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEY.planInfo],
    queryFn: getPlanInfo,
  });
};

export default usePlanInfoQuery;
