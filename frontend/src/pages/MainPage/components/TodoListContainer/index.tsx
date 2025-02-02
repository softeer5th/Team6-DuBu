import { useNavigate } from 'react-router';

import * as S from './TodoListContainer.styled';

import Icon from '@/components/Icon';
import useQueryParamsDate from '@/hooks/useQueryParamsDate';
import useTodoListQuery from '@/hooks/useTodoListQuery';

// [최초 진입한 사용자의 경우]
// TODO: 최초 진입 여부 -> 유저 API 호출
// TODO: 오늘 할 일을 추천해드려요 텍스트

// [할 일이 1개 이상 있는 경우]
// TODO: 수정하기 버튼 텍스트
// TODO: 오늘 할 일을 보여드려요 텍스트

// [할 일이 없을 경우]
// TODO: 오늘 할 일이 아직 없어요
// TODO: plus 아이콘 + 추가하기 버튼 텍스트
// TODO: fire 아이콘

const TodoListContainer = () => {
  const navigate = useNavigate();
  const { isToday, dateType } = useQueryParamsDate();
  const { data: todoList } = useTodoListQuery(isToday);

  const handleClickEdit = () => {
    const url = dateType ? `/edit?dateType=${dateType}` : '/edit';
    navigate(url);
  };

  return (
    <S.TodoListContainerLayout>
      <S.ContentHeader>
        <S.ContentTitle>
          {isToday ? '오늘 할 일을 보여드려요' : '할 일을 미리 선택해보세요'}
        </S.ContentTitle>
        <S.EditButton onClick={handleClickEdit}>
          <Icon icon="Edit" width={16} height={16} />
          <S.EditLabel>수정하기</S.EditLabel>
        </S.EditButton>
      </S.ContentHeader>

      <S.TodoList>
        {todoList?.map((todo) => (
          <S.TodoItem key={todo.todo_id}>
            <Icon icon="Reading" />
            <span>{todo.name}</span>
          </S.TodoItem>
        ))}
      </S.TodoList>
    </S.TodoListContainerLayout>
  );
};

export default TodoListContainer;
