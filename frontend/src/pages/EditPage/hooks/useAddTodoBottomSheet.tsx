import useAddTodoMutation from './useAddTodoMutation';
import TodoAddForm from '../components/TodoTab/TodoAddForm';

import { TodoCreateParams } from '@/api/todo';
import { TODO_TOAST_MESSAGE } from '@/constants/message';
import useBaseBottomSheet from '@/hooks/useBaseBottomSheet';
import useToast from '@/hooks/useToast';

export const useAddTodoBottomSheet = (tabType: 'today' | 'tomorrow' | 'route', planId?: number) => {
  const { isOpen, dispatch } = useBaseBottomSheet();
  const { mutate: addTodo, isPending } = useAddTodoMutation();
  const { toast } = useToast();

  const handleAddTodo = (todo: TodoCreateParams) => {
    addTodo(
      { dateType: tabType, todo, planId },
      {
        onSuccess: () => {
          toast({ message: TODO_TOAST_MESSAGE.add });
          dispatch.close();
        },
      },
    );
  };

  return {
    isOpen,
    open: dispatch.open,
    close: dispatch.close,
    handleAddTodo,
    content: <TodoAddForm handleAddTodo={handleAddTodo} isLoading={isPending} />,
    title: '할 일 추가하기',
  };
};
