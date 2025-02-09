import useAddTodoMutation from './useAddTodoMutation';
import useBaseBottomSheet from './useBaseBottomSheet';
import TodoAddForm from '../components/TodoTab/TodoAddForm';

import { TodoCreateParams } from '@/api/todo';
import { TODO_TOAST_MESSAGE } from '@/constants/message';
import useToast from '@/hooks/useToast';

export const useAddTodoBottomSheet = (dateType: string, planId?: number) => {
  const { isOpen, dispatch } = useBaseBottomSheet();
  const { mutate: addTodo } = useAddTodoMutation();
  const { toast } = useToast();

  const handleAddTodo = (todo: TodoCreateParams) => {
    addTodo(
      { dateType, todo, planId },
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
    content: <TodoAddForm handleAddTodo={handleAddTodo} />,
    title: '할 일 추가하기',
  };
};
