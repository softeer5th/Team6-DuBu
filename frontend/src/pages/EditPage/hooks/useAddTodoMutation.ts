import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addTodo, TodoCreateParams } from '@/api/todo';
import { TODO_TYPE } from '@/constants/config';
import { QUERY_KEY } from '@/constants/queryKey';

interface AddTodoMutationParams {
  dateType: 'today' | 'tomorrow' | 'route';
  todo: TodoCreateParams;
  planId?: number;
}

const useAddTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ dateType, todo, planId }: AddTodoMutationParams) =>
      addTodo({ dateType: TODO_TYPE[dateType], todo, planId }),

    onSuccess: (_, params) => {
      if (params.planId) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.routeTodoList, 'PATH', params.planId],
        });
      } else {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.todoList, params.dateType],
        });
      }
    },
  });
};

export default useAddTodoMutation;
