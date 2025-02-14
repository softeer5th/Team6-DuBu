import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteTodo } from '@/api/todo';
import { QUERY_KEY } from '@/constants/queryKey';
import { TodoType } from '@/types/todo';

const useDeleteTodoMutation = (todoType: TodoType) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ todoId, planId }: { todoId: number; planId?: number }) =>
      deleteTodo(todoId, todoType),

    onSuccess: (_, params) => {
      if (params.planId) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.routeTodoList, todoType],
        });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.recommendLimit, todoType],
        });
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.recommendAll] });
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.favorite, todoType] });
      } else {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.todoList, todoType] });
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.recommendLimit, todoType],
        });
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.recommendAll] });
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.favorite] });
      }
    },
  });
};

export default useDeleteTodoMutation;
