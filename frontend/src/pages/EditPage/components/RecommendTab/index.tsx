import * as S from './RecommendTab.styled';
import TodoEditItem from '../TodoEditItem';

import IconButton from '@/components/Button/IconButton';
import Icon from '@/components/Icon';
import useRecommendTodoListQuery from '@/pages/EditPage/hooks/useRecommendListQuery';

const RecommendTab = () => {
  const { data: recommendTodoList } = useRecommendTodoListQuery();

  if (!recommendTodoList) return null;

  return (
    <>
      <S.RecommendTabList>
        {recommendTodoList.map((todo) => (
          <TodoEditItem
            key={todo.todo_id}
            todo={todo}
            left={<IconButton icon={<Icon icon="PlusCircle" cursor="pointer" />} />}
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
