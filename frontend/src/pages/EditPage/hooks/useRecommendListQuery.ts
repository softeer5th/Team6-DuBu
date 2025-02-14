import { useQuery } from '@tanstack/react-query';

import { getRecommendLimitTodoList } from '@/api/todo';
import { QUERY_KEY } from '@/constants/queryKey';
import { TodoType } from '@/types/todo';

const useRecommendTodoListQuery = (todoType: TodoType, planId?: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.recommendLimit, todoType, planId],
    queryFn: () => getRecommendLimitTodoList(todoType, planId),
    staleTime: Infinity,
  });
};

export default useRecommendTodoListQuery;
