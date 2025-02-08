import { useQuery } from '@tanstack/react-query';

import { getRecommendAllTodoList } from '@/api/todo';
import { QUERY_KEY } from '@/constants/queryKey';
import { CategoryType, DifficultyType } from '@/types/filter';

const useRecommendTodoFilterQuery = (
  categoryList: CategoryType[],
  difficultyList: DifficultyType[],
) => {
  return useQuery({
    queryKey: [QUERY_KEY.recommendAll, ...categoryList, ...difficultyList],
    queryFn: () => getRecommendAllTodoList({ category: categoryList, difficulty: difficultyList }),
    staleTime: Infinity,
  });
};

export default useRecommendTodoFilterQuery;
