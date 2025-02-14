import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteTodo } from '@/api/todo';
import { QUERY_KEY } from '@/constants/queryKey';
import { TodoType } from '@/types/todo';

const useDeleteTodoMutation = (todoType: TodoType) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ todoId, planId }: { todoId: number; planId?: number }) =>
      deleteTodo(todoId, todoType),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.todoList, todoType] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.recommendLimit, todoType] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.recommendAll, todoType] });
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.favorite, todoType] });
    },
  });
};

export default useDeleteTodoMutation;
