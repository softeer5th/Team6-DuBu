import { useMutation, useQueryClient } from '@tanstack/react-query';

import { addTodoFromArchived, RecommendTodo } from '@/api/todo';
import { QUERY_KEY } from '@/constants/queryKey';
import { CategoryType, DifficultyType } from '@/types/filter';

const useAddTodoFromArchivedMutation = (
  categoryList?: CategoryType[],
  difficultyList?: DifficultyType[],
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      dateType,
      todoId,
      planId,
    }: {
      dateType: string;
      todoId: number;
      planId?: number;
    }) => addTodoFromArchived(dateType, todoId, planId),
    onSuccess: (_, { todoId, planId, dateType }) => {
      if (planId) {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.routeTodoList, planId] });
      } else {
        queryClient.invalidateQueries({ queryKey: [QUERY_KEY.todoList, dateType] });

        // 응답값으로 쿼리 캐싱 갱신 (추천 할 일)
        queryClient.setQueryData<RecommendTodo[]>([QUERY_KEY.recommendLimit, dateType], (old) => {
          if (!old) return old;

          return old.map((todo) => {
            if (todo.todoId === todoId) {
              return { ...todo, hasChild: !todo.hasChild };
            }

            return todo;
          });
        });

        // 응답값으로 쿼리 캐싱 갱신 (즐겨찾기)
        queryClient.setQueryData<RecommendTodo[]>([QUERY_KEY.favorite], (old) => {
          if (!old) return old;

          return old.map((todo) => {
            if (todo.todoId === todoId) {
              return { ...todo, hasChild: !todo.hasChild };
            }

            return todo;
          });
        });

        if (!categoryList || !difficultyList) return;

        // 응답값으로 쿼리 캐싱 갱신 (모든 추천)
        queryClient.setQueryData<RecommendTodo[]>(
          [QUERY_KEY.recommendAll, ...categoryList, ...difficultyList],
          (old) => {
            if (!old) return old;

            return old.map((todo) => {
              if (todo.todoId === todoId) {
                return { ...todo, hasChild: !todo.hasChild };
              }

              return todo;
            });
          },
        );
      }
    },
  });
};

export default useAddTodoFromArchivedMutation;
