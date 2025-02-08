import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteTodo } from '@/api/todo';
import { QUERY_KEY } from '@/constants/queryKey';

const useDeleteTodoMutation = (dateType: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ todoId, routeId }: { todoId: number; routeId?: number }) =>
      deleteTodo(todoId, routeId),

    onSuccess: (_, params) => {
      if (params.routeId) {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.routeTodoList, params.routeId] });
      } else {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.todoList, dateType] });
      }
    },
  });
};

export default useDeleteTodoMutation;
