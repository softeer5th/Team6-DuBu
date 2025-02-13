import { useQuery } from '@tanstack/react-query';

import { getRecommendAllTodoList } from '@/api/todo';
import { TODO_TYPE } from '@/constants/config';
import { QUERY_KEY } from '@/constants/queryKey';
import { CategoryType, DifficultyType } from '@/types/filter';

const useRecommendTodoFilterQuery = (
  dateType: 'today' | 'tomorrow' | 'route',
  categoryList: CategoryType[],
  difficultyList: DifficultyType[],
) => {
  return useQuery({
    queryKey: [QUERY_KEY.recommendAll, ...categoryList, ...difficultyList],
    queryFn: () =>
      getRecommendAllTodoList({
        modifyType: TODO_TYPE[dateType],
        category: categoryList,
        difficulty: difficultyList,
        size: 5,
      }),
    staleTime: Infinity,
  });
};

export default useRecommendTodoFilterQuery;
