import { useQuery } from '@tanstack/react-query';

import { getRouteTodoList } from '@/api/todo';
import { QUERY_KEY } from '@/constants/queryKey';

const useRouteTodoQuery = (routeId?: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.todoList, routeId],
    queryFn: () => {
      if (typeof routeId === 'undefined') {
        throw new Error('routeId가 존재하지 않습니다.');
      }

      return getRouteTodoList(routeId);
    },
    staleTime: Infinity,
    enabled: !!routeId,
  });
};

export default useRouteTodoQuery;
