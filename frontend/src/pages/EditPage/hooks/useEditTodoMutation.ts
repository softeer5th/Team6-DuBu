import { useMutation, useQueryClient } from '@tanstack/react-query';

import { editTodo } from '@/api/todo';
import { QUERY_KEY } from '@/constants/queryKey';
import { Todo } from '@/types/todo';

const useEditTodoMutation = (dateType: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ todo, routeId }: { todo: Todo; routeId?: number }) => editTodo(todo, routeId),

    onSuccess: (_, params) => {
      if (params.routeId) {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.routeTodoList, params.routeId] });
      } else {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.todoList, dateType] });
      }
    },
  });
};

export default useEditTodoMutation;
