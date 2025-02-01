import * as S from './RecommendTab.styled';
import useRecommendTodoListQuery from '../../hooks/useRecommendListQuery';
import TodoEditItem from '../TodoTab/TodoEditItem';

const RecommendTab = () => {
  const { data: recommendTodoList } = useRecommendTodoListQuery();

  if (!recommendTodoList) return null;

  return (
    <S.RecommendTabLayout>
      {recommendTodoList.map((todo) => (
        <TodoEditItem key={todo.todo_id} todo={todo} />
      ))}
    </S.RecommendTabLayout>
  );
};

export default RecommendTab;
