import * as S from './TimeBlockList.styled';

import { pathTodo } from '@/api/plan';
import Icon from '@/components/Icon';

interface TimeBlockListProps {
  todos: pathTodo[];
}

const TimeBlockList = ({ todos }: TimeBlockListProps) => {
  return (
    <S.TimeBlockList>
      {todos.map((todo, idx) => (
        <S.TimeBlockItem key={idx}>
          <Icon icon="EmptyCheck" cursor="pointer" />
          <S.TimeBlockContent>
            <S.TodoTitle>{todo.title}</S.TodoTitle>
            <S.TodoMemo>{todo.memo}</S.TodoMemo>
          </S.TimeBlockContent>
        </S.TimeBlockItem>
      ))}
    </S.TimeBlockList>
  );
};

export default TimeBlockList;
