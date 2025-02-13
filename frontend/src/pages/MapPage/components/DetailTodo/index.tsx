import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import * as S from './DetailTodo.styled';

import { addFavoriteFromOther, deleteFavoriteFromOther, getTodoDetail } from '@/api/map';
import Icon from '@/components/Icon';
import { ICON_MAPPER } from '@/constants/config';
import { QUERY_KEY } from '@/constants/queryKey';

const useAddFavoriteFromOther = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ todoId, memberId }: { todoId: number; memberId: number }) => {
      return addFavoriteFromOther(todoId);
    },
    onSuccess: (_, params) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.detailTodo, params.memberId] });
    },
  });
};

const useDeleteFavoriteFromOther = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ todoId, memberId }: { todoId: number; memberId: number }) => {
      return deleteFavoriteFromOther(todoId);
    },

    onSuccess: (_, params) => {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEY.detailTodo, params.memberId] });
    },
  });
};

interface DetailUserTodoProps {
  memberId: number;
}

const DetailUserTodo = ({ memberId }: DetailUserTodoProps) => {
  const { data } = useQuery({
    queryKey: [QUERY_KEY.detailTodo, memberId],
    queryFn: () => getTodoDetail(memberId),
  });

  const { mutate: addFavoriteFromOther } = useAddFavoriteFromOther();
  const { mutate: deleteFavoriteFromOther } = useDeleteFavoriteFromOther();

  return (
    <div>
      <div>
        <S.Nickname>{data?.nickname}님이 오늘 하고 있는 일</S.Nickname>

        <S.DetailTodoList>
          {data?.todo.map((todo) => (
            <S.DetailTodoItem key={todo.todoId}>
              <S.TitleWrapper>
                <Icon icon={ICON_MAPPER[todo.category]} />
                <S.DetailTitle>{todo.title}</S.DetailTitle>
              </S.TitleWrapper>
              {todo.isSaved ? (
                <Icon
                  icon="FilledFavorite"
                  cursor="pointer"
                  onClick={() => deleteFavoriteFromOther({ todoId: todo.todoId, memberId })}
                />
              ) : (
                <Icon
                  icon="Favorite"
                  cursor="pointer"
                  onClick={() => addFavoriteFromOther({ todoId: todo.todoId, memberId })}
                />
              )}
            </S.DetailTodoItem>
          ))}
        </S.DetailTodoList>
      </div>
    </div>
  );
};

export default DetailUserTodo;
