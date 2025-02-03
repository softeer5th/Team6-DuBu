import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteTodo } from '@/api/todo';
import { QUERY_KEY } from '@/constants/queryKey';

const useDeleteTodoMutation = (dateType: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ todoId }: { todoId: number }) => deleteTodo(todoId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.todoList, dateType] });
    },
  });
};

export default useDeleteTodoMutation;
