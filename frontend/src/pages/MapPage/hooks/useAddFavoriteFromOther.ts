import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addFavoriteFromOther } from '@/api/map';
import { QUERY_KEY } from '@/constants/queryKey';

const useAddFavoriteFromOther = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ todoId, memberId }: { todoId: number; memberId: number }) => {
      return addFavoriteFromOther(todoId);
    },
    onSuccess: (_, { memberId }) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.detailTodo, memberId] });
    },
  });
};

export default useAddFavoriteFromOther;
