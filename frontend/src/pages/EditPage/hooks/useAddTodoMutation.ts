import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addTodo, TodoAddParams } from '@/api/todo';
import { QUERY_KEY } from '@/constants/queryKey';

const useAddTodoMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ dateType, todo }: { dateType: string; todo: TodoAddParams }) =>
      addTodo(dateType, todo),

    onSuccess: (_, params) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.todoList, params.dateType] });
    },
  });
};

export default useAddTodoMutation;
