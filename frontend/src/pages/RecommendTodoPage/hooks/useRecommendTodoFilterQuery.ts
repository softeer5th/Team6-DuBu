import { useQuery } from '@tanstack/react-query';

import { getRecommendAllTodoList } from '@/api/todo';
import { TODO_TYPE } from '@/constants/config';
import { QUERY_KEY } from '@/constants/queryKey';
import { CategoryType, DifficultyType } from '@/types/filter';

const RECOMMEND_TODO_SIZE = 20;

const useRecommendTodoFilterQuery = (
  dateType: 'today' | 'tomorrow' | 'route',
  categoryList: CategoryType[],
  difficultyList: DifficultyType[],
  pathId?: number,
) => {
  return useQuery({
    queryKey: [QUERY_KEY.recommendAll, ...categoryList, ...difficultyList, pathId],
    queryFn: () =>
      getRecommendAllTodoList({
        modifyType: TODO_TYPE[dateType],
        category: categoryList,
        difficulty: difficultyList,
        pathId,
        size: RECOMMEND_TODO_SIZE,
      }),
    staleTime: Infinity,
  });
};

export default useRecommendTodoFilterQuery;
