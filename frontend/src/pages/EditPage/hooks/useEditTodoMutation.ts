import { useMutation, useQueryClient } from '@tanstack/react-query';

import { editTodo } from '@/api/todo';
import { QUERY_KEY } from '@/constants/queryKey';
import { Todo, TodoType } from '@/types/todo';

const useEditTodoMutation = (todoType: TodoType) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ todo, planId }: { todo: Todo; planId?: number }) => editTodo(todo, todoType),

    onSuccess: (_, params) => {
      if (params.planId) {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.routeTodoList, todoType] });
      } else {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.todoList, todoType] });
      }
    },
  });
};

export default useEditTodoMutation;
