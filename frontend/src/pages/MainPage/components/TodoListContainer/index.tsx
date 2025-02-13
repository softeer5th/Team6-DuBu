import { useNavigate } from 'react-router';

import * as S from './TodoListContainer.styled';

import Icon from '@/components/Icon';
import { ICON_MAPPER } from '@/constants/config';
import useQueryParamsDate from '@/hooks/useQueryParamsDate';
import useTodoListQuery from '@/hooks/useTodoListQuery';
import { colors } from '@/styles/theme';

const TODO_CONTENT_MESSAGE = {
  today: '오늘 할 일을 보여드려요',
  tomorrow: '할 일을 미리 선택해보세요',
  empty: '오늘 할 일이 아직 없어요',
};

const TodoListContainer = () => {
  const navigate = useNavigate();
  const { dateType } = useQueryParamsDate();
  const { data: todoList } = useTodoListQuery(dateType);

  const handleClickEdit = () => {
    const url = dateType ? `/edit?dateType=${dateType}` : '/edit';
    navigate(url);
  };

  const isEmptyTodo = todoList && todoList?.length === 0;

  return (
    <S.TodoListContainerLayout>
      <S.ContentHeader>
        <S.ContentTitle>
          {isEmptyTodo ? TODO_CONTENT_MESSAGE.empty : TODO_CONTENT_MESSAGE[dateType]}
        </S.ContentTitle>
        <S.EditButton onClick={handleClickEdit}>
          <Icon icon={isEmptyTodo ? 'Plus' : 'Edit'} width={16} height={16} />
          <S.EditLabel>{isEmptyTodo ? '추가하기' : '수정하기'}</S.EditLabel>
        </S.EditButton>
      </S.ContentHeader>

      <S.TodoList>
        {isEmptyTodo && <Icon icon="Fire" width={96} height={96} color={colors.green25} />}
        {todoList?.map((todo) => (
          <S.TodoItem key={todo.todoId}>
            <Icon icon={ICON_MAPPER[todo.category]} />
            <span>{todo.title}</span>
          </S.TodoItem>
        ))}
      </S.TodoList>
    </S.TodoListContainerLayout>
  );
};

export default TodoListContainer;
