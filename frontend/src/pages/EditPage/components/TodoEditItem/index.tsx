import * as S from './TodoEditItem.styled';

import { CATEGORY_MAPPER, DIFFICULTY_MAPPER } from '@/pages/EditPage/EditPage.constants';
import { Todo } from '@/types/todo';

interface TodoEditItemProps {
  todo: Todo;
  left?: React.ReactNode;
  right?: React.ReactNode;
}

const TodoEditItem = ({ todo, left, right }: TodoEditItemProps) => {
  return (
    <S.TodoEditItem>
      {left}
      <S.TodoTextWrapper>
        <S.TodoTitle>{todo.title}</S.TodoTitle>
        <S.TodoBadgeWrapper>
          <S.TodoBadge
            $category={todo.category}
          >{`#${CATEGORY_MAPPER[todo.category]}`}</S.TodoBadge>
          <S.TodoBadge>{`#${DIFFICULTY_MAPPER[todo.difficulty]}`}</S.TodoBadge>
        </S.TodoBadgeWrapper>
      </S.TodoTextWrapper>
      {right}
    </S.TodoEditItem>
  );
};

export default TodoEditItem;
