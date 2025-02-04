import * as S from './TodoEditItem.styled';

import { categoryMapper } from '@/pages/EditPage/EditPage.constants';
import { Todo } from '@/types/todo';

const difficultyMapper = {
  EASY: '쉬움',
  NORMAL: '보통',
  HARD: '어려움',
};

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
          <S.TodoBadge $category={todo.category}>{`#${categoryMapper[todo.category]}`}</S.TodoBadge>
          <S.TodoBadge>{`#${difficultyMapper[todo.difficulty]}`}</S.TodoBadge>
        </S.TodoBadgeWrapper>
      </S.TodoTextWrapper>
      {right}
    </S.TodoEditItem>
  );
};

export default TodoEditItem;
