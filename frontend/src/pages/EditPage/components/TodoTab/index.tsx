import TodoEditItem from '../TodoEditItem';
import * as S from './TodoTab.styled';
import { TODO_TAB_TEXT } from '../../EditPage.constants';
import { useAddTodoBottomSheet } from '../../hooks/useAddTodoBottomSheet';
import useDeleteTodoMutation from '../../hooks/useDeleteTodoMutation';
import useEditTodoBottomSheet from '../../hooks/useEditTodoBottomSheet';

import BottomSheet from '@/components/BottomSheet';
import IconButton from '@/components/Button/IconButton';
import Icon from '@/components/Icon';
import { MAX_TODO_ITEM_LENGTH } from '@/constants/config';
import { TODO_TOAST_MESSAGE } from '@/constants/message';
import useQueryParamsDate from '@/hooks/useQueryParamsDate';
import useRouteTodoQuery from '@/hooks/useRouteTodoQuery';
import useToast from '@/hooks/useToast';
import useTodoListQuery from '@/hooks/useTodoListQuery';
import { TodoType } from '@/types/todo';

interface TodoTabProps {
  todoType: TodoType;
  planId?: number;
}

const TodoTab = ({ todoType, planId }: TodoTabProps) => {
  const { dateType } = useQueryParamsDate();

  const { toast } = useToast();
  const { data: currentTodoList } = useTodoListQuery(dateType, Number(planId));
  const { data: routeTodoList } = useRouteTodoQuery(Number(planId));
  const { mutate: deleteTodo } = useDeleteTodoMutation(todoType);

  const todoList = currentTodoList || routeTodoList;

  const {
    isOpen: isAddOpen,
    open: openAddBottomSheet,
    close: closeAddBottomSheet,
    content: addContent,
    title: addTodoForm,
  } = useAddTodoBottomSheet(todoType, planId);

  const {
    isOpen: isEditOpen,
    open: openEditBottomSheet,
    close: closeEditBottomSheet,
    content: editTodoForm,
    title: editTitle,
  } = useEditTodoBottomSheet(todoType, planId);

  const handleClickAddTodo = () => {
    if (currentTodoList && currentTodoList.length >= MAX_TODO_ITEM_LENGTH) {
      toast({ message: TODO_TOAST_MESSAGE.limit });

      return;
    }

    openAddBottomSheet();
  };

  const handleDeleteTodo = (todoId: number) => {
    deleteTodo(
      { todoId, planId },
      { onSuccess: () => toast({ message: TODO_TOAST_MESSAGE.delete }) },
    );
  };

  if (!todoList) return null;

  return (
    <S.TodoTabLayout>
      <S.SloganWrapper>{TODO_TAB_TEXT[todoType]}</S.SloganWrapper>
      <S.TodoEditList>
        {todoList.map((todo) => (
          <TodoEditItem
            key={todo.todoId}
            todo={todo}
            left={
              <IconButton
                icon={<Icon icon="MinusCircle" cursor="pointer" />}
                onClick={() => handleDeleteTodo(todo.todoId)}
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
          onClick={handleClickAddTodo}
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
