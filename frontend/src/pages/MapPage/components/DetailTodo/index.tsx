import { useQuery } from '@tanstack/react-query';

import * as S from './DetailTodo.styled';

import { getTodoDetail } from '@/api/map';
import Icon from '@/components/Icon';
import { ICON_MAPPER } from '@/constants/config';

interface DetailUserTodoProps {
  memberId: number;
}

const DetailUserTodo = ({ memberId }: DetailUserTodoProps) => {
  const { data } = useQuery({
    queryKey: ['detailTodo', memberId],
    queryFn: () => getTodoDetail(memberId),
  });

  return (
    <div>
      <div>
        <S.Nickname>{data?.nickname}님이 오늘 하고 있는 일</S.Nickname>

        {data?.todo.map((todo) => (
          <S.DetailTitleItem key={todo.todoId}>
            <S.TitleWrapper>
              <Icon icon={ICON_MAPPER[todo.category]} />
              <S.DetailTitle>{todo.title}</S.DetailTitle>
            </S.TitleWrapper>
            {todo.isSaved ? (
              <Icon icon="FilledFavorite" cursor="pointer" />
            ) : (
              <Icon icon="Favorite" cursor="pointer" />
            )}
          </S.DetailTitleItem>
        ))}
      </div>
    </div>
  );
};

export default DetailUserTodo;
