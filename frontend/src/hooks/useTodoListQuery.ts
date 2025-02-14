import { useQuery } from '@tanstack/react-query';

import { getTodayTodoList, getTomorrowTodoList } from '@/api/todo';
import { TODO_TYPE } from '@/constants/config';
import { QUERY_KEY } from '@/constants/queryKey';
import { TodoType } from '@/types/todo';

const useTodoListQuery = (dateType: TodoType, planId?: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.todoList, dateType],
    queryFn: () => (dateType === TODO_TYPE.TODAY ? getTodayTodoList() : getTomorrowTodoList()),
    staleTime: Infinity,
    enabled: !planId,
  });
};

export default useTodoListQuery;
