import { useEffect } from 'react';

import useAddTodoMutation from './useAddTodoMutation';
import useBaseBottomSheet from './useBaseBottomSheet';
import TodoAddForm from '../components/TodoTab/TodoAddForm';

import { TodoAddParams } from '@/api/todo';

export const useAddTodoBottomSheet = (dateType: string) => {
  const { isOpen, open, close } = useBaseBottomSheet();
  const { mutate: addTodo, isSuccess } = useAddTodoMutation();

  const handleAddTodo = (todo: TodoAddParams) => {
    addTodo({ dateType, todo });
  };

  useEffect(() => {
    if (isSuccess) {
      close();
    }
  }, [isSuccess]);

  return {
    isOpen,
    open,
    close,
    handleAddTodo,
    content: <TodoAddForm handleAddTodo={handleAddTodo} />,
    title: '할 일 추가하기',
  };
};
