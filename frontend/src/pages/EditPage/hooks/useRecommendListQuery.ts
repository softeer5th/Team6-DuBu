import { useQuery } from '@tanstack/react-query';

import { getRecommendLimitTodoList } from '@/api/todo';
import { TODO_TYPE } from '@/constants/config';
import { QUERY_KEY } from '@/constants/queryKey';

const useRecommendTodoListQuery = (tabType: 'today' | 'tomorrow' | 'route', planId?: number) => {
  // const { dateType } = useQueryParamsDate();

  return useQuery({
    queryKey: [QUERY_KEY.recommendLimit, TODO_TYPE[tabType], planId],
    queryFn: () => getRecommendLimitTodoList(TODO_TYPE[tabType], planId),
    staleTime: Infinity,
  });
};

export default useRecommendTodoListQuery;
