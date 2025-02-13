import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteTodo } from '@/api/todo';
import { QUERY_KEY } from '@/constants/queryKey';

const useDeleteTodoMutation = (dateType: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ todoId, planId }: { todoId: number; planId?: number }) =>
      deleteTodo(todoId, planId),

    onSuccess: (_, params) => {
      if (params.planId) {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.routeTodoList, params.planId] });
      } else {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.todoList, dateType] });
      }
    },
  });
};

export default useDeleteTodoMutation;
