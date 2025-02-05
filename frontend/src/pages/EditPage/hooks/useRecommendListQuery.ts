import { useQuery } from '@tanstack/react-query';

import { getRecommendLimitTodoList } from '@/api/todo';
import { QUERY_KEY } from '@/constants/queryKey';

const useRecommendTodoListQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEY.recommendLimit],
    queryFn: getRecommendLimitTodoList,
    staleTime: Infinity,
  });
};

export default useRecommendTodoListQuery;
