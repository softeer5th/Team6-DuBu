import { useQuery } from '@tanstack/react-query';

import { getFavoriteTodoList } from '@/api/todo';
import { TODO_TYPE } from '@/constants/config';
import { QUERY_KEY } from '@/constants/queryKey';
import useQueryParamsDate from '@/hooks/useQueryParamsDate';

const useFavoriteTodoListQuery = () => {
  const { dateType } = useQueryParamsDate();

  return useQuery({
    queryKey: [QUERY_KEY.favorite],
    queryFn: () => getFavoriteTodoList(TODO_TYPE[dateType]),
    staleTime: Infinity,
  });
};

export default useFavoriteTodoListQuery;
