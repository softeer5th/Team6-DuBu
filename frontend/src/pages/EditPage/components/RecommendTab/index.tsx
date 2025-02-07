import { useParams } from 'react-router';

import * as S from './RecommendTab.styled';
import useAddTodoFromArchivedMutation from '../../hooks/useAddTodoFromArchivedMutation';
import TodoEditItem from '../TodoEditItem';

import IconButton from '@/components/Button/IconButton';
import Icon from '@/components/Icon';
import useQueryParamsDate from '@/hooks/useQueryParamsDate';
import useRecommendTodoListQuery from '@/pages/EditPage/hooks/useRecommendListQuery';

const RecommendTab = () => {
  const { routeId } = useParams();
  const { dateType } = useQueryParamsDate();
  const { data: recommendTodoList } = useRecommendTodoListQuery();
  const { mutate: addTodoFromArchived } = useAddTodoFromArchivedMutation();

  const routeURL = routeId ? `/recommend/${routeId}` : '/recommend';

  const handleAddTodoFromRecommend = (todoId: number) => {
    addTodoFromArchived({ dateType, todoId, routeId: Number(routeId) });
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
