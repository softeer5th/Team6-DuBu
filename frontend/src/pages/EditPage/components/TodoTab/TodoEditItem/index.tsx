import * as S from './TodoEditItem.styled';

import { Todo } from '@/api/todo';
import IconButton from '@/components/Button/IconButton';
import Icon from '@/components/Icon';
import { categoryMapper } from '@/pages/EditPage/EditPage.constants';

interface TodoEditItemProps {
  todo: Todo;
}

const TodoEditItem = ({ todo }: TodoEditItemProps) => {
  return (
    <S.TodoEditItem key={todo.todo_id}>
      <IconButton icon={<Icon icon="MinusCircle" />} />
      <S.TodoTextWrapper>
        <S.TodoTitle>{todo.name}</S.TodoTitle>
        <S.TodoBadgeWrapper>
          <S.TodoBadge $category={todo.category}>{`#${categoryMapper[todo.category]}`}</S.TodoBadge>
          <S.TodoBadge>{`#${todo.difficulty}`}</S.TodoBadge>
        </S.TodoBadgeWrapper>
      </S.TodoTextWrapper>
      <IconButton icon={<Icon icon="Edit" />} />
    </S.TodoEditItem>
  );
};

export default TodoEditItem;
