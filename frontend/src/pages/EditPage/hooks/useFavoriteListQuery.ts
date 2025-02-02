import { useQuery } from '@tanstack/react-query';

import { getFavoriteTodoList } from '@/api/todo';

const useFavoriteTodoListQuery = () => {
  return useQuery({
    queryKey: ['favorite'],
    queryFn: getFavoriteTodoList,
    staleTime: Infinity,
  });
};

export default useFavoriteTodoListQuery;
