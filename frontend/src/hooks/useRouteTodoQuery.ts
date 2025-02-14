import { useQuery } from '@tanstack/react-query';

import { getRouteTodoList } from '@/api/todo';
import { TODO_TYPE } from '@/constants/config';
import { QUERY_KEY } from '@/constants/queryKey';

const useRouteTodoQuery = (planId?: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.routeTodoList, TODO_TYPE.PATH, planId],
    queryFn: () => {
      if (typeof planId === 'undefined') {
        throw new Error('planId가 존재하지 않습니다.');
      }

      return getRouteTodoList(planId);
    },
    staleTime: Infinity,
    enabled: !!planId,
  });
};

export default useRouteTodoQuery;
