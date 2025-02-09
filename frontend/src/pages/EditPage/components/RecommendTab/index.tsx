import { useParams } from 'react-router';

import * as S from './RecommendTab.styled';
import useAddTodoFromArchivedMutation from '../../hooks/useAddTodoFromArchivedMutation';
import TodoEditItem from '../TodoEditItem';

import IconButton from '@/components/Button/IconButton';
import Icon from '@/components/Icon';
import { TODO_TOAST_MESSAGE } from '@/constants/message';
import useQueryParamsDate from '@/hooks/useQueryParamsDate';
import useToast from '@/hooks/useToast';
import useTodoListQuery from '@/hooks/useTodoListQuery';
import useRecommendTodoListQuery from '@/pages/EditPage/hooks/useRecommendListQuery';

const RecommendTab = () => {
  const { planId } = useParams();
  const { dateType } = useQueryParamsDate();

  const { data: todoList } = useTodoListQuery(dateType, Number(planId));
  const { data: recommendTodoList } = useRecommendTodoListQuery();
  const { mutate: addTodoFromArchived } = useAddTodoFromArchivedMutation();
  const { toast } = useToast();

  const routeURL = planId ? `/recommend/${planId}` : '/recommend';

  const handleAddTodoFromRecommend = (todoId: number) => {
    if (todoList && todoList.length >= 3) {
      toast({ message: TODO_TOAST_MESSAGE.limit });
      return;
    }

    addTodoFromArchived(
      { dateType, todoId, planId: Number(planId) },
      { onSuccess: () => toast({ message: TODO_TOAST_MESSAGE.add }) },
    );
  };

  if (!recommendTodoList) return null;

  return (
    <>
      <S.RecommendTabList>
        {recommendTodoList.map((todo) => (
          <TodoEditItem
            key={todo.todoId}
            todo={todo}
            left={
              <IconButton
                icon={<Icon icon="PlusCircle" cursor="pointer" />}
                onClick={() => handleAddTodoFromRecommend(todo.todoId)}
              />
            }
          />
        ))}
      </S.RecommendTabList>
      <S.WatchMoreLinkWrapper>
        <S.WatchMoreLink to={routeURL}>더보기</S.WatchMoreLink>
      </S.WatchMoreLinkWrapper>
    </>
  );
};

export default RecommendTab;
