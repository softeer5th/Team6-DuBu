import { useQuery } from '@tanstack/react-query';

import { getTodayTodoList, getTomorrowTodoList } from '@/api/todo';

const useTodoListQuery = (isToday: boolean) => {
  return useQuery({
    queryKey: ['todoList', isToday],
    queryFn: () => (isToday ? getTodayTodoList() : getTomorrowTodoList()),
    staleTime: Infinity,
  });
};

export default useTodoListQuery;
