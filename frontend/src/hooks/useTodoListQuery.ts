import { useQuery } from '@tanstack/react-query';

import { getTodayTodoList, getTomorrowTodoList } from '@/api/todo';
import { QUERY_KEY } from '@/constants/queryKey';

const useTodoListQuery = (dateType: string, routeId?: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.todoList, dateType],
    queryFn: () => (dateType === 'today' ? getTodayTodoList() : getTomorrowTodoList()),
    staleTime: Infinity,
    enabled: !routeId,
  });
};

export default useTodoListQuery;
