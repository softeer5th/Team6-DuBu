import { useQuery } from '@tanstack/react-query';

import { getTodayTodoList, getTomorrowTodoList } from '@/api/todo';
import { DATE_TYPE } from '@/constants/config';
import { QUERY_KEY } from '@/constants/queryKey';
import { DateType } from '@/types/todo';

const useTodoListQuery = (dateType: DateType, planId?: number) => {
  return useQuery({
    queryKey: [QUERY_KEY.todoList, dateType],
    queryFn: () => (dateType === DATE_TYPE.TODAY ? getTodayTodoList() : getTomorrowTodoList()),
    staleTime: Infinity,
    enabled: !planId,
  });
};

export default useTodoListQuery;
