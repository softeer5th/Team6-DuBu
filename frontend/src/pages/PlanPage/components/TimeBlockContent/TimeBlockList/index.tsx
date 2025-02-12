import TimeBlockItem from './TimeBlockItem';
import * as S from './TimeBlockList.styled';

import { PathTodo } from '@/api/plan';
import Icon from '@/components/Icon';
import { colors } from '@/styles/theme';

interface TimeBlockListProps {
  todos: PathTodo[];
}

const TimeBlockList = ({ todos }: TimeBlockListProps) => {
  if (todos.length === 0) {
    return (
      <S.EmptyTimeBlock>
        <Icon icon="Fire" width={96} height={96} color={colors.green100} />
        <S.EmptyTimeBlockText>나의 시간, 값진 목표로 채워봐요!</S.EmptyTimeBlockText>
      </S.EmptyTimeBlock>
    );
  }

  return (
    <S.TimeBlockList>
      {todos.map((todo, idx) => (
        <TimeBlockItem key={idx} todo={todo} />
      ))}
    </S.TimeBlockList>
  );
};

export default TimeBlockList;
