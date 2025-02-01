import * as S from './RecommendTab.styled';
import useRecommendTodoListQuery from '../../hooks/useRecommendListQuery';
import TodoEditItem from '../TodoEditItem';

import IconButton from '@/components/Button/IconButton';
import Icon from '@/components/Icon';

const RecommendTab = () => {
  const { data: recommendTodoList } = useRecommendTodoListQuery();

  if (!recommendTodoList) return null;

  return (
    <S.RecommendTabLayout>
      {recommendTodoList.map((todo) => (
        <TodoEditItem
          key={todo.todo_id}
          todo={todo}
          left={<IconButton icon={<Icon icon="PlusCircle" cursor="pointer" />} />}
        />
      ))}
    </S.RecommendTabLayout>
  );
};

export default RecommendTab;
