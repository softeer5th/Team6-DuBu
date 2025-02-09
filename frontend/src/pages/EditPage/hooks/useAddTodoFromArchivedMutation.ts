import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addTodoFromArchived } from '@/api/todo';
import { QUERY_KEY } from '@/constants/queryKey';

const useAddTodoFromArchivedMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      dateType,
      todoId,
      planId,
    }: {
      dateType: string;
      todoId: number;
      planId?: number;
    }) => addTodoFromArchived(dateType, todoId, planId),
    onSuccess: (_, params) => {
      if (params.planId) {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.routeTodoList, params.planId] });
      } else {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.todoList, params.dateType] });
      }
    },
  });
};

export default useAddTodoFromArchivedMutation;
