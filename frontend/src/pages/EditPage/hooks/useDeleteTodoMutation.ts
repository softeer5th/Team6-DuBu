import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteTodo } from '@/api/todo';
import { TODO_TYPE } from '@/constants/config';
import { QUERY_KEY } from '@/constants/queryKey';

const useDeleteTodoMutation = (dateType: 'today' | 'tomorrow' | 'route') => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ todoId, planId }: { todoId: number; planId?: number }) =>
      deleteTodo(todoId, TODO_TYPE[dateType]),

    onSuccess: (_, params) => {
      if (params.planId) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.routeTodoList, 'PATH'],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.recommendLimit, 'PATH'],
        });
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.recommendAll] });
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.favorite, 'PATH'] });
      } else {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.todoList, TODO_TYPE[dateType]] });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.recommendLimit, TODO_TYPE[dateType]],
        });
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.recommendAll] });
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.favorite] });
      }
    },
  });
};

export default useDeleteTodoMutation;
