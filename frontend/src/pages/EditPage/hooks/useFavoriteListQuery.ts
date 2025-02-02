import { useQuery } from '@tanstack/react-query';

import { getFavoriteTodoList } from '@/api/todo';
import { QUERY_KEY } from '@/constants/queryKey';

const useFavoriteTodoListQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEY.favorite],
    queryFn: getFavoriteTodoList,
    staleTime: Infinity,
  });
};

export default useFavoriteTodoListQuery;
