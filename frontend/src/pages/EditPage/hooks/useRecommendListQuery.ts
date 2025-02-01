import { useQuery } from '@tanstack/react-query';

import { getRecommendTodoList } from '@/api/todo';

const useRecommendTodoListQuery = () => {
  return useQuery({
    queryKey: ['recommend'],
    queryFn: getRecommendTodoList,
    staleTime: Infinity,
  });
};

export default useRecommendTodoListQuery;
