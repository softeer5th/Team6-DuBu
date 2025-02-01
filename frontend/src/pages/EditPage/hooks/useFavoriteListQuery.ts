import { useQuery } from '@tanstack/react-query';

import { getFavoriteTodoList } from '@/api/todo';

const useFavoriteTodoListQuery = () => {
  return useQuery({
    queryKey: ['favorite'],
    queryFn: getFavoriteTodoList,
  });
};

export default useFavoriteTodoListQuery;
