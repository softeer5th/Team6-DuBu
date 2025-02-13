import { useQuery } from '@tanstack/react-query';

import { getRecommendLimitTodoList } from '@/api/todo';
import { TODO_TYPE } from '@/constants/config';
import { QUERY_KEY } from '@/constants/queryKey';
import useQueryParamsDate from '@/hooks/useQueryParamsDate';

const useRecommendTodoListQuery = () => {
  const { dateType } = useQueryParamsDate();

  return useQuery({
    queryKey: [QUERY_KEY.recommendLimit, dateType],
    queryFn: () => getRecommendLimitTodoList(TODO_TYPE[dateType]),
    staleTime: Infinity,
  });
};

export default useRecommendTodoListQuery;
