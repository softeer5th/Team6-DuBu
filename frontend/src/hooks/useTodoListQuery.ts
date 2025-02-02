import { useQuery } from '@tanstack/react-query';

import { getTodayTodoList, getTomorrowTodoList } from '@/api/todo';
import { QUERY_KEY } from '@/constants/queryKey';

const useTodoListQuery = (isToday: boolean) => {
  return useQuery({
    queryKey: [QUERY_KEY.todoList, isToday],
    queryFn: () => (isToday ? getTodayTodoList() : getTomorrowTodoList()),
    staleTime: Infinity,
  });
};

export default useTodoListQuery;
