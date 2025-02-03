import * as S from './TodoEditItem.styled';

import { Todo } from '@/api/todo';
import { categoryMapper } from '@/pages/EditPage/EditPage.constants';

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
        <S.TodoTitle>{todo.name}</S.TodoTitle>
        <S.TodoBadgeWrapper>
          <S.TodoBadge $category={todo.category}>{`#${categoryMapper[todo.category]}`}</S.TodoBadge>
          <S.TodoBadge>{`#${todo.difficulty}`}</S.TodoBadge>
        </S.TodoBadgeWrapper>
      </S.TodoTextWrapper>
      {right}
    </S.TodoEditItem>
  );
};

export default TodoEditItem;
