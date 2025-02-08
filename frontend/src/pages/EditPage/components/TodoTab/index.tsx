import TodoEditItem from '../TodoEditItem';
import * as S from './TodoTab.styled';
import { useAddTodoBottomSheet } from '../../hooks/useAddTodoBottomSheet';
import useDeleteTodoMutation from '../../hooks/useDeleteTodoMutation';
import useEditTodoBottomSheet from '../../hooks/useEditTodoBottomSheet';

import BottomSheet from '@/components/BottomSheet';
import IconButton from '@/components/Button/IconButton';
import Icon from '@/components/Icon';
import useQueryParamsDate from '@/hooks/useQueryParamsDate';
import useTodoListQuery from '@/hooks/useTodoListQuery';

const TodoTab = () => {
  const { isToday, dateType } = useQueryParamsDate();
  const { data: todoList } = useTodoListQuery(dateType);
  const { mutate: deleteTodo } = useDeleteTodoMutation(dateType);

  const {
    isOpen: isAddOpen,
    open: openAddBottomSheet,
    close: closeAddBottomSheet,
    content: addContent,
    title: addTodoForm,
  } = useAddTodoBottomSheet(dateType);

  const {
    isOpen: isEditOpen,
    open: openEditBottomSheet,
    close: closeEditBottomSheet,
    content: editTodoForm,
    title: editTitle,
  } = useEditTodoBottomSheet(dateType);

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
            key={todo.todoId}
            todo={todo}
            left={
              <IconButton
                icon={<Icon icon="MinusCircle" cursor="pointer" />}
                onClick={() => deleteTodo({ todoId: todo.todoId })}
              />
            }
            right={
              <IconButton
                icon={<Icon icon="Edit" cursor="pointer" />}
                onClick={() => openEditBottomSheet(todo)}
              />
            }
          />
        ))}
        <IconButton
          icon={<Icon icon="PlusCircle" cursor="pointer" />}
          text="직접 추가하기"
          isFull={true}
          onClick={openAddBottomSheet}
        />
      </S.TodoEditList>

      <BottomSheet
        isOpen={isAddOpen}
        title={addTodoForm}
        content={addContent}
        onClose={closeAddBottomSheet}
      />
      <BottomSheet
        isOpen={isEditOpen}
        title={editTitle}
        content={editTodoForm}
        onClose={closeEditBottomSheet}
      />
    </S.TodoTabLayout>
  );
};

export default TodoTab;
