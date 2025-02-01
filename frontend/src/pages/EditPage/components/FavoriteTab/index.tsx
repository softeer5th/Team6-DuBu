import * as S from './FavoriteTab.styled';
import useFavoriteTodoListQuery from '../../hooks/useFavoriteListQuery';
import TodoEditItem from '../TodoTab/TodoEditItem';

const FavoriteTab = () => {
  const { data: favoriteTodoList } = useFavoriteTodoListQuery();

  if (!favoriteTodoList) return null;

  return (
    <S.FavoriteTabLayout>
      {favoriteTodoList.map((todo) => (
        <TodoEditItem key={todo.todo_id} todo={todo} />
      ))}
    </S.FavoriteTabLayout>
  );
};

export default FavoriteTab;
