import * as S from './RecommendTab.styled';
import useAddTodoFromArchivedMutation from '../../hooks/useAddTodoFromArchivedMutation';
import TodoEditItem from '../TodoEditItem';

import IconButton from '@/components/Button/IconButton';
import Icon from '@/components/Icon';
import useQueryParamsDate from '@/hooks/useQueryParamsDate';
import useRecommendTodoListQuery from '@/pages/EditPage/hooks/useRecommendListQuery';

const RecommendTab = () => {
  const { dateType } = useQueryParamsDate();
  const { data: recommendTodoList } = useRecommendTodoListQuery();
  const { mutate: addTodoFromArchived } = useAddTodoFromArchivedMutation();

  const handleAddTodoFromRecommend = (todoId: number) => {
    addTodoFromArchived({ dateType, todoId });
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
        <S.WatchMoreLink to="/recommend">더보기</S.WatchMoreLink>
      </S.WatchMoreLinkWrapper>
    </>
  );
};

export default RecommendTab;
