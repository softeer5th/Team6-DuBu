import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addTodo, TodoCreateParams } from '@/api/todo';
import { QUERY_KEY } from '@/constants/queryKey';
import { TodoType } from '@/types/todo';

interface AddTodoMutationParams {
  todoType: TodoType;
  todo: TodoCreateParams;
  planId?: number;
}

const useAddTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ todoType, todo, planId }: AddTodoMutationParams) =>
      addTodo({ todoType, todo, planId }),

    onSuccess: (_, params) => {
      if (params.planId) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.routeTodoList, params.todoType, params.planId],
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.todoList, params.todoType],
        });
      }
    },
  });
};

export default useAddTodoMutation;
