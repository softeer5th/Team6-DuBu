import * as S from './FavoriteTab.styled';
import useFavoriteTodoListQuery from '../../hooks/useFavoriteListQuery';
import TodoEditItem from '../TodoEditItem';

import IconButton from '@/components/Button/IconButton';
import Icon from '@/components/Icon';

const FavoriteTab = () => {
  const { data: favoriteTodoList } = useFavoriteTodoListQuery();

  if (!favoriteTodoList) return null;

  return (
    <S.FavoriteTabLayout>
      {favoriteTodoList.map((todo) => (
        <TodoEditItem
          key={todo.todo_id}
          todo={todo}
          left={<IconButton icon={<Icon icon="PlusCircle" cursor="pointer" />} />}
        />
      ))}
    </S.FavoriteTabLayout>
  );
};

export default FavoriteTab;
