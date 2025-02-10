import { useParams } from 'react-router';

import * as S from './FavoriteTab.styled';
import useAddTodoFromArchivedMutation from '../../hooks/useAddTodoFromArchivedMutation';
import useFavoriteTodoListQuery from '../../hooks/useFavoriteListQuery';
import TodoEditItem from '../TodoEditItem';

import IconButton from '@/components/Button/IconButton';
import Icon from '@/components/Icon';
import { MAX_TODO_ITEM_LENGTH } from '@/constants/config';
import { TODO_TOAST_MESSAGE } from '@/constants/message';
import useQueryParamsDate from '@/hooks/useQueryParamsDate';
import useToast from '@/hooks/useToast';
import useTodoListQuery from '@/hooks/useTodoListQuery';

const FavoriteTab = () => {
  const { planId } = useParams();
  const { dateType } = useQueryParamsDate();

  const { data: todoList } = useTodoListQuery(dateType, Number(planId));
  const { data: favoriteTodoList } = useFavoriteTodoListQuery();
  const { mutate: addTodoFromArchived } = useAddTodoFromArchivedMutation();
  const { toast } = useToast();

  const handleAddTodoFromFavorite = (todoId: number) => {
    if (todoList && todoList.length >= MAX_TODO_ITEM_LENGTH) {
      toast({ message: TODO_TOAST_MESSAGE.limit });
      return;
    }

    addTodoFromArchived(
      { dateType, todoId, planId: Number(planId) },
      {
        onSuccess: () => {
          toast({ message: TODO_TOAST_MESSAGE.add });
        },
      },
    );
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
