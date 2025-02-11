import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addTodo, TodoAddParams } from '@/api/todo';
import { QUERY_KEY } from '@/constants/queryKey';

const useAddTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ dateType, todo, planId }: TodoAddParams) => addTodo({ dateType, todo, planId }),

    onSuccess: (_, params) => {
      if (params.planId) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.routeTodoList, params.planId],
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
