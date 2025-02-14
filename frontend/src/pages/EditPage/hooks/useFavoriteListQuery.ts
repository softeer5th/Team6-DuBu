import { useQuery } from '@tanstack/react-query';

import { getFavoriteTodoList } from '@/api/todo';
import { TODO_TYPE } from '@/constants/config';
import { QUERY_KEY } from '@/constants/queryKey';

const useFavoriteTodoListQuery = (tabType: 'today' | 'tomorrow' | 'route', planId?: number) => {
  // const { dateType } = useQueryParamsDate();

  return useQuery({
    queryKey: [QUERY_KEY.favorite, TODO_TYPE[tabType], planId],
    queryFn: () => getFavoriteTodoList(TODO_TYPE[tabType], 5, planId),
    staleTime: Infinity,
  });
};

export default useFavoriteTodoListQuery;
