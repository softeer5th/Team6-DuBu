import { useMutation, useQueryClient } from '@tanstack/react-query';

import { editTodo } from '@/api/todo';
import { QUERY_KEY } from '@/constants/queryKey';
import { Todo } from '@/types/todo';

const useEditTodoMutation = (dateType: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ todo }: { todo: Todo }) => editTodo(todo),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.todoList, dateType] });
    },
  });
};

export default useEditTodoMutation;
