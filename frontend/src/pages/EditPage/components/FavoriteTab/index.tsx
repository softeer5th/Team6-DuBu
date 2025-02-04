import * as S from './FavoriteTab.styled';
import useAddTodoFromArchivedMutation from '../../hooks/useAddTodoFromArchivedMutation';
import useFavoriteTodoListQuery from '../../hooks/useFavoriteListQuery';
import TodoEditItem from '../TodoEditItem';

import IconButton from '@/components/Button/IconButton';
import Icon from '@/components/Icon';
import useQueryParamsDate from '@/hooks/useQueryParamsDate';

const FavoriteTab = () => {
  const { dateType } = useQueryParamsDate();
  const { data: favoriteTodoList } = useFavoriteTodoListQuery();
  const { mutate: addTodoFromArchived } = useAddTodoFromArchivedMutation();

  const handleAddTodoFromFavorite = (todoId: number) => {
    addTodoFromArchived({ dateType, todoId });
  };

  if (!favoriteTodoList) return null;

  return (
    <S.FavoriteTabLayout>
      {favoriteTodoList.map((todo) => (
        <TodoEditItem
          key={todo.todoId}
          todo={todo}
          left={
            <IconButton
              icon={<Icon icon="PlusCircle" cursor="pointer" />}
              onClick={() => handleAddTodoFromFavorite(todo.todoId)}
            />
          }
        />
      ))}
    </S.FavoriteTabLayout>
  );
};

export default FavoriteTab;
