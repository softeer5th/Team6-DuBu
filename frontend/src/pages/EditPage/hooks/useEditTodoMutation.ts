import { useMutation, useQueryClient } from '@tanstack/react-query';

import { editTodo } from '@/api/todo';
import { TODO_TYPE } from '@/constants/config';
import { QUERY_KEY } from '@/constants/queryKey';
import { Todo } from '@/types/todo';

const useEditTodoMutation = (dateType: 'today' | 'tomorrow' | 'route') => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ todo, planId }: { todo: Todo; planId?: number }) =>
      editTodo(todo, TODO_TYPE[dateType]),

    onSuccess: (_, params) => {
      if (params.planId) {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.routeTodoList, 'PATH'] });
      } else {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.todoList, dateType] });
      }
    },
  });
};

export default useEditTodoMutation;
