import * as S from './TodoTab.styled';

import IconButton from '@/components/Button/IconButton';
import Icon from '@/components/Icon';
import useQueryParamsDate from '@/hooks/useQueryParamsDate';
import useTodoListQuery from '@/hooks/useTodoListQuery';
import { categoryMapper } from '@/pages/EditPage/EditPage.constants';

const TodoTab = () => {
  const { isToday } = useQueryParamsDate();
  const { data: todoList } = useTodoListQuery(isToday);

  return (
    <S.TodoTabLayout>
      <S.SloganWrapper>
        <span>오늘 할 일, 작은 목표로 시작해봐요</span>
        <span>최대 3개까지 고를 수 있어요</span>
      </S.SloganWrapper>

      <S.TodoEditList>
        {todoList?.map((todo) => (
          <S.TodoEditItem key={todo.todo_id}>
            <IconButton icon={<Icon icon="MinusCircle" />} />
            <S.TodoTextWrapper>
              <S.TodoTitle>{todo.name}</S.TodoTitle>
              <S.TodoBadgeWrapper>
                <S.TodoBadge $category={todo.category}>
                  {`#${categoryMapper[todo.category]}`}
                </S.TodoBadge>
                <S.TodoBadge>{`#${todo.difficulty}`}</S.TodoBadge>
              </S.TodoBadgeWrapper>
            </S.TodoTextWrapper>
            <IconButton icon={<Icon icon="Edit" />} />
          </S.TodoEditItem>
        ))}
        <IconButton icon={<Icon icon="PlusCircle" />} text="직접 추가하기" isFull={true} />
      </S.TodoEditList>
    </S.TodoTabLayout>
  );
};

export default TodoTab;
