import { useQuery } from '@tanstack/react-query';

import { getRecommendTodoList } from '@/api/todo';
import { QUERY_KEY } from '@/constants/queryKey';

const useRecommendTodoListQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEY.recommend],
    queryFn: getRecommendTodoList,
    staleTime: Infinity,
  });
};

export default useRecommendTodoListQuery;
