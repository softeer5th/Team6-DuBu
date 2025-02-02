import TodoEditItem from '../TodoEditItem';
import * as S from './TodoTab.styled';

import IconButton from '@/components/Button/IconButton';
import Icon from '@/components/Icon';
import useQueryParamsDate from '@/hooks/useQueryParamsDate';
import useTodoListQuery from '@/hooks/useTodoListQuery';

const TodoTab = () => {
  const { isToday } = useQueryParamsDate();
  const { data: todoList } = useTodoListQuery(isToday);

  if (!todoList) return null;

  return (
    <S.TodoTabLayout>
      <S.SloganWrapper>
        <span>{isToday ? '오늘' : '내일'} 할 일, 작은 목표로 시작해봐요</span>
        <span>최대 3개까지 고를 수 있어요</span>
      </S.SloganWrapper>

      <S.TodoEditList>
        {todoList.map((todo) => (
          <TodoEditItem
            key={todo.todo_id}
            todo={todo}
            left={<IconButton icon={<Icon icon="MinusCircle" cursor="pointer" />} />}
            right={<IconButton icon={<Icon icon="Edit" cursor="pointer" />} />}
          />
        ))}
        <IconButton
          icon={<Icon icon="PlusCircle" cursor="pointer" />}
          text="직접 추가하기"
          isFull={true}
        />
      </S.TodoEditList>
    </S.TodoTabLayout>
  );
};

export default TodoTab;
