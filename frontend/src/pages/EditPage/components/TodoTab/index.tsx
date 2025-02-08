import TodoEditItem from '../TodoEditItem';
import * as S from './TodoTab.styled';
import { useAddTodoBottomSheet } from '../../hooks/useAddTodoBottomSheet';
import useDeleteTodoMutation from '../../hooks/useDeleteTodoMutation';
import useEditTodoBottomSheet from '../../hooks/useEditTodoBottomSheet';

import BottomSheet from '@/components/BottomSheet';
import IconButton from '@/components/Button/IconButton';
import Icon from '@/components/Icon';
import useRouteTodoQuery from '@/hooks/useRouteTodoQuery';
import useTodoListQuery from '@/hooks/useTodoListQuery';

const TODO_TAB_MESSAGE = {
  today: '오늘 할 일, 작은 목표로 시작해봐요\n최대 3개까지 고를 수 있어요',
  tomorrow: '내일 할 일, 작은 목표로 시작해봐요\n최대 3개까지 고를 수 있어요',
  route: '이 구간에서 할 일을 골라보세요',
};

interface TodoTabProps {
  tabType: 'today' | 'tomorrow' | 'route';
  routeId?: number;
}

const TodoTab = ({ tabType, routeId }: TodoTabProps) => {
  const { data: currentTodoList } = useTodoListQuery(tabType, routeId);
  const { data: routeTodoList } = useRouteTodoQuery(routeId);
  const { mutate: deleteTodo } = useDeleteTodoMutation(tabType);

  const todoList = currentTodoList || routeTodoList;

  const {
    isOpen: isAddOpen,
    open: openAddBottomSheet,
    close: closeAddBottomSheet,
    content: addContent,
    title: addTodoForm,
  } = useAddTodoBottomSheet(tabType, routeId);

  const {
    isOpen: isEditOpen,
    open: openEditBottomSheet,
    close: closeEditBottomSheet,
    content: editTodoForm,
    title: editTitle,
  } = useEditTodoBottomSheet(tabType, routeId);

  if (!todoList) return null;

  return (
    <S.TodoTabLayout>
      <S.SloganWrapper>{TODO_TAB_MESSAGE[tabType]}</S.SloganWrapper>
      <S.TodoEditList>
        {todoList.map((todo) => (
          <TodoEditItem
            key={todo.todoId}
            todo={todo}
            left={
              <IconButton
                icon={<Icon icon="MinusCircle" cursor="pointer" />}
                onClick={() => deleteTodo({ todoId: todo.todoId, routeId })}
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
