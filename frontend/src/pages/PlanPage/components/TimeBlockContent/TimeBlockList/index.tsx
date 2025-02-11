import TimeBlockItem from './TimeBlockItem';
import * as S from './TimeBlockList.styled';

import { PathTodo } from '@/api/plan';

interface TimeBlockListProps {
  todos: PathTodo[];
}

const TimeBlockList = ({ todos }: TimeBlockListProps) => {
  return (
    <S.TimeBlockList>
      {todos.map((todo, idx) => (
        <TimeBlockItem key={idx} todo={todo} />
      ))}
    </S.TimeBlockList>
  );
};

export default TimeBlockList;
