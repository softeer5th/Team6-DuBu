import { useEffect } from 'react';

import useAddTodoMutation from './useAddTodoMutation';
import useBaseBottomSheet from './useBaseBottomSheet';
import TodoAddForm from '../components/TodoTab/TodoAddForm';

import { TodoAddParams } from '@/api/todo';

export const useAddTodoBottomSheet = (dateType: string) => {
  const { isOpen, dispatch } = useBaseBottomSheet();
  const { mutate: addTodo, isSuccess, reset } = useAddTodoMutation();

  const handleAddTodo = (todo: TodoAddParams) => {
    addTodo({ dateType, todo });
  };

  useEffect(() => {
    if (isSuccess) {
      dispatch.close();
      reset();
    }
  }, [isSuccess, dispatch, reset]);

  return {
    isOpen,
    open: dispatch.open,
    close: dispatch.close,
    handleAddTodo,
    content: <TodoAddForm handleAddTodo={handleAddTodo} />,
    title: '할 일 추가하기',
  };
};
