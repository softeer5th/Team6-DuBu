import { useQuery } from '@tanstack/react-query';

import { getRecommendAllTodoList } from '@/api/todo';
import { QUERY_KEY } from '@/constants/queryKey';
import { CategoryType, DifficultyType } from '@/types/filter';
import { TodoType } from '@/types/todo';

const RECOMMEND_TODO_SIZE = 20;

const useRecommendTodoFilterQuery = (
  todoType: TodoType,
  categoryList: CategoryType[],
  difficultyList: DifficultyType[],
  pathId?: number,
) => {
  return useQuery({
    queryKey: [QUERY_KEY.recommendAll, todoType, ...categoryList, ...difficultyList, pathId],
    queryFn: () =>
      getRecommendAllTodoList({
        modifyType: todoType,
        category: categoryList,
        difficulty: difficultyList,
        size: RECOMMEND_TODO_SIZE,
        pathId,
      }),
    staleTime: Infinity,
  });
};

export default useRecommendTodoFilterQuery;
