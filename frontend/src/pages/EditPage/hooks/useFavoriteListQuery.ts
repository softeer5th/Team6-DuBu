import { useQuery } from '@tanstack/react-query';

import { getFavoriteTodoList } from '@/api/todo';
import { QUERY_KEY } from '@/constants/queryKey';
import { TodoType } from '@/types/todo';

const PAGE_SIZE = 5;

const useFavoriteTodoListQuery = (todoType: TodoType, planId?: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.favorite, todoType, planId],
    queryFn: () => getFavoriteTodoList(todoType, PAGE_SIZE, planId),
    staleTime: Infinity,
  });
};

export default useFavoriteTodoListQuery;
