import { useQuery } from '@tanstack/react-query';

import * as S from './TodoListContainer.styled';
import { getKoreanTime } from '../../MainPage.utils';

import { getTodayTodoList, getTomorrowTodoList } from '@/api/todo';
import Icon from '@/components/Icon';

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

interface TodoListContainerProps {
  currentTime: Date;
}
const TodoListContainer = ({ currentTime }: TodoListContainerProps) => {
  const today = getKoreanTime();
  const isToday = currentTime.toDateString() === today.toDateString();

  const { data: todoList } = useQuery({
    queryKey: ['todoList', isToday],
    queryFn: () => (isToday ? getTodayTodoList() : getTomorrowTodoList()),
    staleTime: Infinity,
  });

  return (
    <S.TodoListContainerLayout>
      <S.ContentHeader>
        <S.ContentTitle>
          {isToday ? '오늘 할 일을 보여드려요' : '할 일을 미리 선택해보세요'}
        </S.ContentTitle>
        <S.EditButton>
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
