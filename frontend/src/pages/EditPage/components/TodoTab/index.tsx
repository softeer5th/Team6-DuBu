import { useEffect, useState } from 'react';

import TodoEditItem from '../TodoEditItem';
import TodoAddForm from './TodoAddForm';
import * as S from './TodoTab.styled';
import useAddTodoMutation from '../../hooks/useAddTodoMutation';
import useDeleteTodoMutation from '../../hooks/useDeleteTodoMutation';

import { TodoAddParams } from '@/api/todo';
import BottomSheet from '@/components/BottomSheet';
import IconButton from '@/components/Button/IconButton';
import Icon from '@/components/Icon';
import useQueryParamsDate from '@/hooks/useQueryParamsDate';
import useTodoListQuery from '@/hooks/useTodoListQuery';

const TodoTab = () => {
  const { isToday, dateType } = useQueryParamsDate();
  const { data: todoList } = useTodoListQuery(dateType);
  const { mutate: deleteTodo } = useDeleteTodoMutation(dateType);
  const { mutate: addTodo, isSuccess } = useAddTodoMutation();

  const [isOpen, setIsOpen] = useState(false);

  const handleOpenBottomSheet = () => {
    setIsOpen(true);
  };

  const handleCloseBottomSheet = () => {
    setIsOpen(false);
  };

  const handleAddTodo = (todo: TodoAddParams) => {
    addTodo({ dateType, todo });
  };

  useEffect(() => {
    if (isSuccess) {
      handleCloseBottomSheet();
    }
  }, [isSuccess]);

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
            left={
              <IconButton
                onClick={() => deleteTodo({ todoId: todo.todo_id })}
                icon={<Icon icon="MinusCircle" cursor="pointer" />}
              />
            }
            right={<IconButton icon={<Icon icon="Edit" cursor="pointer" />} />}
          />
        ))}
        <IconButton
          icon={<Icon icon="PlusCircle" cursor="pointer" />}
          text="직접 추가하기"
          isFull={true}
          onClick={handleOpenBottomSheet}
        />
      </S.TodoEditList>

      <BottomSheet
        isOpen={isOpen}
        title="할 일 추가하기"
        content={<TodoAddForm handleAddTodo={handleAddTodo} />}
        onClose={handleCloseBottomSheet}
      />
    </S.TodoTabLayout>
  );
};

export default TodoTab;
