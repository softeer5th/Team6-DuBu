import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addTodoFromArchived } from '@/api/todo';
import { QUERY_KEY } from '@/constants/queryKey';

const useAddTodoFromArchivedMutation = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ dateType, todoId }: { dateType: string; todoId: number }) =>
      addTodoFromArchived(dateType, todoId),
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.todoList, params.dateType] });
    },
  });
};

export default useAddTodoFromArchivedMutation;
