import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addTodoFromArchived } from '@/api/todo';
import { QUERY_KEY } from '@/constants/queryKey';

const useAddTodoFromArchivedMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      dateType,
      todoId,
      routeId,
    }: {
      dateType: string;
      todoId: number;
      routeId?: number;
    }) => addTodoFromArchived(dateType, todoId, routeId),
    onSuccess: (_, params) => {
      if (params.routeId) {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.routeTodoList, params.routeId] });
      } else {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.todoList, params.dateType] });
      }
    },
  });
};

export default useAddTodoFromArchivedMutation;
