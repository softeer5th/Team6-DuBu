import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addTodo, TodoAddParams } from '@/api/todo';
import { QUERY_KEY } from '@/constants/queryKey';

const useAddTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ dateType, todo, routeId }: TodoAddParams) =>
      addTodo({ dateType, todo, routeId }),

    onSuccess: (_, params) => {
      if (params.routeId) {
        queryClient.invalidateQueries({
          queryKey: [QUERY_KEY.routeTodoList, params.routeId],
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
