import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteFavoriteFromOther } from '@/api/map';
import { QUERY_KEY } from '@/constants/queryKey';

const useDeleteFavoriteFromOther = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ todoId, memberId }: { todoId: number; memberId: number }) => {
      return deleteFavoriteFromOther(todoId);
    },

    onSuccess: (_, params) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.detailTodo, params.memberId] });
    },
  });
};

export default useDeleteFavoriteFromOther;
